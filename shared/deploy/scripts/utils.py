import os


def isSwarmNode(conn):
    result = conn.run("docker info | grep Swarm | sed 's/Swarm: //g'")
    return "inactive" not in result.stdout


def initSwarm(conn):
    if (isSwarmNode(conn)):
        conn.run("echo 'Swarm is already running'")
    else:
        conn.run("docker swarm init --advertise-addr " +
                 os.environ['TARGET_HOST'])
