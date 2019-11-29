let canvas = document.getElementsByTagName('canvas')[0];
let context = canvas.getContext('2d');
let key;
let Player;
let Enemy;
const playerX = 50;
const playerY = canvas.height - 50;
const enemyX = canvas.width - 100;
const enemyY = 20;
let turn = 0;
const GameRunning = true;

canvas.addEventListener('keydown', KeyPress);

let InMatch = false;
let StartedGame = false;
let CharactersCreated = false;
animate();

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width,canvas.height);
    if(!InMatch){
        DisplayMainMenu();
        if(key == 'z'){
            InMatch = true;
            turn = 1;
            key = '';
        }
    }
    if(InMatch){
        if(!StartedGame){
            //Create Player & Enemy
            CreateCharacters();
            StartedGame = true;
        }

        //Standby phase
        Player.draw();
        Enemy.draw();
        Turndraw();
        MenuDraw();
        //This will check the key pressed and move according to that.
        //CursorDraw();
        //Based on if seomthing was selected, perform it.
        //And then enable the battle phase.
        //MenuSelect();

        //Battle phase
        if(false){
            turn++;
        }
    }
}

function KeyPress(event){
    key = event.key;
}

function CreateCharacters(){
    const PlayerMoves = [AttackList[0], AttackList[1], AttackList[2], AttackList[3]];
    const EnemyMoves = [AttackList[0], AttackList[1], AttackList[2], AttackList[3]];
    Player = new Rectangle(200, 20, 30, 1, 5, '#FF0000', PlayerMoves, playerX, playerY);
    Enemy = new Rectangle(200, 20, 30, 0, 5, '#FF0000', EnemyMoves, enemyX, enemyY);
}

function MenuDraw(){
    context.fillRect(canvas.width-150,canvas.height-50,150,50);
    //Later, display the player's options and moves.
}

function Turndraw(){
    context.fillText(`Turn: ${turn}`,10,20,);
}

function DisplayMainMenu(){
    context.font = "20px Georgia";
    context.fillText("Welcome to ShapeDown!", canvas.width / 8, canvas.height / 2 - 30);
    context.font = "15px Georgia";
    context.fillText("Controls:", canvas.width / 8, canvas.height / 2);
    context.fillText("- Arrow keys to move selection.", canvas.width / 8, canvas.height / 2 + 20);
    context.fillText("- Z to select option", canvas.width / 8, canvas.height / 2 + 35);
    context.font = "12px Georgia";
    context.fillText("Press Z to start!", canvas.width / 8, canvas.height / 2 + 60);
}