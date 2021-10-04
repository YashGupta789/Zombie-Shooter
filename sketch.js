var bgImg,bg,box;
var bulletCount = 10;
var zombieKilled = 0;
var gameState = "start"; 
var bullet,bulletImg,bulletGroup;
var firing, firingImg, gun, gunGroup;
var startA,startB,gameOverImg,gameOver;
var start1,start2,howToPlay,instruction;
var reload = new Audio('sounds/reload.mp3');
var gunSound = new Audio('sounds/gunshot.mp3');
var dyingSound = new Audio('sounds/dying.mp3');
var player, playerImg, dyingImg, knifeImg, jumpingImg;
var zombie1, zombie1Img, zombie2, zombie2Img, zombie3, zombie3Img,zombie4, zombie4Img, zombie5, zombie5Img, zombieGroup;

function preload(){   
    box = loadImage("images/box4.jpg")
    bgImg = loadImage("images/bg.jpg");  
    startA = loadImage("images/startA.png");
    startB = loadImage("images/startB.png");
    firingImg = loadImage("images/firing.png");
    game = loadImage("images/zombieShooter.png");
    bulletImg = loadImage("images/bullets2.png");
    dyingImg = loadAnimation("images/dying.png");   
    gameOverImg = loadImage("images/gameover.png");
    playerImg = loadAnimation("images/1.png","images/2.png","images/3.png","images/4.png","images/5.png");
    knifeImg = loadAnimation("images/knife1.png","images/knife2.png","images/knife3.png","images/knife4.png");
    jumpingImg = loadAnimation("images/jump4.png","images/jump4.png","images/jump5.png","images/jump6.png");
    zombie1Img = loadAnimation("images/zombie11.png","images/zombie12.png","images/zombie13.png","images/zombie14.png","images/zombie15.png","images/zombie16.png");
    zombie2Img = loadAnimation("images/zombie21.png","images/zombie22.png","images/zombie23.png","images/zombie24.png","images/zombie25.png","images/zombie26.png","images/zombie27.png","images/zombie28.png","images/zombie29.png","images/zombie30.png");
    zombie3Img = loadAnimation("images/zombie31.png","images/zombie32.png","images/zombie33.png","images/zombie34.png","images/zombie35.png","images/zombie36.png","images/zombie37.png","images/zombie38.png","images/zombie39.png");
    zombie4Img = loadAnimation("images/zombie44.png","images/zombie45.png","images/zombie46.png","images/zombie47.png","images/zombie48.png","images/zombie49.png");
    zombie5Img = loadAnimation("images/zombie51.png","images/zombie52.png","images/zombie53.png","images/zombie54.png","images/zombie55.png","images/zombie56.png","images/zombie57.png","images/zombie58.png");
}

function setup(){
    createCanvas(1300,700);
    
    bg = createSprite(3000,350);
    bg.addImage(bgImg);
    bg.scale = 0.7;
   
    player = createSprite(150,530);
    player.addAnimation("plr",playerImg);
    player.scale = 0.6;
    player.debug = false;
    player.setCollider("rectangle",0,40,250,340);

    ground = createSprite(300,640,600,20);
    ground.visible = false;
    upperGround = createSprite(300,220,500,20);
    upperGround.visible = false;

    bulletGroup = new Group();
    zombieGroup = new Group();
    gunGroup = new Group();

    howToPlay = createButton('HOW TO PLAY');
    howToPlay.position(540,470);
    howToPlay.style("height","30px");
    howToPlay.style("width","190px");
    howToPlay.style('font-size','21px');
    howToPlay.style('background','rgb(80, 255, 240)');
           
    start1 = createButton('PLAY');
    start1.position(540,520);
    start1.style("height","30px");
    start1.style("width","190px");
    start1.style('font-size','24px');
    start1.style('background','rgb(80, 255, 240)');
}

