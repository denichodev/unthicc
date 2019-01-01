from fabric import Connection
from utils import initSwarm

SCRIPTS_ROOT = "/usr/app/scripts"

c = Connection("root@" + os.environ['TARGET_HOST'])

# Will return error if already initialized, just ignore the errors for now.
initSwarm(c)

c.put(SCRIPTS_ROOT + "/docker-compose.yml", remote="/root/")
c.put(SCRIPTS_ROOT + "/docker-compose.prod.yml", remote="/root/")

result = c.run(
    'docker stack deploy \
    --compose-file docker-compose.yml \
    --compose-file docker-compose.prod.yml \
    unthicc'
)

print('Scripts done, printing the result:')
print(result)
