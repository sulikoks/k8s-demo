# Your machine must exist: node, npm, wget, docker
set -o allexport
source .env
set +o allexport

#echo "${DOCKERHUB_PASSWORD}" | docker login --username "$DOCKERHUB_USERNAME" --password-stdin "$DOCKERHUB_HOST"

VERSION=$(npm run version --silent)
IMAGE=sulikoks/k8s-demo
CURRENT_TAG=v"$VERSION"

IMAGE_NAME="$IMAGE":"$CURRENT_TAG"

TAGS=$(wget -q https://"$DOCKERHUB_HOST"/v1/repositories/"$IMAGE"/tags -O -  | sed -e 's/[][]//g' -e 's/"//g' -e 's/ //g' | tr '}' '\n'  | awk -F: '{print $3}')

echo $TAGS

if [[ "$TAGS" == *"$CURRENT_TAG"* ]];
then
  echo "Already exists: $IMAGE_NAME"
else
  echo "Not exists: $IMAGE_NAME"
  docker build -t "$IMAGE_NAME" .
  docker push "$IMAGE_NAME"
  echo "Pushed: $IMAGE_NAME"
fi

#docker search --limit=5 sulikoks/k8s-demo



