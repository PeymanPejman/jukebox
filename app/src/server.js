var PROTO_PATH = __dirname + '/../protos/app.proto';

var PORT = process.env.APP_RPC_PORT || "34000";
var IP = process.env.APP_RPC_HOST || "0.0.0.0";
var grpc = require('grpc');
var proto = grpc.load(PROTO_PATH).app;

/**
 * Implements the Shake RPC method
 */
function shake(call, callback) {
  console.log("Request received with name: " + call.request.name);
  callback(null, {message: 'Successful handshake with ' + call.request.name}); 
}


/* Starts an RPC server that receives requests for the Handshake service at the
 * specified port
 */
function main() {
  // Connect to 

  // Start up RPC server
  var server = new grpc.Server();
  server.addProtoService(proto.HandshakeService.service, {shake: shake});
  server.bind(IP + ":" + PORT, grpc.ServerCredentials.createInsecure());
  server.start();
  console.log("RPC Server starting at " + IP + ":" + PORT);
}

/*
 * If run as a scrip, start the server
 */
if (require.main === module) {
  main();
}
