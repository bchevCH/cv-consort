# Outputs Terraform

output "instance_id" {
  value = openstack_compute_instance_v2.server.id
}

output "floating_ip" {
  value = openstack_networking_floatingip_v2.fip.address
}

output "private_ip" {
  value = openstack_compute_instance_v2.server.access_ip_v4
}

output "ssh_command" {
  value = "ssh ubuntu@${openstack_networking_floatingip_v2.fip.address}"
}

output "site_url" {
  value = "https://${var.domain_name}"
}

output "dns_zone_id" {
  value = data.openstack_dns_zone_v2.zone.id
}

output "summary" {
  value = <<-EOT

    ✓ Déploiement terminé !

    IP:  ${openstack_networking_floatingip_v2.fip.address}
    URL: https://${var.domain_name}
    SSH: ssh ubuntu@${openstack_networking_floatingip_v2.fip.address}

    Ansible a été exécuté automatiquement (run_ansible=true)
    Pour relancer manuellement: cd ../ansible && ansible-playbook -i inventory.ini playbook.yml

  EOT
}
