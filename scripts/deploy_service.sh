if [ ! $CONTAINER_NAME ]
then
  echo 'Please provide $CMD_CONTAINER_NAME'
  exit
fi

#
# docker run args lul sorry for my noob shell scripting skill
CMD_CONTAINER_PUBLISH="" && [[ $CONTAINER_PUBLISH ]]  && CMD_CONTAINER_PUBLISH="--publish $CONTAINER_PUBLISH"
CMD_CONTAINER_NAME="" && [[ $CONTAINER_NAME ]]  && CMD_CONTAINER_NAME="--name $CONTAINER_NAME"
CMD_CONTAINER_NETWORK="" && [[ $CONTAINER_NETWORK ]]  && CMD_CONTAINER_NETWORK="--network $CONTAINER_NETWORK"
CMD_CONTAINER_DETACHED="" && [[ $CONTAINER_DETACHED == true ]]  && CMD_CONTAINER_DETACHED="-d"

CMD_RUN="docker run \
        ${CMD_CONTAINER_NAME} \
        ${CMD_CONTAINER_DETACHED} \
        ${CMD_CONTAINER_PUBLISH} \
        ${CMD_CONTAINER_NETWORK} \
        registry.gitlab.com/denicho/unthicc/$CONTAINER_NAME:master"

echo "Running:"
echo $CMD_RUN

sshpass -p $1 ssh -o StrictHostKeyChecking=no root@178.128.214.2 << ENDSSH
  docker network create $CONTAINER_NETWORK
  docker stop $CONTAINER_NAME
  docker rm $CONTAINER_NAME
  docker pull registry.gitlab.com/denicho/unthicc/$CONTAINER_NAME:master
  $CMD_RUN
ENDSSH