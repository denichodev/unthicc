from fabric import Connection

# SCRIPTS_ROOT = "/usr/app/scripts"
SCRIPTS_ROOT = "/usr/app/scripts"

c = Connection("root@178.128.214.2")

# Will return error if already initialized, just ignore the errors for now.
c.run('docker swarm init')

c.put(SCRIPTS_ROOT + "/docker-compose.yml", remote="/root/")
c.put(SCRIPTS_ROOT + "/docker-compose.prod.yml", remote="/root/")

result = c.run(
    """
    docker stack deploy
        --compose-file docker-compose.yml
        --compose-file docker-compose.prod.yml 
        unthicc
    """
)

print('Scripts done, printing the result:')
print(result)
