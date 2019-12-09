class Rec{
    constructor(x, y, speed, direction){
        this.height = 50;
        this.width = 50;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = direction;
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
        if(!this.caught){
            if(this.x > 250){
                if(this.y < 250){
                    context.strokeStyle = "#eb4034";
                }
                else{
                    context.strokeStyle = "#0ecf00";
                }
            }
            else{
                if(this.y < 250)
                    context.strokeStyle = "#3437eb";
                else
                    context.strokeStyle = "#fbff00";
            }
            //context.beginPath();
            this.x += Math.cos(this.direction * Math.PI / 180) * this.speed; //Referenced from 7.3-Car-Simulation
            this.y += Math.sin(this.direction * Math.PI / 180) * this.speed; //Referenced from 7.3-Car-Simulation
            context.fillRect(this.x,this.y,this.width,this.height); //Referenced from 7.2-Starting-With-Canvas
            context.stroke();
            //context.closePath();
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
                this.direction = Math.floor((Math.random()*180)) + 180; 
                console.log(this.direction);
                break;
            case 2:
                //console.log("up");
                this.direction = 270 - Math.floor(Math.random()*270);
                if(this.direction > 360)
                    this.diretion -= 360;
                break;
            case 3:
                this.direction = Math.floor(Math.random()*180);
                break;
            case 4:
                this.direction = 180 + Math.floor(Math.random()*180);    
                break;
        }     
    }
}