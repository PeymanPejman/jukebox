var appClient = require('./app_client.js');

const PORT = process.env.FE_HTTP_PORT || '8080';
const express = require('express');
const httpServer = express();

/*  
 * Handle HTTP traffic for GET on '/'
 */
httpServer.get('/', function (req, res) {
  // Send an Handshake RPC to app service
  appClient.shake('Pedram', function (err, rpcResp) {
    if (err) { 
      console.log("Error sending RPC")
      res.send("Error sending RPC\n");
    }
    else {
      console.log("Received message from app: " + rpcResp.message); 
      res.send(rpcResp.message + "\n");
    }
  });
})

/*
 * Bind to the specified port
 */
httpServer.listen(PORT, function () {
  console.log('Jukebox is running on port ' + PORT)
})

