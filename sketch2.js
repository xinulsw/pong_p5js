let palGracza, palAI, pilka;
let szerPal = 80;
let wysPal = 20;

function setup() {
  createCanvas(600, 400);
  pilka = new Pilka(width / 2 - 10, height / 2 - 10, 20, 20, color("blue"));
  palAI = new PaletkaAI(width / 2 - szerPal / 2, 5, szerPal, wysPal, color("red"));
  palGracza = new Paletka(width / 2 - szerPal / 2, height - 25, szerPal, wysPal, color("green"));
}

function draw() {
  background(220);
  palGracza.pokaz();
  palAI.przesun();
  palAI.pokaz();
  pilka.przesun();
  pilka.pokaz();
}

function mouseMoved() {
  palGracza.przesun(mouseX);
}

class ObiektGraf {
  constructor(x, y, w, h, kolor, v) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.kolor = kolor;
    this.xv = v;
  }
}

class Paletka extends ObiektGraf {
  constructor(x, y, w, h, kolor, v = 3) {
    super(x, y, w, h, kolor, v);
  }
  
  pokaz() {
    fill(this.kolor);
    rect(this.x, this.y, this.w, this.h, 3);
  }
  
  przesun(mX) {
    this.x = mX - this.xv;
    if (this.x + this.w > width)
      this.x = width - this.w;
  }
}

class PaletkaAI extends Paletka {
  constructor(x, y, w, h, kolor, v = 3) {
    super(x, y, w, h, kolor, v);
  }
  
  przesun() {
    if (this.x + this.w / 2 < pilka.x + pilka.w /2)
      this.x += this.xv;
    else
      this.x -= this.xv;
  }
}

class Pilka extends ObiektGraf {
  constructor(x, y, w, h, kolor, v = 4) {
    super(x, y, w, h, kolor, v);
    this.yv = v;
  }
  
  pokaz() {
    fill(this.kolor);
    ellipseMode(CORNER);
    ellipse(this.x, this.y, this.w, this.h);
  }
  
  czyKolizja(pal) {
    let kolizjaX = (this.x + this.w > pal.x && this.x < pal.x + pal.w);
    let kolizjaY = (this.y + this.h > pal.y && this.y < pal.y + pal.h);
    if (kolizjaX && kolizjaY)
      return true;
  }
  
  przesun() {
    this.x += this.xv;
    this.y += this.yv;
    
    if (this.y > height)
      this.start();
    else if (this.y + this.h < 0)
      this.start();
    
    if (this.czyKolizja(palGracza))
      this.yv *= -1;
    else if (this.czyKolizja(palAI))
      this.yv *= -1;
    
    if (this.x + this.w > width)
      this.xv *= -1;
    else if (this.x < 0)
      this.xv *= -1;
    
  }
  
  start() {
    this.x = width / 2;
    this.y = height / 2;
    this.yv *= -1;
  }
}
