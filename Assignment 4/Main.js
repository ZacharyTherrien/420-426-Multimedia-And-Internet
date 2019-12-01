//#region /********************* VARIABLES ******************************/
let canvas = document.getElementsByTagName('canvas')[0];
let context = canvas.getContext('2d');
let key;
let choice = 0;
const CHOICEMIN = 0;
const CHOICEMAX = 3;
let CharactersCreated = false;
let Player;
let Enemy;
const PLAYER_X = 50;
const PLAYER_Y = canvas.height - 50;
const ENEMY_X = canvas.width - 100;
const ENEMY_Y = 20;
const MENU_X = canvas.width-75;
const MENU_Y = canvas.height-50;
const MenuOptions = {"Attack":0,"Defend":1,"GiantMax":2,"Flee":3};
const MenuOptionsArray = ["Attack", "Defend", "GiantMax", "Flee"];
const MenuDescriptions = [Attack = ["Select an Attack."], 
Defend = ["Defend", "This will increase", "your defense stat"],
GiantMax = ["Ability unavailable.","Win once to unlock."],
Flee = ["Exit the battle.", "Automatic loss."]];
const GoBackDescription = ["Return to", "main menu."];
let CurrentDescription = "";
let InMatch = false;
let StartedGame = false;
let turn;
let ChoiceSelected = false;
let ChoosingAtk = false;
let Battling = false;
let Won = false;
let Lost = false;
//#endregion
/************************************************************************/

canvas.addEventListener('keydown', event => key = event.key );
animate();
function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width,canvas.height);
    if(!InMatch){
        DisplayMainMenu();
        if(AcceptButtonPressed()) //Start match, set boolean values too.
            MatchInitiation();
    }
    if(!StartedGame){       //Create Player & Enemy before start of game           
        CreateCharacters();
        StartedGame = true;
    }
    if(InMatch & !Won && !Lost){
        /********************** STANDBY PHASE ************************/
        Player.draw();
        Enemy.draw();
        TurnDraw(); //Display the turn.
        if(!ChoosingAtk)
            MenuDraw(); //Draw current menu for player.
        else
            MenuAtkDraw();
        CursorUpdate();  //This will check the key pressed.
        CursorDraw();    //This will move according to what's pressed.
        if(!ChoosingAtk) //If something selected, perform it, enable battle phase, unless attack or flee selected.
            MenuSelect();
        else
            AtkSelect();
        /*********************** BATTLE PHASE ************************/
        if(Battling){
            //For whoever goes first and then second:
            //Display action is description box.
            //Perform drawing.
            turn++; //Increase turn after player & enemy's move.
            Battling = false;
        }
        /************************* END PHASE *************************/
        if(Won || Lost){
            InMatch = false; //Exit match not that a winner has been decided.
        }
    }
    /************************ END OF MATCH ***********************/
    //Print this after to make it keep looping properly please!
    //MAKE SURE TO PRINT AN END SCREEN MENU PLEASE!!
    key = ''; //Set the current key to blank so it can only be registered once.
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
    context.fillText(`Turn: ${turn}`,10,20);
}

function CreateCharacters(){
    /*Initialize the moves for both player and enemies and them create them at the start.*/
    const PlayerMoves = [AttackList[0], AttackList[1], AttackList[2], AttackList[3]];
    const EnemyMoves = [AttackList[0], AttackList[1], AttackList[2], AttackList[3]];
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
    context.moveTo(MENU_X+3,MENU_Y + (choice * 10) + 5);
    context.lineTo(MENU_X+8,MENU_Y +(choice * 10) + 10);
    context.lineTo(MENU_X+3,MENU_Y + (choice * 10) +15);
    context.closePath();
    context.fill();
}
//#endregion
/**************************************************************************************/

//#region /**************************** MENU DRAW FUNCTIONS ****************************/
function MenuDraw(){
    context.strokeRect(MENU_X,MENU_Y,75,50); //Print the menu box and then its content.
    PrintMenuOption(MenuOptionsArray);
    DescriptionDraw(CurrentDescription);                     //Print the box for descriptions.    
}
function PrintMenuOption(Options){
    context.font = "10px Georgia";
    for(let i = 0; i < Options.length; i++){
        context.fillText(Options[i],MENU_X+10,MENU_Y + (i * 10) + 15);
    }
}
function MenuAtkDraw(){
    context.strokeRect(MENU_X,MENU_Y,75,50);
    let Moveslist = Player.Moves.map(move => move.Name);
    PrintMenuOption(Moveslist);
    context.fillText("Go Back",MENU_X+10,MENU_Y + (3 * 10) + 15); //Print a fourth option to go back.
    DescriptionDraw(CurrentDescription); //Attacks will have a description too!
}
function DescriptionDraw(Description){
    context.strokeRect(MENU_X-75,MENU_Y,75,50);
    context.font = "7px Georgia";
    for(let line = 0; line < Description.length; line++){
        context.fillText(Description[line],MENU_X-70,MENU_Y+10+(line*10));
    }

}
function DisplayMainMenu(){         //Print the whole start menu here.
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