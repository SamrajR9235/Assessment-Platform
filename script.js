// script.js

// Live Cam and Face Detection Setup
const video = document.getElementById('video');

// Load live camera feed
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing camera: ", err);
    });

// Placeholder for face detection
let warnings = 0;
function detectFace() {
    const faceDetected = Math.random() > 0.2; // Simulating face detection

    if (!faceDetected) {
        warnings++;
        document.getElementById('warningMessage').textContent = `Warning ${warnings}: Face not detected!`;
        if (warnings >= 3) {
            alert("Face not detected 3 times! Ending session.");
            endSession();
        }
    } else {
        document.getElementById('warningMessage').textContent = '';
    }
}

// Call face detection every 5 seconds
setInterval(detectFace, 5000);

// Show or hide assessment parts
function showPart(partNumber) {
    document.querySelectorAll('.assessment-part').forEach(part => {
        part.classList.add('hidden');
    });
    document.getElementById(`part${partNumber}`).classList.remove('hidden');
}

// Drawing Board
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    draw(e);
});
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();  // Reset the path so it doesn't connect to the next drawing
});
canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Toggle Draw Board
function toggleDrawBoard() {
    const drawBoard = document.getElementById('drawBoard');
    drawBoard.classList.toggle('hidden');
}

// Simple Calculator Implementation
function appendNumber(number) {
    const calcInput = document.getElementById('calcInput');
    calcInput.value += number;
}

function calculate() {
    const calcInput = document.getElementById('calcInput');
    calcInput.value = eval(calcInput.value);
}

function clearCalc() {
    const calcInput = document.getElementById('calcInput');
    calcInput.value = '';
}

function toggleCalculator() {
    const calculator = document.getElementById('calculator');
    calculator.classList.toggle('hidden');
}

// End session if warnings exceed limit
function endSession() {
    console.log("Session ended.");
}

// Calculate the result of the assessment
function calculateResult() {
    let totalQuestions = 15;
    let attendedQuestions = 0;

    document.querySelectorAll('.question-form').forEach(form => {
        const formData = new FormData(form);
        formData.forEach(value => {
            if (value) attendedQuestions++;
        });
    });

    const resultMessage = `You attended ${attendedQuestions} out of ${totalQuestions} questions.`;
    document.getElementById('resultMessage').textContent = resultMessage;
    document.getElementById('resultModal').classList.remove('hidden');
}

// Close the result modal
function closeModal() {
    document.getElementById('resultModal').classList.add('hidden');
}
