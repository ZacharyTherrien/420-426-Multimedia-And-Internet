const AttackList = [
    new WeaponAttack('Excalibur!', 100,
    [AtkStat(100), "A shining beam, hope.", "Its name is:" ,"Ex-CALIBUUUR!!"]),
    new WeaponAttack('Sword Poke', 25,
    [AtkStat(25) ,"Some simple attack.", "One simply pokes."]),
    new BallAttack('Bubble', 10,
    [AtkStat(10) ,"A bubble.", "Surprisingly effective."]),
    new BallAttack('Magic Bubble', 21,
    [AtkStat(21) ,"More bubbles.", "But now magical!"])
]

function AtkStat(AtkValue){
    return `Atk: ${AtkValue}`;
}