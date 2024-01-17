let ob = [];
let h = 10;
let v = 5;
let r = 50;
let score = 0;
let maxjumps = 3;
let hominho;
let played = false;

function preload() {
  song = loadSound('nenes/grafe/sounds/graf_song.mp3');
  jump1 = loadSound('nenes/grafe/sounds/graf_jump1.mp3');
  jump2 = loadSound('nenes/grafe/sounds/graf_jump2.mp3');
  jump3 = loadSound('nenes/grafe/sounds/graf_jump3.mp3');
  jumpScare = loadSound('nenes/grafe/sounds/graf_scareSong.mp3');
  nene = loadImage("n3n3s/grafe.png");
  loaded()
}

function loaded() {
  hominho = new Hominho(100, -height / 2, r);
  setup();
}

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);
  hominho = new Hominho(100, -height / 2, r);
}

//sends hominho upward when space is pressed
function keyPressed(){
  if(key == " "){
    hominho.up(-15);
  }

  let m = random([0,1,2]);
  switch (m) {
    case 0:
      jump1.play();
      break;
    case 1:
      jump2.play()
      break;
    case 2:
      jump3.play()
      break;
  }

  if (played == false){
    // song.play();
    song.loop(); 
    // song.setVolume(1)
  }
  played = true;
}

var dt = 20;

function draw() {
  background(100);
  translate(0,height);

  // raises obs speed
  if(frameCount%500 == 0){
    v *= 1.1;
  }

  // Easteregg
  if(frameCount%500 == 0){
    jumpScare.play();
  }

  // generates the terrain
  Terrain();

  // creates the hominho;
  hominho.show();
  hominho.down();

  //bolinhas mostrando os pulos
  for(i=0; i<maxjumps-hominho.jumps; i++){
    fill(100)
    ellipse(h * i + h,-h/2, h-1);
  }

  //creates obstacles
  if(frameCount == dt){
    ob.push(new Obs(width,-h, pRand(5,80,5),random(50,125), v));
    dt += floor(random(25,100));
  }
  //shows and moves the obstacles
  for(let i = 0; i<ob.length; i++){
    ob[i].show();
    ob[i].move();
    //removes the obstacles and sets score
    if(ob[i].x < -h){
      ob.splice(0,1);
      score += 1;
    }
  }

  if(colided()){
    textAlign(CENTER);
    textSize(100)
    text(score, width/2, -height/2);
    noLoop();
  }

  //draws the score
  textAlign(RIGHT);
  textSize(30);
  //moves score text
  var mtext = score.toString().length * 20;
  text('Score:', width - mtext, -height + 25 );
  text(score, width, -height + 25 )
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}