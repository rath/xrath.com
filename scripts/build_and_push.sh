#!/bin/sh
set -eu

: "${XRATH_ECR_URI:?XRATH_ECR_URI must be set}"

# Write the ECR auth directly into a throwaway docker config to bypass the
# macOS keychain credential helper, which can fail with errSecDuplicateItem
# (-25299). Skipping `docker login` entirely avoids the helper code path.
DOCKER_CONFIG="$(mktemp -d)"
export DOCKER_CONFIG
trap 'rm -rf "$DOCKER_CONFIG"' EXIT

# Preserve access to CLI plugins (notably buildx) installed under the user's
# real docker config dir, since they are not auto-discovered from $DOCKER_CONFIG.
if [ -d "$HOME/.docker/cli-plugins" ]; then
  ln -s "$HOME/.docker/cli-plugins" "$DOCKER_CONFIG/cli-plugins"
fi

ECR_PASSWORD="$(aws ecr get-login-password --region eu-central-1)"
ECR_AUTH="$(printf 'AWS:%s' "$ECR_PASSWORD" | base64 | tr -d '\n')"
cat >"$DOCKER_CONFIG/config.json" <<EOF
{"auths":{"$XRATH_ECR_URI":{"auth":"$ECR_AUTH"}}}
EOF

ECR_PATH="$XRATH_ECR_URI/hwang/xrath"
docker buildx build \
  --platform linux/amd64 \
  --tag "$ECR_PATH:latest" \
  --push \
  -f Dockerfile \
  .
