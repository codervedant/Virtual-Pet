   var dog, sadDog, happyDog, database;

   var foodS, foodStock;
   var addFood, FeedDog;
   var foodObj;

   var feed, lastFed;
   var fedTime;


 function preload(){
     sadDog = loadImage("Dog.png");
     happyDog = loadImage("happy dog.png");
}


 function setup() {
     database = firebase.database();

     createCanvas(1000, 400);

     foodObj = new Food();

     foodStock = database.ref('Food');
     foodStock.on("value", readStock);
  
     dog = createSprite(800, 200, 150, 150);
     dog.addImage(sadDog);
     dog.scale = 0.15;

     FeedDog = createButton("Feed the Dog");
     FeedDog.position(700, 95);
     FeedDog.mousePressed(feedDog);

     addFood = createButton("Add Food");
     addFood.position(800, 95);
     addFood.mousePressed(addFoods);
}


 function draw() {

     background(46,139,87);

     foodObj.display();

     fedTime = database.ref('FeedTime');
     fedTime.on("value",function(data){
     lastFed = data.val();
})

     fill("black");
     textSize(15);

  if(lastFed >= 12){
     text("Last Fed: " + lastFed % 12 + " PM", 350, 30);
} else{
    text("Last Fed: " + lastFed + " AM", 350, 30);
}

     drawSprites();
}


 function readStock(data){
     foodS = data.val();
     foodObj.updateFoodStock(foodS);
}


 function feedDog(){
     dog.addImage(happyDog);
     
     foodS = foodS - 1;

     database.ref('/').update({
     Food: foodS,
     FeedTime: hour()
})
}


 function addFoods(){
     dog.addImage(sadDog);
     foodS++;
     database.ref('/').update({
     Food:foodS
})
}
