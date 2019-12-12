//#region /********************* VARIABLES ******************************/
let canvas = document.getElementsByTagName('canvas')[0];
canvas.width = 430;
canvas.height = 250;
let context = canvas.getContext('2d');
let CharactersCreated = false;
let Player;
let Enemy;
const PLAYER_X = 80;
const PLAYER_Y = canvas.height - 100;
const ENEMY_X = canvas.width - 120;
const ENEMY_Y = 30;
let key;
let choice = 0;
let choiceEnemy = 0;
const CHOICEMIN = 0;
const CHOICEMAX = 3;
const MENU_WIDTH = 110;
const MENU_HEIGHT = 75;
const MENU_X = canvas.width - MENU_WIDTH - 1;
const MENU_Y = canvas.height - MENU_HEIGHT - 1;
const DESC_X = MENU_X - MENU_WIDTH;
const DESC_Y = MENU_Y;
const MenuOptions = {"Attack":0,"Defend":1,"FillPower":2,"Flee":3};
const MenuOptionsArray = ["Attack", "Defend", "FillPower", "Flee"];
const MenuDescriptions = [Attack = ["Select an Attack."], 
Defend = ["Defend.", "This will increase", "your defense stat."],
FillPower = ["Ability unavailable.","Win once to unlock."],
Flee = ["Exit the battle.","Automatic loss."]];
const GoBackDescription = ["Return to","main menu."];
let CurrentDescription = "";
let InMatch = false;
let StartedMatch = false;
let turn;
let ChoiceSelected = false;
let ChoosingAtk = false;
let Desc;
let Battling = false;
let FirstAtk = true;
let PlayerAttacking;
let DrawingMove = false;
let AtkDrawComplete;
let Won = false;
let Lost = false;
let EndOfMatch = false;
let numWins = 0;
let enabledFillPower = false;
let MoveSkipped = false;
let BattlePhaseStarted = false;
let PlayerGoesFrst = true;
let AttackOrderDecided = false;
let MoveAnimated = false;           //Indicates if move's drawing has been completed.
let NumMovesThisTurn = 0;           //Max is 2, indicates if both attacks have been done or not.
const numClasses = 3;               //Represents the total number of classes of shapes.

//#endregion
/************************************************************************/

/*
 *      TODO: 
 *      - WRITE, IN COMMENTS, WHERE ARRAY METHODS ARE.
 *      - ADD MORE COMMENTS PLEASE!
 * 
 *      - ANIMATION GLITCH DOING AFTER???? MUST FIX AFTERWARDS!!!
 *          UNRELATED TO FILL POWER.
 *          OCCURS FROM SKIPPING ANIMATION
 *          IF PLAYER DOES DEFEND THEN FILL, OR VICE VERSA, TRIGGERS GLITCH!!
 *          THI IS OCCURING DUE TO BALL INSTANCE ATTACKS.
 * 
 *      TODO AFTER:
 *      - ADD AN ANIMATION FOR FILL POWER.
 *      - CREATE BETTER ANIMATIONS
 *      - IMPLEMENT CRITICAL HITS
 * 
 *      TODO EXTRA (POST BASE GAME):
 *      - TRY TO ADD SPIN ATTACKS.
 *      - COLOUR MAIN MENU OPTIONS
 *      - TELL USE FILL POWER HAS ENDED, DISPLAY HEALED HP TOO.
 * 
 *  =================================================================
 *  =================================================================
 *  =================================================================
 * 
 *      FOR THE TEACHER, HERE ARE THE FOLLOWING FILES AND LINES
 *      IN ORDER TO FIND THE ARRAY METHODS USED:
 * 
 *      - Main.js (.push) -> line 176 & 291
 *      - Main.js (.pop)  -> line 178
 * 
 *  =================================================================
 *  =================================================================
 *  =================================================================
 */

