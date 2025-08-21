// DOM 
const gameContainer = document.getElementById("game-container");
const backBtn = document.getElementById("back-btn");

// Heading elements 

// Input elements 
const inputContainer = document.getElementById("input-container");
const inputForm = document.getElementById("input-form");
const continueToDiff = document.getElementById("continue-btn");

// Info elements
const infoContainer = document.getElementById("info-container");
const infoText = document.getElementById("info-text");

// Start game
const startGame = document.getElementById("start-btn");




  document.getElementById("continue-btn").addEventListener("click", e => diffPage(e));

function diffPage(e) {
    // Store username from input field 

const input = document.getElementById("userInput").value;
let heading = "Hello, ";
let headingSmall = `${input}`; 

    document.getElementById("heading").innerText = headingSmall; 
    document.getElementById("heading-small").innerText = heading; 
}