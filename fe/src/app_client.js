var PROTO_PATH = __dirname + '/../../protos/app.proto';
var IP_PORT = 'localhost:50051';

var grpc = require('grpc');
var proto = grpc.load(PROTO_PATH).app;

function main() {
  var client = new proto.HandshakeService(IP_PORT,
      grpc.credentials.createInsecure());

  var user = 'Pedram';
  client.shake({name: user}, function(err, response) {
    if (response)
      console.log('Received message: ', response.message);
    else
      console.log('Could not execute RPC');
  });

}

if (require.main === module) main();
