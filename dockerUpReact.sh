#!/bin/bash
sh createNetwork.sh
docker build -t swarmreact .
docker run -d --name swarmreact \
    -it \
    -v /${PWD}:/app \
    -v /app/node_modules \
    -p 3000:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    --network swarm-net \
    swarmreact:latest
