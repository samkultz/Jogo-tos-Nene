let ob = [];
let h = 10;
let v = 5;
let r = 50;
let score = 0;
let maxjumps = 2;

function preload() {
  song = loadSound('nenes/davi/sounds/dav_song.mp3');
  song.setVolume(.2);
  jump1 = loadSound('nenes/davi/sounds/dav_jump1.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);
  hominho = new Hominho(100,-height/2,r);
  nene = loadImage("n3n3s/davi.png");
  song.loop();
}

//sends hominho upward when space is pressed
function keyPressed(){
  if(key == " "){
    hominho.up(-15);
  }
  song.setVolume(.2);
  jump1.setVolume(5);
}

// first distance between obstacles
var dt = 20;

function draw() {
  background(100);
  translate(0,height);

  //raises obs speed
  if(frameCount%500 == 0){
    v *= 1.1;
  }

  //generates the terrain
  Terrain();

  //creates the hominho;
  hominho.show();
  hominho.down();

  //bolinhas mostrando os pulos
  for(i=0; i<maxjumps-hominho.jumps; i++){
    fill(100)
    ellipse(h * i + h,-h/2, h-1);
  }

  textSize(8);
  textAlign(LEFT);
  text('Davi, por vc ter pilantrado com o London vc começa com um pulo a menos', 50 + maxjumps-hominho.jumps * h, -2);

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

  // o que acontece na colisão
  if(colided()){
    textAlign(CENTER);
    textSize(100)
    text(score, width/2, -height/2);
    noLoop();
  }

  // draws the score
  textAlign(RIGHT);
  textSize(30);
  //moves "score" text
  var mtext = score.toString().length * 20;
  text('Score:', width - mtext, -height + 25 );
  text(score, width, -height + 25 )
}

// quando altera o tamanho da janela
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
