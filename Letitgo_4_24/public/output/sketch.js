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

let test = "hey";

let img = [];
let i = 0;

let numberOfFiles = 0;

function preload() {
  myFont = loadFont('DIN BLACK.ttf');

  // Catch input message
  socket.on('length', function(length) {
    numberOfFiles = length.num;
    console.log(numberOfFiles);
  });

  console.log("Hey, this is the num of files: " + numberOfFiles);

  for (i = 0; i <= 5; i++) {
    img[i] = loadImage('./img/' + i + "letitgo.png");
    console.log(img[i]);
  }
}

function setup() {
  //Canvas
  let canvas;
  let w = windowWidth;
  let h = windowHeight;

  createCanvas(windowWidth, windowHeight);
  background(40, 40, 40);

  socket.emit('info', test);

  // Catch input message
  socket.on('message', function(message) {
    sayhey = message.info;
  });

  socket.on('image', function(filename) {
    //this is not firing
    console.log(img);
    console.log(filename);
    console.log("hello");
  });

  for (i = 0; i <= 5; i++) {
    image(img[i], random(0, windowWidth), random(0, windowHeight), 200, 300);
  }

  // Remove disconnected users
  socket.on('disconnected', function(id) {
    delete users[id];
  });

}

function draw() {}
