all: build
build: protos network

protos:
	echo fe app | xargs -n 1 cp -rf protos
network:
	sudo ./bash/network.sh
