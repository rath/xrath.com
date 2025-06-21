#!/bin/sh
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin $XRATH_ECR_URI

ECR_PATH=$XRATH_ECR_URI/hwang/xrath
docker buildx build --platform linux/amd64 -t xrath:latest -f Dockerfile .
docker tag xrath:latest $ECR_PATH:latest
docker push $ECR_PATH:latest

