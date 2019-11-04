const mountains = [
	{ name: 'Mount Everest', elevation: 8848, range: 'Himalayas', location: 'Nepal/China' },
	{ name: 'K2', elevation: 8611, range: 'Karakoram', location: 'India - Highest in India' },
	{ name: 'Kangchenjunga', elevation: 8586, range: 'Himalayas', location: 'Nepal/India' },
	{ name: 'Lhotse', elevation: 8516, range: 'Himalayas', location: 'Nepal/China - Climbers ascend the face of Lhotse when climbing Everest' },
	{ name: 'Makalu', elevation: 8485, range: 'Himalayas', location: 'Nepal/China' },
	{ name: 'Cho Oyu', elevation: 8201, range: 'Himalayas', location: 'Nepal/China - Considered easiest eight-thousander' },
	{ name: 'Dhaulagiri', elevation: 8167, range: 'Himalayas', location: 'Nepal - Presumed world\'s highest from 1808-1838' },
	{ name: 'Manaslu', elevation: 8163, range: 'Himalayas', location: 'Nepal' },
	{ name: 'Nanga Parbat', elevation: 8126, range: 'Himalayas', location: 'Pakistan' },
	{ name: 'Annapurna', elevation: 8091, range: 'Himalayas', location: 'Nepal - First eight-thousander to be climbed (1950)' },
	{ name: 'Gasherbrum I', elevation: 8080, range: 'Karakoram', location: 'Pakistan/China - Originally named K5' },
	{ name: 'Broad Peak', elevation: 8051, range: 'Karakoram', location: 'Pakistan/China - Originally named K3' },
	{ name: 'Gasherbrum II', elevation: 8035, range: 'Karakoram', location: 'Pakistan/China - Originally named K4' },
	{ name: 'Shishapangma', elevation: 8027, range: 'Himalayas', location: 'China' }
];

const buildMountainsTable = mountainsList => {
	const tableBody = document.getElementById('mountain-data');
	
	tableBody.innerHTML = ''; // Clear any old data.
	
	mountainsList.map(mountain => {
		const row = document.createElement('tr');
	
		const nameCell = document.createElement('td');
		const elevationCell = document.createElement('td');
		const rangeCell = document.createElement('td');
		const locationCell = document.createElement('td');
	
		const nameText = document.createTextNode(mountain.name);
		const elevationText = document.createTextNode(mountain.elevation);
		const rangeText = document.createTextNode(mountain.range);
		const locationText = document.createTextNode(mountain.location);
	
		nameCell.appendChild(nameText);
		elevationCell.appendChild(elevationText);
		rangeCell.appendChild(rangeText);
		locationCell.appendChild(locationText);
	
		row.appendChild(nameCell);
		row.appendChild(elevationCell);
		row.appendChild(rangeCell);
		row.appendChild(locationCell);
	
		tableBody.appendChild(row);
	});
};

const filterMountainsHigherThanInput = () => {
	const elevation = document.getElementById('height-filter').value;
	return mountains.filter(mountain => mountain.elevation > elevation);
};

// The following 3 function expressions return the result of the reduce method on a given array of mountains.
const findHighestMountain = mountainsList => mountainsList.reduce((accumulator, currentMountain) => accumulator > currentMountain.elevation ? accumulator : currentMountain.elevation, 0);

const findShortestMountain = mountainsList => mountainsList.reduce((accumulator, currentMountain) => accumulator < currentMountain.elevation ? accumulator : currentMountain.elevation, mountainsList[0].elevation);

const findAverageMountainElevation = mountainsList => mountainsList.reduce((accumulator, currentMountain) => accumulator += currentMountain.elevation, 0) / mountainsList.length;

// This function will fire when the button in the HTML is clicked.
function calculate() {
	const filteredMountains = filterMountainsHigherThanInput();
	
	buildMountainsTable(filteredMountains);

	const highestMountain = findHighestMountain(filteredMountains);
	const shortestMountain = findShortestMountain(filteredMountains);
	const averageMountain = findAverageMountainElevation(filteredMountains);
	
	const highestMountainElementNode = document.getElementById('highest-mountain');
	const shortestMountainElementNode = document.getElementById('shortest-mountain');
	const averageMountainElementNode = document.getElementById('average-height');
	
	const highestMountainTextNode = document.createTextNode(`The tallest mountain is: ${highestMountain}`);
	const shortestMountainTextNode = document.createTextNode(`The shortest mountain is: ${shortestMountain}`);
	const averageMountainTextNode = document.createTextNode(`The average height of all the mountains is: ${averageMountain}`);

	highestMountainElementNode.innerHTML = '';
	shortestMountainElementNode.innerHTML = '';
	averageMountainElementNode.innerHTML = '';
	
	highestMountainElementNode.appendChild(highestMountainTextNode);
	shortestMountainElementNode.appendChild(shortestMountainTextNode);
	averageMountainElementNode.appendChild(averageMountainTextNode);
}

buildMountainsTable(mountains);
calculate();
