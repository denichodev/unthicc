FROM python:alpine

WORKDIR /usr/app/

COPY shared/deploy/requirements.txt ./

##
## Needed to install & compile fabric, we delete it after installing
##
RUN apk add --no-cache --virtual .pynacl_deps build-base libffi-dev openssl-dev ncurses-dev &&\
    pip install -r ./requirements.txt &&\
    apk del .pynacl_deps

##
## SETUP SSH requirements and runtime dependencies
##
RUN which ssh-agent || ( apk add --update --no-cache openssh-client openssl )

RUN eval $(ssh-agent -s) &&\
    mkdir -p ~/.ssh/ &&\
    chmod 700 ~/.ssh &&\
    ssh-keyscan 178.128.214.2 >> ~/.ssh/known_hosts &&\
    chmod 644 ~/.ssh/known_hosts


COPY /shared/deploy/entrypoint.sh ./

WORKDIR scripts

ENTRYPOINT ["sh", "/usr/app/entrypoint.sh"]
