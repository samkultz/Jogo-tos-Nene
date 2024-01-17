function Terrain(){
  fill(0);
  rect(0,0, width,-h);
}


class Obs {
  constructor(x_,y_, l_,h_, v_) {
    this.x = x_;
    this.y = y_;

    this.l = l_;
    this.h = h_;

    this.v = v_;
  }

  show(){
    fill(0);
    rect(this.x -(this.l/2),this.y, this.l,-this.h);
  }

  move(){
    this.x -= this.v;
  }


}

function pRand(min, max, n) {
  var prand = 0;
  for(i = 0; i < n; i++){
    prand += random(min, max);
  }
  return prand/n;
}
