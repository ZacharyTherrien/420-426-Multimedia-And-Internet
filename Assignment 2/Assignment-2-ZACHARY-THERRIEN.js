function xoReferee(Match){
    var Check;
    var Length = 3;

    //Check the verticals.
    for(var col = 0; col < Length; col++){
        row = 0;
        Check = Match[row][col];
        if(Match[row + 1][col] == Match[row + 2][col] && Check == Match[row + 1][col])
            return Check;       
    }
}