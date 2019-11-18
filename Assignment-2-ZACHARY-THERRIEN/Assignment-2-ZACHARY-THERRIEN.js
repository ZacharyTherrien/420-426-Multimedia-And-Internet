function xoReferee(Match){
    var Check = "D";
    var Length = 3;
    var WinnerFound = false;

    for(var col = 0; col < Length; col++){                 //Check the verticals        
        Check = Match[0][col];
        if(Check != "."){
            for(var row = 1; row < Length; row++){         //Check by each row
                if(Match[row][col] == Check)
                    WinnerFound = true;
                else{
                    WinnerFound = false;
                    break;
                }
            }   
            if(WinnerFound) 
                return Check;
        }
    }
    if(!WinnerFound){
        for(var row = 0; row < Length; row++){             //Check horizontally
            Check = Match[row][0]
            if(Check != "."){
                for(var col = 1; col < Length; col++){     //Check by each column 
                    if(Match[row][col] == Check)
                        WinnerFound = true;
                    else{
                        WinnerFound = false;
                        break;
                    }
                }
                if(WinnerFound)
                    return Check;
            }
        }
    }
    if(!WinnerFound){               //Check Diagonally.
        var row = 0;
        var col = 0;
        Check = Match[row][col];

        if(Match[row][col] == Match[row+1][col+1] && Match[row][col] == Match[row+2][col+2] && Check != ".")        
            return Check;
        
        row = Length -1;
        col = Length - 1;
        Check = Match[row][col];

        if(Match[row][col] == Match[row-1][col-1] && Match[row][col] == Match[row-2][col-2] && Check != ".")
            return Check;
    }
    return "D";
}

function safePawns(Pawns){
    const COL = 0, ROW = 1;
    let numSafe = 0;
    let colLeft, colRight, rowBack;
    let safeLeft, safeRight;

    for(i in Pawns){
        rowBack = Pawns[i].charCodeAt(ROW);         //Retrieve the row behind the pawn
        rowBack = rowBack -1;
        colLeft = Pawns[i].charCodeAt(COL);         //Retrieve column on pawn's left.
        colLeft = colLeft - 1;
        colRight = Pawns[i].charCodeAt(COL);        //Retrieve column on pawn's right.
        colRight = colRight +1;

        safeLeft = String.fromCharCode(colLeft) + String.fromCharCode(rowBack);;    //Append left/right with back for safe spots.
        safeRight = String.fromCharCode(colRight) + String.fromCharCode(rowBack);;   

        for(j of Pawns)                                             //Go through list of pawns, check for any matches.
            if(j != Pawns[i] && j == safeLeft || j == safeRight){   //Skip if duplicate, increase count if left or right match.
                numSafe = numSafe + 1;
                break;
            }
    }

    return numSafe;
}

function rectanglesUnion(Rec){
    const x1 = 0, y1 = 1, x2 =2, y2 = 3;
    let total = 0, lengthX, lengthY;
    var PairFound = new Array(Rec.length);
    for(r in Rec){
        total += ((Rec[r][x2] - Rec[r][x1]) * (Rec[r][y2] - Rec[r][y1]));   //Find all areas and add them.
        PairFound[r] = false;
    }

    for(i in Rec){                                                          //Remove overlap area.                                 
        lengthX = 0;
        lengthY = 0;
        for(let j = 0; j < Rec.length; j++){                                //Find length of x and then y.
            if(Rec[j] != Rec[i] && Rec[i][x2] > Rec[j][x1]
            && Rec[j][y2] > Rec[i][y1] && PairFound[j] != true){    
                if(Rec[i][y2] < Rec[j][y2])                                      //First find length of y.
                    lengthY = Rec[i][y2] - Rec[i][y1];
                else
                    lengthY = Rec[j][y2] - Rec[j][y1];
                if(Rec[i][x2] > Rec[j][x2])                                      //Next, length of x.
                    lengthX = Rec[j][x2] - Rec[j][x1];
                else 
                    lengthX = Rec[i][x2] - Rec[i][x1];
                if(lengthX != 0 && lengthY != 0){
                    PairFound[i] = PairFound[j] = true;
                    break;
                }
            }
        }
        total -= (lengthX * lengthY)
    }
    return total;
}

function fastTrain(Rail){
    const RAIL = 0, SPEEDLIMIT = 1;
    let distance = Rail[0][RAIL], speed = 0, minutes  = 0, numRail = 0;
    limit = Rail[0][SPEEDLIMIT], position = 0, currentRailIndex = 0;
    let distanceTotal = 0, multipleRails = false, nextLimit = 0;

    for(r of Rail){                                         //Find total length of rail system.
        distanceTotal += r[RAIL];
    }

    if(distance > 0){                                       //Set variables from array if it's not empty.
        limit = Rail[currentRailIndex][SPEEDLIMIT];
        if(Rail.length > 1){
            multipleRails = true;
            nextLimit = Rail[currentRailIndex+1][SPEEDLIMIT];
        }
    }

    while(position < distanceTotal){
        if(!multipleRails){                                             //Updates speed as the last rail.
            if(distance - position > distance/2 && speed+1 < limit){
                speed++;
            }
            else if(distance - position < distance/2 && speed > 1){     
                speed--;
            }
        }
        else{                                                           //Updates speed considering other rails.
            if(distance - position > distance/2 && speed+1 < limit && speed <= nextLimit){
                speed++;
            }
            else if(distance - position < distance/2 && speed > 1 && speed > nextLimit){
                speed--;
            }
        }

        minutes++;
        position += speed;
        
        if(position > distance && multipleRails){       //See if position is in a next rail, if so, switch.
            numRail++;
            distance = Rail[numRail][RAIL];
            limit = Rail[numRail][SPEEDLIMIT];
            if(numRail+1 <= Rail.length){
                nextLimit = Rail[currentRailIndex+1][SPEEDLIMIT];
            }
            if(numRail = Rail.length){
                multipleRails = false;
            }
        }    
        
    }

    return minutes;
}

module.exports = {
    xoReferee: xoReferee,
    safePawns: safePawns,
    rectanglesUnion: rectanglesUnion,
    fastTrain: fastTrain
};