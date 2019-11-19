/*Starting off the whole project grabbing DOM elemens.*/
const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');

/*Creates rectangles: an outlined one, a clear & a filled one.*/
// context.fillRect(25,25,100,100);
// context.clearRect(45,45,60,60);
// context.strokeRect(50,50,50,50);

/*The Path creates an image given a path to follow.
Here, it follows 3 paths to create a triangle.*/
// context.beginPath();
// context.moveTo(60,60);
// context.lineTo(85,75);
// context.lineTo(85,55);
// context.closePath();
// context.fill();

/*Following a path, this time it creates a circle.
A new method, instead of a line, is required.*/
// context.beginPath();
// context.arc(50, 50, 15, 0, (Math.PI/180) * 360);
// context.closePath();
// context.fill();

/*Basic Animation of a Circle!*/
//Animation! This function will continually call the frame to spawn a drawing.
// function animate(){
//     requestAnimationFrame(animate);
// }

// //Start position and variable for x coordinate.
// const START = 25;
// let x = START;

// //Function to call for evry frame of animtion.
// //Canvas is cleared each time to remove the previous frame.
// //Draw the object.
// //Check if it's gone past the canvas width, if so, place it back at start.
// function animate(){
//     requestAnimationFrame(animate);
//     context.clearRect(0,0, canvas.width, canvas.height);
//     context.beginPath();
//     context.arc(x++, 100, 50, 0, 2 * Math.PI);
//     context.closePath();
//     context.stroke();    
//     if(x >= (canvas.width - 50))
//         x = 50;
// }
// animate();

/*Animating a Bubble!*/
const START = 100;
const MAXBUBBLES = 5;

class Bubble{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.xVector= 1;
        this.yVector = 1;
        this.radius = 25;
    }
    //Used like a private method.
    draw(){
        context.strokeStyle = "#00FFFF";
        context.beginPath();
        this.x += this.xVector;
        this.y += this.yVector;
        context.arc(this.x,this.y,this.radius,0,2*Math.PI);
        context.closePath();
        context.stroke();
    }
    //Used like a public method.
    update(){
        //If out of bounds, change to random position.
        if(this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0){
            this.x = (Math.floor(Math.random()*250));
            this.y = Math.floor((Math.random()*150));
            //Change its vector(s).
            if(Math.random() >= 0.25)
                this.xVector = this.xVector * -1;
            else if(Math.random() >= 0.5)
                this.yVector = this.yVector * -1;
            else{
                this.xVector = this.xVector * -1;
                this.yVector = this.yVector * -1;
            }
        }
        //Execute the drawing.
        this.draw();
    }
}

//Create the bubbles.
let myBubbles = new Array(MAXBUBBLES);
for(let i = 0; i < MAXBUBBLES; i++)
    myBubbles[i] = new Bubble(Math.floor(Math.random() * 250), Math.floor(Math.random() * 150));

//Function to animate them.
function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < MAXBUBBLES; i++)
        myBubbles[i].update();
}

animate();