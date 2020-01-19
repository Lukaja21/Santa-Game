var x;
var y;
var xSpeed = 0;
var ySpeed = 0;
var r = 10;
var friction = 0.9;
var grinches = [];
var gravity = 0.1;
var speed =3;
let santa;
var bullets = [];
let img;
let img2;
let img3;
let img4;
var santaDirection = 'right';
var gunReset = 0;
var count = 0;
var deletes = [];
var deletess = [];
var displays = ["Here they come!", "They're Coming!", "Watch out!", "Stupid Grinches", "Don't let them pass!"];
var display = displays[Math.floor(Math.random()*displays.length)];
var particles = []
var deletesss = []
var partiBool = false;
var partiCount = 0;
var wave = 8;
var points = 0;
var enpoints = 0;
var health = 100;

function preload() {
  img = loadImage("notpunchright.png");
  img2 = loadImage("notpunchleft.png");
  img3 = loadImage("nopresent.png")
  img4 = loadImage("bullet.png");
  img5 = loadImage("present.png");
  santa = loadImage("notpunchright.png");
  shotgun = loadSound("normal_shotgun.mp3")
  speedIcon = loadImage("speedIcon.png")
}

class grinch {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.present = false;
    this.speed = 3
    this.jumpHeight = Math.floor(Math.random()*4)
    this.walkSpeed = Math.floor(Math.random()*3) + 1
    this.sprintSpeed = this.walkSpeed + Math.floor(Math.random()*2)
  }
  draw() {
    if (!this.present) {
      this.x -= this.walkSpeed
      image(img3, this.x, this.y)
    } else {
      this.x += this.sprintSpeed
        image(img5, this.x, this.y)
    }
    this.y = this.y + this.speed;
    this.speed = this.speed + gravity;
  
    if ( this.y >= height) {
      this.speed = 3
      this.speed = -this.speed-this.jumpHeight;
	}
  }
} 

class particle {
  constructor(x,y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  draw() {
    fill(0)
    circle(this.x, this.y, this.size)
  } 
}

class bullet {
  constructor(x,y, directionB) {
    this.x = x;
    this.y = y;
    this.directionB = directionB
  }
  draw() {
    if (this.directionB == "right") {
      this.x += 7
      image(img4, this.x, this.y)
    } else {
      this.x -= 7
      image(img4, this.x, this.y)
    }
  }
} 

function setup() { 
  createCanvas(600, 600);
  x =  0;
  y= 10;
  noStroke()
} 
function draw() {
  fill(255, 255, 255, 75)
  rect(0, 0, 600, 600)
  fill(255)
  rect(x-25, y-29.5, 165, 30)
  fill(0)
  text("Wave: " + (wave-7).toString(), 540, 25)
  text(display, x, y)
  image(santa, x+25, y);
  image(speedIcon, 0, 0, 25, 25)
  fill(0, 0, 255)
  text(points.toString(), 550, 50)
  fill(255, 0, 0)
  text(enpoints.toString(), 570, 50)
  rect(490, 60, health, 10)
  
  ySpeed += gravity;
  xSpeed *= friction
  
  y += ySpeed
  x += xSpeed
  //ySpeed *= friction
  
  
  if ( y >= height-35 ) {
    ySpeed = 0
    y = height-35
}
  if(keyIsDown(UP_ARROW) && y >= height-80){
      ySpeed = -3
    particles.push(new particle(x+Math.floor(Math.random()*10)+35, y+25, Math.floor(Math.random()*10)))  
    partiCount = 0
    partiBool = true
  }
  if (keyIsDown(LEFT_ARROW)) {
      xSpeed -= 0.5
      santa = img2
      santaDirection = "left"
    particles.push(new particle(x+Math.floor(Math.random()*10)+35, y+25, Math.floor(Math.random()*10)))  
    partiCount = 0
    partiBool = true
    }
  if (keyIsDown(RIGHT_ARROW)) {
      xSpeed += 0.5
      santa = img
      santaDirection = "right"
    particles.push(new particle(x+Math.floor(Math.random()*10)+35, y+25, Math.floor(Math.random()*10)))  
    partiCount = 0
    partiBool = true
  }
  for (var i = 0; i < grinches.length; i++) {
    var loopGrinch = grinches[i]
    loopGrinch.draw()
    
    if (loopGrinch.x < 10) {
      loopGrinch.present = true
    } else if (loopGrinch.x > 600) {
      deletes.push(i)
      enpoints += 1
    }
    for (e = 0; e < bullets.length; e++) {
      if (abs(loopGrinch.x - bullets[e].x) < 20 && abs(loopGrinch.y - bullets[e].y) < 20 ) {
        deletes.push(i)
        points += 1
      }
    }
    if (abs(loopGrinch.x - x) < 20 && abs(loopGrinch.y - y) < 20 ) {
      health -= 1
    }
  }
  for (var i = 0; i < bullets.length; i++) {
    var loopBullet = bullets[i]
    loopBullet.draw()
    if (loopBullet.x > 600 || loopBullet.x < 0) {
      deletess.push(i)
    }
  }
  for (var i = 0; i < particles.length; i++) {
    var loopParticle = particles[i]
    loopParticle.draw()
    loopParticle.size -= 1
    if (loopParticle.size < 1) {
      deletesss.push(i)
    }
  }
  if (count > 180) {
    for (i = 0; i < Math.floor(Math.random() * wave); i++) {
      grinches.push(new grinch(Math.floor(Math.random()*100)+500, 570))
    }
    display = displays[Math.floor(Math.random()*displays.length)];
    count = 0
    wave += 1
  }
  if (partiBool) {
    if (partiCount > 10) {
      partiCount = 0
      partiBool = false
    }  else {
      particles.push(new particle(x+Math.floor(Math.random()*10)+35, y+25, Math.floor(Math.random()*10))) 
      partiCount += 1
    }
  }
  
  deletes.sort(function(a, b){return b-a});
  for (i = 0; i < deletes.length; i++) {
    grinches.splice(deletes[i], 1)
  }
  deletess.sort(function(a, b){return b-a});
  for (i = 0; i < deletess.length; i++) {
    bullets.splice(deletess[i], 1)
  }
  deletesss.sort(function(a, b){return b-a});
  for (i = 0; i < deletesss.length; i++) {
    particles.splice(deletesss[i], 1)
  }
  deletes = []
  deletess = []
  deletesss = []
  gunReset += 1
  count += 1
  if (health < 1) {
    return;
  }
}

function keyTyped() {
  if (key === ' ') {
    if (gunReset > 15) {
    bullets.push(new bullet(x+10, y+8, santaDirection))
    gunReset = 0
    if (!shotgun.isPlaying()) {
      shotgun.play()
      setTimeout(function (){
        shotgun.stop()
      }, 400);
    }
    }
  }
}