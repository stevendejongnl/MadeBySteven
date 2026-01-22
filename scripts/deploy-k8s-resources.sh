#!/bin/bash
set -e

# Deploy Kubernetes resources (Service and Ingress) from templates
# Usage: ./deploy-k8s-resources.sh
# Environment variables required:
#   KUBERNETES_TOKEN: Bearer token for Kubernetes API
#   KUBERNETES_API_URL: Base URL for Kubernetes API
#   NAMESPACE: Kubernetes namespace
#   APP_NAME: Application name (label selector)
#   SERVICE_NAME: Name of the Service resource
#   SERVICE_PORT: Port exposed by the Service
#   CONTAINER_PORT: Port the container listens on
#   DEPLOYMENT_COLOR: Color label (blue/green)
#   INGRESS_NAME: Name of the Ingress resource
#   DOMAIN: Domain name (without www prefix)

# Validate environment variables
required_vars=(
  "KUBERNETES_TOKEN"
  "KUBERNETES_API_URL"
  "NAMESPACE"
  "APP_NAME"
  "SERVICE_NAME"
  "SERVICE_PORT"
  "CONTAINER_PORT"
  "DEPLOYMENT_COLOR"
  "INGRESS_NAME"
  "DOMAIN"
)

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌ Missing required environment variable: $var"
    exit 1
  fi
done

echo "=========================================="
echo "Deploying Kubernetes resources"
echo "=========================================="
echo "Namespace: $NAMESPACE"
echo "Service: $SERVICE_NAME (port $SERVICE_PORT → $CONTAINER_PORT)"
echo "Ingress: $INGRESS_NAME (domain $DOMAIN)"
echo "Deployment color: $DEPLOYMENT_COLOR"
echo ""

# Function to check if resource exists
resource_exists() {
  local api_path=$1
  local http_code=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: Bearer $KUBERNETES_TOKEN" \
    -k \
    "$KUBERNETES_API_URL$api_path" 2>/dev/null)
  [ "$http_code" = "200" ]
}

# Function to apply resource (create or update)
apply_resource() {
  local resource_json=$1
  local resource_kind=$(echo "$resource_json" | jq -r '.kind')
  local resource_name=$(echo "$resource_json" | jq -r '.metadata.name')
  local api_path_base=""

  case "$resource_kind" in
    Service)
      api_path_base="/api/v1/namespaces/$NAMESPACE/services"
      ;;
    Ingress)
      api_path_base="/apis/networking.k8s.io/v1/namespaces/$NAMESPACE/ingresses"
      ;;
    *)
      echo "❌ Unknown resource kind: $resource_kind"
      return 1
      ;;
  esac

  # Check if resource exists
  if resource_exists "$api_path_base/$resource_name"; then
    echo "  Updating $resource_kind: $resource_name"
    curl -X PATCH \
      -H "Authorization: Bearer $KUBERNETES_TOKEN" \
      -H "Content-Type: application/merge-patch+json" \
      -k \
      -d "$resource_json" \
      "$KUBERNETES_API_URL$api_path_base/$resource_name" \
      -o /dev/null -s \
      2>/dev/null || {
        echo "  ⚠️  PATCH failed, resource may not exist"
        return 1
      }
  else
    echo "  Creating $resource_kind: $resource_name"
    curl -X POST \
      -H "Authorization: Bearer $KUBERNETES_TOKEN" \
      -H "Content-Type: application/json" \
      -k \
      -d "$resource_json" \
      "$KUBERNETES_API_URL$api_path_base" \
      -o /dev/null -s \
      2>/dev/null || {
        echo "  ⚠️  POST failed, could not create resource"
        return 1
      }
  fi

  echo "  ✓ $resource_kind deployed"
}

# Deploy Service
echo "Deploying Service..."
service_json=$(cat <<EOF
{
  "apiVersion": "v1",
  "kind": "Service",
  "metadata": {
    "name": "$SERVICE_NAME",
    "namespace": "$NAMESPACE",
    "labels": {"app": "$APP_NAME"}
  },
  "spec": {
    "type": "ClusterIP",
    "selector": {"app": "$APP_NAME", "color": "$DEPLOYMENT_COLOR"},
    "ports": [{"protocol": "TCP", "port": $SERVICE_PORT, "targetPort": $CONTAINER_PORT}]
  }
}
EOF
)
apply_resource "$service_json"

echo ""

# Deploy Ingress
echo "Deploying Ingress..."
ingress_json=$(cat <<EOF
{
  "apiVersion": "networking.k8s.io/v1",
  "kind": "Ingress",
  "metadata": {
    "name": "$INGRESS_NAME",
    "namespace": "$NAMESPACE",
    "annotations": {"nginx.ingress.kubernetes.io/backend-protocol": "HTTP"}
  },
  "spec": {
    "ingressClassName": "nginx",
    "rules": [
      {
        "host": "www.$DOMAIN",
        "http": {
          "paths": [{
            "path": "/",
            "pathType": "Prefix",
            "backend": {"service": {"name": "$SERVICE_NAME", "port": {"number": $SERVICE_PORT}}}
          }]
        }
      },
      {
        "host": "$DOMAIN",
        "http": {
          "paths": [{
            "path": "/",
            "pathType": "Prefix",
            "backend": {"service": {"name": "$SERVICE_NAME", "port": {"number": $SERVICE_PORT}}}
          }]
        }
      }
    ]
  }
}
EOF
)
apply_resource "$ingress_json"

echo ""
echo "=========================================="
echo "✓ Kubernetes resources deployed successfully"
echo "=========================================="