//#region /********************* MAIN GAME ******************************/
canvas.addEventListener('keydown', event => key = event.key );
animate();
function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width,canvas.height);
    if(!InMatch && !EndOfMatch){
        DisplayMainMenu();
        if(AcceptButtonPressed())//Start match, set boolean values too.
            MatchInitiation();
    }
    if(!StartedMatch){          //Create Player & Enemy before start of game           
        CreateCharacters();
        StartedMatch = true;
    }
    if(InMatch && !Won && !Lost){
        /************************ DRAW PHASE ************************/
        Player.draw();
        Enemy.draw();
        TurnDraw();             //Display the turn.
        /********************** STANDBY PHASE ************************/
        if(!ChoosingAtk)
            MenuDraw();         //Draw current menu for player.
        else
            MenuAtkDraw();      //If attack chosen, display attack menu.
        if(!Battling){
            CursorUpdate();     //This will check the key pressed.
            CursorDraw();       //This will move according to what's pressed.
        }
        if(!ChoosingAtk)        //If something selected, perform it, enable battle phase, unless attack or flee selected.
            MenuSelect();
        else if(!Battling)
            AtkSelect();
        /*********************** BATTLE PHASE ************************/
        if(Battling){           //True once a move is chosen.  
            if(!BattlePhaseStarted){
                InitiateBattle();   
                ChooseEnemyAtk();
            }     
            PerformMoves();     //Here is where it goes to do everything attack related.
            if(!Battling)
                EndBattlePhase();
        }
        /************************ END PHASE **************************/
        EndPhase();
    }
    /************************* MATCH ENDED ***************************/
    if(EndOfMatch){             //If match is over, display the result, cannot continue attacking/choosing.
        DisplayEndResult();
    }
    else
        key = '';               //Set key to blank. otherwise: cursor blasts through menu.
}
//#endregion
/************************************************************************/

//#region Other/Uncategorized (for now) Function!
function MatchInitiation(){             //Initialize all these variables once a match begins.
    InMatch = true;
    StartedMatch = false;
    Battling = false;
    Won = false;
    Lost = false;
    choice = MenuOptions.Attack;
    BattlePhaseStarted = false;
    ChoosingAtk = false;
    choice = 0;
    turn = 1;
    key = '';
    soundStart.play();
}

function CreateCharacters(){            //Initialize moves for both player and enemies, then create them at start.
    PlayerMoves = GenerateRandomMoveset();
    EnemyMoves = GenerateRandomMoveset();
    Player = GenerateRandomCharacter(Player, PLAYER_X, PLAYER_Y, PlayerMoves);
    Enemy = GenerateRandomCharacter(Enemy, ENEMY_X, ENEMY_Y, EnemyMoves);
}

function GenerateRandomMoveset(){
    let Moveset = new Array();              //Array to hold moveset as it's created.
    let rndmMove;                           //Holds index of a randomly chosen move.
    for(let i = 0; i < CHOICEMAX; i++){
        rndmMove = Math.floor(Math.random() * (AttackList.length - 1) + 0.09);
        Moveset.push(AttackList[rndmMove]);                     //Add move, based on index, from the attack list.
        for(let j = 0; j < i; j++){
            if(Moveset[i].Name == Moveset[j].Name && j != i){   //If matching move, aside itself, found: remove and obtain another move.
                Moveset.pop();
                i--;
            }
        }
    }
    return Moveset;
}

function GenerateRandomCharacter(Character, x, y, moves){               //Randomly generate new player/enemy as a shape.
    let rndmShape = Math.floor((Math.random() - 0.01) * numClasses);    //Ensure index is round down between 0 - 2.
    switch (rndmShape){
        case 0:
            Character = new Rectangle(x, y, moves);
            break;
        case 1:
            Character = new Triangle(x, y, moves);
            break;
        case 2:
            Character = new Circle(x, y, moves);
            break;
        default:                                                        //In case somehow error, default to square.
            Character = new Rectangle(x, y, moves);
            break;
    }
    return Character;
}

function TurnDraw(){                    //Draws the current turn at top left corner of canvas.
    context.font = "20px Georgia";
    context.fillText(`Turn: ${turn}`,10,20);
}

