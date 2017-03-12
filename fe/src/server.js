var appClient = require('./app_client.js');

var PORT = process.env.FE_HTTP_PORT || '8080';
var CLIENT_ID = process.env.CLIENT_ID || 'c99f31ef396d40ffb498f24d1803b17f';
var FE_HTTP_HOST = process.env.FE_HTTP_HOST || 'http://104.197.80.118';

var express = require('express');
var httpServer = express();

/*  
 * Handles HTTP.GET traffic on '/'
 * Redirects user to Spotify authroization endpoint
 */
httpServer.get('/', function (req, res) {
  // Set scopes, response type and callback uri
  var scopes = 'user-top-read';
  var response_type = 'token';
  var redirect_uri = FE_HTTP_ROOT + '/auth-callback';

  res.redirect('https://accounts.spotify.com/authorize' + 
      '?response_type=' + response_type +
      '&client_id=' + CLIENT_ID +
      '&scope=' + encodeURIComponent(scopes) +
      '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

/*  
 * Handles HTTP.GET traffic on '/auth-callback'
 * Extracts access_token, executes getInitialJukeboxState RPC
 * and returns response to user.
 */
httpServer.get('/auth-callback', function (req, res) {
  // Check if access token was supplied by Spotify API
  if (req.query.access_token) {
    var accessToken = req.query.access_token;
    console.log("Access Token: " + accessToken);

    appClient.getInitialJukeboxState(accessToken, function(err, resp) {
      if (err) { 
        res.send(err);
        console.log(err);
      }
      else {
        res.send(resp);
        console.log(resp);
      }
    });

  } else {
    console.log("access_token was not supplied.");
    // TODO: Replace with error page redirect
    res.send("access_token was not supplied."); 
  }
});

/*  
 * Handles HTTP GET traffic on '/test'
 * Tests the RPC connection to App.HandshakeService
 */
httpServer.get('/test', function (req, res) {
  // Send an Handshake RPC to app service
  appClient.shake(
      req.query.name ? req.query.name : 'Pedram', function (err, rpcResp) {
    if (err) { 
      console.log("Error sending RPC");
      res.send("Error sending RPC\n");
    }
    else {
      console.log("Received message from app: " + rpcResp.message); 
      res.send(rpcResp.message + "\n");
    }
  });
});

/*
 * Binds to the specified port
 */
httpServer.listen(PORT, function () {
  console.log('Jukebox is running on port ' + PORT + '\n');
});

