class Car{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.height = 20;
        this.width = 50;
        this.speed = 0;
        this.maxSpeed = 5;
        this.rotation = 0;
        this.friction = 0.95;
    }
    draw(){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation * Math.PI / 180);
        context.fillStyle = "MediumPurple";
        context.fillRect(0,0,this.width,this.height);
        context.restore();
    }
    update(){
        this.x += Math.cos(this.rotation * Math.PI / 180) * this.speed;
        this.y += Math.sin(this.rotation * Math.PI / 180) * this.speed;
        this.draw();
        this.displayStatus();
    }
    accelerate(){
        if(this.speed + 0.01 <= this.maxSpeed)
            this.speed += 0.01;
    }
    decelerate(){
        if(this.speed != 0){
            this.speed *= this.friction;
        }
        if(this.speed > -0.01 && this.speed < 0.01){
            this.speed = 0;
        }
    }
    reverse(){
        if(this.speed - 0.01 >= this.maxSpeed * -1)
            this.speed -= 0.01;
    }
    turnRight(){
        if(this.speed != 0){
            this.rotation += 2;
            if(this.rotation > 360)
                this.rotation = 0;
        }
    }
    turnLeft(){
        if(this.speed != 0){
            this.rotation -= 2;
            if(this.rotation < -360)
                this.rotation = 0;
        }
    }
    displayStatus(){
        context.save();
        context.font = "12px Arial";
        context.fillText(`Position: (${this.x.toFixed(0)}, ${this.y.toFixed(0)})`, 10, 20);
        context.fillText(`Rotation: ${this.rotation.toFixed(2)}`, 10, 40);
        context.fillText(`Speed ${this.speed.toFixed(2)}`, 10, 60);
        context.restore();
    }
}