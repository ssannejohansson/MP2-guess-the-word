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

let gameInfo = '<div class="game-info">' +
                '<p>Hint:</p>' +
                '<p id="hint"></p>' +
                '<p>Wrong letters:</p>' +
                '<p id="wrong-letters"></p>' +
                '<p>Remaining guesses:</p>' +
                '<p id="rem-guess"></p>' +
                '</div>';

let resetBtn = '<button type="button" class="btn btn-primary mt-2" id="reset-btn">Reset Game</button>';

function startGame() {
$("#heading").text("Guess the word!").css("text-transform", "uppercase");
$("#input-container").children().remove();
$("#letter-container").removeClass("d-none");
$("#typing-input").removeClass("d-none");
$("#game-container").append(gameInfo).append(resetBtn);
$("#hint").text(hints);
$("#rem-guess").text(maxGuess);
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
    let word; // Fetches a random word 
    let hints; // Fetches a random hint 
    let corrects = []; // Array of correct letters
    let incorrects = []; // Array of incorrect letters
    let maxGuess = 8;// Amount of guesses
    


const typingInput = document.querySelector("#typing-input");
const wrongLetter = document.querySelector("#wrong-letter");
const guessLeft = document.querySelector("#rem-guess");




function randomWord() {
    let randomObject = wordList[Math.floor(Math.random() * wordList.length)]; // Gets a random object from wordList array
    word = randomObject.word; // Fetches a random word 
    hints = randomObject.hint; // Fetches a random hint
    maxGuess = 8;
    console.log(word);

    $("#hint").text(hints);
    $("#rem-guess").text(maxGuess);

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" id="letter" disabled>`;
    }

    inputs.innerHTML = html; 

}

randomWord();



function initGame(e) {
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)) {
         console.log(key);   
    if (word.includes(key)) { // If letter is found in the word
        for (let i = 0; i < word.length; i++) {
            // Showing matched letter in the input value
            if (word[i] === key) {
                corrects.push(key)
                inputs.querySelectorAll("input")[i].value = key;
            }
        }
    } else {
        maxGuess--; // Decrement amount of guesses by 1 
        incorrects.push(` ${key}`);
    }


    $("#wrong-letters").text(incorrects);
    $("#rem-guess").text(maxGuess);
 }
    typingInput.value = ""; // Empty input-field after typing a letter

    if (maxGuess < 1) { // If amount of guesses is less than 1
        alert("Game over!");
        for (let i = 0; i < word.length; i++) {
            // Show all letters in the input
                inputs.querySelectorAll("input")[i].value = word[i];
            }
    }
}

$(typingInput).on("input", initGame);
document.addEventListener("keydown", () => typingInput.focus());








