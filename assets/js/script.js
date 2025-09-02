/* jshint esversion: 11, jquery: true */


let wordList = [];

// Start page (page 1)


$("#input-form").submit(diffPage);


// Difficulty page (page 2)
// Initiates after clicking continue on initial screen (page 1)

// Select difficulty field html
let selectDifficulty =
  '<div class="d-flex flex-column justify-content-center align-items-center p-2">' +
  '<p class="mb-0">Select your difficulty</p>' +
  '<div class="d-flex gap-2 mb-2 mt-2" id="button-container">' +
  '<button class="btn diff-btn" id="easy" onclick="changeDiff(1)">Easy</button>' +
  '<button class="btn diff-btn" id="medium" onclick="changeDiff(2)">Medium</button>' +
  '<button class="btn diff-btn" id="hard" onclick="changeDiff(3)">Hard</button></div>' +
  "</div>";

// Instructions field html
let instructions =
  '<div class="d-flex flex-column justify-content-center align-items-center ps-5 pe-5 mt-3 mb-3 text-center">' +
  '<p>Click Start Game to generate a random word.</p>' +
  '<p>Use your keyboard to guess a letter.</p>' +
  '<p>When your guess is correct the letter will automatically will be inserted to the word.</p>' +
  '<p>When your guess is incorrect your number of guesses left will decrease.</p>' +
  '<p>Game is over when you run out of guesses.</p>' +
  '<button type="button" class="btn custom-btn mt-3" id="start-btn" disabled>Start Game</button>' +
  "</div>";


/**
 * Stores the users name input from previous page in a variable to show it in the greeting on this page.
 * Removes HTML elements from previous page and adds new ones for this page.
 * Starts game when clicking start game button.
 */
function diffPage(e) {
  const nameInput = document.getElementById("user-input").value; 
  $("#heading-small").remove();
  $("#heading").removeClass("mb-4").addClass("mb-2"); 
  $("#heading").text(`Hello ${nameInput}!`).css("text-transform", "capitalize"); 
  $("#input-container").children().remove(); 
  $("#input-container").append(selectDifficulty).append(instructions); 
  changeDiff(); 
  $("#start-btn").on("click", game); 
}


/**
 * Selection of difficulty.
 * Connects button onclicks from HTML with the right difficulty level.
 * e.g. onclick="changeDiff(1)" connects to (difficulty === 1) below through "1".
 * Pushes the selected difficulty's array of words into wordList array.
 */
function changeDiff(difficulty) { 
  if (difficulty === 1) {
    $("#easy").on("click").toggleClass("active-btn"); 
    $("#medium, #hard").on("click").removeClass("active-btn"); // Makes sure only one button at the time can have the class "active"
    $("#start-btn").removeAttr("disabled");
    wordList.push(...easyWords); 
  } else if (difficulty === 2) {
    $("#medium").on("click").toggleClass("active-btn");
    $("#easy, #hard").on("click").removeClass("active-btn");
    $("#start-btn").removeAttr("disabled");
    wordList.push(...mediumWords);
  } else if (difficulty === 3) {
    $("#hard").on("click").toggleClass("active-btn");
    $("#medium, #easy").on("click").removeClass("active-btn");
    $("#start-btn").removeAttr("disabled");
    wordList.push(...hardWords);
  }
}


// Game interface (page 3)
// Initiates after clicking start game button

// Game info html
let gameInfo =
  '<div class="container d-flex flex-column gap-2 p-2 mt-3 text-center" id="game-info">' +
  "<h6>Hint</h6>" +
  '<p id="hint"></p>' +
  '<div id="lg-dev-container">' +
  '<div class="lg-dev">' +
  "<h6>Wrong letters</h6>" +
  '<p id="wrong-letters"></p>' +
  "</div>" +
  '<div class="lg-dev">' +
  "<h6>Guesses left</h6>" +
  '<p id="rem-guess"></p>' +
  "</div>" +
  '<div class="lg-dev">' +
  "<h6>Current score</h6>" +
  '<p id="score"></p>' +
  "</div>" +
  "</div>" +
  "</div>";

// Reset button html
let resetBtn =
  '<button type="button" class="btn custom-btn mt-2" id="reset-btn">Reset Game</button>';

// Game interface
/**
 * Game function with function to add a random word. 
 * When reset button is clicked, page refreshes to show the first page.
 */
