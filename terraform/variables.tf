variable "gcp_project" {
  description = "GCP project ID"
  type        = string
}

variable "gcp_region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "gcp_credentials_file" {
  description = "Path to GCP service account JSON key file"
  type        = string
}

variable "instance_name" {
  description = "Name of the Compute Engine instance"
  type        = string
  default     = "unitconverter-vm"
}

variable "instance_type" {
  description = "Machine type for the instance"
  type        = string
  default     = "e2-medium"
}

variable "disk_size_gb" {
  description = "Boot disk size in GB"
  type        = number
  default     = 50
} 