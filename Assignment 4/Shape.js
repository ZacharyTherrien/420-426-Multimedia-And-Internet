class Shape{
    constructor(HP, Atk, Def, Spd, Sides, Colour, Moves){
        this.HP = HP;
        this.BaseHP = HP;
        this.Atk = Atk;
        this.Def = Def;
        this.Spd = Spd;
        this.NewSpd = this.Spd; //Represents new value of speed if changed, added at end of turn.
        this.Sides = Sides;
        this.Colour = Colour;
        this.Maxed = false;
        this.Moves = Moves.slice(0,3);
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
        context.strokeRect(this.positionX,this.positionY,this.Width,this.Height);
        this.displaysStats();
    }

    displaysStats(){
        context.font = "10px Georgia";
        context.fillText(`HP: ${this.HP}/${this.BaseHP}`, this.positionX - 5, this.positionY + this.Height + 20);
    }
}