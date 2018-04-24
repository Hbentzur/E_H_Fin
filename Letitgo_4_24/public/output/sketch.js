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
let img;

function preload() {
  myFont = loadFont('DIN BLACK.ttf');
  img = loadImage('blob.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Catch input message
  socket.on('message', function(message) {
    sayhey = message.info;
  });

  socket.on('image', function(filename) {
    console.log(filename);
    // img = loadImage(filename);
  });
}

function draw() {
  background(40, 40, 40);
  text(sayhey, 100, 100);
  image(img, 0, 0);
}
