#!/bin/bash
echo -e "\n"NODE_ENV: $NODE_ENV

if [ ! -n $NODE_ENV ] || [ -z $NODE_ENV ]; then
	if [ $# != 1 ]; then
		echo -e "환경변수 NODE_ENV 설정 또는 \n" $0 "development or production"
		exit 0;
	fi	
fi

config="pm2-config.json"
env=$NODE_ENV

if [ -n $1 ] && [ ! -z $1 ]; then  
	env=$1
	echo "SET NODE_ENV: " $env
fi

if [ $env != "production" ] && [ $env != "development" ]; then
	echo -e "NODE_ENV는 development 또는 production 입니다. \n" 
	echo -e "환경변수 NODE_ENV 설정 또는 " 
	echo -e "./start.sh development or production \n" 
	exit 0;
fi

if [ ! -f $config ]; then
	echo config file is not found: $config
	exit 0;
fi
echo "명령어 실행: pm2 start "$config "--env "$env

pm2 start $config --env $env
