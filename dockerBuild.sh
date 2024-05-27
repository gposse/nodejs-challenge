#!/bin/sh

docker build -f Dockerfile-mysql -t workana_db --build-arg MYSQL_ROOT_PASSWORD=mysqlrootpwd --build-arg MYSQL_DATABASE=wkchallenge --build-arg MYSQL_USER=wkchallenge --build-arg MYSQL_PASSWORD=wkchallenge .
docker build -f Dockerfile-node -t workana_app .
