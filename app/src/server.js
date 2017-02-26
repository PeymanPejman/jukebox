var PROTO_PATH = __dirname + '/../../protos/app.proto';

//var PORT = process.env.PORT;
var IP_PORT = '0.0.0.0:50051';
var grpc = require('grpc');
var proto = grpc.load(PROTO_PATH).app;

/**
 * Implements the Shake RPC method
 */
function shake(call, callback) {
  callback(null, {message: 'Successful handshake with ' + call.request.name}); 
}


/* Starts an RPC server that receives requests for the Handshake service at the
 * specified port
 */
function main() {
  var server = new grpc.Server();
  server.addProtoService(proto.HandshakeService.service, {shake: shake});
  server.bind(IP_PORT, grpc.ServerCredentials.createInsecure());
  server.start();
}

/*
 * If run as a scrip, start the server
 */
if (require.main === module) {
  main();
}
