var PROTO_PATH = __dirname + '/../protos/app.proto';

var HOST = process.env.APP_RPC_HOST || 'localhost';
var PORT = process.env.APP_RPC_PORT || '34000';

var grpc = require('grpc');
var proto = grpc.load(PROTO_PATH).app;
var client = new proto.HandshakeService(HOST + ":" + PORT,
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
  console.log("Contacting " + HOST + ":" + PORT);
  var user = 'Pedram';
  shake(user, function(err, resp){
  if (err) console.log("some tin wong: " + err);
  else  console.log(resp.message);
  });
}

if (require.main === module) main();

