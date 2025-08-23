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

let startBtn = '<button type="button" class="btn btn-primary mt-2" id="start-btn">Start Game</button>';



// document.getElementById("continue-btn").addEventListener("click", e => diffPage(e));

function diffPage(e) {
    const nameInput = document.getElementById("userInput").value; // Store input in a variable
    $("#heading-small").remove();
    $("#heading").text(`Hello ${nameInput}!`).css("text-transform", "capitalize");
    $("#userInput").css("text-transform", "capitalize");
    $("#input-container").children().remove();
    $("#input-container").append(selectDifficulty).append(instructions).append(startBtn);
    $("#start-btn").on("click", startGame);
}

let hints = '<p>Hint:' +
            '<p id="hint"></p>';

let gameInfo = '<div class="game-info">' +
                '<p>Wrong letters:</p>' +
                '<p id="wrong-letters>a, b, c</p>' +
                '<p>Remaining guesses:' +
                '<p id="rem-letters>10</p>' +
                '</div>';

let resetBtn = '<button type="button" class="btn btn-primary mt-2" id="reset-btn">Reset Game</button>';

function startGame() {
$("#heading").text("Guess the word!").css("text-transform", "uppercase");
$("#input-container").children().remove();
$("#heading-container").append(hints);
$("#hint").text(randomObject.hint);
$("#letter-container").removeClass("d-none");
$("#game-container").append(gameInfo).append(resetBtn);
$("#reset-btn").on("click", randomWord);
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
];

// Game functionality

const inputs = document.querySelector("#letter-container"); // Container for letter-inputs
let randomObject = wordList[Math.floor(Math.random() * wordList.length)]; // Gets a random object from wordList array

function randomWord() {
    let word = randomObject.word; // Fetches only a random word and not the whole object (with hint)
    console.log(word);

    //let hint = document.querySelector("#hint span");
    //hint.innerText = randomObject.hint;
   
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" id="letter" disabled>`;
    }

  
    inputs.innerHTML = html; 
}

randomWord();

