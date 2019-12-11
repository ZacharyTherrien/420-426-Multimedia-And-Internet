//Max characters: ~22 chars.
//Max lines: 6 lines.
//3 Lines qby default:
//  - Name
//  - Atk value
//  - Type

const AttackList = [
    new WeaponAttack('Excalibur!', 500, 
    [AtkStat(100), "A shining beam, hope.", "Its name is:" ,"Ex-CALIBUUUR!!"],
    "#ffff00"),
    new WeaponAttack('Sword Poke', 25,
    [AtkStat(25) ,"Some simple attack.", "One simply pokes."]),
    new BallAttack('Bubble', 10,
    [AtkStat(10) ,"A bubble.", "Surprisingly effective."],
    "#00FFFF"),
    new BallAttack('Magic Missile', 21,
    [AtkStat(21) ,"A classic missile.", "But now magical!"],
    "#00FFFF"),
    new WeaponAttack("Omega Explosion", 200,
    [AtkStat(150) ,"Insert:", "Strong, cool, super OP", "attack here. (tm)"],
    "#cc3300")
]

function AtkStat(AtkValue){
    return `Atk: ${AtkValue}`;
}