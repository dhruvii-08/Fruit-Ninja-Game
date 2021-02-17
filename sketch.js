var PLAY=1;
var END=0;
var gameState=1;

var sword, swordImage;
var knifeSwooshSound;

var score;

var fruitGroup, fruitImage1,fruitImage2,fruitImage3,fruitImage4;
var enemyGroup, enemyImage1,enemyImage2;


var gameOver, gameOverImage;
var gameOverSound;


function preload(){
  
  swordImage = loadImage("sword.png");
  
  fruitImage1 = loadImage("fruit1.png");
  fruitImage2 = loadImage("fruit2.png");
  fruitImage3 = loadImage("fruit3.png");
  fruitImage4 = loadImage("fruit4.png");
  
  enemyImage1 = loadImage("alien1.png");
  enemyImage2 = loadImage("alien2.png");
  
  gameOverImage = loadImage("gameover.png");
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  
  gameOverSound = loadSound("gameover.mp3");
  
}

function setup(){
  createCanvas(700,400);
  
  
  //creating sword
  sword=createSprite(40,200,20,20);
  sword.addImage("sword",swordImage);
  sword.scale=0.7;
  
  //creating groups
  fruitGroup = new Group();
  enemyGroup = new Group();
  
  score=0;
  
}

function draw(){
  background ("pink")
  fruits();
  Enemy();
 if(sword.isTouching(enemyGroup)){
     gameState = END
   //gameOver sound
   gameOverSound.play();
 }
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    
    knifeSwooshSound.play();
    score=score+2;
  }
  
  if(gameState===PLAY){
     //move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  }
  if(gameState===END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.velocityX=0;
    enemyGroup.velocityX=0;
    sword.addImage("sword",gameOverImage);
    sword.x=200;
    sword.y=200;
    sword.scale=1;
  }


drawSprites();
  text("Score:"+ score, 600,20);
}

 function fruits(){
    if(World.frameCount%80===0){
      var position = Math.round(random(1,2));
      fruit = createSprite(400,200,20,20);
      fruit.scale=0.2;
      //fruit.debug=true
      var r=Math.round(random(1,4));
      if(r==1){
        fruit.addImage(fruitImage1)
      }else if(r==2){
        fruit.addImage(fruitImage2)
      }else if (r==3){
        fruit.addImage(fruitImage3)
      }else if(r==4){
        fruit.addImage(fruitImage4)
      }
      if(position == 1){
         fruit.x=400;
         fruit.velocityX=-(7+(score/4));
         }
      else if(position == 2){
        fruit.x=0;
         fruit.velocityX=(7+(score/4));
              }
 
   fruit.y = Math.round(random(50,340));
   fruit.setLifetime=100;
   fruitGroup.add(fruit);
  }
}
function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",  enemyImage1, enemyImage2);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}
  
  
