// DOM 
const gameContainer = document.getElementById("game-container");
const backBtn = document.getElementById("back-btn");

// Heading elements 
const headingContainer = document.getElementById("heading-container");
const heading = document.getElementById("heading");
const headingSmall = document.getElementById("heading-small");
// Input elements 
const inputContainer = document.getElementById("input-container");
const inputForm = document.getElementById("input-form");
const continueToDiff = document.getElementById("continue-btn");

// Info elements
const infoContainer = document.getElementById("info-container");
const infoText = document.getElementById("info-text");

// Start game
const startGame = document.getElementById("start-btn");


// Store username from input field
function userName() {
    const input = document.getElementById("userInput").value 
    alert(input)
}