function AcceptButtonPressed(){         //Checks if any of the following buttons pressed. 
    //console.log(key);
    return key == 'z' || key == 'Z';    //These are confirm buttons.
}

function SkipButtonPressed(){           //Like accept, however skips animations.
    console.log(key);
    return key == 'x' || key == 'X';
}

function MenuSelect(){                      //Initial Menu selection.
    if(AcceptButtonPressed() && !Battling){
        switch(choice){
            case MenuOptions.Attack:
                ChoosingAtk = true;         //Open attack menu.
                soundsChoice.play();
                break;
            case MenuOptions.Defend:
                Battling = true;            //Go to battle phase, perform defense.
                soundsChoice.play();
                break;
            case MenuOptions.FillPower:
                if(enabledFillPower && Player.CanFill){
                    Battling = true;        //Go to battle phase, FillPower.
                    soundsChoice.play();
                }
                else{
                    soundDenyChoice.play();
                    console.log('Cannot fill power at the moment.');
                }
                break;
            case MenuOptions.Flee:
                Lost = true;                //Auto lose, launched to start menu.
                break;
        }
    }
}

function AtkSelect(){                           //Choose one of three of your attack to use, based on where accept is clicked.
    if(AcceptButtonPressed() && !Battling){
        switch(choice){
            case 0:
                Battling = true;
                break;
            case 1:
                Battling = true;
                break;
            case 2:
                Battling = true;
                break;
            case 3:
                ChoosingAtk = false;   
                choice = MenuOptions.Attack;    //Insead, go back to previous selection menu.
                break;
        }
        soundsChoice.play();
    }
}
function EndBattlePhase(){      //Actions to check after every battle phase.
    turn++;
    if(Player.Filled)
        Player.FillCheckEnd();
    BattlePhaseStarted = false;
    key = '';
}

function EndPhase(){            //After every iteration, check if someone was defeated.
    if(Enemy.HP <= 0){
        Won = true;
        numWins++;
        MenuDescriptions[MenuOptions.FillPower] = ['Fill your shape with',  //Once player wins, unlock Fill Power!
        'POWER!!',
        'Once per duel:',
        'This will boost your', 
        'stats for 3 turns',
        'after it\'s selected.'];
        enabledFillPower = true;
    }
    else if(Player.HP <= 0)
        Lost = true;
    if(Won || Lost){
        EndOfMatch = true;      //Exit match now that a winner has been decided.
    }
}

function DisplayEndResult(){    //End result screen, prints winner and leaves playing field as is.
    let EndResult;
    if(Won){
        EndResult = ["Congratulations!", "A winner is you!"];
        if(numWins == 1){
            EndResult.push('','You can now use:','Fill Power!');
        }
    }
    else if(Lost){
        EndResult = ["Insert coin to try again."];
    }
    Player.draw()
    Enemy.draw();
    TurnDraw();
    MenuBox();
    DescriptionDraw(EndResult);
    if(AcceptButtonPressed()){
        InMatch = false;
        EndOfMatch = false;
        key = '';
    }
}
//#endregion
/************************************************************************/

//#region /***************************** BATTLE FUNCTIONS *****************************/
function InitiateBattle(){
    BattlePhaseStarted = true;
    NumMovesThisTurn = 0;
    FirstAtk = true;
    DecideAttacker();
}

function DecideAttacker(){
    if(Player.Spd > Enemy.Spd)  //True => Player goes first.
        PlayerGoesFrst = true;
    else                        //False => Enemy goes first.
        PlayerGoesFrst = false;
}

function ChooseEnemyAtk(){
    choiceEnemy = Math.floor(Math.random() * 3);
}

function PerformMoves(){
    let moveDesc = AttackerDecided();
    MoveActions(moveDesc);
    BattlingComplete();
}

