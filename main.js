video="";
status="";
object=[];
function preload (){
video=createVideo("video.mp4");

}
function setup(){
canvas=createCanvas(480,380);
canvas.center();
video.hide();

}
function got_results(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        object=results;
    }
}
function draw(){
image(video,0,0,480,380);
if(status!=""){
    object_detecter.detect(video,got_results);
    for(i=0;i<object.length;i++){
        document.getElementById("status").innerHTML="Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML="Number Of Objects Dectected are : "+object.length;
        fill("blue");
        percent=floor(object[i].confidence*100);
    text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+20);
    noFill();
    stroke("blue");
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
    }
}

}
function start(){
    object_detecter=ml5.objectDetector('cocossd',model_loaded);
}
function model_loaded(){
    console.log("model loaded");
    status=true;
    video.loop();
    video.speed(1.3);
    video.volume(0.5);
}