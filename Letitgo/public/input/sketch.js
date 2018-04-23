// Open and connect input socket
let socket = io('/input');

// Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected");
});

/* END OF INPUT SETUP */

// Keep track of users
let users = {};

// Test word, just to make sure the connection between input and output is working
let test = "Is it?";

// Streeming bears
let bears;

// Video
let video;

function preload() {
  myFont = loadFont('DIN BLACK.ttf');
  bears = loadImage("./bears.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //First screen
  background(40, 40, 40);
  textSize(40);
  textFont(myFont);
  textAlign(CENTER);
  fill(250, 200, 200);
  text("Take a picture \nof something \nyou don't need \nanymore.", windowWidth / 2, windowHeight / 2 - 30);

  // Button that takes you from Instructions to Picmode
  firstbutton = createButton("I'm ready");
  firstbutton.mousePressed(Picmode);
  firstbutton.position(windowWidth / 2 - 75, windowHeight - 150);

  // Remove disconnected users
  socket.on('disconnected', function(id) {
    delete users[id];
  });

  // Canvas to bolb
  let canvas = document.getElementsByTagName('canvas')[0];
  canvas.toBlob(function(file) {
    console.log(file);
    let stream = ss.createStream();
    console.log(file);

    // upload a file to the server.
    ss(socket).emit('file', stream, {
      name: 'blob.png'
    });
    ss.createBlobReadStream(file).pipe(stream);
  });

  //Picmode
  function Picmode() {
    createCanvas(390, 240);
    capture = createCapture(VIDEO);
    //capture.size(320, 240);
    firstbutton.hide();
    console.log("Pic mode");
  }

}

function draw() {
  socket.emit('info', test);
  // See the bears
  //image(bears, 0, 0);
}
