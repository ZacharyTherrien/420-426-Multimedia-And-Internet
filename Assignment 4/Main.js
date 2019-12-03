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
const CHOICEMIN = 0;
const CHOICEMAX = 3;
const MENU_WIDTH = 110;
const MENU_HEIGHT = 75;
const MENU_X = canvas.width - MENU_WIDTH - 1;
const MENU_Y = canvas.height - MENU_HEIGHT - 1;
const DESC_X = MENU_X - MENU_WIDTH;
const DESC_Y = MENU_Y;
const MenuOptions = {"Attack":0,"Defend":1,"GiantMax":2,"Flee":3};
const MenuOptionsArray = ["Attack", "Defend", "GiantMax", "Flee"];
const MenuDescriptions = [Attack = ["Select an Attack."], 
Defend = ["Defend.", "This will increase", "your defense stat."],
GiantMax = ["Ability unavailable.","Win once to unlock."],
Flee = ["Exit the battle.","Automatic loss."]];
const GoBackDescription = ["Return to","main menu."];
let CurrentDescription = "";
let InMatch = false;
let StartedGame = false;
let turn;
let ChoiceSelected = false;
let ChoosingAtk = false;
let Battling = false;
let FirstAtk = true;
let PlayerAttacking;
let AtkPhase = false; //Unused
let AtkDrawComplete;
let Won = false;
let Lost = false;
//#endregion
/************************************************************************/

/*
 *      TODO: 
 *      - HAVE ATK DESCRIPTION RESULT DISPLAY WITHOUT THE ATK DESCRIPTION THERE.
 *      - GO FROM ATK RESULT DESCRIPTION BACK TO STANDBY PHASE.
 *      - FOR NOW, WE ARE GOING TO GET STUCK IN THE ATK SECTION.
 * 
 * 
 */



//#region /********************* MAIN GAME ******************************/
canvas.addEventListener('keydown', event => key = event.key );
animate();
function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width,canvas.height);
    if(!InMatch){
        DisplayMainMenu();
        if(AcceptButtonPressed())   //Start match, set boolean values too.
            MatchInitiation();
    }
    if(!StartedGame){               //Create Player & Enemy before start of game           
        CreateCharacters();
        StartedGame = true;
    }
    if(InMatch & !Won && !Lost){
        /********************** STANDBY PHASE ************************/
        Player.draw();
        Enemy.draw();
        TurnDraw();         //Display the turn.
        if(!ChoosingAtk)
            MenuDraw();     //Draw current menu for player.
        else
            MenuAtkDraw();
        if(!Battling){
            CursorUpdate();     //This will check the key pressed.
            CursorDraw();       //This will move according to what's pressed.
        }
        if(!ChoosingAtk)    //If something selected, perform it, enable battle phase, unless attack or flee selected.
            MenuSelect();
        else if(!Battling)
            AtkSelect();
        /*********************** BATTLE PHASE ************************/
        if(Battling){       //True once a move is chosen.
            /*For whoever goes first, then second, display action is description box.*/
            PerformAtks();
            //Draw the atk here.
            //Display attack's damage. 
            //Perform drawing.
            //turn++;             //Increase turn after player & enemy's move.
            //Battling = false;   //Once both players are done their actions, end the battle phase.
            if(!Battling)
                EndBattlePhase();
        }
        /************************* END PHASE *************************/
        EndPhase()
;        if(Won || Lost){
            InMatch = false;    //Exit match not that a winner has been decided.
        }
    }
    /************************ END OF MATCH ***********************/
    //Print this after to make it keep looping properly please!
    //MAKE SURE TO PRINT AN END SCREEN MENU PLEASE!!
    key = '';                   //Set the current key to blank so it can only be registered once.
}

function MatchInitiation(){
    InMatch = true;
    Won = false;
    Lost = false;
    choice = MenuOptions.Attack;
    ChoosingAtk = false;
    turn = 1;
    key = '';
}

