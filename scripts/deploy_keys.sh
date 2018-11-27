echo "service-name"
echo $SERVICE_NAME
echo "service-name"

sshpass -p $1 ssh -o StrictHostKeyChecking=no root@178.128.214.2 << ENDSSH
  docker stop $2
  docker rm $2
  docker pull registry.gitlab.com/denicho/unthicc/$2:master
  docker run --name $2 -d registry.gitlab.com/denicho/unthicc/$2:master
ENDSSH