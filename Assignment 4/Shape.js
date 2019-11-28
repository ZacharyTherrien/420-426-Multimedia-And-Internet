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

    //Draws the shape onto the screen
    draw(){

    }
}