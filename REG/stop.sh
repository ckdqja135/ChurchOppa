#!/bin/bash
echo -e "\n"NODE_ENV: $NODE_ENV
config="pm2-config.json"
if [ ! -f $config ]; then
	echo config file is not found: $config
	exit 0;
fi
echo "명령어 실행: pm2 delete "$config

pm2 delete $config 

