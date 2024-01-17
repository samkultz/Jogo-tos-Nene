class Hominho {

  constructor(x_,y_,r_) {
    this.x = x_;
    this.y = y_
    this.r = r_;

    this.gravity = .5;
    this.acc = 0;
    this.jumps = 0;
  }

  //hominho has gravity
  down(){
    if(this.y <= -height + this.r/2){
      this.acc = 5;
    }
    //while hominho is not on floor he falls
    if(this.y < -this.r/2 -h -3){
      this.acc += this.gravity;
      this.y += this.acc;
    }
    //when he gets on floor, he stops falling and reset jumps.
    else{
      this.y = -this.r/2 -h;
      this.acc = 0;
      this.jumps = 0;
    }
  }

  //sends hominho upward
  up(lift_){
    this.lift = lift_;
    if(this.jumps < maxjumps){
      this.acc += this.lift;
      this.y += this.acc;
      this.jumps++;

      let m = 0//random([0,1,2]);
      switch (m) {
        case 0:
          jump1.play();
          break;
      }
    }
  }

  //oi, my name is hominho, do you have a boyfriend?
  show(){
    fill(255);
    image(nene, this.x - r/2, this.y - r/2, r, r);
    noFill();
    ellipse(this.x,this.y,this.r+2);
  }

  //collision detection
}

function colided(){
  for(let i = 0; i<ob.length; i++){
    //bateu com x
    if(abs(ob[i].x - (ob[i].l/2) - hominho.x + r/2) < abs((r/2) + (ob[i].l/2))){
      if(-hominho.y < ob[i].h + h){
        return true;
      }
    }
    else{
      return false;
    }
  }
}
