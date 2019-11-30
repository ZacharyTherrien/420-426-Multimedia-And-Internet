let canvas = document.getElementsByTagName('canvas')[0];
let context = canvas.getContext('2d');
let key;
let choice = 0;
const CHOICEMIN = 0;
const CHOICEMAX = 3;
let Player;
let Enemy;
const playerX = 50;
const playerY = canvas.height - 50;
const enemyX = canvas.width - 100;
const enemyY = 20;
const MenuX = canvas.width-75;
const MenuY = canvas.height-50;
const MenuOptions = {"Attack":0,"Defend":1,"GiantMax":2,"Flee":3};
const MenuOptionsArray = ["Attack", "Defend", "GiantMax", "Flee"];
let turn;
let ChoiceSelected = false;
const GameRunning = true;

canvas.addEventListener('keydown', KeyPress);

let InMatch = false;
let Won = false;
let Lost = false;
let ChoosingAtk = false;
let StartedGame = false;
let CharactersCreated = false;
animate();

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width,canvas.height);
    if(!InMatch){
        DisplayMainMenu();
        if(AcceptButtonPressed()) //Start match, set boolean values too.
            MatchInitiation();
    }
    if(InMatch & !Won && !Lost){
        if(!StartedGame){ //Create Player & Enemy before start of game           
            CreateCharacters();
            StartedGame = true;
        }

        /********************** STANDBY PHASE ************************/
        Player.draw();
        Enemy.draw();
        TurnDraw(); //Display the turn.
        if(!ChoosingAtk)
            MenuDraw(); //Draw current menu for player.
        else
            MenuAtkDraw();
        CursorUpdate(); //This will check the key pressed.
        CursorDraw(); //This will move according to what's pressed.
        
        //Based on if seomthing was selected, perform it.
        //And then enable the battle phase.
        if(!ChoosingAtk)
            MenuSelect();
        else
            AtkSelect();

        /*********************** BATTLE PHASE ************************/
        if(false){
            turn++; //Increase turn after player & enemy's move.
        }

        /************************* END PHASE *************************/
        if(Won || Lost){
            InMatch = false; //Exit match not that a winner has been decided.
        }
        key = '';
    }
    /************************ END OF MATCH ***********************/
    //Print this after to make it keep looping properly please!
    //MAKE SURE TO PRINT AN END SCREEN MENU PLEASE!!
    key = ''; //Set the current key to blank so it can only be registered once.
}

function KeyPress(event){
    key = event.key;
}

function AcceptButtonPressed(){
    return key == 'z';
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

function CreateCharacters(){
    /*Initialize the moves for both player and enemies and them create them at the start.*/
    const PlayerMoves = [AttackList[0], AttackList[1], AttackList[2], AttackList[3]];
    const EnemyMoves = [AttackList[0], AttackList[1], AttackList[2], AttackList[3]];
    Player = new Rectangle(200, 20, 30, 1, 5, '#FF0000', PlayerMoves, playerX, playerY);
    Enemy = new Rectangle(200, 20, 30, 0, 5, '#FF0000', EnemyMoves, enemyX, enemyY);
}


function MenuSelect(){
    if(AcceptButtonPressed()){
        switch(choice){
            case MenuOptions.Attack:
                ChoosingAtk = true;
                break;
            case MenuOptions.Defend:
                break;
            case MenuOptions.getContext:
                break;
            case MenuOptions.Flee:
                Lost = true;
                break;
        }
    }
}

function AtkSelect(){
    if(AcceptButtonPressed){
        switch(chioce){
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                ChoosingAtk = false;
                break;
        }
    }
}

function TurnDraw(){
    context.fillText(`Turn: ${turn}`,10,20,);
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
}

function CursorDraw(){
    context.beginPath();
    context.moveTo(MenuX+3,MenuY + (choice * 10) + 5);
    context.lineTo(MenuX+8,MenuY +(choice * 10) + 10);
    context.lineTo(MenuX+3,MenuY + (choice * 10) +15);
    context.closePath();
    context.fill();
}
//#endregion
/**************************************************************************************/

//#region /****************************** MENU FUNCTIONS ******************************/
function MenuDraw(){
    context.strokeRect(MenuX,MenuY,75,50); //Print the menu box and then its content.
    PrintMenuOption(MenuOptionsArray);
    DescriptionDraw();                     //Print the box for descriptions.    
}

function DescriptionDraw(){
    context.strokeRect(MenuX-75,MenuY,75,50);
}

function PrintMenuOption(Options){
    context.font = "10px Georgia";
    for(let i = 0; i < Options.length; i++){
        context.fillText(Options[i],MenuX+10,MenuY + (i * 10) + 15);
    }
}
function MenuAtkDraw(){
    context.strokeRect(MenuX,MenuY,75,50);
    let Moveslist = Player.Moves.map(move => move.Name);
    PrintMenuOption(Moveslist);
    context.fillText("Go Back",MenuX+10,MenuY + (3 * 10) + 15); //Print a fourth option to go back.
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