let palAI, palGracza;
let paletki = [];
let font;
let fontSize = 40;
let fontKolor;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loade dbefore setup() and draw() are called
  font = loadFont('freesansbold.ttf');
}

function setup() {
  createCanvas(800, 600);
  pilka = new Pilka(width / 2, height /2, 20, 20, color("green"), 4);
  palAI = new PaletkaAI(width / 2 - 40, 5, 80, 20, color("red"), 3, 'palAI', pilka);
  palGracza = new Paletka(width / 2 - 40, height - 25, 80, 20, color("blue"), 3, 'palGracza');
  paletki.push(palAI);
  paletki.push(palGracza);
  textFont(font);
  textSize(fontSize);
  textAlign(LEFT, CENTER);
  fontKolor = color(153, 0, 255);
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
  constructor(xp, yp, wp, hp, kolor, vp, nazwa='') {
    super(xp, yp, wp, hp, kolor, vp);
    this.nazwa = nazwa;
    this.pkt = 0; // licznik punktów
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
  constructor(xp, yp, wp, hp, kolor, vp, nazwa='', pilka) {
    super(xp, yp, wp, hp, kolor, vp, nazwa);
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
    this.punkty =[0, 0];
  }

  przesun(pilki) {
    let paletka = '';
    this.x += this.xv;
    this.y += this.yv;

    if (this.x + this.w / 2 >= width) {
      this.xv *= -1;
      this.x = width - this.w;
    } else if (this.x - this.w / 2 < 0) {
      this.xv *= -1;
      this.x = this.w / 2;
    }

    if (this.y < 0) {
      this.punkty[0] += 1;
      this.start();
    } else if (this.y > height) {
      this.punkty[1] += 1;
      this.start();
    }

    paletki.forEach(pal => {
      let kolizjaX = (this.x + this.w >= pal.x && pal.x + pal.w > this.x);
      let kolizjaY = (this.y + this.h >= pal.y && pal.y + pal.h > this.y);
      if (kolizjaX && kolizjaY) {
          this.yv *= -1;
      }
      if (pal.nazwa == 'palGracza' && this.punkty[0] >= 5 && pal.w < 120) {
          pal.w += 10;
      }
      if (pal.nazwa == 'palAI' && this.punkty[1] >= 5 && pal.w < 120) {
          pal.w += 10;
      }

    });

  }
  
  start() {
    this.x = width / 2;
    this.y = height / 2;
    this.yv *= -1;
  }

  drukujWynik() {
    fill(fontKolor);
    text('Gracz: ' + this.punkty[0], width / 2 - 100, height - 120);
    text('Bot: ' + this.punkty[1], width / 2 - 100, 80);
  }

  pokaz() {
    //noStroke();
    fill(this.kolor);
    ellipseMode(CORNER);
    ellipse(this.x, this.y, this.w, this.h);
    this.drukujWynik();
  }
}
