let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let keyPressed= {};
console.log(context, canvas);

canvas.height = 500;
canvas.width = 500;
car = new Car(canvas.width / 2, canvas.height / 2);

canvas.addEventListener('keydown', MoveCar);
canvas.addEventListener('keyup', NotMoveCar);

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width,canvas.height);
    //Check key pressed & call appropriate car function:
    if(keyPressed.ArrowUp){
        car.accelerate();
    }
    else if(keyPressed.ArrowDown){
        car.reverse();
    }
    else{
        car.decelerate();
    }

    if(keyPressed.ArrowLeft){
        car.turnLeft();
    }
    else if(keyPressed.ArrowRight){
        car.turnRight();
    }
    car.update();
}

function MoveCar(event){
    keyPressed[event.key] = true;
}

function NotMoveCar(event){
    keyPressed[event.key] = false;
}

animate();

canvas.focus();