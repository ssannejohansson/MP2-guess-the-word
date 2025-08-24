// BEFORE GAME STARTS 

// Selection dropdown variable 
let selectDifficulty = '<div class="d-flex flex-column justify-content-center align-items-center p-2">' +
    '<p class="mb-0">Choose your difficulty</p>' +
    '<form class="mb-3">' +
    '<select class="form-select shadow-none outline-none mt-2" aria-label="Select difficulty">' +
    '<option selected value="1">Easy</option>' +
    '<option value="2">Medium</option>' +
    '<option value="3">Hard</option>' +
    '</select>' +
    '</form>' +
    '<p><strong>Easy:</strong> >5 letters, 8 guesses<br>' +
    '<strong>Medium:</strong> >10 letters, 6 guesses<br>' +
    '<strong>Hard:</strong> >15 letters, 4 guesses</p>'
    '</div>';

    // Instructions variable
let instructions = '<div class="d-flex flex-column justify-content-center align-items-center p-2">' +
    '<p>Click the button below to generate a random word. Use your keyboard to guess a letter.</p>' +
    '<p>When your guess is correct the letter will automaticlly will be inserted to the word.</p>' +
    '<button type="button" class="btn custom-btn mt-2" id="start-btn">Start Game</button>' +
    '</div>';


    // Start button variable


// Difficulty page

function diffPage(e) {
    const nameInput = document.getElementById("userInput").value; // Store input in a variable
    $("#heading-small").remove();
    $("#heading").text(`Hello ${nameInput}!`).css("text-transform", "capitalize");
    $("#userInput").css("text-transform", "capitalize");
    $("#input-container").children().remove();
    $("#input-container").append(selectDifficulty).append(instructions);
    $("#start-btn").on("click", startGame);
}

// Game info variable
let gameInfo = '<div class="game-info">' +
                '<h6>Hint:</h6>' +
                '<p id="hint"></p>' +
                '<h6>Wrong letters:</h6>' +
                '<p id="wrong-letters"></p>' +
                '<h6>Remaining guesses:</h6>' +
                '<p id="rem-guess"></p>' +
                '</div>';

                // Reset button variable
let resetBtn = '<button type="button" class="btn custom-btn mt-2" id="reset-btn">Reset Game</button>';

// Start game page
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
const wrongLetter = document.querySelector("#wrong-letters");
const guessLeft = document.querySelector("#rem-guess");




function randomWord() {
    let randomObject = wordList[Math.floor(Math.random() * wordList.length)]; // Gets a random object from wordList array
    word = randomObject.word; // Fetches a random word 
    hints = randomObject.hint; // Fetches a random hint
    maxGuess = 8; // Max amount of guesses
    corrects = []; // Array of correct letters
    incorrects = []; // Array of incorrect letters
    console.log(word);

    $("#hint").text(hints);
    $("#rem-guess").text(maxGuess);
    $("#wrong-letters").text(incorrects);
  

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

setTimeout(() => {
    if (corrects.length === word.length) { // If user found all letters
        alert(`Congrats! You found the word ${word.toUpperCase()}`);
        randomWord(); // The game starts over
    } else if (maxGuess < 1) { // If amount of guesses is less than 1
        alert("Game over!");
        for (let i = 0; i < word.length; i++) {
            // Show all letters in the input
                inputs.querySelectorAll("input")[i].value = word[i];
            }
    }
    });
}

$(typingInput).on("input", initGame);
document.addEventListener("keydown", () => typingInput.focus());








