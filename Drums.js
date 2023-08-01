img = "";
status = "";
objects = [];

function setup(){
    canvas = createCanvas(420, 500);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting";
}

function modelLoaded(){
    status = true;
    console.log("Model Loaded");
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);

    objects = results;
}

function home(){
    window.location.href = "index.html"
}

function preload(){
    img = loadImage("Drums.jpg");
}

function draw(){
   image(img, 0, 0, 420, 500); 
   
   if(status != "")
   {

     for(i = 0; i < objects.length; i++)
     {
      document.getElementById("status").innerHTML = "Object Detected";
      document.getElementById("number_of_objects").innerHTML = "Out of 2 main objects the cocossd model has detected " + objects.length + "objects."
      fill("red");
      noFill();
      stroke("red");
      percent = Math.floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
     }  

   }

  
}