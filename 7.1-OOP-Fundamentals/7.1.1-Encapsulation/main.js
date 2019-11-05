class Circle{
    constructor(radius, colour){
        this.radius = radius;
        this.colour = colour;
    }
    // area(){
    //     return (this.radius**2) * Math.PI;
    // }
}

class Triangle{
    constructor(base, height, colour){
        this.base = base;
        this.height = height;
        this.colour = colour;
    }
    // area(){
    //     return (this.base * this.height) / 2;
    // }
}

class Rectangle{
    constructor(height, width, colour){
        this.height = height;
        this.width = width;
        this.colour = colour;
    }
    // area(){
    //     return (this.height * this.width);
    // }
}

const circle = new Circle(3,"Red");
const triangle = new Triangle(2,5,"Green");
const rectangle = new Rectangle(3,4,"Blue");

let shapes = [circle,triangle,rectangle];

for (shape of shapes){
    let area = 0;
    const PI = Math.PI;
    if(shape instanceof Circle)
        area = (shape.radius**2) * PI;
    else if(shape instanceof Triangle)
        area = (shape.base * shape.height) / 2;
    else if(shape instanceof Rectangle)
        area = (shape.height * shape.width);
    console.log(`The area of the ${shape.colour} ${shape.constructor.name} is: ${area}.`);
}