function draw(){

    player.collide(ground);
    player.collide(upperGround);
    player.velocity.y = player.velocity.y+0.6;

    drawSprites();

    textSize(40);
    textFont("MV Boli");
    fill("yellow");
    text("Bullet Left : "+bulletCount,40,130);

    textSize(40);
    textFont("MV Boli");
    fill("yellow");
    text("Zombie Killed: "+zombieKilled,920,130);

    if(gameState === "start"){
        background(184,243,77);

        //only when keycode is 83 and gamestate is start we need to start the game
        if(keyCode===83 && gameState==="start" ){
            gameState = "game";
        }    

        start1.mousePressed(()=>{gameState = "game"});
        howToPlay.mousePressed(()=>{           
            gameState = "howPlay"         
        })

        image(game,400,160,450,250);
        image(startA,880,120,300,400);
        image(startB,100,100,235,420);
    }

    if(gameState === "howPlay"){
        background(184,243,77);
        howToPlay.hide();
        image(box,370,280,550,250);
        textSize(25);
        fill(0);
        text("!!!Be Careful!!!",560,320);
        text("You Are Entering In Zombie Game",430,350);
        text("Press X To         -  Use Knife",480,400)
        text("Press Space To     -  Shoot",480,450);
        text("Press UP Arrow To -  Jump",480,500);
        start1.position(550,560);
        image(game,400,25,450,250);
        image(startA,900,120,300,400);
        image(startB,80,100,235,420);
    }


    if(gameState === "game"){
        bg.velocity.x = -(5+3*zombieKilled/15);
        if(bg.x<0){
           bg.x = bg.width/3;
        }
        start1.hide();
        howToPlay.hide();

        //Use keywent down and key went up to add and change the animation back to what we need
       if(keyWentDown("UP_ARROW") && gameState==="game"){
            player.velocityY = -20;
            player.addAnimation("plr",jumpingImg);
            player.scale = 0.69;
        }
        player.velocityY = player.velocityY+0.5;

        if(keyWentUp("UP_ARROW")&& gameState==="game"){
            player.addAnimation("plr",playerImg)
            player.scale = 0.6;
            player.setCollider("rectangle",0,40,250,340);
        }

        //Here instead of keycode, we use key went down and key went up to say what should happen when we press X and what should happen when we release X
        if(keyWentDown("X") && gameState==="game"){
            player.addAnimation("plr",knifeImg);
            player.scale = 0.99;
            player.setCollider("rectangle",0,0,300,250);
        }
        if(keyWentUp("X")&& gameState==="game"){
            player.addAnimation("plr",playerImg)
            player.scale = 0.6;
            player.setCollider("rectangle",0,40,250,340);
        }


        if(player.isTouching(bulletGroup)){
            bulletCount = bulletCount+5;
            bulletGroup[0].destroy();
            reload.play();
        }
     
        if(gunGroup.isTouching(zombieGroup)){
            zombieGroup[0].destroy();
            gunGroup[0].destroy();
            zombieKilled = zombieKilled+1;
        }
     
        if(player.isTouching(zombieGroup)){
            gameState = "end" ;
            dyingSound.play();
        }
         spawnzombie();
         spawnbullets();
    }

    if(gameState === "end"){
        bg.velocity.x = 0;
        bulletGroup.destroyEach();
        gameOver = createSprite(630,300);
        gameOver.addImage(gameOverImg);
        restart = createButton('RESTART');
        restart.position(550,480);
        restart.style("height","30px");
        restart.style("width","190px");
        restart.style('font-size','26px');
        restart.style('background','rgb(164, 164, 253)');
        restart.mousePressed(()=>{
            location.reload();
        })
        ground.y = 800;
        player.y = 610;
        player.scale = 1;
        player.addAnimation("plr",dyingImg);
    }
    
}

function gunshot(){
    gun = createSprite(player.x+80,player.y-40);
    gunSound.play();
    gun.addImage(firingImg);
    gun.scale = 0.2;
    gun.velocity.x = gun.velocity.x+25;
    bulletCount = bulletCount-1;
    gunGroup.add(gun);
    gun.debug = false;
    gun.setCollider("rectangle",100,0,250,50)
}

function spawnbullets(){ 
    if(frameCount%250===0){  
        bullet = createSprite(1000,300);
        bullet.addImage("bullet",bulletImg);
        bullet.scale = 0.4;
        bullet.velocity.x = -20;
        bulletGroup.add(bullet);
        bullet.debug = false;
    }
}

function spawnzombie(){
    if(frameCount%47 === 0){
        zombie1 = createSprite(1400,500);
        r1 = Math.round(random(1,5));
        switch(r1){
            case 1 : zombie1.addAnimation("zombie",zombie1Img);zombie1.scale = 1.3;zombie1.y=520;zombie1.setCollider("rectangle",0,0,70,140);
            break;
            case 2 : zombie1.addAnimation("zombie",zombie2Img);zombie1.scale = 0.58;zombie1.y=520;zombie1.setCollider("rectangle",15,0,100,300);
            break;
            case 3 : zombie1.addAnimation("zombie",zombie3Img);zombie1.scale = 1.1;zombie1.y=500;zombie1.setCollider("rectangle",10,0,50,200)
            break;
            case 4 : zombie1.addAnimation("zombie",zombie4Img);zombie1.scale = 0.5;zombie1.y=525;zombie1.setCollider("rectangle",-10,0,150,320);
            break;
            case 5 : zombie1.addAnimation("zombie",zombie5Img);zombie1.scale = 1;zombie1.y=520;zombie1.setCollider("rectangle",0,0,100,160)
            break;
            default : break;
        }
        zombie1.velocity.x = -(3+3*zombieKilled/15);
        zombieGroup.add(zombie1);
        zombie1.debug = false  ;
    }
}

function keyPressed(){
    if(gameState === "game"){
      if(keyCode===32 && bulletCount>0){
        gunshot();    
      }  
    }
    
}