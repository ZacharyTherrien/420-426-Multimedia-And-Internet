const mountains = [
    {'name': 'Mount Everest', 'elevation': 8848, 'range': 'Himalayas', 'location': 'Nepal/China'},
    {'name': 'K2', 'elevation': 8611, 'range': 'Karakoram', 'location': 'India - Highest in India'},
    {'name': 'Kangchenjunga', 'elevation': 8586, 'range': 'Himalayas', 'location': 'Nepal/India'},
    {'name': 'Lhotse', 'elevation': 8516, 'range': 'Himalayas', 'location': 'Nepal/China - Climbers ascend the face of Lhotse when climbing Everest'},
    {'name': 'Makalu', 'elevation': 8485, 'range': 'Himalayas', 'location': 'Nepal/China'},
    {'name': 'Cho Oyu', 'elevation': 8201, 'range': 'Himalayas', 'location': 'Nepal/China - Considered easiest eight-thousander'},
    {'name': 'Dhaulagiri', 'elevation': 8167, 'range': 'Himalayas', 'location': 'Nepal - Presumed world\'s highest from 1808-1838'},
    {'name': 'Manaslu', 'elevation': 8163, 'range': 'Himalayas', 'location': 'Nepal'},
    {'name': 'Nanga Parbat', 'elevation': 8126, 'range': 'Himalayas', 'location': 'Pakistan'},
    {'name': 'Annapurna', 'elevation': 8091, 'range': 'Himalayas', 'location': 'Nepal - First eight-thousander to be climbed (1950)'},
    {'name': 'Gasherbrum I', 'elevation': 8080, 'range': 'Karakoram', 'location': 'Pakistan/China - Originally named K5'},
    {'name': 'Broad Peak', 'elevation': 8051, 'range': 'Karakoram', 'location': 'Pakistan/China - Originally named K3'},
    {'name': 'Gasherbrum II', 'elevation': 8035, 'range': 'Karakoram', 'location': 'Pakistan/China - Originally named K4'},
    {'name': 'Shishapangma', 'elevation': 8027, 'range': 'Himalayas', 'location': 'China'},
]

//Create the table initially.
var Table = document.getElementById('mountain-data');
var numRows = 0;
var Rows;

for(let i = 0; i < mountains.length; i++)
    InsertRow(i);

var displayMax = document.getElementById('max');
var displayMin = document.getElementById('min');
var displayAVG = document.getElementById('avg');

//Display Min, Max and AVG.
var total = mountains[0].elevation, min = mountains[0].elevation, max = mountains[0].elevation;

for(var i = 1; i < mountains.length; i++){
    if(mountains[i].elevation > max)
        max = mountains[i].elevation;
    else if(mountains[i].elevation < min)
        min = mountains[i].elevation;

    total += mountains[i].elevation;
}

displayMax.append(max);
displayMin.append(min);
displayAVG.append(total/mountains.length);

//Based on input, onky display mountains in table greater than the input.
// This function will fire when the button in the HTML is clicked.
var FirstClick = true;

function calculate() {
    var minHeight = document.getElementById('height-filter').value;

    //Add rows based on if it's the first time or not.
    if(FirstClick){
        for(let i = 0; i < mountains.length; i++){
            document.getElementById('mountain-data').deleteRow(0);  
        }
        FirstClick = false;
    }   
    else
        for(let i = mountains.length - 1; i >= (mountains.length - numRows); i--)
            document.getElementById('mountain-data').deleteRow(0);

    numRows = 0;

    //Add the rows, only allowing the ones with an elevation greater than input.
    for(let i = 0; i < mountains.length; i++)
        if(mountains[i].elevation > minHeight){
            InsertRow(i);
            numRows = numRows + 1;
        }
}

//Function to insert rows into the table.
function InsertRow(index){
    Rows = Table.insertRow(index);

    var cell1 = Rows.insertCell(0);
    var cell2 = Rows.insertCell(1);
    var cell3 = Rows.insertCell(2);
    var cell4 = Rows.insertCell(3);

    cell1.innerHTML = mountains[index].name;
    cell2.innerHTML = mountains[index].elevation;
    cell3.innerHTML = mountains[index].range;
    cell4.innerHTML = mountains[index].location;
}