function TurnDraw(){
    context.font = "20px Georgia";
    context.fillText(`Turn: ${turn}`,10,20);
}

function CreateCharacters(){
    /*Initialize the moves for both player and enemies and them create them at the start.*/
    const PlayerMoves = [AttackList[0], AttackList[1], AttackList[2]];
    const EnemyMoves = [AttackList[3], AttackList[1], AttackList[2]];
    Player = new Rectangle(200, 20, 30, 1, 5, '#FF0000', PlayerMoves, PLAYER_X, PLAYER_Y);
    Enemy = new Rectangle(200, 20, 30, 0, 5, '#FF0000', EnemyMoves, ENEMY_X, ENEMY_Y);
}

function AcceptButtonPressed(){
    return key == 'z';
}

function MenuSelect(){
    if(AcceptButtonPressed()){
        switch(choice){
            case MenuOptions.Attack:
                ChoosingAtk = true;
                break;
            case MenuOptions.Defend:
                Battling = true;
                break;
            case MenuOptions.GiantMax:
                Battling = true;
                break;
            case MenuOptions.Flee:
                Lost = true;
                break;
        }
    }
}

function AtkSelect(){
    if(AcceptButtonPressed()){
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
                choice = MenuOptions.Attack;
                break;
        }
    }
}

function EndBattlePhase(){
    
}

function EndPhase(){
    if(Enemy.HP <= 0)
        Win = true;
    else if(Player.HP <= 0)
        Lose = true;
}
//#endregion
/************************************************************************/

/***************************** ATTACK FUNCTIONS *****************************/
function PerformAtks(){                         //The main Atk function
    let AtkDesc;
    AtkDesc = DecideAttacker();
    //DescriptionDraw(AtkDesc);
    AttackAction(AtkDesc);
}

function DecideAttacker(){
    let Desc;
    if(Player.Spd > Enemy.Spd){                 //True => Player goes first.
        if(FirstAtk){
            PlayerAttacking = true;
            Desc = ['Player used:',`${Player.Moves[choice].Name}!`];
            //DescriptionDraw(Desc);
            //Once Done:
            ///FirstAtk = false;
        }
        else{
            //PlayerAttacking = false;
            Desc = ['Enemy used:',`${Player.Moves[choice].Name}!`];
            //DescriptionDraw(Desc);
            //Once Done:
            FirstAtk = true;
        }
    }
    else{                                       //False => Enemy goes first.
        if(FirstAtk){
            //PlayerAttacking = false;
            Desc = ['Enemy used:',`${Player.Moves[choice].Name}!`];

            //Once Done:
            FirstAtk = false;
        }
        else{
            PlayerAttacking = true;
            Desc = ['Player used:',`${Player.Moves[choice].Name}!`];

            //Once Done:
            FirstAtk = true;
        }
    }
    return Desc
}

function AttackAction(Desc){                        //Here, it will display the attack description and animation.
    if(PlayerAttacking){
        //RETURNS TRUE IS THE DRAWING HITS THE ENEMY. AFTERWARDS, MOVE ONTO NEXT PERSON TO ATTACK OR END PHASE!!!
        //AtkDrawComplete = Player.Moves[choice].draw();    //TODO: COMPLETE THIS AFTER PLAYER & ENEMY ATTACK.
        
        
        DescriptionDraw(Desc);
        /* 
                FIRST: DISPLAY THE ANIMATION!!!!!

                AND
                
                THEN


                NEXT: CALCULATE AND DECREASE HP!!!!!!
        */
        
        
       AnimateDamage();
    }
    else{
        //Enemy.Moves[choice].draw();               //TODO: COMPLETE THIS AFTER PLAYER & ENENMY ATTACK.
        DescriptionDraw(Desc);
        
        /*TEMP STUFF:*/
        Battling = false;
    }
}

