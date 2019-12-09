class Attack{
    constructor(Name, AtkValue, Description){
        this.Name = Name;
        this.AtkValue = AtkValue;
        this.Description = Description;
    }

    SetColour(Colour){
        this.Colour = Colour;
    }

    drawAtk(targetX1, targetY1, targetX2, targetY2, startX, starty, vModifier){
        this.CalculateSpot(startX, starty, vModifier);
        this.animateAtk();
        return this.HitTarget(targetX1, targetY1, targetX2, targetY2);
    }
}

class WeaponAttack extends Attack{
    constructor(Name, AtkValue, Description){
        super(Name, AtkValue, Description);
        this.x;
        this.y;
        this.directionX = 45;
        this.directionY = 25;
        this.AtkStarted = false;
        this.velocity = 1.5;
    }

    CalculateSpot(startX, starty, vModifier){
        if(!this.AtkStarted){       //If it has just begun, set starting position.
            this.x = startX;
            this.y = starty;
            this.AtkStarted = true;
        }
        else{                       //Increase its position here!
            this.x += Math.cos(this.directionX * Math.PI/180) * this.velocity * vModifier;
            this.y -= Math.sin(this.directionY * Math.PI/180) * this.velocity * vModifier;
        }
    }

    animateAtk(){   //Draw the actual drawing only here!
        context.strokeRect(this.x, this.y, 30, 30);
    }

    HitTarget(endX1, endY1, endX2, endY2){      //Check if it has reached the target!
        if(this.x >= endX1-30 && this.x <= endX2+30 && this.y >= endY1-10 && this.y <= endY2+10 
            || this.x < 0 || this.y < 0 || this.x > canvas.width || this.y > canvas.height){
                this.AtkStarted = false;
                return true;
            }
        return false;
    }
}

class BallAttack extends Attack{
    constructor(Name, AtkValue, Description){
        super(Name, AtkValue, Description);
        this.x;
        this.y;
        this.radius = 20;
        this.directionX = 30;
        this.directionY = 25;
        this.AtkStarted = false;
        this.velocity = 1.25;
    }

    CalculateSpot(startX, starty, vModifier){
        if(!this.AtkStarted){       //If it has just begun, set starting position.
            this.x = startX;
            this.y = starty;
            this.AtkStarted = true;
        }
        else{                       //Increase its position here!
            this.x += Math.cos(this.directionX * Math.PI/180) * this.velocity * vModifier;
            this.y -= Math.sin(this.directionY * Math.PI/180) * this.velocity * vModifier;
        }
    }

    animateAtk(){   //Draw the actual drawing only here!
        context.beginPath();
        context.strokeStyle = "#00FFFF";
        context.arc(this.x,this.y,this.radius,0,2*Math.PI);
        context.closePath();
        context.stroke();
        context.strokeStyle = "#000000";
    }

    HitTarget(endX1, endY1, endX2, endY2){      //Check if it has reached the target!
        if(this.x >= endX1-30 && this.x <= endX2+30 && this.y >= endY1-10 && this.y <= endY2+10 
            || this.x < 0 || this.y < 0 || this.x > canvas.width || this.y > canvas.height){
                this.AtkStarted = false;
                return true;
            }
        return false;
    }
}