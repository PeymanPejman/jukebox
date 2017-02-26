var PROTO_PATH = __dirname + '/../../protos/app.proto';
var IP = 'localhost';
var PORT = process.env.APP_RPC_PORT;

var grpc = require('grpc');
var proto = grpc.load(PROTO_PATH).app;
var client = new proto.HandshakeService(IP + ":" + PORT,
    grpc.credentials.createInsecure());

/*
 * Stub for the RPC client
 */
function shake(user, callback) {
  client.shake({name: user}, callback);
}

/*
 * List of exported entities from the app_client module
 */
module.exports = {
  shake: shake
};

function main() {
  var user = 'Pedram';
  shake(user);
}

if (require.main === module) main();

