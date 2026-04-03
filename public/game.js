const config = {
  width: 1700,
  height: 660,
  type: Phaser.AUTO,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 450 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var game = new Phaser.Game(config);
let cat;
let presse;
var platforms;
var score = 0;
var bombs; 
var fishs; 
var vies;
var lives = 0;
var inPause = false;
var gameOver = false;
let BonHomme;
let BonHommeDirection = { x: 0, y: 0 };
let BonHommeNextMoveTime = 0;
const BonHommeMoveDelay = 450;
let moveSound;
let ViCoSound;
let catmeowSound ;
let lostSound;
let slideSound;

function preload() {
  this.load.image('parquet', '/assets/pa.jpg');
  this.load.image('cat', '/assets/cat.jpg');
  this.load.image('fish', '/assets/fishs.png');
  this.load.image('BlocH', '/assets/BlocH.jpg');
  this.load.image('BlocV', '/assets/BlocV.jpg');
  this.load.image('bomb', '/assets/bombes.png');
  this.load.image('End', '/assets/trou.png');
  this.load.image('BonHomme', '/assets/fishmonger.png');
  this.load.image('vie', '/assets/vie.png');
  this.load.audio('move', './music/move.wav');
  this.load.audio('ViCo', './music/ViCo.wav');

  this.load.audio('catmeow', './music/catmeow.wav');
  this.load.audio('lost', './music/lost.wav');
  this.load.audio('gameOver', './music/gameOver.wav');
  this.load.audio('slide', './music/slide.wav');

}
function Regfish() {
  fishs.clear(true, true);
  let positions = [
    
    { x: 150, y: 32 },
    { x: 200, y: 32 },
    { x: 250, y: 32 },
    { x: 560, y: 32 },
    { x: 510, y: 32 },
    { x: 1540, y: 32 },
    { x: 1590, y: 32 },
    { x: 1640, y: 32 },
    { x: 1560, y: 212 },
    { x: 1675, y: 298 },
    { x: 1450, y: 472 },
    { x: 1500, y: 472 },
    { x: 1280, y: 132 },
    { x: 1280, y: 163},
    { x: 1280, y: 194 },
    { x: 1280, y: 225 },
    { x: 595, y: 301 },
    { x: 595, y: 332 },
    { x: 595, y: 363 },
    { x: 595, y: 394 },
    { x: 595, y: 425 },
    { x: 868, y: 355 },
    { x: 868, y: 385 },
    { x: 868, y: 635 },
    { x: 1114, y: 635 },
    { x: 1164, y: 635 },
    { x: 1123, y: 475 },
    { x: 1173, y: 475 },
    { x: 1223, y: 475 },
    { x: 1273, y: 475 },
    { x: 25, y: 573 },
    { x: 25, y: 603 },
    { x: 25, y: 633 },
    { x: 105, y: 322 },
    { x: 155, y: 322 },
    { x: 320, y: 230 },
    { x: 320, y: 260 },
    { x: 340, y: 480 },
    { x: 340, y: 510 },
    { x: 826, y: 105 },
    { x: 826, y: 135 },
    
    { x: 1115, y: 32 },
    { x: 1165, y: 32 },
    { x: 1035, y: 256 },
    { x: 1165, y: 292 },
    { x: 1290, y: 580 },
    { x: 1320, y: 560 },
    { x: 1320, y: 600 },
    { x: 1350, y: 580 },
    { x: 1320, y: 580 },
  ];
  positions.forEach(pos => {
    fishs.create(pos.x, pos.y, 'fish');
  });
}
function RegVies() {
  vies.clear(true, true);
  let positions = [
    { x: 812, y: 20 },
    { x: 1590, y: 290 },
    { x: 250, y: 342 },
    
  ];
  positions.forEach(pos => {
    vies.create(pos.x, pos.y, 'vie'); 
  });
}
function Clossions() {
  
    //--------------ok--------------------------
  platforms.create(150, 105, 'BlocH'); // horizontal
  platforms.create(219, 105, 'BlocH');
  platforms.create(130, 130, 'BlocV');// Vertical
  platforms.create(130, 200, 'BlocV');
  platforms.create(130, 260, 'BlocV');// Vertical
  //--------------ok--------------------------
  platforms.create(420, 416, 'BlocH'); // horizontal
  platforms.create(480, 416, 'BlocH');
  platforms.create(380, 440, 'BlocV');// Vertical
  platforms.create(380, 500, 'BlocV');
  //--------------ok--------------------------
  platforms.create(1351, 380, 'BlocH'); // horizontal
  platforms.create(1420, 380, 'BlocH');
  platforms.create(1320, 405, 'BlocV');// Vertical
  platforms.create(1320, 460, 'BlocV');
  //--------------ok--------------------------
  platforms.create(1593, 255, 'BlocH'); // horizontal
  platforms.create(1662, 255, 'BlocH');
  platforms.create(1557, 280, 'BlocV');// Vertical
  platforms.create(1557, 340, 'BlocV');
  //--------------ok--------------------------
  platforms.create(1351, 130, 'BlocH'); // horizontal
  platforms.create(1420, 130, 'BlocH');
  platforms.create(1491, 130, 'BlocH');
  platforms.create(1320, 155, 'BlocV');// Vertical
  platforms.create(1320, 210, 'BlocV');
  //--------------ok--------------------------
  platforms.create(1227, 505, 'BlocH'); // horizontal
  platforms.create(1297, 505, 'BlocH');
  platforms.create(1497, 590, 'BlocH');///////////////////////////////////////
  platforms.create(1205, 552, 'BlocV');// Vertical
  platforms.create(1205, 622, 'BlocV');
  //--------------ok--------------------------
  platforms.create(1205, 352, 'BlocV');// Vertical
  platforms.create(1205, 290, 'BlocV');
  //--------------ok--------------------------
  platforms.create(1205, 39, 'BlocV');// Vertical
  platforms.create(1205, 90, 'BlocV');
  //--------------ok--------------------------
  platforms.create(380, 39, 'BlocV');// Vertical
  platforms.create(380, 90, 'BlocV');
  platforms.create(380, 150, 'BlocV');
  //--------------ok--------------------------
  platforms.create(280, 250, 'BlocV');// verticsal
  platforms.create(280, 320, 'BlocV');
  //--------------ok--------------------------
  platforms.create(290, 540, 'BlocH'); // horizontal
  platforms.create(355, 540, 'BlocH');
  //--------------ok--------------------------
  platforms.create(35, 416, 'BlocH'); // horizontal
  platforms.create(100, 416, 'BlocH');
  platforms.create(133, 416, 'BlocH');
  //--------------ok--------------------------
  platforms.create(505, 350, 'BlocV');
  platforms.create(505, 390, 'BlocV');
  // //--------------cadre bas--------------------------
  // platforms.create(290, 640, 'BlocH'); // horizontal
  // platforms.create(355, 640, 'BlocH');
  //--------------cadre bas--------------------------
  platforms.create(505, 590, 'BlocV');
  platforms.create(505, 630, 'BlocV');
  //--------------ok--------------------------
  platforms.create(1100, 505, 'BlocH'); // horizontal
  platforms.create(1160, 505, 'BlocH');
  platforms.create(1075, 412, 'BlocV');// Vertical
  platforms.create(1075, 482, 'BlocV');
  //--------------ok--------------------------
  platforms.create(1075, 215, 'BlocV');// Vertical
  platforms.create(1075, 157, 'BlocV');
  //--------------ok--------------------------
  platforms.create(989, 131, 'BlocH'); // horizontal
  platforms.create(1045, 131, 'BlocH'); // horizontal
  platforms.create(1090, 131, 'BlocH');
  //--------------ok--------------------------
  platforms.create(1130, 255, 'BlocH'); // horizontal
  platforms.create(1180, 255, 'BlocH');
  //--------------ok--------------------------
  platforms.create(1093, 255, 'BlocH'); // horizontal
  platforms.create(1162, 255, 'BlocH');
  platforms.create(1557, 280, 'BlocV');// Vertical
  platforms.create(1557, 340, 'BlocV');
  //---------------------ok-------------------
  platforms.create(905, 600, 'BlocV');
  platforms.create(905, 630, 'BlocV');
  //---------------------ok-------------------
  platforms.create(870, 286, 'BlocH'); // horizontal
  platforms.create(830, 286, 'BlocH');
  platforms.create(790, 286, 'BlocH');
  platforms.create(905, 430, 'BlocV');
  platforms.create(905, 370, 'BlocV');
  platforms.create(905, 310, 'BlocV');
  platforms.create(870, 450, 'BlocH'); // horizontal
  platforms.create(830, 450, 'BlocH');
  platforms.create(790, 450, 'BlocH');
  //---------------------ok-------------------
  platforms.create(690, 166, 'BlocH'); // horizontal
  platforms.create(730, 166, 'BlocH');
  platforms.create(790, 166, 'BlocH');
  platforms.create(785, 35, 'BlocV');
  platforms.create(785, 90, 'BlocV');
  platforms.create(785, 130, 'BlocV');
  //---------------------ok-------------------
  platforms.create(490, 90, 'BlocH'); // horizontal
  platforms.create(500, 90, 'BlocH');
  platforms.create(560, 90, 'BlocH');
  platforms.create(635, 420, 'BlocV');
  platforms.create(635, 370, 'BlocV');
  platforms.create(635, 310, 'BlocV');
  //---------------------ok-------------------
  platforms.create(655, 566, 'BlocH'); // horizontal
  platforms.create(730, 566, 'BlocH');
  platforms.create(695, 590, 'BlocV');
  platforms.create(695, 630, 'BlocV');
  //---------------------ok-------------------
  platforms.create(498, 210, 'BlocH');
  platforms.create(80, 540, 'BlocH');
  platforms.create(30, 140, 'BlocH');
}
function create() {
  this.add.image(0, 0, 'parquet').setOrigin(0, 0);
  cat = this.physics.add.image(40, 30, 'cat');
  cat.body.collideWorldBounds = true;
  cat.body.setGravityY(1000);
  presse = this.input.keyboard.createCursorKeys();
  platforms = this.physics.add.staticGroup();
  fishs = this.physics.add.staticGroup();
  
  bombs = this.physics.add.group();
  BonHomme = this.physics.add.image(1630, 410, 'BonHomme');
  this.physics.add.overlap(cat, BonHomme, endGame, null, this);
  vies = this.physics.add.staticGroup();
  Regfish();
  RegVies();
  this.add.image(1640, 630, 'End');
  this.physics.add.collider(cat, platforms);
  this.physics.add.overlap(cat, fishs, collectFishs, null, this);
  Clossions();
  this.physics.add.collider(bombs, platforms);

  this.physics.add.collider(cat, bombs, hitBomb, null, this);
  this.physics.add.collider(BonHomme, platforms);
  this.physics.add.overlap(cat, vies, collectVies, null, this);
  hangeBHt();
  BonHommeNextMoveTime = this.time.now + BonHommeMoveDelay;
  moveSound = this.sound.add('move');
  ViCoSound = this.sound.add('ViCo');
  catmeowSound = this.sound.add('catmeow');
  lostSound = this.sound.add('lost'); 
  slideSound = this.sound.add('slide');

}
function hangeBHt() {
  
  const directions = [
    
    { x: 3, y: 0 },
    { x: -3, y: 0 },
    { x: 0, y: 3 },
    { x: 0, y: -3 }
  ];
  const randomIndex = Phaser.Math.Between(0, directions.length - 1);
  BonHommeDirection = directions[randomIndex];
}
function update(time) {
  if (gameOver || inPause) {
    return;
  }
 
  cat.setVelocity(0);
  if (presse.up.isDown) {
    slideSound.play();
    cat.setVelocityY(-300);
  }
  if (presse.right.isDown) {
    slideSound.play()
    cat.setVelocityX(300);
  }
  if (presse.left.isDown) {
    slideSound.play()
    cat.setVelocityX(-300);
  }
  if (presse.down.isDown) {
    slideSound.play()
    cat.setVelocityY(500);
  }
  if (time > BonHommeNextMoveTime) {
    hangeBHt();
    BonHommeNextMoveTime = time + BonHommeMoveDelay;
  }
  BonHomme.setVelocity(BonHommeDirection.x * 100, BonHommeDirection.y * 100);
  if (BonHomme.x < 0) BonHomme.x = 0;
  if (BonHomme.x > config.width) BonHomme.x = config.width;
  if (BonHomme.y < 0) BonHomme.y = 0;
  if (BonHomme.y > config.height) BonHomme.y = config.height;
}
function collectFishs(cat, fish) {
  
  fish.disableBody(true, true);
  score += 10;
  document.getElementById('score').innerText = 'Score: ' + score;
  moveSound.play();
  
  if (fishs.countActive(true) === 0) {
    var x = (cat.x < 850) ? Phaser.Math.Between(850, 1700) : Phaser.Math.Between(0, 850);
    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-40, 40), 40);
    Regfish();
    RegVies();
  }
}
function collectVies(cat, vie) {
  vie.disableBody(true, true);
  lives++; 
  document.getElementById('lives').innerText = 'Lives: ' + lives;
  ViCoSound.play();

}
function hitBomb(cat, bomb) {
  bomb.disableBody(true, true);
  if (lives > 1) {
    lives--; 
    document.getElementById('lives').innerText = 'Lives: ' + lives;
    ViCoSound.play();
    cat.setTint(0xff0000);
    this.time.delayedCall(1000, () => {
      cat.clearTint();
      cat.setPosition(40, 30);
    });
  } 
  else {
    this.physics.pause();
    cat.setTint(0xff0000);
    gameOver = true;
    setTimeout(() => {
      this.physics.resume();
      cat.clearTint();
      cat.setPosition(40, 30);
      score = 0;
      lives = 0; 
      document.getElementById('score').innerText = 'Score: ' + score;
      document.getElementById('lives').innerText = 'Lives: ' + lives;
      gameOver = false;
      Regfish();
      RegVies();
    },1000 );
  }
}
function endGame() {
  if (inPause) return;
    if (lives > 0) {
      lives--; 
      document.getElementById('lives').innerText = 'Vies: ' + lives;
      inPause = true;
      this.physics.pause(); 
      cat.setTint(0xff0000); 
      
      this.time.delayedCall(1000, () => {
        inPause = false;
        cat.clearTint();
        cat.setPosition(40, 30); 
        this.physics.resume(); 
      });
      
    } else {
        this.physics.pause();
        cat.setTint(0xff0000);
        lostSound.play();
        catmeowSound.play();
        gameOver = true;
      }
}