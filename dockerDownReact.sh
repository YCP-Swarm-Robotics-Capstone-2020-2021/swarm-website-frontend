#!/bin/bash
docker rm -f swarmreact
docker rmi swarmreact:latest
sh destroyNetwork.sh