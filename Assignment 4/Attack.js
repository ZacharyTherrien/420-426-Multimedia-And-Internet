class Attack{
    constructor(Name, AtkValue){
        this.Name = Name;
        this.AtkValue = AtkValue;
    }

    SetColour(Colour){
        this.Colour = Colour;
    }
}

class WeaponAttack extends Attack{
    constructor(Name, AtkValue,){
        super(Name, AtkValue);
    }
}

class BallAttack extends Attack{
    constructor(Name, AtkValue){
        super(Name, AtkValue);
    }
}