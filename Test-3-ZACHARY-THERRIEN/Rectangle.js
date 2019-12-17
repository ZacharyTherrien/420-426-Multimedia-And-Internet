class Rec{
    constructor(x, y, speed, directionX, directionY){
        this.height = 50;
        this.width = 50;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.directionX = directionX;
        this.directionY = directionY;
        this.colour = 0;
        this.quadrant = 0;
        this.caught = false;
    }

    update(){ //Function idea Referenced from 7.2-Starting-With-Canvas
        if(this.y <= 0)
            this.newVector(1);
        else if(this.y + this.height >= canvas.height)
            this.newVector(2);
        else if(this.x <= 0)
            this.newVector(3);
        else if(this.x + this.width >= canvas.width)
            this.newVector(4);
        this.draw();
    }

    draw(){
        if(!this.caught){ //Referenced fill style from: https://www.w3schools.com/tags/canvas_fillstyle.asp
            if(this.x > canvas.width / 2){
                if(this.y < canvas.height / 2){
                    //console.log("red");
                    context.fillStyle = "#eb4034";
                }
                else{
                    //console.log("yellow");
                    context.fillStyle = "#0ecf00";
                }
            }
            else{
                if(this.y < canvas.height / 2){
                    //console.log("blue");
                    context.fillStyle = "#3437eb";
                }
                else{
                    //console.log("green");
                    context.fillStyle = "#fbff00";
                }
            }
            this.x += Math.cos(this.directionX * Math.PI / 180) * this.speed; //Referenced from 7.3-Car-Simulation
            this.y += Math.sin(this.directionY * Math.PI / 180) * this.speed; //Referenced from 7.3-Car-Simulation
            context.fillRect(this.x,this.y,this.width,this.height); //Referenced from 7.2-Starting-With-Canvas
            context.fillStyle = "#000000";
        }
    }

    newVector(quadrant){
        this.speed = Math.floor((Math.random() * 10)/2);
        while(this.speed == 0)
            this.speed = Math.floor((Math.random() * 10)/2);
        if(Math.random() * 100 < 0.5)
            this.speed *= -1;
        switch (quadrant){ //Idea for random number Referenced from: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
            case 1:
                this.directionY = Math.floor(Math.random()*178)+1; 
                this.directionX = Math.floor(Math.random()*360);
                break;
            case 2:
                this.directionY = Math.floor(Math.random()*179)+181; 
                this.directionX = Math.floor(Math.random()*360);
                break;
            case 3:
                this.directionX = Math.floor(Math.random()*90)+1;
                this.directionY = Math.floor(Math.random()*360);
                break;
            case 4:
                this.directionX = Math.floor(Math.random()*90)+181;
                this.directionY = Math.floor(Math.random()*360);   
                break;
        }     
    }
}