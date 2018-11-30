from fabric import Connection

c = Connection('root@178.128.214.2')

result = c.run('docker ps')

print(result)

print('end result')
