class Attack{
    constructor(Name, AtkValue, Description){
        this.Name = Name;
        this.AtkValue = AtkValue;
        this.Description = Description;
    }

    SetColour(Colour){
        this.Colour = Colour;
    }

    draw(){
        CalculateSpot();
        animate();
    }
}

class WeaponAttack extends Attack{
    constructor(Name, AtkValue, Description){
        super(Name, AtkValue, Description);
    }
}

class BallAttack extends Attack{
    constructor(Name, AtkValue, Description){
        super(Name, AtkValue, Description);
    }
}