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
let testimg = "I will be a photo one day";

// Streeming bears
let bears;

function preload() {
  myFont = loadFont('BIG JOHN.otf');
  bears = loadImage("./bears.jpeg");
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

  // Leting go of all jquary
  // let elem = document.createElement("img");
  // elem.setAttribute("src", './MM.jpg');
  // document.getElementById("file").appendChild(elem);


  let file = './MM.jpg';
  let stream = ss.createStream();

  // upload a file to the server.
  ss(socket).emit('file', stream, {
    size: file.size
  });
  ss.createBlobReadStream(file).pipe(stream);
  console.log(test);

  // Track upload progress
  let blobStream = ss.createBlobReadStream(file);
  let size = 0;

  blobStream.on('data', function(chunk) {
    size += chunk.length;
    console.log(Math.floor(size / file.size * 100) + '%');
  });

  blobStream.pipe(stream);

}

// Picmode
function Picmode() {
  firstbutton.hide();
  background(240, 240, 240);
  textSize(120);
  text("pic", windowWidth / 2, windowHeight / 2);
}

function draw() {
  socket.emit('info', test);

  // See the bears
  image(bears, 0, 0);
}
