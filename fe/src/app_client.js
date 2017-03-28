var PROTO_PATH = __dirname + '/../protos/app.proto';

var HOST = process.env.APP_RPC_HOST || 'localhost';
var PORT = process.env.APP_RPC_PORT || '34000';

var grpc = require('grpc');
var proto = grpc.load(PROTO_PATH).app;
var handshakeClient = new proto.HandshakeService(HOST + ":" + PORT,
    grpc.credentials.createInsecure());
var appClient = new proto.AppService(HOST + ":" + PORT,
    grpc.credentials.createInsecure());

// Jukebox proto fields
const SEED_TRACKS = 'seedTracks';
const AUDIO_FEATURE_PARAMS = 'audioFeatureParams';
const ACCESS_TOKEN = 'accessToken';
const USER_ID = 'userId';
const PLAYLIST_ID = 'playlistId';
const PLAYLIST_URI = 'playlistUri';

/*
 * Stub for the GetInitialJukeboxState RPC call
 */
function getInitialJukeboxState(accessToken, userId, callback) {
  authCreds = {
    [ACCESS_TOKEN] : accessToken, 
    [USER_ID] : userId
  };

  appClient.getInitialJukeboxState(authCreds, callback);
}

/*
 * Stub for the RegisterUser RPC call
 */
function registerUser(accessToken, callback) {
  authCreds = {
    [ACCESS_TOKEN] : accessToken
  };

  appClient.registerUser(authCreds, callback);
}

/*
 * Stub for the GenerateJukebox RPC call
 */
function generateJukebox(accessToken, userId, 
    audioFeatureParams, seedTracks, callback) {

  jukeboxState = {
    [ACCESS_TOKEN] : accessToken,
    [USER_ID] : userId,
    [AUDIO_FEATURE_PARAMS] : audioFeatureParams,
    [SEED_TRACKS] : null 
  };

  appClient.generateJukebox(jukeboxState, callback);
}

/*
 * Stub for the Shake RPC call
 */
function shake(user, callback) {
  handshakeClient.shake({name: user}, callback);
}

/*
 * List of exported entities from the app_client module
 */
module.exports = {
  shake: shake,
  getInitialJukeboxState: getInitialJukeboxState,
  registerUser: registerUser
};

/*
 * Example usage of RPC calls
 */
function main() {
  console.log("Contacting " + HOST + ":" + PORT);

  // Set access token for example requests
  accessToken = 'BQDATAzOF95WHaREvT4sHIHf9pe0uw9NVfJikt2FFvoBvtwz4BDI7pqDV0u4k3c6YzN5D0D6WqdG1lI_D_6PADlRrlIYJk9M5G2RtK5u7MTR8Excmw08-pLjlmDZXb_exQy5AJ0kvVRmQlrPQdyhMiD-A5VnILi-ZxdiTKOxNJaOdWLcRLhRM4jAG0hluCZhsA'; 
	userId = '124907240';
  
  // Create template callback
  callback = function(err, resp) {
    if (err) console.log("Call did not succeed: " + err);
    else console.log("Call succeeded: " + JSON.stringify(resp));
  };

  /*
   *  Example usage of registerUser()
   *
   * registerUser(accessToken, callback);
   */

  /*
   * Example usage of getInitialJukeboxState()
   *
   * getInitialJukeboxState(accessToken, userId, callback);
   */
  
  generateJukebox(accessToken, userId, {'energy': .6}, ['6VwBbL8CzPiC4QV66ay7oR'], callback);
}

if (require.main === module) main();

