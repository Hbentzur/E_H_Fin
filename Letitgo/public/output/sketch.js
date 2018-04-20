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
  myFont = loadFont('BIG JOHN.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  socket.on('message', function(message) {
    sayhey = message.data;
  });
  console.log(sayhey);
}

function draw() {
  background(240, 240, 240);
  textSize(120);
  textFont(myFont);
  text(sayhey, windowWidth / 2, windowHeight / 2);

}
