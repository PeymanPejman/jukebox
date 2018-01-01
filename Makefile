GEN_PROTOS=./jb-gen/src/protos/

# Default entrypoint
all: build

# Builds protos for Frontend
build-fe: .FORCE
	cp -rf protos jb-fe

# Builds protos for Application
build-app: .FORCE
	cp -rf protos jb-app

# Builds protos for Genius
build-gen: .FORCE
	python3 -m grpc_tools.protoc -I ./protos --python_out=$(GEN_PROTOS) \
	--grpc_python_out=$(GEN_PROTOS) ./protos/genius.proto

# Builds protos for Yoda
build-yoda: .FORCE	
<<<<<<< 6a6bfa9d9d990f7bbc856e8152d531972ad89481
	cp -rf protos jb-yoda
=======
	cp -rf protos yoda
>>>>>>> yoda java

# Builds protos for all services
build: protos

# Builds proto files for app, fe and yoda
# Compiles genius protos and marks it as a python package directory
protos: .FORCE
	echo fe jb-app jb-gen jb-yoda | xargs -n 1 cp -rf protos

# Creates a Docker network for local integration
network:
	sudo ./bash/network.sh

# Cleans local files
clean:
	rm -rf */protos */node_modules

# To be used to force execution of a recipe
.FORCE:
