# Kubernetes Deployment Templates

This directory contains templates for deploying the Made by Steven application to Kubernetes.

## Overview

The deployment system uses:
- **Templates**: YAML templates with environment variable substitution in `templates/`
- **Deployment Script**: `scripts/deploy-k8s-resources.sh` - handles idempotent creation/updates
- **GitHub Actions**: Integration in `.github/workflows/deploy.yml`

## Key Features

✅ **Idempotent**: Safe to run multiple times - checks if resources exist before creating/updating
✅ **Template-based**: Centralized configuration in version-controlled templates
✅ **Port-agnostic**: Easily change ports by updating environment variables
✅ **Color-aware**: Supports blue-green deployments with color labels
✅ **No manual steps**: Fully automated in GitHub Actions

## Templates

### `templates/service.yaml`
Kubernetes Service resource that exposes the application internally.

**Variables**:
- `${SERVICE_NAME}` - Name of the Service (e.g., `madebysteven`)
- `${NAMESPACE}` - Kubernetes namespace (e.g., `madebysteven`)
- `${APP_NAME}` - Application label (e.g., `madebysteven`)
- `${DEPLOYMENT_COLOR}` - Color label for blue-green: `blue` or `green`
- `${SERVICE_PORT}` - Port exposed by Service (e.g., `8000`)
- `${CONTAINER_PORT}` - Port the container listens on (e.g., `8000`)

### `templates/ingress.yaml`
Kubernetes Ingress resource that routes external traffic via nginx.

**Variables**:
- `${INGRESS_NAME}` - Name of the Ingress (e.g., `madebysteven`)
- `${NAMESPACE}` - Kubernetes namespace (e.g., `madebysteven`)
- `${SERVICE_NAME}` - Name of the Service to route to
- `${SERVICE_PORT}` - Service port to route to
- `${DOMAIN}` - Base domain without www (e.g., `madebysteven.nl`)
  - Creates routes for both `www.${DOMAIN}` and `${DOMAIN}`

## Deployment Script

`scripts/deploy-k8s-resources.sh` - Deploys Service and Ingress resources

### Usage

```bash
./scripts/deploy-k8s-resources.sh
```

### Required Environment Variables

```bash
KUBERNETES_TOKEN              # Bearer token for API auth
KUBERNETES_API_URL            # Base URL of Kubernetes API
NAMESPACE                      # Kubernetes namespace
APP_NAME                       # Application name (label selector)
SERVICE_NAME                   # Service resource name
SERVICE_PORT                   # Service port
CONTAINER_PORT                 # Container port
DEPLOYMENT_COLOR               # blue or green (for label selector)
INGRESS_NAME                   # Ingress resource name
DOMAIN                         # Base domain (without www)
```

### Behavior

1. **Checks if resources exist** using HTTP status codes
2. **Creates** resources if they don't exist (POST)
3. **Updates** resources if they exist (PATCH with merge strategy)
4. **Handles both scenarios** - safe to run multiple times

### Example: Local Testing

```bash
export KUBERNETES_TOKEN="your-token"
export KUBERNETES_API_URL="https://your-api-url"
export NAMESPACE="madebysteven"
export APP_NAME="madebysteven"
export SERVICE_NAME="madebysteven"
export SERVICE_PORT="8000"
export CONTAINER_PORT="8000"
export DEPLOYMENT_COLOR="blue"
export INGRESS_NAME="madebysteven"
export DOMAIN="madebysteven.nl"

bash scripts/deploy-k8s-resources.sh
```

## GitHub Actions Integration

The workflow in `.github/workflows/deploy.yml` calls the script automatically:

```yaml
- name: Deploy Service and Ingress resources
  env:
    KUBERNETES_TOKEN: ${{ secrets.KUBERNETES_TOKEN }}
    KUBERNETES_API_URL: ${{ secrets.KUBERNETES_API_URL }}
    NAMESPACE: madebysteven
    APP_NAME: madebysteven
    SERVICE_NAME: madebysteven
    SERVICE_PORT: 8000
    CONTAINER_PORT: 8000
    DEPLOYMENT_COLOR: ${{ needs.determine-color.outputs.NEW_COLOR }}
    INGRESS_NAME: madebysteven
    DOMAIN: madebysteven.nl
  run: bash scripts/deploy-k8s-resources.sh
```

## Future Changes

### Changing Port Numbers

To change the service port (e.g., from 8000 to 3000):

1. Update `.github/workflows/deploy.yml`:
   ```yaml
   SERVICE_PORT: 3000
   CONTAINER_PORT: 3000
   ```

2. The deployment script will:
   - Detect the Service exists
   - Update it with the new port
   - Update the Ingress to route to the new port
   - No manual intervention needed!

### Adding New Domains

Update `DOMAIN` variable in the workflow:
```yaml
DOMAIN: yourdomain.com
```

The Ingress template automatically creates routes for both `www.yourdomain.com` and `yourdomain.com`.

### Using Different Resource Names

Update the variables in the workflow to use different names. Template-based approach makes this trivial.

## Manual Deployment (if needed)

If you need to manually deploy resources:

```bash
# Set environment variables
export KUBERNETES_TOKEN="your-token"
# ... set other variables ...

# Run the script
bash scripts/deploy-k8s-resources.sh
```

## Cleanup

To delete resources:

```bash
kubectl delete namespace madebysteven
```

## Troubleshooting

### Script fails with "Missing required environment variable"

Ensure all variables listed in "Required Environment Variables" are set.

### Resources won't update

The script uses PATCH with merge strategy. If PATCH fails, check:
1. Kubernetes API token has permissions
2. Resource name matches exactly
3. Namespace exists

### Port conflicts

If changing ports causes 502 errors:
1. Verify new port is exposed in Deployment
2. Verify new port is opened in container networking
3. Check Ingress routes to correct port

## References

- [Kubernetes Service Docs](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Kubernetes Ingress Docs](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [Nginx Ingress Controller](https://kubernetes.github.io/ingress-nginx/)
