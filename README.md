# Unit Converter App

A full-stack application for converting units (length, temperature, etc.) with a Python FastAPI backend, React frontend, Docker Compose orchestration, Nginx reverse proxy, and GCP deployment via Terraform and GitHub Actions.

## Features
- Convert between length and temperature units
- Select metric, from/to units, and value
- Responsive React UI
- FastAPI backend with REST API
- Dockerized and orchestrated with Docker Compose
- Nginx reverse proxy
- Infrastructure as code with Terraform (GCP Compute Engine)
- CI/CD with GitHub Actions (auto-deploy on merge to main)

## Project Structure
```
backend/      # FastAPI backend
frontend/     # React frontend
nginx/        # Nginx config
terraform/    # Terraform GCP infra
```

## Local Development

### Prerequisites
- Docker & Docker Compose
- Node.js (for local frontend dev)
- Python 3.10+ (for local backend dev)

### Run with Docker Compose
```
docker-compose up --build
```
- Frontend: http://localhost
- Backend API: http://localhost/api/convert

## GCP Deployment

### 1. Provision Infrastructure
- Install [Terraform](https://www.terraform.io/)
- Set your GCP credentials JSON path and project in `terraform/terraform.tfvars`:
```
gcp_project        = "your-gcp-project-id"
gcp_credentials_file = "/path/to/your/service-account.json"
```
- Run:
```
cd terraform
terraform init
terraform apply
```
- Note the output `instance_ip`.

### 2. Configure GitHub Secrets
- `GCP_INSTANCE_IP`: Public IP from Terraform output
- `GCP_SSH_USER`: e.g. `ubuntu`
- `GCP_SSH_KEY`: Private SSH key for the VM

### 3. CI/CD
- On push/merge to `main`, GitHub Actions will build and deploy the app to your GCP VM.

## Usage
- Open your browser to `http://VM_IP`
- Use the UI to select metric, units, and value, then convert!

---

**Enjoy your cloud-native unit converter!** 