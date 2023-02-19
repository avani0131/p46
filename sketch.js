
var runner,runnerImg
var score=0
var mud, water, hurdle, twoXS, hurdleImg, twoXImg, restartImg, mudImg, waterImg
var mudG, waterG, hurdleG, twoXG, girlImg
var energy = 400

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload()
  {

    bgImg = loadImage("assets/Cloud.jpeg")
    roadImg = loadImage("assets/Road.png")
    runnerImg = loadImage("assets/Runner.png")
    mudImg = loadImage("assets/Mud.png")
    waterImg = loadImage("assets/Water Bottle.png")
    hurdleImg = loadImage("assets/Hudle.png")
    twoXImg = loadImage("assets/2x.png")
    restartImg = loadImage("assets/Restart.png")
    gameOverImg = loadImage("assets/gameOver.png");
    girlImg = loadAnimation("assets/sprite_00.png","assets/sprite_01.png","assets/sprite_02.png",
    "assets/sprite_03.png","assets/sprite_04.png","assets/sprite_05.png","assets/sprite_06.png",
    "assets/sprite_07.png","assets/sprite_08.png","assets/sprite_09.png","assets/sprite_10.png",
    "assets/sprite_11.png","assets/sprite_12.png","assets/sprite_13.png","assets/sprite_14.png")

  }

function setup(){

  createCanvas(1200,600);
  // Moving background
  road=createSprite(100,300);
  road.addImage(roadImg);
  road.velocityX = -5;



//create runner
runner = createSprite(70,300);
runner.addAnimation("run",girlImg);
runner.scale = 0.5;

gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  

mudG = createGroup();
waterG = createGroup();
hurdleG = createGroup();
twoXG = createGroup();


}
  
function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Score: "+ score,900,30);
  fill("#424949")
  rect(10,10,400,20);
  fill("blue");
  rect(10,10,energy,20);
  noStroke();
  if(gameState===PLAY){
    
   score = score + Math.round(getFrameRate()/50);
   //road.velocityX = -(6 + 2*score/150);
  
  runner.y = World.mouseY;
   
   /*if (keyDown(UP_ARROW)){

    runner.y -= 5
   }

   if (keyDown(DOWN_ARROW)){

    runner.y +=5
   }*/

   //if (keyDown("SPACE")){

   // runner.velocityY = -10
   //}
   
   //runner.velocityY += 0.9;
  
   edges= createEdgeSprites();
   runner .collide(edges);
  
  //code to reset the background
  if(road.x < 0 ){
    road.x = width/2;
  }
  
    //code to play cycle bell sound
  /*if(keyDown("space")) {
    cycleBell.play();
  }*/
  
  //creating continous opponent players
  var count = Math.round(random(1,4));
  if(frameCount % 120 === 0)
  {
    if(count === 1)
    {
      mudPuddle();
    }
    else if(count === 2)
    {
      waterBottle();
    }
    else if(count === 3)
    {
      hurdles();
    }
    else
    {
      twoXS();
    }
  }
  
   if(mudG.isTouching(runner))

      {
      road.velocityX = -3; 
      energy -= 20;
      runner.y += 20
      }
        
    if(hurdleG.isTouching(runner))

      {
       road.velocityX = -1;
       energy -= 30;
       runner.y += 20
      }
    
    if(waterG.isTouching(runner))

    { 
     road.velocityX = -8
     energy += 20;
     runner.y += 20
    }

    if(twoXG.isTouching(runner))

    { 
     road.velocityX = -8 
     energy += 40;
     runner.y += 20
    }
    
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    road.velocityX = 0;
    runner.velocityY = 0;
   
  
    mudG.setVelocityXEach(0);
    mudG.setLifetimeEach(-1);
  
    waterG.setVelocityXEach(0);
    waterG.setLifetimeEach(-1);
  
    hurdleG.setVelocityXEach(0);
    hurdleG.setLifetimeEach(-1);

    twoXG.setVelocityXEach(0);
    twoXG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
}
}




function mudPuddle()
{
    mud =createSprite(1200,Math.round(random(50, 250)));
    mud.scale =0.5;
    mud.velocityX = -(6 + 2*score/150);
    mud.addImage(mudImg);
    mud.setLifetime=170;
    mudG.add(mud);
}

function waterBottle()
{
    water=createSprite(1100,Math.round(random(50, 250)));
    water.scale =0.04;
    water.velocityX = -(6 + 2*score/150);
    water.addImage(waterImg);
    water.setLifetime=170;
    waterG.add(water);
  }

function hurdles()
{
      hurdle =createSprite(1100,Math.round(random(50, 250)));
      hurdle.scale =0.5;
      hurdle.velocityX = -(6 + 2*score/150);
      hurdle.addImage(hurdleImg);
      hurdle.setLifetime=170;
      hurdleG.add(hurdle);
}

function twoXS()
{

      twoX =createSprite(1100,Math.round(random(50, 250)));
      twoX.scale =0.2;
      twoX.velocityX = -(6 + 2*score/150);
      twoX.addImage(twoXImg);
      twoX.setLifetime=170;
      twoXG.add(twoX);
}

function reset()
{
  gameState = PLAY;
  gameOver.visible = false;
  
  mudG.destroyEach();
  hurdleG.destroyEach();
  waterG.destroyEach();
  twoXG.destroyEach();
  score = 0;
}

