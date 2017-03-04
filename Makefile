all: build
build: protos network

protos: FORCE
	echo fe app | xargs -n 1 cp -rf protos
network:
	sudo ./bash/network.sh
FORCE:
