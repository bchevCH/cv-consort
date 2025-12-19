# Ansible — CV Consort

Configuration du serveur Ubuntu avec Docker et Nginx.

## Prérequis

```bash
pip install ansible
ansible-galaxy install -r requirements.yml
```

## Usage

```bash
ansible-playbook -i inventory.ini playbook.yml
```

En général, Terraform lance Ansible automatiquement après la création de la VM.

## Rôles

| Rôle | Description |
|------|-------------|
| **common** | Packages de base (curl, git, htop), création user deploy, UFW (ports 22/80/443), Fail2ban |
| **docker** | Docker CE, Docker Compose, ajout user au groupe docker |
| **frontend** | Clone du repo, build React, déploiement container Nginx, certificat Let's Encrypt |

## Variables principales

Définies dans `group_vars/all.yml` :

| Variable | Description | Défaut |
|----------|-------------|--------|
| `domain_name` | Domaine du site | os-apply.consort.chevassut.ch |
| `certbot_email` | Email pour Let's Encrypt | baptiste@chevassut.ch |
| `app_user` | Utilisateur de déploiement | deploy |
| `app_dir` | Répertoire de l'application | /opt/cv-consort |
| `git_repo` | URL du repository | https://github.com/bchevCH/cv-consort.git |

## Structure

```
ansible/
├── playbook.yml
├── inventory.ini
├── group_vars/
│   └── all.yml
├── requirements.yml
└── roles/
    ├── common/
    ├── docker/
    └── frontend/
```
