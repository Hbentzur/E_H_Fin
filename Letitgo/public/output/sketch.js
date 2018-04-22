// Open and connect input socket
let socket = io('/output');

// Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected");
});

// Keep track of partners
let users = {};
let sayhey = "loading";

function preload() {
  //myFont = loadFont('Roberto');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Catch input message
  socket.on('message', function(message) {
    sayhey = message.data;
  });
}

function draw(){
    //console.log(sayhey);
}
