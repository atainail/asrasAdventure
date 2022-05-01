const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let timeUp = false;
let score = 0;
var bonk = new Audio("bonk.mp3");
function randomTime(min, max) {
return Math.round(Math.random() * (max - min) + min);
}
function randomHole(holes) {
const idx = Math.floor(Math.random() * holes.length);
const hole = holes[idx];
if (hole === lastHole) {
return randomHole(holes);
}
lastHole = hole;
return hole;
}
function peep() {
	
const time = randomTime(200, 1000);
const hole = randomHole(holes);
hole.classList.add('up');

setTimeout(() => {
hole.classList.remove('up');
if (!timeUp) peep();
}, time);
}

function startGame() {
scoreBoard.textContent = 0;
timeUp = false;
score = 0;
peep();
setTimeout(() => timeUp = true, 10000);
console.log("button is pressed")
}

function carnRedirect() {
    stopMusic(carnMusic);
    drawCarn2();
    clearId('whack');
    sceneMusic.play();
    restartDialogue();
    
}

function checkWin() {
    if (score==4) {
    timeUp = true;
    var html = "";
    document.getElementById("whackWin").innerHTML += '<img src="whackWin.jpeg" alt="You win" / style ="position:absolute; left: 200px; width: &apos;200&apos; ; height: &apos;100&apos;;">';
    carnVisited = 1;
    gamesCompleted++;
    setTimeout(carnRedirect, 4000);
    winMusic.play();
    }
}

function whack(e) {
if(!e.isTrusted) return;
score++;
this.parentNode.classList.remove('up');
scoreBoard.textContent = score;
 
bonk.play();
checkWin();
}

moles.forEach(mole => mole.addEventListener('click', whack));