# Variables Terraform pour le CV Consort

# OpenStack Auth  
variable "os_auth_url" {
  description = "URL Keystone"
  type        = string
  default     = "https://api.pub1.infomaniak.cloud/identity"
}

variable "os_region" {
  type    = string
  default = "dc3-a"
}

variable "os_project_name" {
  type = string
}

variable "os_username" {
  type = string
}

variable "os_password" {
  type      = string
  sensitive = true
}

# Instance
variable "instance_name" {
  type    = string
  default = "cv-consort"
}

variable "instance_flavor" {
  type    = string
  default = "a2-ram4-disk20-perf1"
}

variable "instance_image" {
  type    = string
  default = "Ubuntu 22.04 LTS Jammy Jellyfish"
}

# Réseau
variable "network_cidr" {
  type    = string
  default = "192.168.100.0/24"
}

variable "external_network" {
  type    = string
  default = "ext-floating1"
}

variable "dns_servers" {
  type    = list(string)
  default = ["83.166.143.51", "83.166.143.52"]
}

# SSH
variable "ssh_public_key" {
  description = "Contenu de la clé publique SSH"
  type        = string
}

variable "ssh_private_key_path" {
  description = "Chemin vers la clé privée SSH (pour Ansible)"
  type        = string
  default     = "~/.ssh/id_rsa"
}

variable "ssh_allowed_cidrs" {
  description = "IPs autorisées pour SSH (mettre votre IP)"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

# Ansible
variable "run_ansible" {
  description = "Lancer Ansible après création de l'infra"
  type        = bool
  default     = true
}

# Application
variable "domain_name" {
  type    = string
  default = "os-apply.consort.chevassut.ch"
}
