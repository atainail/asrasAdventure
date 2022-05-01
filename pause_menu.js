//menu sound from https://mixkit.co/free-sound-effects/game/?page=2 
//called "small hit in a game"
//pitched with audacity


//when adding pause_menu.js to a new webpage, 
//be sure to add pause, pauseText and a(link) css
//also this code to draw the canvas for the menu
//<div class ="pause">
//<canvas id="theCanvas" width="700" height="700"></canvas>
//<div id ="pauseText">  </div> 
//</div>

var count = 0;

//if count is odd, populate menu
//if count is even, erase menu

//when esc is pressed
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        if (count % 2 == 0) {
            menuOpen.play();
            count++;
            drawMenu();


            //writes text on the pause menu
            document.getElementById("pauseText").innerHTML =
            "<div id='pauseText' style='top: 0px; left: 380px; font-size:80px;'>" +
            "Menu" +
            "</div>" +

            "<div id='pauseText' style='top: 20px; left: 380px; font-size:20px;'>" +
            "<a href ='map.html'>Back to Map</a>" +
            "</div>" +

            "<div id='pauseText' style='top: 80px; left: 380px; font-size:20px;'>" +
            "<a href ='#'>Back to Room</a>" +
            "</div>" +

            "<div id='pauseText' style='top: 100px; left: 380px; font-size:20px;'>" +
            "<a href ='#' onclick='closeWindow()'>Exit Game</a>" +
            "</div>";
             
        } else {
            closeMenu();
        }
    }
});

function closeWindow() {
    window.close();
  }

  
function closeMenu(){
  menuClose.play();
  //ctx.clearRect(0, 0, 1000, 600);
  count++;
  //erases the text on the pause menu
  document.getElementById("pauseText").innerHTML = " ";
  canvas = null;
};

var canvas;             // The canvas shown on the page.
var ctx;                // The context, used to access the canvas.
var menuOpen = new Audio("menu.mp3");
var menuClose = new Audio("menu_back.mp3");
 
var menu = new Image();
menu.src = "menu.png";

function drawMenu(){
  ctx.drawImage(menu, 375, 0, 300, 450);
}

function loadComplete() {
  
    console.log("Load is complete.");
    canvas = document.getElementById("theCanvas");
    ctx = canvas.getContext("2d");

}

