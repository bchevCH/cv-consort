# Terraform — CV Consort

Provisionnement OpenStack : VM, réseau, security groups, floating IP et DNS.

## Prérequis

### Zone DNS Designate

Terraform utilise une zone DNS existante pour créer l'enregistrement A. Cette zone doit être créée manuellement avant le premier `terraform apply`.

**Créer la zone via Horizon** :
1. DNS > Zones > Create Zone
2. Nom : `consort.chevassut.ch.` (avec le point final)
3. Email : `admin@chevassut.ch`
4. Type : Primary

**Créer la zone via CLI** :
```bash
source openrc.sh
openstack zone create --email admin@chevassut.ch consort.chevassut.ch.
```

**Configurer la délégation** :

Récupérer les NS attribués :
```bash
openstack zone show consort.chevassut.ch. -f value -c ns_records
```

Chez le registrar du domaine parent (`chevassut.ch`), ajouter :
```
consort  NS  ns1.pub1.infomaniak.cloud.
consort  NS  ns2.pub1.infomaniak.cloud.
```

### Autres prérequis

- Terraform >= 1.0
- Clé SSH (keypair OpenStack ou locale)
- Credentials Infomaniak Public Cloud

## Configuration

```bash
cp terraform.tfvars.example terraform.tfvars
```

```hcl
# terraform.tfvars
os_project_name = "PCP-XXXXXX"
os_username     = "PCU-XXXXXX"
os_password     = "mot-de-passe"
ssh_public_key  = "ssh-rsa AAAA..."
```

## Déploiement

```bash
# Via le script pipeline
./pipeline.sh full      # Destroy + Apply + Health check
./pipeline.sh apply     # Apply uniquement
./pipeline.sh destroy   # Destroy uniquement

# Manuellement
terraform init
terraform apply
```

## Variables

| Variable | Description | Défaut |
|----------|-------------|--------|
| `os_auth_url` | URL d'authentification | `https://api.pub1.infomaniak.cloud/identity/v3` |
| `os_region` | Région | `dc3-a` |
| `os_project_name` | Nom du projet | - |
| `os_username` | Utilisateur | - |
| `os_password` | Mot de passe | - |
| `instance_name` | Nom de l'instance | `cv-consort` |
| `instance_flavor` | Flavor | `a2-ram4-disk20-perf1` |
| `instance_image` | Image | `Ubuntu 22.04 LTS Jammy Jellyfish` |
| `ssh_public_key` | Clé publique SSH | - |
| `ssh_private_key_path` | Chemin clé privée | `../consort-key` |
| `run_ansible` | Lancer Ansible après création | `true` |

## Ressources créées

| Ressource | Nom |
|-----------|-----|
| Network | `cv-consort-network` |
| Subnet | `cv-consort-subnet` (192.168.100.0/24) |
| Router | `cv-consort-router` |
| Security Group | `cv-consort-sg` (22, 80, 443) |
| Keypair | `cv-consort-key` |
| Instance | `cv-consort` |
| Floating IP | Assignée dynamiquement |
| DNS Record | `os-apply.consort.chevassut.ch` |

## Outputs

```bash
terraform output floating_ip    # IP publique
terraform output site_url       # URL du site
terraform output ssh_command    # Commande SSH
```

## Destruction

```bash
terraform destroy
```

L'enregistrement DNS est supprimé, mais la zone Designate est conservée (créée manuellement).
