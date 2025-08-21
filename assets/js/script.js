$(document).ready(function() {
    
});


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

const input = document.getElementById("userInput").value; // Store input in a variable
$("#heading-small").remove();
$("#heading").text(`Hello ${input}!`).css("text-transform", "capitalize");
$("#userInput").css("text-transform", "capitalize");




}