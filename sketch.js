let minBallSize = 50;
let maxBallSize = 100;
let ellipseSize = 0;
let colorVal = 0;
let xpos, ypos, xposp, yposp;
const rectW = minBallSize;
function setup() {
	let cnv = createCanvas(windowWidth, windowHeight);
  xpos = width / 2;
  ypos = height / 2;
	colorMode(HSB);
}

function draw() {
  xpos += sx; // sx
  ypos -= sy; // sy
  edges();
	colorVal = map(xpos, 0, width, 0, 255);
	let angle = map(ypos, 0, height, 0, PI);
	ellipseSize = abs(cos(angle) * maxBallSize) + minBallSize;
	background(colorVal / 2, 255, 255)
	noStroke();
	fill(colorVal, 155, 200);
	// rect(width/ 2 - rectW / 2, 0, rectW, ypos - minBallSize * 0.5);
	rect(0, height / 2 - rectW / 2, xpos - minBallSize * 0.5, rectW);
	// rect(width/ 2 - rectW / 2, (ypos - minBallSize * 0.5) + minBallSize, rectW, height);
	rect((xpos - minBallSize * 0.5) + minBallSize, height / 2 - rectW / 2,  width, rectW);
	fill(255 - colorVal, 50, 200);
	ellipse(xpos, ypos, ellipseSize * 0.85);
}
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}
function edges(){
  if(xpos > width)xpos = 0;
  if(xpos < 0)xpos = width;
  if(ypos > height) ypos = 0;
  if(ypos < 0) ypos = height;
}

/* PREFS */
const easing = 0.5; // set between 0 - 1

/* VARS */
let rx, ry, rz, sx, sy, sz;
rx = ry = rz = sx = sy = sz = 0;

/* ONDEVICEMOTION */
// https://developer.mozilla.org/en-US/docs/Web/Events/devicemotion
window.ondevicemotion = event => {
  /* RAW VALUES */
  rx = event.accelerationIncludingGravity.x;
  ry = event.accelerationIncludingGravity.y;
  rz = event.accelerationIncludingGravity.z;

  /* SMOOTHED VALUES */
  sx = smoothVal(rx, sx);
  sy = smoothVal(ry, sy);
  sz = smoothVal(rz, sz);
};

/* VALUE MAPPING */
function mapVal(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

/* VALUE SMOOTHING */
function smoothVal(inputVal, outputVal) {
  let tarVal = inputVal;
  let calcVal = tarVal - outputVal;
  outputVal += calcVal * easing;
  return outputVal;
}