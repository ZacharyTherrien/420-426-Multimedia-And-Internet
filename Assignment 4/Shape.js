class Shape{
    constructor(HP, Atk, Def, Spd, Sides, Colour, Moves){
        this.HP = HP;
        this.BaseHP = HP;
        this.Atk = Atk;
        this.Def = Def;
        this.Spd = Spd;
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
        this.Width = 30;
        this.Height = 30;
    }

    draw(){
        context.strokeRect(this.positionX,this.positionY,this.Width,this.Height);
        this.displaysStats();
    }

    displaysStats(){
        context.fillText(`HP: ${this.HP}/${this.BaseHP}`, this.positionX - 5, this.positionY + 45);
    }
}