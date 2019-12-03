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
        this.Maxed = false;
        this.Moves = Moves.slice(0,3);
    }

    DisplayDamage(Atk){
        let multiplier = 100;           //Used to slow down the speed of which HP decreases!
        this.DisplayHP -= Atk / multiplier;
        if(this.DisplayHP < 0)
            this.DisplayHP = 0;
    }

    ReceiveDamage(Atk){
        this.HP -= Atk;
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
        context.fillText(`HP: ${this.DisplayHP.toFixed(0)}/${this.BaseHP}`, this.positionX - 5, this.positionY + this.Height + 20);
    }
}