# CV Interactif — Baptiste Chevassut

> **Poste visé** : Ingénieur OpenStack chez Consort Switzerland
> **Site en ligne** : [os-apply.consort.chevassut.ch](https://os-apply.consort.chevassut.ch)
> **Lien de l'offre** : https://careers.consort-group.com/jobs/6850434-ingenieur-openstack-h-f

## Stack

| Couche | Technologies |
|--------|-------------|
| Frontend | React 18, Vite, TypeScript, TailwindCSS |
| Container | Docker, Nginx |
| Infrastructure | OpenStack (Infomaniak Public Cloud) |
| IaC | Terraform, Ansible |
| CI/CD | GitHub Actions |

## Prérequis

- Terraform >= 1.0
- Ansible >= 2.9
- Compte Infomaniak Public Cloud
- Domaine avec accès aux enregistrements DNS

## Déploiement

### 1. Créer la zone DNS sur OpenStack (Designate)

Avant tout déploiement Terraform, la zone DNS doit exister sur OpenStack.

**Via Horizon** :
1. Se connecter à https://api.pub1.infomaniak.cloud/horizon/
2. Aller dans **DNS > Zones > Create Zone**
3. Créer la zone `consort.chevassut.ch.` (avec le point final)
4. Noter les serveurs NS attribués (ex: `ns1.pub1.infomaniak.cloud.`)

**Via CLI** :
```bash
source openrc.sh
openstack zone create --email admin@chevassut.ch consort.chevassut.ch.
openstack zone show consort.chevassut.ch. -f json | jq '.ns_records'
```

### 2. Configurer la délégation DNS chez le registrar

Chez votre registrar (pour le domaine parent `chevassut.ch`), créer les enregistrements NS pour déléguer `consort.chevassut.ch` vers OpenStack :

```
consort.chevassut.ch.  NS  ns1.pub1.infomaniak.cloud.
consort.chevassut.ch.  NS  ns2.pub1.infomaniak.cloud.
```

Vérifier la propagation :
```bash
dig NS consort.chevassut.ch
```

### 3. Clé SSH

Créer une keypair sur Horizon (Compute > Key Pairs) ou utiliser une clé existante.

```bash
# Placer la clé à la racine du projet
mv ~/Downloads/votre-cle.pem ./consort-deploy.pem
chmod 600 consort-deploy.pem

# Extraire la clé publique
ssh-keygen -y -f consort-deploy.pem
```

### 4. Configuration Terraform

```bash
cd terraform/
cp terraform.tfvars.example terraform.tfvars
```

Éditer `terraform.tfvars` :
```hcl
os_project_name = "PCP-XXXXXX"
os_username     = "PCU-XXXXXX"
os_password     = "mot-de-passe"
ssh_public_key  = "ssh-rsa AAAA..."
```

### 5. Déployer

```bash
cd terraform/

# Pipeline complet
./pipeline.sh full

# Ou manuellement
terraform init
terraform apply
```

Terraform crée :
- VM Ubuntu 22.04 (réseau privé, security groups, floating IP)
- Enregistrement DNS `os-apply.consort.chevassut.ch` pointant vers la floating IP
- Provisioning Ansible (Docker, Nginx, Let's Encrypt)

## CI/CD

Les mises à jour sont déployées automatiquement via GitHub Actions sur push.

### Configuration des secrets

1. Aller sur **GitHub > Settings > Secrets and variables > Actions**

2. Ajouter ces 3 secrets :

| Secret | Valeur |
|--------|--------|
| `SERVER_IP` | `terraform output -raw floating_ip` |
| `DEPLOY_USER` | `ubuntu` |
| `SSH_PRIVATE_KEY` | Contenu de `consort-deploy.pem` |

### Déclenchement

- **Automatique** : push sur `master` avec modifications dans `frontend/`
- **Manuel** : Actions > Deploy > Run workflow

### Pipeline

1. Build : `npm ci` > `lint` > `type-check` > `build`
2. Deploy : `rsync` vers le serveur
3. Restart : `docker compose build && up -d`
4. Health check : `curl https://os-apply.consort.chevassut.ch`

## Développement local

```bash
cd frontend/
npm install
npm run dev       # http://localhost:5173
npm run build     # Build production
npm run lint      # ESLint
npm run type-check
```

## Structure

```
cv/
├── frontend/           # React app
│   ├── src/
│   │   ├── components/
│   │   └── i18n/       # Traductions FR/EN
│   └── package.json
│
├── terraform/          # Infrastructure
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── pipeline.sh
│
├── ansible/            # Configuration
│   ├── playbook.yml
│   └── roles/
│       ├── common/     # UFW, Fail2ban
│       ├── docker/
│       └── frontend/
│
└── .github/workflows/
    └── deploy.yml
```

## Ressources OpenStack créées

| Ressource | Description |
|-----------|-------------|
| Network | Réseau privé + subnet 192.168.100.0/24 |
| Router | Connecté au réseau externe |
| Security Group | Ports 22, 80, 443 |
| Instance | Ubuntu 22.04, 2 vCPU, 4GB RAM |
| Floating IP | IP publique associée |
| DNS Record | A record sur Designate |

## Contact

**Baptiste Chevassut**
baptiste@chevassut.ch
+33 6 34 24 96 67
