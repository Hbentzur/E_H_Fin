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

}

//Picmode
function Picmode() {
  createCanvas(windowWidth, windowHeight);
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

  // Canvas to bolb
  function takeablob() {
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
  }

  function handleNewVideoFrame(frame) {
    console.log(frame)
    var video = document.querySelector('video');
    video.srcObject = frame;
    video.onloadedmetadata = function(e) {
      video.play();
    };
  }
}


function draw() {
  socket.emit('info', test);
}
