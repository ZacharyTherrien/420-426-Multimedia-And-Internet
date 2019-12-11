class Attack{
    constructor(Name, AtkValue, Description, Colour = "#808080"){
        this.Name = Name;
        this.AtkValue = AtkValue;
        this.Description = Description;
        this.Colour = Colour;
        this.DefaultColour = "#000000";
    }

    drawAtk(targetX1, targetY1, targetX2, targetY2, startX, starty, vModifier){
        this.CalculateSpot(startX, starty, vModifier);
        this.animateAtk();
        return this.HitTarget(vModifier, targetX1, targetY1, targetX2, targetY2);
    }
}

class WeaponAttack extends Attack{
    constructor(Name, AtkValue, Description, Colour){
        super(Name, AtkValue, Description, Colour);
        this.x;
        this.y;
        this.length = 30;
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
        context.strokeStyle = this.Colour;
        context.strokeRect(this.x, this.y, this.length, this.length);
        context.strokeStyle = this.DefaultColour;
    }

    HitTarget(Character, endX1, endY1, endX2, endY2){               //Check if it has reached the target!
        if(Character > 0){                                          //Check Player attack to Enemy
            if(this.x + this.length >= endX1 && this.y >= endY1 || 
               this.x < 0 || this.y < 0 || this.x + this.length > canvas.width || this.y + this.length> canvas.height){
                    this.AtkStarted = false;
                    return true;
                }
        }
        else{                                                       //Check Enemy attack to Player
            if(this.x <= endX2 && this.y + this.length <= endY2 ||
               this.x < 0 || this.y < 0 || this.x + this.length > canvas.width || this.y + this.length> canvas.height){
                this.AtkStarted = false;
                return true;
            }
        }
        return false;
    }
}

class BallAttack extends Attack{
    constructor(Name, AtkValue, Description, Colour){
        super(Name, AtkValue, Description, Colour);
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
        context.strokeStyle = this.Colour;
        context.arc(this.x,this.y,this.radius,0,2*Math.PI);
        context.closePath();
        context.stroke();
        context.strokeStyle = this.DefaultColour;
    }

    HitTarget(Character, endX1, endY1, endX2, endY2){      //Check if it has reached the target!
        if(Character > 0){
            if(this.x + this.radius >= endX1 && this.y >= endY1 
                || this.x < 0 || this.y < 0 || this.x > canvas.width || this.y > canvas.height){
                    this.AtkStarted = false;
                    return true;
                }
        }
        else{
            if(this.x <= endX2 && this.y + this.radius <= endY2
                || this.x < 0 || this.y < 0 || this.x > canvas.width || this.y > canvas.height){
                    return true;
                }
        }
        return false;
    }
}