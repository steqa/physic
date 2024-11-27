let timer;
let seconds = 0;
let milliseconds = 0;
let resultAdded = false;

const timeSeconds = document.getElementById('timeSeconds');
const timeMilliseconds = document.getElementById('timeMilliseconds');
const stopButton = document.getElementById('stopButton');

function startTimer() {
    timer = setInterval(() => {
        milliseconds++;
        if (milliseconds >= 100) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        timeSeconds.textContent = String(seconds).padStart(2, '0');
        timeMilliseconds.textContent = String(milliseconds).padStart(2, '0');
    }, 10);
}

function stopTimer() {
    clearInterval(timer);
}

stopButton.addEventListener('click', () => {
    if (!resultAdded && work) {
        resultAdded = true;
        stopTimer();
        const t = timeSeconds.textContent + '.' + timeMilliseconds.textContent;
        let M = 0;
        if (cylinderIsDown) M = m_c;
        insertTableRow(t, m, h, M);
    }
});

function resetTimer() {
    resultAdded = false;
    seconds = 0;
    milliseconds = 0;
    timeSeconds.textContent = String(seconds).padStart(2, '0');
    timeMilliseconds.textContent = String(milliseconds).padStart(2, '0');
}
