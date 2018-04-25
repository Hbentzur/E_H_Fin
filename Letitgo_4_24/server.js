// Create server
let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function() {
  console.log('Server listening at port: ', port);
});

// Tell server where to look for files
app.use(express.static('public'));

// Create socket connection
let io = require('socket.io').listen(server);

// File System
let fs = require('fs');

// Streaming image
let ss = require('socket.io-stream');
let path = require('path');

let filename;

/* END OF SERVER SETUP */

// Clients in the output namespace
var outputs = io.of('/output');

// Listen for output clients to connect
outputs.on('connection', function(socket) {
  console.log('An output client connected: ' + socket.id);

  // Listen for this output client to disconnect
  socket.on('disconnect', function() {
    console.log("An output client has disconnected " + socket.id);
  });

  socket.on('info', function(info) {

    let i = 0;
    let j = 0;

    for (i = 0; i <= 100; i++) {
      for (j = 0; j <= 100; j++) {
        fs.rename('public/output/test' + i + '.png', 'public/output/img/' + j + 'letitgo.png',
          function(err) {
            if (err) console.log('ERROR: ' + err);
          });
      }
    }
  });

  fs.readdir('public/output/img', (err, files) => {
    console.log("there areeeeeeeee" + files.length);
    let length = {
      num: files.length,
    }
    outputs.emit('length', length);
  });
});


// Clients in the input namespace
let inputs = io.of('/input');
// Listen for input clients to connect
inputs.on('connection', function(socket) {
  console.log('An input client connected: ' + socket.id);

  // Listen for data messages
  socket.on('info', function(info) {
    let message = {
      id: socket.id,
      info: info
    }
    // Send data to output clients
    outputs.emit('message', message);
  });

  // Listen to image events
  ss(socket).on('file', function(stream, data) {
    let filename = path.basename(data.name);
    stream.pipe(fs.createWriteStream('public/output/' + filename));
    console.log(filename);
    outputs.emit('image', filename);
  });

  // Listen for all client to disconnect
  socket.on('disconnect', function() {
    console.log('Client has disconnected ' + socket.id);
    inputs.emit('disconnected', socket.id);
    outputs.emit('disconnected', socket.id);
  });
});
