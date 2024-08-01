let startTime = 0;
let elapsedTime = 0;
let lapTimes = [];
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start-button');
const lapButton = document.getElementById('lap-button');
const resetButton = document.getElementById('reset-button');
const lapTimesList = document.getElementById('lap-times');

startButton.addEventListener('click', start);
lapButton.addEventListener('click', lap);
resetButton.addEventListener('click', reset);

function start() {
  if (!running) {
    startTime = new Date().getTime();
    running = true;
    startButton.disabled = true;
    lapButton.disabled = false;
    updateDisplay();
  }
}

function lap() {
  if (running) {
    const lapTime = new Date().getTime() - startTime;
    lapTimes.push(lapTime);
    const lapTimeElement = document.createElement('li');
    lapTimeElement.textContent = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
    lapTimesList.appendChild(lapTimeElement);
  }
}

function reset() {
  startTime = 0;
  elapsedTime = 0;
  lapTimes = [];
  running = false;
  display.textContent = '00:00:00';
  lapTimesList.innerHTML = '';
  startButton.disabled = false;
  lapButton.disabled = true;
}

function updateDisplay() {
  if (running) {
    const currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
    requestAnimationFrame(updateDisplay);
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
}