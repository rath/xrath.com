#!/bin/sh
set -eu

: "${XRATH_ECR_URI:?XRATH_ECR_URI must be set}"

aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin "$XRATH_ECR_URI"

ECR_PATH="$XRATH_ECR_URI/hwang/xrath"
docker buildx build \
  --platform linux/amd64 \
  --tag "$ECR_PATH:latest" \
  --push \
  -f Dockerfile \
  .
