const urlUpcoming = "https://api.spacexdata.com/v3/launches/next";// The root of the SpaceX API
fetch(urlUpcoming)
    .then(response => response.json())
    .then(data => {
        handleUpcoming(data);
    })
    .catch(function(error) {
        let UpcomingDateNodeError = document.getElementById("UpcomingDate");
        let UpcomingVehicleNodeError = document.getElementById("UpcomingVehicle");
        UpcomingDateNodeError.appendChild("error.")
        UpcomingVehicleNodeError.appendChild("error.")
        console.log(error);
});
function handleUpcoming(NextLaunch) {
    // If the request was successful then data will have everything you asked for.
    console.log(NextLaunch);

    //Get the nodes.
    let UpcomingDateNode = document.getElementById("UpcomingDate");
    let UpcomingVehicleNode = document.getElementById("UpcomingVehicle");

    //Create text nodes & populate the text nodes with data for upcoming launches.
    let UpcomingDateText = document.createTextNode(NextLaunch.launch_date_unix);
    let UpcomingVehicleText = document.createTextNode(NextLaunch.rocket.rocket_name);

    //Append text nodes to the nodes of the h3.
    UpcomingDateNode.appendChild(UpcomingDateText);
    UpcomingVehicleNode.appendChild(UpcomingVehicleText);
}