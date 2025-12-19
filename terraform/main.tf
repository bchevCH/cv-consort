# Infrastructure OpenStack pour le CV Consort
# Provisionne une VM Ubuntu avec réseau, sécurité et IP publique

terraform {
  required_version = ">= 1.0"
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "~> 2.0.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.2"
    }
  }
}

provider "openstack" {
  auth_url    = var.os_auth_url
  region      = var.os_region
  user_name   = var.os_username
  password    = var.os_password
  tenant_name = var.os_project_name
}

# Image Ubuntu
data "openstack_images_image_v2" "ubuntu" {
  name        = var.instance_image
  most_recent = true
}

# Réseau externe pour IP publique
data "openstack_networking_network_v2" "external" {
  name = var.external_network
}

# Réseau privé
resource "openstack_networking_network_v2" "network" {
  name           = "${var.instance_name}-network"
  admin_state_up = true
}

resource "openstack_networking_subnet_v2" "subnet" {
  name            = "${var.instance_name}-subnet"
  network_id      = openstack_networking_network_v2.network.id
  cidr            = var.network_cidr
  ip_version      = 4
  dns_nameservers = var.dns_servers
}

resource "openstack_networking_router_v2" "router" {
  name                = "${var.instance_name}-router"
  admin_state_up      = true
  external_network_id = data.openstack_networking_network_v2.external.id
}

resource "openstack_networking_router_interface_v2" "router_interface" {
  router_id = openstack_networking_router_v2.router.id
  subnet_id = openstack_networking_subnet_v2.subnet.id
}

# Sécurité - ports SSH, HTTP, HTTPS
resource "openstack_networking_secgroup_v2" "secgroup" {
  name        = "${var.instance_name}-sg"
  description = "SSH, HTTP, HTTPS"
}

resource "openstack_networking_secgroup_rule_v2" "ssh" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 22
  port_range_max    = 22
  remote_ip_prefix  = var.ssh_allowed_cidrs[0]
  security_group_id = openstack_networking_secgroup_v2.secgroup.id
}

resource "openstack_networking_secgroup_rule_v2" "http" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 80
  port_range_max    = 80
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.secgroup.id
}

resource "openstack_networking_secgroup_rule_v2" "https" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 443
  port_range_max    = 443
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.secgroup.id
}

# Clé SSH
resource "openstack_compute_keypair_v2" "keypair" {
  name       = "${var.instance_name}-key"
  public_key = var.ssh_public_key
}

# Port réseau explicite
resource "openstack_networking_port_v2" "port" {
  name           = "${var.instance_name}-port"
  network_id     = openstack_networking_network_v2.network.id
  admin_state_up = true
  security_group_ids = [openstack_networking_secgroup_v2.secgroup.id]

  fixed_ip {
    subnet_id = openstack_networking_subnet_v2.subnet.id
  }
}

# Instance
resource "openstack_compute_instance_v2" "server" {
  name        = var.instance_name
  image_id    = data.openstack_images_image_v2.ubuntu.id
  flavor_name = var.instance_flavor
  key_pair    = openstack_compute_keypair_v2.keypair.name

  network {
    port = openstack_networking_port_v2.port.id
  }

  user_data = <<-EOF
    #cloud-config
    package_update: true
    packages: [python3, python3-pip]
  EOF

  tags = ["cv", "consort"]

  metadata = {
    project    = "cv-consort"
    managed_by = "terraform"
  }
}

# IP publique
resource "openstack_networking_floatingip_v2" "fip" {
  pool = var.external_network
}

resource "openstack_networking_floatingip_associate_v2" "fip_assoc" {
  floating_ip = openstack_networking_floatingip_v2.fip.address
  port_id     = openstack_networking_port_v2.port.id
}

# Provisioning Ansible
resource "null_resource" "ansible" {
  count = var.run_ansible ? 1 : 0

  depends_on = [
    openstack_networking_floatingip_associate_v2.fip_assoc,
    openstack_dns_recordset_v2.openstack
  ]

  # Attendre que l'instance soit vraiment prête
  provisioner "local-exec" {
    command = "sleep 30"
  }

  # Attendre que SSH soit disponible
  provisioner "remote-exec" {
    inline = ["echo 'SSH ready'"]
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file(pathexpand(var.ssh_private_key_path))
      host        = openstack_networking_floatingip_v2.fip.address
      timeout     = "10m"
    }
  }

  # Générer inventaire et lancer Ansible
  provisioner "local-exec" {
    working_dir = "${path.module}/../ansible"
    command     = <<-EOT
      echo '[cv_servers]' > inventory.ini
      echo '${openstack_networking_floatingip_v2.fip.address} ansible_user=ubuntu ansible_ssh_private_key_file=${abspath(var.ssh_private_key_path)}' >> inventory.ini
      ansible-playbook -i inventory.ini playbook.yml
    EOT
  }
}

# DNS via Designate
# La zone consort.chevassut.ch existe déjà (créée manuellement)
data "openstack_dns_zone_v2" "zone" {
  name = "consort.chevassut.ch."
}

resource "openstack_dns_recordset_v2" "openstack" {
  zone_id     = data.openstack_dns_zone_v2.zone.id
  name        = "os-apply.consort.chevassut.ch."
  description = "CV site"
  ttl         = 300
  type        = "A"
  records     = [openstack_networking_floatingip_v2.fip.address]
}
