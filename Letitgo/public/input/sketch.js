// Open and connect input socket
let socket = io('/input');

// Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected");
});

// Keep track of partners
let users = {};

//Test word
let test = "Is it?";

// Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected");
});

function preload() {
  myFont = loadFont('BIG JOHN.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Remove disconnected users
  socket.on('disconnected', function(id) {
    delete users[id];
  });

}

function draw() {

  background(220, 220, 220);
  socket.emit('data',test);
  console.log("hey");

}
