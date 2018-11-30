#!/usr/bin/env bash

echo "$1" | tr -d '\r' > ~/.ssh/id_rsa

shift 1

exec "$@"
