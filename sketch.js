var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var survivalTime = 0;
var ground;
var score = 0;
var gameoverImage,gameover,restart,restartImage;
var backgroundImage,background1;

function preload(){
  
  
  monkey_running =    loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  gameoverImage = loadImage("gameover.jpg");
  restartImage = loadImage("restart.jpg");
  backgroundImage = loadImage("jungle.jpg");
}



function setup() {
 createCanvas(600,500); 
  
  background1 = createSprite(300,250,600,500);
  background1.addImage("jungle",backgroundImage);
  
  monkey = createSprite(130,400,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(300,450,1200,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  gameover = createSprite(300,100,100,20);
  gameover.addImage("gameover",gameoverImage);
  gameover.scale = 0.2;
  
  restart = createSprite(300,250,50,50);
  restart.addImage("restart",restartImage);
  restart.scale = 0.2;
  
  monkey.setCollider("circle",0,0,300);
  
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
 survivalTime = 0;
 score = 0;
}


function draw() {
background("white");
  
  
  
  
  if(gameState===PLAY){
   
    background1.velocityX = -4;
    if(background1.x < 0){
      background1.x = background1.width/2;
    }
    
 
    
    
    
    ground.velocityX = -4; 
    if(ground.x < 0){
    ground.x = ground.width/2;
  }
   if(keyDown("space")&& monkey.y>= 383.6){
  monkey.velocityY = -12;  
  } 
  monkey.velocityY = monkey.velocityY + 0.25;
   
  obstacles();
  food();
   ground.visible = false; 
  gameover.visible = false;
  restart.visible = false;
    survivalTime = Math.ceil(frameCount/frameRate());
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score =score +2;
  }
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
      monkey.scale = 0.2;
    }
  
  
  }
  else if(gameState===END){
    gameover.visible = true;
    restart.visible = true;
    ground.visible = false;
    ground.velocityX = 0;
    monkey.velocityY = 0;
  
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    if(mousePressedOver(restart)){
      restart1();
    }
  }
  
  
  
  console.log(monkey.y);
  monkey.collide(ground);
  
  
  drawSprites();
   stroke("yellow");
  textSize(20);
  fill("yellow");
  text("score ="+score,500,50);

stroke("black");
  textSize(20);
  fill("black");
  
  text("SurvivalTime:"+survivalTime,100,50);
}

function restart1(){
gameState = PLAY; 
 gameover.visible = false;
 restart.visible = false;
 obstacleGroup.destroyEach();
 bananaGroup.destroyEach();
 score = 0;
 frameCount = 0;
}


function food(){
  if(frameCount % 80===0){
  banana = createSprite(300,200,20,20);
  banana.y = Math.round(random(120,200));  
  banana.addImage("banana",bananaImage);
  banana.scale = 0.05;
  banana.velocityX = -3;
  banana.lifetime = 300;
  
    switch(score){
      case 10:monkey.scale=0.22;    
              break;
      case 20:monkey.scale = 0.24;
              break;
      case 30:monkey.scale = 0.26;
              break;
      case 40:monkey.scale = 0.28;
              break;
      default:break;
    }
    
   banana.depth = monkey.depth;
   monkey.depth = monkey.depth+1; 
    
    bananaGroup.add(banana);
  }
}

function obstacles(){
if(frameCount % 300===0){
  obstacle = createSprite(400,390,60,89); 
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.scale = 0.3;
  obstacle.velocityX = -3;
  obstacle.lifetime = 300;
  
  obstacleGroup.add(obstacle);
  obstacle.setCollider("circle",0,0,200);
  
  
 }
}