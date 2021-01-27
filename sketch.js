//Create variables here
var  dog,dogImg, happyDog, database, foodS, foodStock;

function preload()
{
  dogImg = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
	createCanvas(500,500);
  dog = createSprite(250,300,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);

  drawSprites();
  //add styles here

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  fill("white");
  stroke("black");
  strokeWeight(2)
  textSize(15);
  text("Note: Press UP_ARROW key to feed Drago milk!",100,480);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  } else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}


