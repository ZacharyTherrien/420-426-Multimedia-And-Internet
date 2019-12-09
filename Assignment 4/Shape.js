class Shape{
    constructor(HP, Atk, Def, Spd, Sides, Colour, Moves){
        this.BaseHP = HP;
        this.HP = this.BaseHP;
        this.DisplayHP = this.BaseHP;
        this.Atk = Atk;
        this.Def = Def;
        this.Spd = Spd;
        this.NewSpd = this.Spd;         //Represents new value of speed if changed, added at end of turn.
        this.Sides = Sides;
        this.Colour = Colour;
        this.Defended = true;
        this.Arc = 0;
        this.ArcFull = 2 * Math.PI;
        this.Filled = false;
        this.FillTimer = 0;
        this.fillTimerEnd = 3;
        this.TurnsFilled = 0;
        this.Moves = Moves.slice(0,3);
    }

    DisplayDamage(Atk){                 //HP rolls down, decrease actual HP value later. Stronger attacks make it faster!
        let multiplier = 100;           //Used to slow down the speed of which HP decreases!
        this.DisplayHP -= Atk / multiplier;
        if(this.DisplayHP < 0){
            this.DisplayHP = 0;
        }
    }
    
    displaysStats(){                    
        context.font = "10px Georgia";
        context.fillText(`HP: ${this.DisplayHP.toFixed(0)}/${this.BaseHP}`, this.positionX - 5, this.positionY + this.Height + 20);
    }

    ReceiveDamage(Atk){                 //Calculate actual HP value after it rolls down.
        this.HP -= Atk;                 //TODO: APPLY DEFENSE PLEASE!!
        if(this.HP < 0 )
            this.HP = 0;
    }

    DrawAtk(AtkNum, x1, y1, x2, y2, velocity){
        return this.Moves[AtkNum].drawAtk(x1, y1, x2, y2, this.positionX+(this.Width/2), this.positionY-20, velocity);
    }

    QuickEndAtk(AtkNum){
        this.Moves[AtkNum].AtkStarted = false;
    }

    Defend(){
        this.Def = this.Def + 1;
        this.Defended = true;
    }

    QuickEndDef(){
        this.Arc = this.ArcFull;
        this.Defend();
    }

    UseFillPower(){
        this.Filled = true;
    }

    FillBoost(){
        this.Atk += this.Atk/4;
        this.Def += this.Def/4;
        this.Spd += 2;
    }

    QuickEndFill(){
        this.fillTimer = this.fillTimerEnd;
        this.FillBoost();
    }
}

class Rectangle extends Shape{
    constructor(HP, Atk, Def, Spd, Sides, Colour, Moves, positionX, positionY){
        super(HP, Atk, Def, Spd, Sides, Colour, Moves);
        this.positionX = positionX;
        this.positionY = positionY;
        this.Width = 50;
        this.Height = 50;
    }

    draw(){
        if(!this.Filled){
            context.strokeRect(this.positionX,this.positionY,this.Width,this.Height);
            this.displaysStats();
        }
        else{
            context.fillRect(this.positionX,this.positionY,this.Width,this.Height);
            this.displaysStats();
        }
    }

    displaysStats(){                    
        context.font = "10px Georgia";
        context.fillText(`HP: ${this.DisplayHP.toFixed(0)}/${this.BaseHP}`, this.positionX - 5, this.positionY + this.Height + 20);
    }

    DrawDef(x,y){
        if(this.Defended){
            this.Defended = false;
            this.Arc = 0;
        }
        context.beginPath();
        context.strokeStyle = "#66ff99";
        context.arc(x+(this.Width/2),y+(this.Height/2),this.Width,0,this.Arc*Math.PI);
        context.closePath();
        context.stroke();
        context.strokeStyle = "#000000";
        if(this.Arc <  2 * Math.PI){
            this.Arc += 0.0523598775;    //This is 1/240 of 2*Pi so it completes in 2 seconds. 
            //Previous value: 0.02617993875
        }
        else{
            this.Arc = 0;
            return true;
        }
        return false;
    }

    DrawFill(){
        let aFrame = 1/60;
        this.FillTimer += aFrame;
        if(this.FillTimer >= this.fillTimerEnd){
            this.FillBoost();
            return true;
        }
        return false;
    }
}