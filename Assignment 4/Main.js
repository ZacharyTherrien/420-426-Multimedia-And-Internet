let canvas = document.getElementsByTagName('canvas')[0];
let context = canvas.getContext('2d');
let key;
const GameRunning = true;

canvas.addEventListener('keydown', KeyPress);

let InGame = false;
let StartedGame = false;
let CharactersCreated = false;
animate();

function animate(){
    requestAnimationFrame(animate);
    if(!InGame){
        DisplayMenu();
        if(key == 'z'){
            InGame = true;
            key = '';
        }
    }
    if(InGame){
        if(!StartedGame){
            //Create Player & Enemy
            const PlayerMoves = [AttackList[0], AttackList[1], AttackList[2], AttackList[3]];
            const EnemyMoves = [AttackList[0], AttackList[1], AttackList[2], AttackList[3]];
            let Player = new Shape(200, 20, 30, 1, 5, '#FF0000', PlayerMoves);
            let Enemy = new Shape(200, 20, 30, 0, 5, '#FF0000', EnemyMoves);

            StartedGame = true;
        }

        //Standby phase

        //Battle phase

        context.clearRect(0,0,canvas.width,canvas.height);
    }
}

function KeyPress(event){
    key = event.key;
}

function DisplayMenu(){
    context.font = "20px Arial";
    context.fillText("Welcome to ShapeDown!", canvas.width / 8, canvas.height / 2 - 30);
    context.font = "15px Arial";
    context.fillText("Controls:", canvas.width / 8, canvas.height / 2);
    context.fillText("- Arrow keys to move selection.", canvas.width / 8, canvas.height / 2 + 20);
    context.fillText("- Z to select option", canvas.width / 8, canvas.height / 2 + 35);
    context.font = "12px Arial";
    context.fillText("Press Z to start!", canvas.width / 8, canvas.height / 2 + 60);
}