// BEFORE GAME STARTS 

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
    '</div>';

let startBtn = '<a href="game.html" type="button" class="btn btn-primary mt-2" id="start-btn">Start Game</a>';



document.getElementById("continue-btn").addEventListener("click", e => diffPage(e));

function diffPage(e) {
    const input = document.getElementById("userInput").value; // Store input in a variable
    $("#heading-small").remove();
    $("#heading").text(`Hello ${input}!`).css("text-transform", "capitalize");
    $("#userInput").css("text-transform", "capitalize");
    $("#input-container").children().remove();
    $("#input-container").append(selectDifficulty).append(instructions).append(startBtn);
}

// GAME FUNCTIONALITY

const wordList = [{
        word: "hello",
        hint: "greeting"
    },
    {
        word: "cat",
        hint: "says meow"
    },
    {
        word: "dog",
        hint: "says woff"
    },
    {
        word: "water",
        hint: "something to drink"
    },
    {
        word: "home",
        hint: "where you live"
    },
]