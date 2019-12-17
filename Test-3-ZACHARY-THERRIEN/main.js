let canvas = document.getElementsByTagName('canvas')[0];
let context = canvas.getContext('2d');  //Referenced from 7.2-Starting-With-Canvas
let key;
const MAX = 1;
let countRecs = MAX;
let time = 0;
myRectangles = new Array(MAX); //Referenced from 7.2-Starting-With-Canvas

canvas.addEventListener('keydown', Destroy); //Referenced from 7.3-Car-Simulation

//Create circles.
for(let num = 0; num < MAX; num++){
    let x = (Math.random()*200);
    let y = (Math.random()*100);
    let speed = Math.floor((Math.random() * 10)/2);
    while(speed == 0)
        speed = Math.floor((Math.random() * 10)/2);
    if(Math.random() * 100 < 0.5)
        speed = speed * -1;
    let directionX = Math.floor(Math.random()*360);
    let directionY = Math.floor(Math.random()*360);
    myRectangles[num] = new Rec(x, y, speed, directionX, directionY);
}

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width,canvas.height); //Referenced from 7.2-Starting-With-Canvas
    for(Recs of myRectangles){
        Recs.update();
    }
    //if(key.keyCode == 32){ //Referenced from https://stackoverflow.com/questions/24386354/execute-js-code-after-pressing-the-spacebar/24386518
        
    //}
    context.font = "12px Arial";
    context.fillText(`Time: ${time.toFixed(0)}`, 8, 10);
    time += 0.01;
}

function Destroy(event){
    key = event.key;   //Referenced from 7.3-Car-Simulation
}

animate();