resource "google_compute_instance" "default" {
  name         = var.instance_name
  machine_type = var.instance_type
  zone         = "${var.gcp_region}-a"

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2204-lts"
      size  = var.disk_size_gb
    }
  }

  network_interface {
    network = "default"
    access_config {}
  }

 metadata_startup_script = <<-EOT
   #!/bin/bash
   export DEBIAN_FRONTEND=noninteractive
 
   apt-get update -y
   apt-get install -y docker.io docker-compose nginx

   systemctl enable docker
   systemctl start docker

   systemctl enable nginx
   systemctl start nginx

   # optional: skip UFW if relying on GCP firewall
 EOT


  tags = ["http-server", "https-server"]
}

resource "google_compute_firewall" "default" {
  name    = "allow-http-https"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80", "443"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["http-server", "https-server"]
}

