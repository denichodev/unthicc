
def isSwarmNode(conn):
    result = conn.run("docker info | grep Swarm | sed 's/Swarm: //g'")
    return result == "active"


def initSwarm(conn):
    if (isSwarmNode(conn)):
        conn.run("docker swarm init")
