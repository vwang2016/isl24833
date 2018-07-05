var helpButton;
var socket;
// gui params

var gui, gui1;
var label ='';

var iicAddress = 'e8';
var regAddress = '0';
var regData = '0';
var DAC1 = 0, DAC2 = 0, DAC3 = 0, DAC4 = 0, DAC5 = 0, DAC6 = 0, DAC7 = 0, DAC8 = 0, DAC9 = 0,
    DAC10 = 0, DAC11 = 0, DAC12 = 0, DAC13 = 0, DAC14 = 0, DAC15 = 0, DAC16 = 0, DAC17 = 0,
    DAC18 = 0;
var DVR = 0, DVT = 0;
var bank = ['A', 'B'];
var writeButton;
var readButton;
var writeEEbutton;
var recallButton;
var delayEvent = true;

function setup() {

  createCanvas(windowWidth, windowHeight);

  helpButton = createButton('Help');
  helpButton.position(20, 300);
  helpButton.mousePressed(greet);

  writeButton = createButton('Write I2C');
  writeButton.position(20, 350);

  readButton = createButton('Read I2C');
  readButton.position(20, 400);

  writeEEbutton = createButton('Write EE');
  writeEEbutton.position(20, 450);

  recallButton = createButton('Recall EE');
  recallButton.position(20, 500);


  gui = createGui('ISL24833 GUI', 20, 15);
  gui.addGlobals('iicAddress','regAddress',
		 'regData',
		 'bank');
  gui1 = createGui('DAC Settings',300, 15);
  sliderRange(0, 255, 1);
  gui1.addGlobals('DVR');
  sliderRange(0, 15, 1);
  gui1.addGlobals('DVT');
  sliderRange(0, 1023, 1);
  gui1.addGlobals('DAC1', 'DAC2', 'DAC3', 'DAC4', 'DAC5', 'DAC6', 'DAC7', 'DAC8', 'DAC9',
    		 'DAC10', 'DAC11', 'DAC12', 'DAC13', 'DAC14', 'DAC15', 'DAC16', 'DAC17', 'DAC18');


  // Don't loop automatically
  //noLoop();
  socket = new WebSocket('ws://localhost:8080/ws');
  // socket connection listener:
  socket.onopen = sendIntro;
  // socket message listener:
  socket.onmessage = readMessage;

}


function sendIntro() {
  // convert the message object to a string and send it:
  socket.send("Hello HID");
  label = 'Socket opened';
}

function readMessage(event) {
  var msg = event.data; // read data from the onmessage event

  label = msg;
}
function draw() {

  // clear all
  clear();
    // draw a label below the shape
  push();
  noStroke();
  fill(0);
  textAlign(CENTER);
  text(label, 600, 360);
  pop();
}

// check for keyboard events
function keyPressed() {
  switch(keyCode) {
    // type [F1] for help
    case 112: //F1
      greet();
      break;
  }
}


function greet() {
 window.location.href ="http://localhost:8080/isl24833_ds.pdf";
}
