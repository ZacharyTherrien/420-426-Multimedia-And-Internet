let shapes = [
    {type: "circle", colour: "red", size: 3},
    {type: "rectangle", colour: "blue", size: [3,4]},
    {type: "triangle", colour: "green", size: [2,5]}
];

for (shape of shapes){
    let area = 0;
    const pie = Math.PI;
    if(shape.type == "circle")
        area = (shape.size**2) * pie;
    else if(shape.type == "triangle")
        area = (shape.size[0] * shape.size[1]) / 2;
    else if(shape.type == "rectangle") 
        area = (shape.size[0] * shape.size[1]);
    area = area.toFixed(2);
    console.log(`The area of the ${shape.colour} ${shape.type} is: ${area}.`);
}