gameState = 0;
var state = "play";
var character;
var Natasha, Jack;
var zombies;
var maleShooter;
var score = 0;
function preload(){
  introZombieImg = loadImage("images/introzo.png");
  Target         = loadImage("images/target.png");
  maleGuy        = loadImage("images/male.png");
  femaleGirl     = loadImage("images/female.png");
  theBoy         = loadImage("images/boy.png");
  zombiebg       = loadImage("images/zombiebg.jpg");
  shootingFemale = loadImage("images/shootingFemale.png");
  shootingMale   = loadImage("images/shootingMale.png");
  zombie_walking = loadAnimation("images/zombie1.png", "images/zombie1.png",
                                 "images/zombie3.png","images/zombie4.png",
                                 "images/zombie5.png","images/zombie6.png");
  zombie_sound = loadSound("sounds/playZom.mp3");
}

function setup() {
 createCanvas(750, 500);

 target = createSprite(250,250);
 target.addImage(Target);
 target.scale=0.1;
 target.visible = false;

 zombiesGroup = createGroup();

}

function draw() {
  background("lightBlue");
  
  if(gameState === 0){
  Introduction();
  }

  if(gameState === 1){
    Instructions();
    }
  
 if(state === "play"){
    
    if(gameState===2){
      GoalForMale();
    }

    if(gameState===3){
       GoalForFemale();
    }

     if(character === "female"){
       playForFemale();
       spawnZombie();
      // setTimeout(function(){
        // zombie_sound.play();
     // }, 10000);
     for(i = 0; i<zombiesGroup.length; i++){
      if(mousePressedOver(zombiesGroup.get(i))){
        zombiesGroup.get(i).destroy();
        score = score+1;
      } 
    }
      textSize(25);
      fill("green");
      textStyle(BOLD);
      text("SCORE : "+score , 50 , 100);          

       target.visible=true;
       target.x = mouseX;
       target.y = mouseY;
     }

     if(character === "male"){
       playForMale();
       spawnZombie();

      for(i = 0; i<zombiesGroup.length; i++){
        if(mousePressedOver(zombiesGroup.get(i))){
          zombiesGroup.get(i).destroy();
          score = score+1;
        }

     if(boy.isTouching(zombiesGroup.get(i))){
        zombiesGroup.get(i).destroy();
        state = "end";
        console.log(state);
   }

      }

      textSize(25);
      fill("green");
      textStyle(BOLD);
      text("SCORE : "+score , 50 , 100);

      // setTimeout(function(){
      // zombie_sound.play();
      // }, 10000);

       target.visible=true;
       target.x = mouseX;
       target.y = mouseY;
    }
  }
   
  drawSprites();
 
  
  if(state === "end"){
    end();
  }

}

function Introduction() {
  background("black");
  fill("white");
  textStyle(BOLD);
  textSize(25);
  text("HELLO WORLD WELCOME TO ZOMBIE APOCALYPSE", 50, 250);
   
  image(introZombieImg, 300 , 80 , 150, 150);

  textSize(18);
  textStyle(ITALIC);
  text("Click Anywhere On The Screen To Continue", 200 , 400);
 
  if(mouseIsPressed){
    gameState=1;
  }

}

function Instructions(){
  background("black");
  textSize(30);
  fill("white");
  text("READ THE INSTRUCTIONS CAREFULLY", 100 , 30);
   
  image(Target , 320 , 100 , 100 , 100); 
  textSize(20);
  fill("white");
  text("This is your aim point", 260 , 230);
  text("You should target it to the zombies and shoot them completely using your mouse", 20, 250);
  
  textStyle(BOLD);
  text("Choose Your Fighter", 260, 300);
  
  image(maleGuy , 100 , 260 , 210 , 210);
  image(femaleGirl , 450 , 270 , 210, 210);
  
  textSize(15);
  textStyle(BOLDITALIC);
  text("Press 'LEFT ARROW' For Jack", 80 ,480);
  
  textSize(15);
  textStyle(BOLDITALIC);
  text("Press 'RIGHT ARROW' For NATASHA", 400 ,480);

  if(keyDown("left")){
      gameState = 2;
  }
  if(keyDown("right")){
    gameState=3;
  }

}

function GoalForMale(){
  background("black");

  textSize(23);
  fill("white");
  textStyle(BOLD);
  text("Your Goal is to Protect The Boys From The Zombie Apocalypse", 20 , 100);

  image(theBoy , 100 , 130 , 150,200);

  textStyle(BOLDITALIC);
  fill("red");
  text("PRESS 'ENTER' TO START", 200 , 450);

  if(keyDown("enter")){
    character="male";
  }
  
}

function GoalForFemale(){
  background("black");

  textSize(23);
  fill("white");
  textStyle(BOLD);
  text("Your Goal is to Protect The Boys From The Zombie Apocalypse", 20 , 100);

  image(theBoy , 100 , 130 , 150,200);

  textStyle(BOLDITALIC);
  fill("red");
  text("PRESS 'ENTER' TO START", 200 , 450);

  if(keyDown("enter")){
  character="female";
}
}

function playForMale(){
 background(zombiebg);
 
boy = createSprite(80,400, 100,150);
boy.addImage(theBoy);
boy.scale = 0.3/2;
boy.visible = true;

maleShooter = createSprite(250 , 400);
maleShooter.addImage(shootingMale);
maleShooter.scale = 0.5/2;
maleShooter.visible = true; 

}

function playForFemale(){
  background(zombiebg);
 
 image(theBoy, 50,350, 100,150);
 
 femaleShooter = createSprite(250 , 400);
 femaleShooter.addImage(shootingFemale);
 femaleShooter.scale = 0.2;

}

function spawnZombie(){

  if(frameCount % 80=== 0){
    zombies = createSprite(730,30);
    zombies.y = Math.round(random(360,490));
    zombies.addAnimation("walking",zombie_walking);
    zombies.scale = 0.4;
    zombies.velocityX = -4;

    zombies.depth = target.depth;
    target.depth = target.depth+1;

    zombiesGroup.add(zombies);
 }

}

function end(){
  zombiesGroup.destroyEach();

  End  = createSprite(750,500,1750,1500);
  End.shapeColor = "black";

  textSize(30);
  textStyle(BOLD);
  fill("white");
  text("THE END" , 250,250);

 


}

