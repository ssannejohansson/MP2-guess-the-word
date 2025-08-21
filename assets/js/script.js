
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

// Selection dropdown variable 
let selectDifficulty = '<div class="d-flex flex-column justify-content-center align-items-center">' + 
                            '<p>Please select difficulty</p>' +
                                '<form class="mb-3">' + 
                                    '<select class="form-select mt-2" aria-label="Select difficulty">' + 
                                    '<option selected value="1">Easy</option>' +
                                    '<option value="2">Medium</option>' +
                                    '<option value="3">Hard</option>' +
                                    '</select>' +
                                '</form>' + 
                        '</div>'; 

let instructions = '<div class="d-flex flex-column justify-content-center align-items-center">' + 
                    '<p>Instructions: </p>' + 
                    '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maiores amet et eum, explicabo minima quam praesentium laudantium voluptate nemo exercitationem possimus veritatis, libero quibusdam illo? Dignissimos necessitatibus qui unde.</p>' +
                    '<a href="game.html" class="btn btn-primary mt-2" id="start-btn">Start game</a>' +
                    '</div>';



document.getElementById("continue-btn").addEventListener("click", e => diffPage(e));

function diffPage(e) {
const input = document.getElementById("userInput").value; // Store input in a variable
$("#heading-small").remove();
$("#heading").text(`Hello ${input}!`).css("text-transform", "capitalize");
$("#userInput").css("text-transform", "capitalize");
$("#input-container").children().remove();
$("#input-container").append(selectDifficulty).append(instructions); 
}




