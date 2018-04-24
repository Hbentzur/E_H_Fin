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

let myCanvas;
let myContext;
let myVideo;

let frame;
let video;

let firstbutton;
let buttonforpic;

function preload() {
  myFont = loadFont('DIN BLACK.ttf');
  bears = loadImage("./bears.jpeg");
}

function setup() {

  myCanvas = createCanvas(windowWidth, windowHeight);
  myContext = myCanvas.canvas.getContext('2d');
  myVideo = document.getElementById('video');

  // video.addEventListener();

  //First screen
  background(40, 40, 40);
  textSize(40);
  textFont(myFont);
  textAlign(CENTER);
  fill(250, 200, 200);
  text("Take a picture \nof something \nyou don't need \nanymore.", windowWidth / 2, windowHeight / 2);

  // Button that takes you from Instructions to Picmode
  firstbutton = createButton("I'm ready");
  firstbutton.mousePressed(Picmode);
  firstbutton.position(windowWidth / 2 - 75, windowHeight - 150);

  // Remove disconnected users
  socket.on('disconnected', function(id) {
    delete users[id];
  });

}

//Picmode
function Picmode() {
  // createCanvas(600, 600);
  firstbutton.hide();

  // Button that takes you from Instructions to Picmode
  buttonforpic = createButton("I'm ready");
  buttonforpic.mousePressed(takeablob);
  buttonforpic.position(100, 600);

  //Just web camera stuff
  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia({
        audio: false,
        video: {
          width: 1280,
          height: 720
        }
      },

      handleNewVideoFrame,
      function(err) {
        console.log("The following error occurred: " + err.name);
      }
    );
  } else {
    console.log("getUserMedia not supported");
  }

  function handleNewVideoFrame(frame) {
    var video = document.querySelector('video');
    video.srcObject = frame;
    video.onloadedmetadata = function(e) {
      video.play();
      console.log(video);
    };
  }

  // Canvas to blob
  function takeablob() {
    let canvas = document.getElementsByTagName('canvas')[0];
    // let canvas = document.getElementsByTagName('video')[0];
    canvas.toBlob(function(file) {
      console.log(file);
      let stream = ss.createStream();
      // upload a file to the server.
      ss(socket).emit('file', stream, {
        name: 'blob.png'
      });
      ss.createBlobReadStream(file).pipe(stream);
    });
  }

  //image(frame, 0, 0, 240, 340);
  //Select video element in index.html
  // let userVideo = document.getElementsByTagName('video');
  // image(userVideo, 0, 0, 240, 340);
  //video.html();
  //image(userVideo)
  //Display it to the p5 canvas

}


function draw() {
  socket.emit('info', test);
}
