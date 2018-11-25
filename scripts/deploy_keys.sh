sshpass -p $1 ssh -o StrictHostKeyChecking=no root@178.128.214.2 <<-'ENDSSH'
  docker login -u $2 -p $3 registry.gitlab.com
  docker stop keys
  docker rm keys
  docker pull registry.gitlab.com/denicho/unthicc/keys:master
  docker run --name keys -p 80:3000 -d registry.gitlab.com/denicho/unthicc/keys:master
ENDSSH