function AnimateDamage(){
    if(PlayerAttacking){
        let Damage = CalculateDamage(Player.Atk, Player.Moves[choice].AtkValue);
        if(Enemy.DisplayHP > Enemy.HP - Damage){
            Enemy.DisplayDamage(Damage);
        }
        else{
            Enemy.ReceiveDamage(Damage);
            PlayerAttacking = false;
            //TEMP STUFF:
            Battling = false;
        }
    }
    else{
    }
}

function CalculateDamage(PlayerAtk, MoveAtk){      //TODO: CALCULATE FOR SUPER EFFECTIVE HITS AND CHANCE OF CRITS!!
    return PlayerAtk + MoveAtk;
}

//#endregion
/**************************************************************************************/

//#region /***************************** CURSOR FUNCTIONS *****************************/
function CursorUpdate(){
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
    if(choice < CHOICEMIN)  //Passes top boundary, wrap to bottom.
        choice = CHOICEMAX;
    else if(choice > CHOICEMAX) //Passes bottom boundary, wrap to top.
        choice = CHOICEMIN;
    if(!ChoosingAtk) //Display a description of what the user's cursor is hovering over.
        CurrentDescription = MenuDescriptions[choice];
    else
        if(choice != 3)
            CurrentDescription = Player.Moves[choice].Description;
        else 
        CurrentDescription = GoBackDescription;
}
function CursorDraw(){
    context.beginPath();
    context.moveTo(MENU_X+5,MENU_Y + (choice * 15) + 10);
    context.lineTo(MENU_X+10,MENU_Y +(choice * 15) + 15);
    context.lineTo(MENU_X+5,MENU_Y + (choice * 15) + 20);
    context.closePath();
    context.fill();
}
//#endregion
/**************************************************************************************/

//#region /**************************** MENU DRAW FUNCTIONS ****************************/
function MenuDraw(){
    context.strokeRect(MENU_X,MENU_Y,MENU_WIDTH,MENU_HEIGHT);       //Print the menu box and then its content.
    PrintMenuOption(MenuOptionsArray);
    if(!Battling)                                                   //Do not print while in battle phase.
        DescriptionDraw(CurrentDescription);                        //Print the box for descriptions.    
}
function PrintMenuOption(Options){
    context.font = "12px Georgia";
    for(let i = 0; i < Options.length; i++){
        context.fillText(Options[i],MENU_X+15,MENU_Y + (i * 15) + 20);  //Display options and space them out.
    }
}
function MenuAtkDraw(){
    context.strokeRect(MENU_X,MENU_Y,MENU_WIDTH,MENU_HEIGHT);
    let Moveslist = Player.Moves.map(move => move.Name);            //Make new array containing names of player's moves.
    PrintMenuOption(Moveslist);                                     //Print the moves from the new array.
    context.fillText("Go Back",MENU_X+15,MENU_Y + 20 + (3 * 15));   //Print a fourth option to go back.
    if(!Battling)                                                   //Do not print while in battle phase.
        DescriptionDraw(CurrentDescription);                        //Attacks will have a description too!
}
function DescriptionDraw(Description){                              //Takes string array & displays it in description box.
    context.strokeRect(DESC_X,DESC_Y,MENU_WIDTH-1,MENU_HEIGHT);
    context.font = "10px Georgia";
    for(let line = 0; line < Description.length; line++){
        context.fillText(Description[line],DESC_X+5,DESC_Y+12+(line*12));
    }
}
function DisplayMainMenu(){                                         //Print the whole start menu here.
    context.font = "20px Georgia";
    context.fillText("Welcome to ShapeDown!", canvas.width / 8, canvas.height / 2 - 30);
    context.font = "15px Georgia";
    context.fillText("Controls:", canvas.width / 8, canvas.height / 2);
    context.fillText("- Arrow keys to move selection.", canvas.width / 8, canvas.height / 2 + 20);
    context.fillText("- Z to select option", canvas.width / 8, canvas.height / 2 + 35);
    context.font = "12px Georgia";
    context.fillText("Press Z to start!", canvas.width / 8, canvas.height / 2 + 60);
}
//#endregion 
/**************************************************************************************/