//Max characters: ~22 chars.
//Max lines: 6 lines.
//3 Lines qby default:
//  - Name
//  - Atk value
//  - Type

const AttackList = [
    new LightAttack('Excalibur!', 500, 
    [AtkStat(100), TypeStat("Light"), "A shining beam, hope.", "Its name is:" ,"Ex-CALIBUUUR!!"],
    "#ffff00"),
    new WeaponAttack('Sword Poke', 25,
    [AtkStat(25), TypeStat("Weapon"), "Some simple attack.", "One simply pokes."]),
    new BallAttack('Bubble', 10,
    [AtkStat(10), TypeStat("Ball"), "A bubble.", "Surprisingly effective."],
    "#00FFFF"),
    new BallAttack('Magic Missile', 21,
    [AtkStat(21), TypeStat("Ball"), "A classic missile.", "But now magical!"],
    "#00FFFF"),
    new LightAttack("Omega Explosion", 200,
    [AtkStat(150), TypeStat("Light"), "Insert:", "Strong, cool, super OP", "attack here. (tm)"],
    "#cc3300"),
    new LineAttack("Star Finger!", 50,
    [AtkStat(50), TypeStat("Line"), "A classic attack", "But not as good", "as most think."],
    "#7700ff", 15),
    new LineAttack("Nyoibo", 30,
    [AtkStat(30), TypeStat("Line"), "Or called Power Pole.", "Son Goku's classic", "weapon from DB!"],
    "#ff0000", 15),
    // new SpinningLineAttack("Spin Attack!", 100,
    // [AtkStat(100) , "The Hero X thing's", "signature sword attack!", "Originally in 3D."])
    new LightAttack("World of Light", 200,
    [AtkStat(10), TypeStat("Light"), "Colours weave into", "a spiral and flame.", "RIP main cast."],
    "#ecfc03"),
    new LightAttack("Lots of Lava", 100,
    [AtkStat(100), TypeStat("Light"), "Now that's", "a lot of DAMAGE."],
    "#ff0000")
];

function AtkStat(AtkValue){
    return `Atk: ${AtkValue}`;
}

function TypeStat(Type){
    return `Type: ${Type}`;
}