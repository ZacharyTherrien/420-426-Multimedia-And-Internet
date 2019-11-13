const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');

// context.fillRect(25,25,100,100);
// context.clearRect(45,45,60,60);
// context.strokeRect(50,50,50,50);

// context.beginPath();
// context.moveTo(60,60);
// context.lineTo(85,75);
// context.lineTo(85,55);
// context.closePath();
// context.fill();

context.beginPath();
context.arc(50, 50, 15, 0, (Math.PI/180) * 360);
context.closePath();
context.fill();