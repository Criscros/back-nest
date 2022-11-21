#!/bin/bash
NAME_IMAGE=$(node -pe 'JSON.parse(process.argv[1])["name-repository"]' "$(cat package.json)")
VERSION=""
if [ -z $1 ]; then
  VERSION=$(aws ecr describe-images --repository-name "$NAME_IMAGE" --output text --query 'sort_by(imageDetails,& imagePushedAt)[*].imageTags[*]' | tr '\t' '\n' | tail -1)
  VERSION="$(echo "$VERSION" | sed 's/"//g')"
  re='^[0-9]+$'
  if ! [[ $VERSION =~ $re ]]; then
      VERSION=1
  else
    VERSION=$((VERSION + 1))
  fi
else
  VERSION=$1
fi
echo "$VERSION"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 754234134912.dkr.ecr.us-east-1.amazonaws.com
docker build -t "$NAME_IMAGE" .
docker tag "$NAME_IMAGE":latest 754234134912.dkr.ecr.us-east-1.amazonaws.com/"$NAME_IMAGE":latest
docker tag "$NAME_IMAGE":latest 754234134912.dkr.ecr.us-east-1.amazonaws.com/"$NAME_IMAGE":"$VERSION"
docker push 754234134912.dkr.ecr.us-east-1.amazonaws.com/"$NAME_IMAGE":"$VERSION"
docker push 754234134912.dkr.ecr.us-east-1.amazonaws.com/"$NAME_IMAGE":latest
