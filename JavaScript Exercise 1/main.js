function Question1(num1, num2){
    return num1 * num2;
}

function Question2(name, age){
    return (`Hello, my name is ${name} and I am ${age} years old!`);
}

function Question3(Array, N){
    return Math.pow(Array[N], N);
}

function Question4(num){
    return (num % 3 == 0 && num % 5 == 0 ? "Fizz Buzz" : num % 3 == 0 ? "Fizz" : num % 5 == 0 ? "Buzz" : num);
}

function Question5(num){
    var numString = num.toString();
    var total = numString[0];
    
    for(var i = 1; i < numString.length; i++)
        total = total * numString[i];

    return total;
}

function Question6(HiddenMsg){
    var SecretMsg = "";

    for(var i = 0; i < HiddenMsg.length; i++)
        if(HiddenMsg[i] >= "A" && HiddenMsg[i] <= "Z")
            SecretMsg = SecretMsg + HiddenMsg[i];

    return SecretMsg;
}

function Question7(myArray){
    var FoundList = new Array(myArray.length);      //Array of unique strings found. Set to parameter's array length in case all instances are unique.
    var FoundCount = new Array(myArray.length);     //Parallel array to FoundList, holds number of same instances found.
    var FoundNum = 0;                               //Number of different strings found, used to find highest index and not go overboard indexes for FoundList.
    var FoundDupe = false;
    var Most = 0;                                   //Holds index of most common string.

    FoundList[0] = myArray[0];
    FoundCount[0] = 1;

    /*Goes through each instance in the given array.
    For each instance, it will then check if it matches with a previously discovered string.
    If so, increase number of that string count found.
    Else, if a string that has not been recorded it identified, update max number of index and add it to list.
    */
    for(var i = 1; i < myArray.length; i++)
    {   for(var j = 0; j < FoundNum; j++)
        {   if(myArray[i] == FoundList[j])
            {   FoundCount[j] = FoundCount[j] + 1;
                FoundDupe = true;
            }
        }

        if(!FoundDupe)
        {   FoundNum = FoundNum + 1;
            FoundList[FoundNum] = myArray[i];
            FoundCount[FoundNum] = 1;
        }

        FoundDupe = false;
    }

    /*Goes through list of the count of unique instances found,
    compares them to the highest count.
    If a number highest count found, change it to the newest one found.*/
    for(var i = 1; i < FoundList.length; i++)
        if(FoundCount[i] > FoundCount[Most])
            Most = i;

    return FoundList[Most];
}

function Question8(myArray){
    var DupeFound = false;

    /*The loops will go through all elements in the array.
    It then compares an individual element with all of them, but itself.
    If a duplicate is found, then it will go onto the next number.
    Otherwise, it will splice it from the list, and check the next number in its index..*/
    for(var i = 0; i < myArray.length; i++)
    {   for(var j = 0; j < myArray.length; j++)
        {   if(j != i)
                if(myArray[j] == myArray[i])
                {   DupeFound = true;
                    break;
                }
        }

        if(!DupeFound)
        {   myArray.splice(i, 1);
            i = i - 1;
        }

        DupeFound = false;
    }

    return myArray;
}

function Question9(Grid, row, column){
    /*Holds number of neighbours found.*/
    var Count = 0;

    /*The following hold values of the perimater.*/
    var rowTop = row - 1;
    var rowLow = row + 1;
    var colLeft = column - 1;
    var colMid = column;
    var colRight = column + 1;

    /*The following verify that the parts of the perimeter are valid to check or not.*/
    var goodTop = rowTop >= 0;
    var goodLow = rowLow < Grid.length;

    var goodLeft = colLeft >= 0;
    var goodRight = colRight < Grid[0].length;
    

    if(goodTop)
    {   if(Grid[rowTop][colLeft] == 1 && goodLeft)
            Count = IncreaseCount(Count);
        if(Grid[rowTop][colMid] == 1)
            Count = IncreaseCount(Count);
        if(Grid[rowTop][colRight] == 1 && goodRight)
            Count = IncreaseCount(Count);
    }
    
    if(goodLow)
    {    if(Grid[rowLow][colLeft] == 1 && goodLeft)
            Count = IncreaseCount(Count);
        if(Grid[rowLow][colMid] == 1)
            Count = IncreaseCount(Count);
        if(Grid[rowLow][colRight] == 1 && goodRight)
            Count = IncreaseCount(Count);
    }
    
    if(goodLeft && Grid[colLeft][row] == 1)
            Count = IncreaseCount(Count);

    if(goodRight && Grid[colRight][row] == 1)
        Count = IncreaseCount(Count);

    return Count;
}

function IncreaseCount(Count)
{   return Count + 1;
}