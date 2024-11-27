const kettlebell = document.querySelector('.kettlebell');
const movingContainer = document.querySelector('.movingContainer');
const ruler = document.querySelector('.ruler');
const block = document.querySelector('#block');
const ropeBlock = document.querySelector('.ropeBlock');
const cylinder = document.querySelector('.cylinder');
const startBtn = document.querySelector('.startBtn');
const clearBtn = document.querySelector('.clearBtn');
const rulerBtn = document.querySelector('.rulerBtn');
const cylinderBtn = document.querySelector('.cylinderBtn');
const cylinderMassInputContainer = document.querySelector('#cylinderMassInputContainer');

const ropeBlockHeightVh = parseFloat(getComputedStyle(ropeBlock).getPropertyValue('--rope-height').trim());
const endPosition = (movingContainer.offsetHeight / window.innerHeight) * 100; // vh

// длина 1 см в vh
const cmVh = 0.547;

let work = false;
let cylinderIsDown = false;

// ----------------------------------------------

// ускорение свободного падения
const g = 9.81; // м/с²

// масса груза
let m = 0.1; // кг

// высота падения
let h = 1; // м

// масса шкива
const m_p = 15; // кг
// радиус шкива
const r_p = 0.05; // м
// момент инерции шкива
const J_p = () => (1 / 2) * m_p * r_p ** 2;

// масса исследуемого тела
let m_c = 0.5; // кг
// радиус исследуемого тела
const r_c = 0.2; // м
// момент инерции исследуемого тела
const J_c = () => {
    if (cylinderIsDown) return (1 / 2) * m_c * r_c ** 2;
    return 0;
};

// общее ускорение системы
const a = () => (m * g) / (m + (J_p() + J_c()) / r_p ** 2);

// время падения груза
const t = () => Math.sqrt((2 * h) / a());

// ----------------------------------------------

function getStartPosition() {
    const hCm = h * 100; // см
    const startPosition = cmVh * 100 - cmVh * hCm; // vh
    return startPosition;
}

function getMovingContainerHeight() {
    const movingContainerHeight = endPosition - getStartPosition(h);
    return movingContainerHeight;
}

const getFallingTime = () => t();

function setRopeBlockHeight() {
    // длина намотаной веревки по горизонтали
    const ropeBlockLenght = parseFloat(getComputedStyle(ropeBlock).getPropertyValue('--rope-lenght').trim());
    // const ropeBlockLenght = (ropeBlockLenghtVh / 100) * window.innerHeight;
    // длина окружности намотаной веревки (намотки)
    const ropeBlockCircleLength = ropeBlockLenght;
    // количество намоток в высоте
    const ropeLenghtParts = Math.round(getMovingContainerHeight(h) / ropeBlockCircleLength);
    // высота всех намоток с учетом высоты
    ropeBlock.style.setProperty('--rope-height', `${ropeBlockHeightVh * (ropeLenghtParts + 1)}vh`);
}

function setCylinderRotationCount() {
    // диаметр вращающегося цилиндра
    const cylinderDiameter = 0.1; // м
    // длина окружности цилиндра
    const cylinderCircleLenght = cylinderDiameter * Math.PI;
    // количество оборотов при спуске
    const cylinderRotationCount = h / cylinderCircleLenght;
    block.style.setProperty('--rotation-degree', `${cylinderRotationCount * 360}deg`);
}

function setKettlebellPosition() {
    kettlebell.style.setProperty('--top', `${getStartPosition(h)}vh`);
}

function update() {
    setKettlebellPosition();
    setRopeBlockHeight();
    setCylinderRotationCount();
}

const kettlebellWeightInput = document.getElementById('kettlebellWeightInput');
const kettlebellWeightSpan = document.getElementById('kettlebellWeightSpan');
kettlebellWeightInput.addEventListener('input', e => {
    m = parseInt(e.target.value) / 1000;
    kettlebellWeightSpan.innerText = Math.round(m * 1000) + ' г';
    update();
});
kettlebellWeightInput.value = m * 1000;
kettlebellWeightSpan.innerText = m * 1000 + ' г';

const kettlebellHeightInput = document.getElementById('kettlebellHeightInput');
const kettlebellHeightSpan = document.getElementById('kettlebellHeightSpan');
kettlebellHeightInput.addEventListener('input', e => {
    h = parseInt(e.target.value) / 100;
    kettlebellHeightSpan.innerText = Math.round(h * 100) + ' см';
    update();
});
kettlebellHeightInput.value = h * 100;
kettlebellHeightSpan.innerText = h * 100 + ' см';

const cylinderMassInput = document.getElementById('cylinderMassInput');
const cylinderMassSpan = document.getElementById('cylinderMassSpan');
cylinderMassInput.addEventListener('input', e => {
    m_c = parseFloat(e.target.value);
    cylinderMassSpan.innerText = m_c + ' кг';
});
cylinderMassInput.value = m_c;
cylinderMassSpan.innerText = m_c + ' кг';

startBtn.addEventListener('click', e => {
    if (!work) {
        console.log(getFallingTime());
        work = true;
        kettlebell.style.animationDuration = `${getFallingTime()}s`;
        kettlebell.classList.add('falling');
        block.style.animationDuration = `${getFallingTime()}s`;
        block.classList.add('rotating');
        ropeBlock.style.animationDuration = `${getFallingTime()}s`;
        ropeBlock.classList.add('unwinding');

        startTimer();

        let startTime;
        kettlebell.addEventListener(
            'animationstart',
            e => {
                startTime = performance.now();
            },
            { once: true }
        );

        kettlebell.addEventListener(
            'animationend',
            e => {
                const endTime = performance.now();
                console.log('Animation duration: ', endTime - startTime);
            },
            { once: true }
        );
    }
});

clearBtn.addEventListener('click', e => {
    work = false;
    kettlebell.classList.remove('falling');
    block.classList.remove('rotating');
    ropeBlock.classList.remove('unwinding');
    stopTimer();
    resetTimer();
});

rulerBtn.addEventListener('click', e => {
    ruler.classList.toggle('hidden');
    rulerBtn.classList.toggle('inactive');
});

cylinderBtn.addEventListener('click', e => {
    if (!work) {
        cylinder.classList.toggle('hidden');
        cylinderMassInputContainer.classList.toggle('disabled');
        cylinderBtn.classList.toggle('inactive');
        cylinderIsDown = !cylinderIsDown;
    }
});

update();
