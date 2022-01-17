//globl vars//

// create array to hold all particles
var pts = [];
var numPts;
var mic;
var mycanvas;
var blueLvl;
var blueUp = 1;
var startGame = false;

function setup() {
  //give it an html link
  mycanvas = createCanvas(windowWidth,windowHeight);
  // mycanvas.parent('canvas2');
  mycanvas.style("z-index", "1");

	background(0, 0, 0);

	// create particles
	numPts = 10000; //number of particles
	for(var i = 0 ; i < numPts ;i++){
		pts.push( {} ); // insert new object
		pts[i].idx = i; // give it an index
		initObj( pts[i] ); // init object
	}
}

function draw() {
  pointerAnimation();

  //draw bg lines after pressing start
  if (startGame == true) {
    bgLines();
  }
}


///functions///

function pointerAnimation() {
  noStroke();
  fill(200,random(0,20));
  ellipse(mouseX, mouseY, 2.5);
}

function bgLines(){
  // update particle
	for(var i = 0 ; i < pts.length ;i++){
		updateObj(pts[i]);
	}
	// draw particle
	for(var i = 0 ; i < pts.length ;i++){
		drawObj(pts[i]);
	}
}

// set initial random parameters to a particle
function initObj( obj ){
	obj.x = random(width);
	obj.y = random(height);
	obj.w = random(1.001, 1.01);

  blueLvl = (sin(frameCount*0.01)+25)*blueUp;

	obj.c = [random(3,20), random(3,18), random(3,blueLvl)]; //color of bglines
}

function updateObj(obj){

  var noiseScl = 0.0016;
  var screenScl = 10;
	// move the particle on each axis by mapping the noise function, with its current position.
	// try different variations to get different landscapes
	// try applying a similar formula to particle size (obj.w) and color array (obj.c)
	obj.x += map(noise(234 + obj.y*noiseScl , -947+ obj.x*noiseScl ), 0, 1, -screenScl, screenScl);
  obj.y += map(noise(-123  + obj.x*noiseScl, 655 + obj.y*noiseScl ), 0, 1, -screenScl, screenScl);

	// maintain screen edges (wrap around)
	if(obj.x > width) obj.x = 0;
	if(obj.x < 0) obj.x = width;
	if(obj.y > height) obj.y = 0;
	if(obj.y < 0) obj.y = height;
}


function drawObj(obj){
	stroke(obj.c[0], obj.c[1],obj.c[2]);
	strokeWeight(obj.w);
	point(obj.x, obj.y);
}

////////event listeners///////

//save as png when s is pressed
document.addEventListener('mousemove', function (event) {
  // background(0, 0, 0);
});
