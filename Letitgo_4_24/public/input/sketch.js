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

//Canvas
let canvas;
let w = window.innerWidth;
let h = window.innerHeight;

//Buttons
let firstbutton;
let buttonforpic;
let submitTextButton;

//Images
let bears;

//Text
let writingField;
let userText;

// Pic
let nameOfPic;

//Galaxy pic;
let img;

function preload() {
  myFont = loadFont('DIN BLACK.ttf');
  bears = loadImage("./bears.jpeg");

  //Galaxy
  img1 = loadImage('./galaxy/galaxy1.png');
  img2 = loadImage('./galaxy/galaxy2.png');
  img3 = loadImage('./galaxy/galaxy3.png');

}

function setup() {
  canvas = createCanvas(w, h);

  //First screen
  background(40, 40, 40);
  textSize(30);
  textFont(myFont);
  textAlign(CENTER);
  fill(250, 200, 200);
  text("Share \na thought \nyou wish \nto let go.", w / 2, h / 2 - 140);

  // writing field
  writingField = createInput();
  writingField.position(w / 2 - 100, h / 2 + 50);
  writingField.size(200, 40);

  // writing field button to send a blob
  submitTextButton = createButton('Send');
  submitTextButton.position(w / 2 - 60, h / 2 + 150);
  submitTextButton.mousePressed(displayText);
  submitTextButton.mousePressed(toBlob);

  // Remove disconnected users
  socket.on('disconnected', function(id) {
    delete users[id];
  });

  // Name of Pic
  // let nameOfPic = "test" + floor(random(0,100)) + ".png";

  //let nameOfPic = "test" + floor(random(0, 100)) + ".png";


  // Canvas to blob
  function toBlob() {
    let canvas = document.getElementsByTagName('canvas')[0];
    canvas.toBlob(function(file) {
      console.log(file);
      let stream = ss.createStream();
      // upload a file to the server.
      ss(socket).emit('file', stream);
      ss.createBlobReadStream(file).pipe(stream);
    });
  }

  //Picmode
  // function Picmode() {
  //   firstbutton.hide();
  //   console.log("Pic mode");
  // }

  // Remove disconnected users
  socket.on('disconnected', function(id) {
    delete users[id];
  });

}

function displayText() {
  background(40, 40, 40);
  image(img1, 0, 0, window.innerWidth, window.innerHeight);
  textSize(55);
  textFont(myFont);
  textAlign(CENTER);
  fill(255);
  userText = writingField.value();
  text(userText, w / 2 - 230, h / 2 - 200, 400, 600);

  submitTextButton.hide();
  writingField.hide();

  setTimeout(dipToBlack, 3000);
}

function dipToBlack() {
  image(img1, 0, 0, window.innerWidth, window.innerHeight);
  textSize(80);
  textFont(myFont);
  textAlign(CENTER);
  fill(255);
  text("Please step \ninto outer space", w / 2 - 230, h / 2 - 200, 500, 500);
}

function draw() {
  socket.emit('info', test);
}
