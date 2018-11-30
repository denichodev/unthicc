#!/usr/bin/env bash

echo "$1" | tr -d '\r' > ~/.ssh/id_rsa

python deploy.py
