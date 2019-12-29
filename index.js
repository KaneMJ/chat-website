#!/usr/bin/env node

const http = require("http");
var connected_users={};

// Port Environment variable
const PORT = process.env.PORT || 5000;

// Creating the node server
const SERVER = http.createServer();

// Firing up the server on selected port
SERVER.listen(PORT);

SERVER.on("listening", () => {
    console.log("[Server]::LISTEN:%s", PORT);
});

SERVER.on('connection', (socket) => {
    socket.__fd=socket.fd;
    connected_users[socket.__fd]=socket.remoteAddress;
    console.log(connected_users);
    socket.on('close',() => {
        delete connected_users[socket.__fd];
        console.log(connected_users);
    }); 
});

// Callback function for checking connecting or error
SERVER.on("error", error => {
    throw new Error(`[Server]::ERROR:${error.message}`);
});