function AttackerDecided(){
    if(PlayerGoesFrst){                
        if(FirstAtk && !DrawingMove){            //Player going.
            PlayerAttacking = true;
            if(ChoosingAtk){
                Desc = ['Player used:',`${Player.Moves[choice].Name}!`];
                console.log(Player.Moves[choice].Name + " P");
            }
            else{
                Desc = ['Player used:',`${MenuOptionsArray[choice]}!`]
                console.log(Player.Def);
            }
            FirstAtk = false;
        }
        else if (!DrawingMove){                      //Enemy going.
            PlayerAttacking = false;
            Desc = ['Enemy used:',`${Enemy.Moves[choiceEnemy].Name}!`];
            console.log(Enemy.Moves[choiceEnemy].Name + " E");
            FirstAtk = true;
        }
    }
    else{                                           //False => Enemy goes first.
        if(FirstAtk && !DrawingMove){                //Enemy going.
            PlayerAttacking = false;
            Desc = ['Enemy used:',`${Enemy.Moves[choiceEnemy].Name}!`];
            console.log(Enemy.Moves[choiceEnemy].Name + " E");
            FirstAtk = false;
        }
        else if (!DrawingMove){                      //Player going.
            PlayerAttacking = true;
            if(ChoosingAtk){
                Desc = ['Player used:',`${Player.Moves[choice].Name}!`];
                console.log(Player.Moves[choice].Name + " P");
            }
            else{
                Desc = ['Player used:',`${MenuOptionsArray[choice]}!`]
            }
            FirstAtk = true;
        }
    }
    DrawingMove = true;
    return Desc
}

function MoveActions(Desc){
    DescriptionDraw(Desc);
    if(PlayerAttacking){
        if(ChoosingAtk){
            AttackAction();
        }
        else if(!ChoosingAtk){
            switch (choice){
                case MenuOptions.Defend:
                    DefendAction();
                    break;
                case MenuOptions.FillPower:
                    FillPowerAction();
                    break;
            }
        }
    }
    else if(!PlayerAttacking){
        AttackAction();
    }
}

function BattlingComplete(){
    if(NumMovesThisTurn >= 2){
        Battling = false;
        BattlePhaseStarted = false;
        ChoosingAtk = false;            //Set menu back to normal one.
    }
}
//#endregion
/**************************************************************************************/

//#region /***************************** DEFEND FUNCTIONS ****************************/
function DefendAction(){
    if(PlayerAttacking){
        if(!MoveAnimated && !MoveSkipped){
            MoveAnimated = Player.DrawDef();
            SkipDefendAnimtion(Player);
        }
        else{
            Player.Defend();
            PlayerAttacking = false;
            choice = 0;
            DrawingMove = false;
            MoveAnimated = false;
            MoveSkipped = false;
            NumMovesThisTurn++;
            if(PlayerAttacking)
                ChoosingAtk = true;
            soundDefend.play();
            console.log("Defence:" + Player.Def);
        }
    }
}

function SkipDefendAnimtion(Character){
    if(SkipButtonPressed()){
        Character.QuickEndDef();
        MoveSkipped = true;
        console.log('SKIPPED!');
        key == '';
    }
}

//#endregion
/**************************************************************************************/

//#region /**************************** FILL POWER FUNCTIONS **************************/
function FillPowerAction(){
    if(PlayerAttacking){
        if(!MoveAnimated && !MoveSkipped){
            MoveAnimated = Player.DrawFill();
            SkipFillAnimation(Player);
        }
        else{
            Player.UseFillPower();
            PlayerAttacking = false;
            choice = 0;
            DrawingMove = false;
            MoveAnimated = false;
            MoveSkipped = false;
            NumMovesThisTurn++;
            if(PlayerAttacking)
                ChoosingAtk = true;
            soundFillPower.play();
        }
    }
}

function SkipFillAnimation(Character){
    if(SkipButtonPressed()){
        Character.QuickEndFill();
        MoveSkipped = true;
        console.log('SKIPPED!');
        key == '';
    }
}

//#endregion
/**************************************************************************************/

