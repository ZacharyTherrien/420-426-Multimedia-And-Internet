class Shape{
    constructor(colour){
        this.colour = colour;
    }
    displayColour(){
        console.log(this.colour);
    }   
}

class Circle extends Shape{
    constructor(radius, colour){
        super(colour);
        this.radius = radius;
    }
    Area(){
       return (this.radius**2) * Math.PI;
    }
}

class Triangle extends Shape{
    constructor(base, height, colour){
        super(colour);
        this.base = base;
        this.height = height;        
    }
    Area(){
        return (this.base * this.height) / 2;
    }
}

class Rectangle extends Shape{
    constructor(height, width, colour){
        super(colour);
        this.height = height;
        this.width = width;
    }
    Area(){
         return (this.height * this.width);
    }
}

const circle = new Circle(3,"Red");
const triangle = new Triangle(2,5,"Green");
const rectangle = new Rectangle(3,4,"Blue");

let shapes = [circle,triangle,rectangle];

for (shape of shapes){
    console.log(`The area of the ${shape.colour} ${shape.constructor.name} is: ${shape.Area()}.`);
    shape.displayColour();
}