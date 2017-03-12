var PROTO_PATH = __dirname + '/../protos/app.proto';

var HOST = process.env.APP_RPC_HOST || 'localhost';
var PORT = process.env.APP_RPC_PORT || '34000';

var grpc = require('grpc');
var proto = grpc.load(PROTO_PATH).app;
var handshakeClient = new proto.HandshakeService(HOST + ":" + PORT,
    grpc.credentials.createInsecure());
var appClient = new proto.AppService(HOST + ":" + PORT,
    grpc.credentials.createInsecure());

/*
 * Stub for the RPC client
 */
function getInitialJukeboxState(token, callback) {
  appClient.getInitialJukeboxState({access_token: token}, callback);
}

/*
 * Stub for the RPC client
 */
function shake(user, callback) {
  handshakeClient.shake({name: user}, callback);
}

/*
 * List of exported entities from the app_client module
 */
module.exports = {
  shake: shake,
  getInitialJukeboxState: getInitialJukeboxState
};

/*
 * Example usage of getInitialJukeboxState call
 */
function main() {
  console.log("Contacting " + HOST + ":" + PORT);

  var access_token = "";

  getInitialJukeboxState(access_token, function(err, resp) {
    if (err) console.log("GetInitialJukeboxState did not succeed: " + err);
    else console.log("GetInitialJukeboxState succeeded: " + JSON.stringify(resp));
  });
}

if (require.main === module) main();

