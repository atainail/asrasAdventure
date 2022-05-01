var getRandomNumber = function (size) {
    return Math.floor(Math.random() * size);
};

var getDistance = function (event, target) {
    var diffX = event.offsetX - target.x;
    var diffY = event.offsetY - target.y;
    return Math.sqrt((diffX * diffX) + (diffY * diffY));
};

var getDistanceHint = function (distance) {
    if (distance < 10) {
        return "Boiling hot!";
    } else if (distance < 20) {
        return "Really hot";
    } else if (distance < 40) {
        return "Hot";
    } else if (distance < 80) {
        return "Warm";
    } else if (distance < 160) {
        return "Cold";
    } else if (distance < 320) {
        return "Really cold";
    } else {
        return "Freezing!";
    }
};

// variables to find random numbers
var width = 600;
var height = 400;
// clicks variable is to track the no. of clicks the user will take to find treasure.
var clicks = 0;
// target is the location where the treasure was buried
var target = {
    x: getRandomNumber(width),
    y: getRandomNumber(height)
};

// on every click the below function calls
$("#map").click(function (event) {
    clicks++;

    // Finds the distance between the treasure and clicked position
    var distance = getDistance(event, target);

    // Responding to the user with status
    var distanceHint = getDistanceHint(distance);

    // Update the #distance element with the new status
    $("#distance").text(distanceHint);

    // If the click was close enough, The game is finished.
    if (distance < 10) {
        alert("Found the Cannoli in " + clicks + " clicks, Let's go!");
        gamesCompleted++;
        playVisited = 1;
        playRedirect();
        winMusic.play();
    }
});

function playRedirect() {
stopMusic(playMusic);
drawPlay2();
clearId('playGame');
sceneMusic.play();
restartDialogue();
}