//#region /***************************** ATTACK FUNCTIONS *****************************/
function AttackAction(){            //Here, it will display the attack description and animation.
    if(PlayerAttacking){
        if(!MoveAnimated && !MoveSkipped){           //Begin animating the attack.
            MoveAnimated = Player.DrawAtk(choice, Enemy.HitBoxX1(), Enemy.HitBoxY1(), Enemy.HitBoxX2(), Enemy.HitBoxY2(), 1);
            SkipAtkAnimation(Player);
        }
        else                                        //Display & calculate damage only after animation. 
            AnimateDamage();
    }
    else{
        if(!MoveAnimated && !MoveSkipped){
            MoveAnimated = Enemy.DrawAtk(choiceEnemy, Player.HitBoxX1(), Player.HitBoxY1(), Player.HitBoxX2(), Player.HitBoxY2(), -1);
            SkipAtkAnimation(Enemy);
        }
        else
            AnimateDamage();
    }
}

function SkipAtkAnimation(Character){   //If x or X are pressed during an attack animation, skip it.
    if(SkipButtonPressed()){
        console.log('SKIPPED!');
        Character.QuickEndAtk(choice);
        soundHit.play();                //Make sure hit sound plays, even if they skipped.
        MoveSkipped = true;
        key == '';
    }
}

function AnimateDamage(){                   //Display and animate the HP rolling down.
    let Damage
    if(PlayerAttacking){
        Damage = CalculateDamage(Player.Atk, Player.Moves[choice].AtkValue, Enemy); //Find how many damage is dealt in order to find how much to roll down.
        if(Enemy.DisplayHP > Enemy.HP - Damage && Enemy.DisplayHP > 0){             //Display HP rolling down till reaches end or 0.
            Enemy.CheckEffectiveness(Player.Moves[choice].Type);
            Enemy.DisplayDamage(Damage);
        }
        else{                                                                       //Once HP reached by rolling or 0.
            let trueDamage = Player.Atk + Player.Moves[choice].AtkValue;
            console.log(Enemy.Def);
            Enemy.ReceiveDamage(trueDamage);                                        //Set their actual HP to what it is after damage calculation.
            console.log(Enemy.Def);
            PlayerAttacking = false;                                                //Player done attack, now no longer attacking.
            choice = 0;                                                             //Set their choice to start.
            DrawingMove = false;                                                    //No longer drawing attack/rolling down HP.
            MoveSkipped = false;
            MoveAnimated = false;
            NumMovesThisTurn++;                                                     //Update count that a move has been done so far this turn.
        }
    }
    else{                                                                           //Apply but now for Player being Damaged.
        Damage = CalculateDamage(Enemy.Atk, Enemy.Moves[choiceEnemy].AtkValue, Player);
        if(Player.DisplayHP > Player.HP - Damage && Player.DisplayHP > 0){
            Player.CheckEffectiveness(Enemy.Moves[choiceEnemy].Type);
            Player.DisplayDamage(Damage);
        }
        else{
            let trueDamage = Enemy.Atk + Enemy.Moves[choiceEnemy].AtkValue;
            console.log(Player.Def);
            Player.ReceiveDamage(trueDamage);
            console.log(Player.Def);
            PlayerAttacking = true;                                                 //Enemy done attacking, either no more batling or player goes now.
            DrawingMove = false;
            MoveAnimated = false;
            MoveSkipped = false;
            NumMovesThisTurn++;
        }
    }
}

function CalculateDamage(CharacterAtk, MoveAtk, Receiver){      //Find how much damage dealt.
    let tempDef = Receiver.Def;
    if(Receiver.ReceivedSprEfct){
        tempDef = tempDef / 1.5;
    }
    return CharacterAtk + MoveAtk  - tempDef / 3;               //Calculate late damage dealt with defence.
}
//#endregion
/**************************************************************************************/