function game() { 
  randomWord();
  $("#heading").text("Good luck!").addClass("mb-4");
  $("#input-container").children().remove();
  $("#letter-container").removeClass("d-none");
  $("#typing-input").removeClass("d-none");
  $("#game-container").append(gameInfo).append(resetBtn);
  $("#hint").text(hints);
  $("#rem-guess").text(maxGuess);
  $("#score").text(score);
  $("#reset-btn").click(function () {
    location.reload();
  });
}

// Shuffle wordList and sort it in a random order
let shuffledWordList = shuffleArray(wordList); // Shuffles the wordList array when calling the function below and stores it in shuffledWordList
let currentWordIndex = 0; // Sets the starting index for the current word to 0

/**
 * Shuffles the array using the Fisher-Yates-like method with random sorting.
 */
function shuffleArray(arr) { 
  return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// Variables
let word;
let hints;
let maxGuess = 5; // Max amount of guesses
let corrects;
let incorrects;
let score = 0; // Starting score


/**
 * Checks if the end of shuffled word list is reached. 
 * If so, reshuffle wordList and reset the index to start from the beginning of the newly shuffled list. 
 * Gets the next object and increment the index.
 */
function randomWord() { 
  if (currentWordIndex >= shuffledWordList.length) { 
    shuffledWordList = shuffleArray(wordList);
    currentWordIndex = 0; 
  }

  let randomObject = shuffledWordList[currentWordIndex++]; 
  word = randomObject.word; 
  hints = randomObject.hint; 
  corrects = []; // Array of correct letters
  incorrects = []; // Array of incorrect letters

  // Shows the values above in game interface
  $("#hint").text(hints);
  $("#rem-guess").text(maxGuess);
  $("#wrong-letters").text(incorrects);
  $("#score").text(score);

  // Creates letter boxes due to word length
  let html = "";
  for (let i = 0; i < word.length; i++) { 
    html += `<input type="text" class="letter" name="letter" id="letter-${i}" aria-label="letter-box">`;
  }

  const inputs = document.querySelector("#letter-container"); 
  inputs.innerHTML = html;
}

// Game initialization and game functionality
$(".letter").on("input", initGame); // Initialize game when you input a letter
const typingInput = document.querySelector("#typing-input"); // Variable for functionality to initialize game when you input a letter to letterbox on mobile/tablet


/**
 * Initializes game. 
 * If key (letter) matches uppercase or lowercase letters and are found in the word, matched letter shows in the letterbox.
 * If not, decrement amout of guesses and show the key under wrong letters.
 */
function initGame(e) { 
  let key = e.target.value.toLowerCase(); 
  if (
    key.match(/^[A-Za-z]+$/) && 
    !incorrects.includes(` ${key}`) &&
    !corrects.includes(key)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          corrects.push(key);
          document.querySelectorAll("input")[i].value = key;
        }
      }
    } else { 
      maxGuess--;
      incorrects.push(` ${key}`);
    }

    $("#wrong-letters").text(incorrects).css("text-transform", "uppercase");
    $("#rem-guess").text(maxGuess);
  }

  typingInput.value = ""; // Empty input-field after typing a letter

let correctWord = document.querySelectorAll(".letter"); // All letters in a correct word

/** 
 * If user found all correct letters, score is incremented and word is shown in green before a new word initiates. 
 * If amount of guesses is less than 1, correct word is shown in red before a modal pops up. 
 * When clicking start over button, game starts over and score resets. 
 */
  setTimeout(() => {
    if (corrects.length === word.length) {
      // If user found all letters
      let updatedScore = score++;
      $("#score").text(updatedScore);  
      $(correctWord).css("color", "#6ac56aff");
      setTimeout(randomWord, 600); 
    } else if (maxGuess === 0) {
      // If amount of guesses is less than 1
      setTimeout(function () {
        $(modal).removeClass("d-none");
      }, 400);
      $("#correct-word").text(`The correct word was ${word.toUpperCase()}.`);
      $("#score-count").text(`You got ${score} words right.`);
      $(".close").on("click", closeModal);
      $("#start-over").on("click", closeModal).on("click", randomWord);
      score = 0;
      maxGuess = 5;

      for (let i = 0; i < word.length; i++) {
        // Show all letters in the input
        document.querySelectorAll("input")[i].value = word[i];
        $(correctWord).css("color", "#f9a1a1ff");
      }
    }
  });
}

// Modal 
let modal = document.getElementById("myModal");

/**
 * Adds class "d-none" to hide modal.
 */
function closeModal() {
    $(modal).addClass("d-none");
  }

$(typingInput).on("input", initGame); // Initiates game when you put a letter in the letterbox on mobile/tablet
document.addEventListener("keydown", () => typingInput.focus()); // Initates game when you press a key on desktop