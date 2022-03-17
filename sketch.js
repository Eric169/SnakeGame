class Snake{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.ySpeed = 1;
    this.xSpeed = 0;
    this.total = 0;
    this.tail = [];
  }

  update(){
    for(var i = 0; i < this.tail.length-1; i++){
      this.tail[i] = this.tail[i+1];
    }
    this.tail[this.tail.length-1] = createVector(this.x,this.y);
    this.x += this.xSpeed * scl;
    this.y += this.ySpeed * scl;
  }

  show(){
    fill(0);
    for(var i = 0; i<this.tail.length; i++){
      rect(this.tail[i].x,this.tail[i].y, scl, scl);
    }
    rect(this.x,this.y, scl, scl);
  }

  dir(x,y){
    if(this.valid(x,y)){
      this.xSpeed = x;
      this.ySpeed = y;
    }
  }

  valid(x,y){
    if(this.x % scl != 0 || this.y % scl != 0) return false;
    if(this.xSpeed == 0){
      return x != 0;
    }
    if(this.ySpeed == 0){
      return y != 0;
    }
  }

  dead(){
    for(var i = 0; i < this.total; i++){
      if(this.tail[i].x < 0 || this.tail[i].x > width
        || this.tail[i].y < 0 || this.tail[i].y > height
        || (this.x == this.tail[i].x && this.y == this.tail[i].y)){
        return true;
      }
    }
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
  }

  eat(fruit){
    if(dist(this.x, this.y, fruit.x, fruit.y) < 1){
      this.total++;
      this.tail.push(createVector(this.x, this.y));
      return true;
    }
    return false;
  }
}

class Fruit{
  constructor(){
    this.x = floor(random(floor(width/scl))) * scl;
    this.y = floor(random(floor(height/scl))) * scl;
    this.color = createVector(random(0,255),random(0,255),random(0,255));
  }

  show(){
    fill(this.color.x, this.color.y, this.color.z);
    stroke(0);
    rect(this.x,this.y,scl,scl);
  }
}

const MAX_FRUITS = 15;

let fr = 15;
let s;
let scl = 20;
let fruits = [];
let dead = false;
let w, h;

function setup() {
  w = windowWidth, h = windowHeight;
  createCanvas(w, h);
  s = new Snake();
  for(var i = 0; i < MAX_FRUITS; i++){
    fruits.push(new Fruit());
  }
  frameRate(fr);
}

function mouseClicked(){
  if(dead){
    dead = false;
    fruits = [];
    setup();
    loop();
  }
}

function keyPressed(){
  if(keyCode == UP_ARROW)
    s.dir(0,-1);
  else if(keyCode == DOWN_ARROW)
    s.dir(0,1);
  else if(keyCode == RIGHT_ARROW)
    s.dir(1,0);
  else if(keyCode == LEFT_ARROW)
    s.dir(-1,0);
}

function windowResized(){
  w = windowWidth, h = windowHeight;
  if(dead){
    GameOver();
  }
}

function GameOver(){   
  createCanvas(w, h);
  background(255,0,0);
  noStroke();
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text('GAME OVER', width/2, height/2); 
  textSize(25);
  text('Length reached: ' + (s.tail.length+1), width/2, height/2 + 32);
  textSize(25);
  text('Click anywhere to restart.', width/2, height/2 + 57);
  dead = true; 
}

function draw() {
  background(0,155,0);
  s.update();
  s.show();
  if(s.dead()){
    GameOver();
    noLoop();  
  }
  if(!dead){
    for(var i = 0; i < MAX_FRUITS; i++){
      fruits[i].show();
      if(s.eat(fruits[i])){
        fruits[i] = new Fruit();
      }
    }
  }
}
