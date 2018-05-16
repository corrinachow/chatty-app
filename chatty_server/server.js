// server.js

const WebSocket = require("ws");
const express = require("express");
const SocketServer = require("ws").Server;
const uuidv1 = require("uuid/v1");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

function deltaClient(size) {
  const newMessage = {
    type: "deltaClient",
    clients: size
  };
  return newMessage;
}

function newClient(size) {
  const colours = [
      '#e67e22', // carrot
      '#2ecc71', // emerald
      '#3498db', // peter river
      '#8e44ad', // wisteria
      '#e74c3c', // alizarin
      '#1abc9c', // turquoise
      '#2c3e50', // midnight blue
    ];
  const client = {
    type: 'newClient',
    id: uuidv1(),
    name: "Anonymous",
    colour: colours[size]
  };
  return client;
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };

  // Sends change in client
  wss.broadcast(JSON.stringify(deltaClient(wss.clients.size)));
  ws.send(JSON.stringify(newClient(wss.clients.size)));

  ws.on("message", function incoming(message) {
    const newMessage = JSON.parse(message);
    newMessage.id = uuidv1();

    switch (newMessage.type) {
      case "postMessage":
        newMessage.type = "incomingMessage";
        break;
      case "postNotification":
        newMessage.type = "incomingNotification";
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }

    wss.broadcast(JSON.stringify(newMessage));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () =>
    wss.broadcast(JSON.stringify(deltaClient(wss.clients.size)))
  );
});
