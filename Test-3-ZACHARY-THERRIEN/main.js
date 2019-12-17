let canvas = document.getElementsByTagName('canvas')[0];
let context = canvas.getContext('2d');  //Referenced from 7.2-Starting-With-Canvas
canvas.height = 500;
canvas.width = 500;
let key = 0;
const MAX = 50;
let countRecs = MAX;
let time = 0;
myRectangles = new Array(MAX); //Referenced from 7.2-Starting-With-Canvas

canvas.addEventListener('keypress', Destroy); //Referenced from 7.3-Car-Simulation

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
    if(myRectangles.length > 0){
        for(Recs of myRectangles){
            Recs.update();
        }
        if(key == 32){ //Referenced from https://stackoverflow.com/questions/24386354/execute-js-code-after-pressing-the-spacebar/24386518
            console.log("Del.");   
            for(let i = 0; i < myRectangles.length; i++){
                if(myRectangles[i].x > canvas.width / 2 && myRectangles[i].y > canvas.height / 2)
                    myRectangles.splice(i, 1);
            }
        }
        key = 0;
        context.font = "24px Arial";
        context.fillText(`Time: ${time.toFixed(0)}`, canvas.width - 150, 20);
        time += 0.01;
    }
    else{
        context.font = "20px Arial";
        context.fillText("Game set!", canvas.width/2, canvas.height/2);
        context.fillText(`Time elapsed: ${time.toFixed(0)}`, canvas.width/2, canvas.height/2+25);
    }
}

function Destroy(event){
    key = event.keyCode;   //Referenced from 7.3-Car-Simulation
}

animate();