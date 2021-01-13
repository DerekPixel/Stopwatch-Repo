const displayElement = document.querySelector('#display');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const stopButton = document.querySelector('#stop');

var startTime, timeInterval;
var elapsedTime = 0;

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
stopButton.addEventListener('click', reset);

function start() {
    startTime = Date.now() - elapsedTime;
    timeInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeToString(elapsedTime);
    }, 5);
}

function pause() {
    clearInterval(timeInterval);
}

function reset() {
    clearInterval(timeInterval);
    elapsedTime = 0
    displayElement.textContent = '00:00:00.00';
}

function timeToString(time) {

    var diffInHr = time / 3600000;
    var hh = Math.floor(diffInHr).toString().padStart(2, "0");
    var diffInMin = (diffInHr - hh) * 60;
    var mm = Math.floor(diffInMin).toString().padStart(2, "0");
    var diffInSec = (diffInMin - mm) * 60;
    var ss = Math.floor(diffInSec).toString().padStart(2, "0");
    var diffInMs = (diffInSec - ss) * 100;
    var ms = Math.floor(diffInMs).toString().padStart(2, "0");
    displayElement.textContent = `${hh}:${mm}:${ss}.${ms}`;
}