//#region /***************************** CURSOR FUNCTIONS *****************************/
function CursorUpdate(){        //Based on key pressed, update cursor position value.
    switch(key){
        case 'ArrowUp':
            choice--;
            break;
        case 'ArrowDown':
            choice++;
            break;
        case 'ArrowLeft':
            choice = CHOICEMIN;
            break;
        case 'ArrowRight':
            choice = CHOICEMAX;
            break;
    }
    if(choice < CHOICEMIN)      //Passes top boundary, wrap to bottom.
        choice = CHOICEMAX;
    else if(choice > CHOICEMAX) //Passes bottom boundary, wrap to top.
        choice = CHOICEMIN;
    if(!ChoosingAtk)            //Display a description of what the user's cursor is hovering over.
        CurrentDescription = MenuDescriptions[choice];
    else
        if(choice != 3)
            CurrentDescription = Player.Moves[choice].Description;
        else 
        CurrentDescription = GoBackDescription;
}
function CursorDraw(){          //Based on current option, set cursor position.
    context.beginPath();
    context.moveTo(MENU_X+5,MENU_Y + (choice * 15) + 10);
    context.lineTo(MENU_X+10,MENU_Y +(choice * 15) + 15);
    context.lineTo(MENU_X+5,MENU_Y + (choice * 15) + 20);
    context.closePath();
    context.fill();
}
//#endregion
/**************************************************************************************/

//#region /**************************** MENU DRAW FUNCTIONS ***************************/
function MenuDraw(){
    MenuBox();
    PrintMenuOption(MenuOptionsArray);
    if(!Battling)                                                   //Do not print while in battle phase.
        DescriptionDraw(CurrentDescription);                        //Print the box for descriptions.    
}
function MenuAtkDraw(){
    context.strokeRect(MENU_X,MENU_Y,MENU_WIDTH,MENU_HEIGHT);
    let Moveslist = Player.Moves.map(move => move.Name);            //Make new array containing names of player's moves.
    PrintMenuOption(Moveslist);                                     //Print the moves from the new array.
    context.fillText("Go Back",MENU_X+15,MENU_Y+20+(3*15));         //Print a fourth option to go back.
    if(!Battling)                                                   //Do not print while in battle phase.
        DescriptionDraw(CurrentDescription);                        //Attacks will have a description too!
}
function MenuBox(){
    context.strokeRect(MENU_X,MENU_Y,MENU_WIDTH,MENU_HEIGHT);       //Print the menu box and then its content.
}
function PrintMenuOption(Options){
    context.font = "12px Georgia";
    for(let i = 0; i < Options.length; i++){
        context.fillText(Options[i],MENU_X+15,MENU_Y+(i*15)+20);    //Display options and space them out.
    }
}
function DescriptionDraw(Description){                              //Takes string array & displays it in description box.
    DescriptionBox();
    context.font = "10px Georgia";
    for(let line = 0; line < Description.length; line++){
        context.fillText(Description[line],DESC_X+5,DESC_Y+12+(line*12));
    }
}
function DescriptionBox(){
    context.strokeRect(DESC_X,DESC_Y,MENU_WIDTH-1,MENU_HEIGHT);
}
function DisplayMainMenu(){                                         //Print the whole start menu here.
    context.fillStyle = "Black";
    context.font = "30px Georgia";
    context.fillText("Welcome to ShapeDown!", canvas.width / 8, canvas.height / 3);
    context.font = "15px Georgia";
    context.fillText("Controls:", canvas.width / 8, canvas.height / 2);
    context.fillText("- Arrow keys to move selection.", canvas.width / 8, canvas.height / 2 + 20);
    context.fillText("- Z to select option", canvas.width / 8, canvas.height / 2 + 35);
    context.fillText("Game mechanics:", canvas.width / 8, canvas.height / 2 + 55);
    context.font = "12px Georgia";
    context.fillText("Effectievness: Weapon/Triangle -> Ball/Circle -> Line/Square ->>", canvas.width / 8, canvas.height / 2 + 75);
    context.fillText("Press Z to start!", canvas.width / 8, canvas.height - 10);
}

function DisplayEndMenu(){
    context.font = "30px Comic Sans";
    context.fillText("GJ you won.", canvas.widht + 10, canvas.height+10);
}
//#endregion 
/**************************************************************************************/