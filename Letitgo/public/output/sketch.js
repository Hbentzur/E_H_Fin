// Open and connect input socket
let socket = io('/output');

// Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected");
});

/* END OF OUTPUT SETUP */

// Keep track of partners
let users = {};
let sayhey = "loading";

function preload() {
  myFont = loadFont('DIN BLACK.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Catch input message
  socket.on('message', function(message) {
    sayhey = message.info;
  });

  // Catch input file
  // ss(socket).on('file', function(file) {
  //   console.log("file is here");
  // });
  socket.on('image', function(filename){
    console.log(filename);
  });
}

function draw() {
  background(240, 240, 240);
  text(sayhey, 100, 100);
}
