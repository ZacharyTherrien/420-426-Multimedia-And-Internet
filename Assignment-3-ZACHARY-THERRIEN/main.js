/********************************* UPCOMING LAUNCH *****************************************/
const urlUpcoming = "https://api.spacexdata.com/v3/launches/next";
fetch(urlUpcoming)
    .then(response => response.json())
    .then(data => {
        handleUpcoming(data);
    })
    .catch(function(error) {
        let UpcomingVehicleNodeError = document.getElementById("UpcomingVehicle");
        let UpComingVehicleTextError = document.createTextNode("Error finding upcoming vehicle!");
        UpcomingVehicleNodeError.appendChild(UpComingVehicleTextError);
        console.log(error);
});
function handleUpcoming(NextLaunch) {
    // If the request was successful then data will have everything you asked for.
    console.log(NextLaunch);

    //Get the nodes.
    let UpcomingVehicleNode = document.getElementById("UpcomingVehicle");
    let UpcomingDateNode = document.getElementById("UpcomingDate");
    let UpcomingTimeleNode = document.getElementById("UpcomingTime");
    let UpcomingLocationNode = document.getElementById("UpcomingLocation");

    //Create text nodes & populate the text nodes with data for upcoming launches.
    let UpcomingVehicleText = document.createTextNode(NextLaunch.rocket.rocket_name);
    let UpcomingLocationText = document.createTextNode(NextLaunch.launch_site.site_name_long);

    //Get Local time & date
    let LaunchDate = NextLaunch.launch_date_local.split("T");
    let UpcomingDateText = document.createTextNode(LaunchDate[0]);
    let UpcomingTimeleText = document.createTextNode(LaunchDate[1]);

    //Append text nodes to the nodes of the h3.
    UpcomingVehicleNode.appendChild(UpcomingVehicleText);
    UpcomingDateNode.appendChild(UpcomingDateText);
    UpcomingTimeleNode.appendChild(UpcomingTimeleText);
    UpcomingLocationNode.appendChild(UpcomingLocationText);
}
/********************************************************************************************/
/************************************ PAST LAUNCHES *****************************************/
const urlPastLaunches = "https://api.spacexdata.com/v3/launches/past";
function FindLaunches(){
    for(let i = 0; i < 1; i++){
        fetch(urlPastLaunches)
        .then(response => response.json())
        .then(data => {
            displayPastLaunches(data)
        })
        .catch(function(error) {
            let row = document.createElement("tr");
            let PastLaunchesErrorCell = document.createElement("td");
            let PastLaunchesErrorText = documnent.createTextNode("Erro fetching past lauches!");
            PastLaunchesErrorCell.appendChild(PastLaunchesErrorText);
            row.appendChild(PastLaunchesErrorCell);
            console.log(error);
        });
    }
}
function displayPastLaunches(data) {
    console.log(data);
    let limit = document.getElementById("numLimit").value;
    if(limit == null)
        limit = 0;
    else if(limit > data.Length)
        limit = data.Length - 1;   

    if(limit > 0 && Number.isInteger(parseInt(limit))){
        let TableBody = document.getElementById("Launches_Table");
        TableBody.innerHTML = "";
        for(let i = 0; i < limit; i++){
            //Create a row and 3 cells.
            let row = document.createElement("tr");
            let missionCell = document.createElement("td");
            let rocketCell = document.createElement("td");
            let dateCell = document.createElement("td");

            //Create text nodes.
            let missionText = document.createTextNode(data[i].mission_name);
            let rocketText = document.createTextNode(data[i].rocket.rocket_name);

            //Get local date and creqate its text node.
            let dateString = data[i].launch_date_utc.split("T");
            let dateText = document.createTextNode(dateString[0]);

            //Append text to its cell.
            missionCell.appendChild(missionText);
            rocketCell.appendChild(rocketText);
            dateCell.appendChild(dateText);

            //Append cells to the row.
            row.appendChild(missionCell);
            row.appendChild(rocketCell);
            row.appendChild(dateCell);

            //Finally, append row to table, and repeat for each rocket.
            TableBody.appendChild(row);
        }
    }
}
/************************************ SELECTION ROCKETS***************************************/
let urlRocketBase = "https://api.spacexdata.com/v3/rockets";
function RocketChosen(RocketChoice){
    let urlRocketChoice = urlRocketBase + "/" + RocketChoice;
    fetch(urlRocketChoice)
    .then(response => response.json())
    .then(data => {
        displayRocketInfo(data)
    })
    .catch(function(error) {
        console.log(error);
    });

    function displayRocketInfo(TheRocket) {
        console.log(TheRocket);
        //Get the table body and clear it.
        let TableBody = document.getElementById("Rocket_Selected");
        TableBody.innerHTML = "";

        //Create elements row and table data.
        let row = document.createElement("tr");
        let CostCell = document.createElement("td");
        let HeightCell = document.createElement("td");
        let DescriptionCell = document.createElement("td");

        //Create text nodes for the table.
        let CostText = document.createTextNode(TheRocket.cost_per_launch);
        let HeightText = document.createTextNode(TheRocket.height.meters);
        let DescriptionText = document.createTextNode(TheRocket.description);

        //Append text nodes to their respective table data.
        CostCell.appendChild(CostText);
        HeightCell.appendChild(HeightText);
        DescriptionCell.appendChild(DescriptionText);

        //Append cell nodes to row and then row to table.
        row.appendChild(CostCell);
        row.appendChild(HeightCell);
        row.appendChild(DescriptionCell);

        TableBody.appendChild(row);
    }
}