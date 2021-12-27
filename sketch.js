let palAI, palGracza;
let paletki = [];

function setup() {
  createCanvas(800, 600);
  pilka = new Pilka(width / 2, height /2, 20, 20, color("green"), 3);
  palAI = new PaletkaAI(width / 2 - 40, 5, 80, 20, color("red"), 3, pilka);
  palGracza = new Paletka(width / 2 - 40, height - 25, 80, 20, color("blue"), 3);
  paletki.push(palAI);
  paletki.push(palGracza);
}

function draw() {
  background(220);
  palGracza.pokaz();
  palAI.przesun();
  palAI.pokaz();
  pilka.przesun(paletki);
  pilka.pokaz();
}

function mouseMoved() {
  palGracza.przesun(mouseX);
}

class ObiektGraf {
  constructor(xp, yp, wp, hp, kolor, vp = 1) {
    this.x = xp;
    this.y = yp;
    this.w = wp;
    this.h = hp;
    this.kolor = kolor
    this.v = vp;  // prędkość
  }
}

class Paletka extends ObiektGraf {
  constructor(xp, yp, wp, hp, kolor, vp) {
    super(xp, yp, wp, hp, kolor, vp);
  }

  przesun(mX) {
    let przesuniecie = mX - this.v;
    if (przesuniecie > width - this.w)
      przesuniecie = width - this.w;
    if (przesuniecie < 0)
      przesuniecie = 0
    this.x = przesuniecie;
  }
  
  pokaz() {
    fill(this.kolor);
    rect(this.x, this.y, this.w, this.h, 3);
  }
}

class PaletkaAI extends Paletka {
  constructor(xp, yp, wp, hp, kolor, vp, pilka) {
    super(xp, yp, wp, hp, kolor, vp);
    this.pilka = pilka;
  }

  przesun(){
    if (this.pilka.x + this.pilka.w / 2 > this.x + this.w / 2)
      this.x += this.v;
    else if (this.pilka.x + this.pilka.w / 2 < this.x + this.w / 2)
      this.x -= this.v;
  }
}

class Pilka extends ObiektGraf {
  constructor(xp, yp, wp, hp, kolor, vp) {
    super(xp, yp, wp, hp, kolor, vp);
    this.xv = vp;
    this.yv = vp;
  }
  
  przesun(pilki) {
    this.x += this.xv;
    this.y += this.yv;
    if (this.x + this.w / 2 >= width) {
      this.xv *= -1;
      this.x = width - this.w;
    } else if (this.x - this.w / 2 < 0) {
      this.xv *= -1;
      this.x = this.w / 2;
    }
    if ((this.y < 0 - this.h) || (this.y > height)) {
      this.yv *= -1;
      this.y = height / 2;
    }

    paletki.forEach(pal => {
      let kolizjaX = (this.x + this.w >= pal.x && pal.x + pal.w > this.x);
      let kolizjaY = (this.y + this.h >= pal.y && pal.y + pal.h > this.y);
      if (kolizjaX && kolizjaY) {
          this.yv *= -1;
      }
    });

  }
  
  pokaz() {
    //noStroke();
    fill(this.kolor);
    ellipseMode(CORNER);
    ellipse(this.x, this.y, this.w, this.h);
  }
}
