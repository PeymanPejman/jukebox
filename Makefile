all: build

build: protos

protos: .FORCE
	echo fe app | xargs -n 1 cp -rf protos

network:
	sudo ./bash/network.sh

clean:
	rm -rf */protos

.FORCE:
