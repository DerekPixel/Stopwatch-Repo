const displayElement = document.querySelector('#display');
const lapsElement = document.querySelector('#laps')
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const stopButton = document.querySelector('#stop');
const lapButton = document.querySelector('#lap');
var currentLap;

var startTime, timeInterval;
var elapsedTime = 0;
var lapStartTime
var lapElaspedTime = 0;
var numberOfLaps = 0;
var lapTimes = []



startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
stopButton.addEventListener('click', reset);
function activateLapButton() {
    lapButton.addEventListener('click', lap);
}

function start() {
    startTime = Date.now() - elapsedTime;
    lapStartTime = Date.now() - lapElaspedTime;
    
    
    activateLapButton();
    timeInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        lapElaspedTime = Date.now() - lapStartTime
        print(timeToString(elapsedTime));
        currentLap.textContent = timeToString(lapElaspedTime);
    }, 1);
    showButton('PAUSE');
    lap();
}

function pause() {
    clearInterval(timeInterval);
    showButton('PLAY');
}

function reset() {
    clearInterval(timeInterval);
    elapsedTime = 0
    print('00:00:00.00');
    showButton('PLAY');
    lapTimes = [];
    while (lapsElement.firstChild) {
        lapsElement.removeChild(lapsElement.lastChild);
    }
}

function lap() {

    var time = elapsedTime;
    var newLap = document.createElement('div');
    var lapTimeTotal = lapTimes.reduce((a, b) => a + b, 0);
    var lapTime = time - lapTimeTotal;

    // if(numberOfLaps === 0) {
    //     lapTimes.push(time)
    //     newLap.textContent = `#${lapTimes.length}\u00A0\u00A0\u00A0\u00A0\u00A0${timeToString(time)}`;
    //     lapsElement.insertBefore(newLap, lapsElement.firstChild);
    //     numberOfLaps += 1;
    // } else {
    //     lapTimes.push(lapTime)
    //     newLap.textContent = `#${lapTimes.length}\u00A0\u00A0\u00A0\u00A0\u00A0${timeToString(lapTime)}`;
    //     lapsElement.insertBefore(newLap, lapsElement.firstChild);
    // }
    console.log(`laptime: ${timeToString(lapTime)}`);
    console.log(`lapElaspedTime: ${timeToString(lapElaspedTime)}`);
    console.log(`lapTimeTotal: ${timeToString(lapTimeTotal)}`)

    lapTimes.push(lapTime);

    lapsElement.insertBefore(newLap, lapsElement.firstChild);

    lapsElement.firstChild.id = 'current-lap';

    if(lapsElement.childNodes.length !== 2){
        lapsElement.childNodes[1].removeAttribute('id');
        lapsElement.childNodes[1].textContent = `#${lapTimes.length}\u00A0\u00A0\u00A0\u00A0\u00A0${timeToString(lapTime)}`;
    }
    currentLap = document.querySelector('#current-lap');
    lapStartTime = Date.now();
}

function timeToString(time) {

    var diffInHr = time / 3600000;
    var hh = Math.floor(diffInHr).toString().padStart(2, "0");
    var diffInMin = (diffInHr - hh) * 60;
    var mm = Math.floor(diffInMin).toString().padStart(2, "0");
    var diffInSec = (diffInMin - mm) * 60;
    var ss = Math.floor(diffInSec).toString().padStart(2, "0");
    var diffInMs = (diffInSec - ss) * 1000;
    var ms = Math.floor(diffInMs).toString().padStart(2, "0");
    return `${hh}:${mm}:${ss}.${ms}`;
}

function print(string) {
    displayElement.textContent = string;
}

function showButton(buttonKey) {
    const buttonToShow = buttonKey === "PLAY" ? startButton : pauseButton;
    const buttonToHide = buttonKey === "PLAY" ? pauseButton : startButton;
    buttonToShow.style.display = "block";
    buttonToHide.style.display = "none";
  }