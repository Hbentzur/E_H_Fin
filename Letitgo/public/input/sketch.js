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

    //First screen
    background(240, 240, 240);
    textSize(120);
    text("take a picture of something you don't need anymore", windowWidth / 2, windowHeight / 2);

    // Button that takes you from Instructions to Picmode
    firstbutton = createButton("I'm ready");
    firstbutton.mousePressed(Picmode);
    firstbutton.position(windowWidth / 2, windowHeight - 100);

  // Remove disconnected users
  socket.on('disconnected', function(id) {
    delete users[id];
  });

}


function Picmode() {
  firstbutton.hide();

  background(240, 240, 240);
  textSize(120);
  text("pic", windowWidth / 2, windowHeight / 2);
}


function draw() {
  socket.emit('data', test);
}
