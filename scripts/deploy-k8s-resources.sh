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

# Optional variables with defaults
REPLICAS="${REPLICAS:-1}"
GITHUB_USERNAME="${GITHUB_USERNAME:-stevendejongnl}"
COMMIT_SHA="${COMMIT_SHA:-unknown}"

echo "=========================================="
echo "Deploying Kubernetes resources"
echo "=========================================="
echo "Namespace: $NAMESPACE"
if [ -n "$CONTAINER_IMAGE" ]; then
  echo "Deployment: $DEPLOYMENT_NAME (color: $DEPLOYMENT_COLOR, replicas: $REPLICAS)"
  echo "Image: $CONTAINER_IMAGE"
fi
echo "Service: $SERVICE_NAME (port $SERVICE_PORT → $CONTAINER_PORT)"
echo "Ingress: $INGRESS_NAME (domain $DOMAIN)"
echo "Kubernetes API: $KUBERNETES_API_URL"
echo ""

# Enable debug mode with DEBUG=1
if [ "${DEBUG:-0}" = "1" ]; then
  echo "DEBUG MODE ENABLED"
  set -x
fi

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
    Deployment)
      api_path_base="/apis/apps/v1/namespaces/$NAMESPACE/deployments"
      ;;
    *)
      echo "❌ Unknown resource kind: $resource_kind"
      return 1
      ;;
  esac

  # Check if resource exists
  if resource_exists "$api_path_base/$resource_name"; then
    echo "  Updating $resource_kind: $resource_name"
    response=$(curl -s -w "\n%{http_code}" -X PATCH \
      -H "Authorization: Bearer $KUBERNETES_TOKEN" \
      -H "Content-Type: application/merge-patch+json" \
      -k \
      -d "$resource_json" \
      "$KUBERNETES_API_URL$api_path_base/$resource_name" 2>&1)
    http_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | head -n -1)

    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
      echo "  ✓ $resource_kind updated (HTTP $http_code)"
    else
      echo "  ❌ PATCH failed with HTTP $http_code"
      echo "  Response: $body"
      return 1
    fi
  else
    echo "  Creating $resource_kind: $resource_name"
    response=$(curl -s -w "\n%{http_code}" -X POST \
      -H "Authorization: Bearer $KUBERNETES_TOKEN" \
      -H "Content-Type: application/json" \
      -k \
      -d "$resource_json" \
      "$KUBERNETES_API_URL$api_path_base" 2>&1)
    http_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | head -n -1)

    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
      echo "  ✓ $resource_kind created (HTTP $http_code)"
    else
      echo "  ❌ POST failed with HTTP $http_code"
      echo "  Response: $body"
      return 1
    fi
  fi
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

# Deploy Deployment (only if CONTAINER_IMAGE is provided)
if [ -n "$CONTAINER_IMAGE" ]; then
  echo "Deploying Deployment..."
  deployment_json=$(cat <<EOF
{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "$DEPLOYMENT_NAME",
    "namespace": "$NAMESPACE",
    "labels": {"app": "$APP_NAME", "color": "$DEPLOYMENT_COLOR"}
  },
  "spec": {
    "replicas": $REPLICAS,
    "selector": {"matchLabels": {"app": "$APP_NAME", "color": "$DEPLOYMENT_COLOR"}},
    "template": {
      "metadata": {
        "labels": {"app": "$APP_NAME", "color": "$DEPLOYMENT_COLOR"},
        "annotations": {"redeploy-hash": "$COMMIT_SHA"}
      },
      "spec": {
        "containers": [{
          "name": "app",
          "image": "$CONTAINER_IMAGE",
          "imagePullPolicy": "Always",
          "ports": [{"containerPort": $CONTAINER_PORT}],
          "env": [
            {"name": "GITHUB_USERNAME", "value": "$GITHUB_USERNAME"},
            {
              "name": "GITHUB_TOKEN",
              "valueFrom": {
                "secretKeyRef": {
                  "name": "github-token",
                  "key": "token",
                  "optional": true
                }
              }
            }
          ],
          "livenessProbe": {
            "httpGet": {"path": "/api/health", "port": $CONTAINER_PORT},
            "initialDelaySeconds": 10,
            "periodSeconds": 30,
            "timeoutSeconds": 5
          },
          "readinessProbe": {
            "httpGet": {"path": "/api/health", "port": $CONTAINER_PORT},
            "initialDelaySeconds": 5,
            "periodSeconds": 10,
            "timeoutSeconds": 5
          }
        }]
      }
    }
  }
}
EOF
)
  apply_resource "$deployment_json"
  echo ""
fi

echo "=========================================="
echo "Verifying deployed resources..."
echo "=========================================="

# Verify Service
echo "Checking Service: $SERVICE_NAME"
service_status=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $KUBERNETES_TOKEN" \
  -k \
  "$KUBERNETES_API_URL/api/v1/namespaces/$NAMESPACE/services/$SERVICE_NAME" 2>&1)
if [ "$service_status" = "200" ]; then
  echo "  ✓ Service exists (HTTP $service_status)"
else
  echo "  ❌ Service not found (HTTP $service_status)"
fi

# Verify Ingress
echo "Checking Ingress: $INGRESS_NAME"
ingress_status=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $KUBERNETES_TOKEN" \
  -k \
  "$KUBERNETES_API_URL/apis/networking.k8s.io/v1/namespaces/$NAMESPACE/ingresses/$INGRESS_NAME" 2>&1)
if [ "$ingress_status" = "200" ]; then
  echo "  ✓ Ingress exists (HTTP $ingress_status)"
else
  echo "  ❌ Ingress not found (HTTP $ingress_status)"
fi

# Verify Deployment if created
if [ -n "$CONTAINER_IMAGE" ]; then
  echo "Checking Deployment: $DEPLOYMENT_NAME"
  deployment_status=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: Bearer $KUBERNETES_TOKEN" \
    -k \
    "$KUBERNETES_API_URL/apis/apps/v1/namespaces/$NAMESPACE/deployments/$DEPLOYMENT_NAME" 2>&1)
  if [ "$deployment_status" = "200" ]; then
    echo "  ✓ Deployment exists (HTTP $deployment_status)"
  else
    echo "  ❌ Deployment not found (HTTP $deployment_status)"
  fi
fi

echo ""
echo "=========================================="
echo "✓ Kubernetes resources deployment complete"
echo "=========================================="
