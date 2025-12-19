#!/bin/bash
# Pipeline Terraform - Destroy + Rebuild complet
# Usage: ./pipeline.sh [destroy|apply|full]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
SSH_KEY="$ROOT_DIR/consort-key"
cd "$SCRIPT_DIR"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() { echo -e "${GREEN}[$(date +'%H:%M:%S')]${NC} $1"; }
warn() { echo -e "${YELLOW}[$(date +'%H:%M:%S')]${NC} $1"; }
error() { echo -e "${RED}[$(date +'%H:%M:%S')]${NC} $1"; }

# Vérifier les prérequis
check_prereqs() {
    log "Vérification des prérequis..."

    # Terraform
    if ! command -v terraform &> /dev/null; then
        error "Terraform non installé"
        exit 1
    fi

    # Ansible (pip version)
    ANSIBLE_PATH="$HOME/.local/bin/ansible-playbook"
    if [[ ! -f "$ANSIBLE_PATH" ]]; then
        warn "Ansible pip non trouvé, installation..."
        pip3 install --upgrade ansible
    fi
    export PATH="$HOME/.local/bin:$PATH"

    # Collection Docker
    if ! ansible-galaxy collection list 2>/dev/null | grep -q community.docker; then
        warn "Installation collection community.docker..."
        ansible-galaxy collection install community.docker
    fi

    # Clé SSH (à la racine du projet)
    if [[ ! -f "$SSH_KEY" ]]; then
        error "Clé SSH $SSH_KEY non trouvée"
        error "Placez consort-deploy.pem à la racine et créez le symlink: ln -sf consort-deploy.pem consort-key"
        exit 1
    fi

    log "Prérequis OK"
}

# Destroy
destroy() {
    log "=== DESTROY ==="
    terraform destroy -auto-approve
    log "Destroy terminé"
}

# Apply
apply() {
    log "=== APPLY ==="

    # Init si nécessaire
    if [[ ! -d ".terraform" ]]; then
        log "Terraform init..."
        terraform init
    fi

    # Plan
    log "Terraform plan..."
    terraform plan -out=tfplan

    # Apply
    log "Terraform apply..."
    terraform apply tfplan
    rm -f tfplan

    # Récupérer l'IP
    IP=$(terraform output -raw floating_ip 2>/dev/null || echo "")
    URL=$(terraform output -raw site_url 2>/dev/null || echo "")

    log "=== DÉPLOIEMENT TERMINÉ ==="
    echo ""
    echo -e "  IP:  ${GREEN}$IP${NC}"
    echo -e "  URL: ${GREEN}$URL${NC}"
    echo -e "  SSH: ${GREEN}ssh -i $SSH_KEY ubuntu@$IP${NC}"
    echo ""
}

# Test de santé
health_check() {
    log "=== HEALTH CHECK ==="

    IP=$(terraform output -raw floating_ip 2>/dev/null || echo "")
    URL=$(terraform output -raw site_url 2>/dev/null || echo "")

    if [[ -z "$IP" ]]; then
        error "Pas d'IP trouvée"
        return 1
    fi

    # Test SSH
    log "Test SSH..."
    if ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no -i "$SSH_KEY" ubuntu@$IP "echo OK" &>/dev/null; then
        log "SSH: OK"
    else
        error "SSH: FAILED"
        return 1
    fi

    # Test Docker
    log "Test Docker..."
    DOCKER_STATUS=$(ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" ubuntu@$IP "sudo docker ps --format '{{.Names}}' | grep -c cv || true" 2>/dev/null | tail -1)
    if [[ -n "$DOCKER_STATUS" && "$DOCKER_STATUS" -gt 0 ]]; then
        log "Docker: OK ($DOCKER_STATUS containers)"
    else
        error "Docker: FAILED"
        return 1
    fi

    # Test HTTP
    log "Test HTTPS..."
    sleep 5  # Attendre que le service soit prêt
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -k "$URL" 2>/dev/null || echo "000")
    if [[ "$HTTP_CODE" == "200" ]]; then
        log "HTTPS: OK (HTTP $HTTP_CODE)"
    else
        warn "HTTPS: HTTP $HTTP_CODE (peut nécessiter propagation DNS)"
    fi

    log "=== HEALTH CHECK TERMINÉ ==="
}

# Pipeline complet
full() {
    log "=== PIPELINE COMPLET ==="
    START_TIME=$(date +%s)

    destroy
    echo ""
    sleep 5
    apply
    echo ""
    health_check

    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))

    echo ""
    log "=== PIPELINE TERMINÉ EN ${DURATION}s ==="
}

# Main
case "${1:-full}" in
    destroy)
        check_prereqs
        destroy
        ;;
    apply)
        check_prereqs
        apply
        ;;
    health|check)
        health_check
        ;;
    full)
        check_prereqs
        full
        ;;
    *)
        echo "Usage: $0 [destroy|apply|health|full]"
        echo ""
        echo "  destroy  - Détruit l'infrastructure"
        echo "  apply    - Crée/met à jour l'infrastructure"
        echo "  health   - Vérifie l'état de l'infrastructure"
        echo "  full     - Destroy + Apply + Health check"
        exit 1
        ;;
esac
