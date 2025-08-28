// BEFORE GAME STARTS

// Selection dropdown variable
let selectDifficulty =
  '<div class="d-flex flex-column justify-content-center align-items-center p-2">' +
  '<p class="mb-0">Choose your difficulty</p>' +
  '<div class="d-flex gap-2 mb-2 mt-2" id="button-container">' +
  '<button class="btn diff-btn" id="easy" onclick="changeDiff(1)">Easy</button>' +
  '<button class="btn diff-btn" id="medium" onclick="changeDiff(2)">Medium</button>' +
  '<button class="btn diff-btn"id="hard" onclick="changeDiff(3)">Hard</button></div>' +
  "</div>";

// Instructions variable
let instructions =
  '<div class="d-flex flex-column justify-content-center align-items-center p-2 mt-3 mb-3 text-center">' +
  "<p>Click the button below to generate a random word.</p>" +
  "<p>Use your keyboard to guess a letter.</p>" +
  "<p>When your guess is correct the letter will automaticlly will be inserted to the word.</p>" +
  '<button type="button" class="btn custom-btn mt-3" id="start-btn">Start Game</button>' +
  "</div>";

// Difficulty page

function diffPage(e) {
  const nameInput = document.getElementById("user-input").value; // Store input in a variable
  $("#heading-small").remove();
  $("#heading").removeClass("mb-4").addClass("mb-2");
  $("#heading").text(`Hello ${nameInput}!`).css("text-transform", "capitalize");
  $("#user-input").css("text-transform", "capitalize");
  $("#input-container").children().remove();
  $("#input-container").append(selectDifficulty).append(instructions);
  changeDiff();
  $("#start-btn").on("click", startGame);
}

function changeDiff(difficulty) {
  if (difficulty === 1) {
    $("#easy").on("click").toggleClass("active-btn");
    $("#medium, #hard").on("click").removeClass("active-btn");
    wordList.push(...easyWords);
  } else if (difficulty === 2) {
    $("#medium").on("click").toggleClass("active-btn");
    $("#easy, #hard").on("click").removeClass("active-btn");
    wordList.push(...mediumWords);
  } else if (difficulty === 3) {
    $("#hard").on("click").toggleClass("active-btn");
    $("#medium, #easy").on("click").removeClass("active-btn");
    wordList.push(...hardWords);
  }
}

// Game info variable
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

let scoreCount =
  '<div class="container d-flex flex-column gap-2 p-2 mt-3 text-center" id="score-container">' +
  "</div>";

// Reset button variable
let resetBtn =
  '<button type="button" class="btn custom-btn mt-2" id="reset-btn">Reset Game</button>';

// Start game page
function startGame() {
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
    // returns to first page
    location.reload();
  });
}

// GAME FUNCTIONALITY

let wordList = [];

const easyWords = [
  {word: "apple", hint: "A fruit that keeps the doctor away"},
  {word: "pizza", hint: "A cheesy favourite from Italy"},
  {word: "beach", hint: "A sandy spot by the ocean"},
  {word: "sheep", hint: "A woolly animal that goes 'baa'"},
  {word: "cloud", hint: "A fluffy thing in the sky or used in tech"},
  {word: "ghost", hint: "Something spooky and white"},
  {word: "light", hint: "The opposite of dark"},
  {word: "blush", hint: "Something you can put on your cheeks"},
  {word: "spice", hint: "Somehting used in cooking to add flavor"},
  {word: "brick", hint: "A block used to build houses"},
  {word: "whale", hint: "The largest animal in the ocean"},
  {word: "lemon", hint: "A sour yellow fruit"},
  {word: "mouth", hint: "You use it to talk"},
  {word: "dough", hint: "Something u use to bake bread and cookies"},
  {word: "thorn", hint: "A sharp part of a rose stem"},
];

const mediumWords = [
  {word: "elephant", hint: "The largest land animal"},
  {word: "computer",hint: "A machine used for work or games"},
  {word: "backpack", hint: "Something you carry on your back"},
  {word: "airplane", hint: "Something that carries passengers in the sky"},
  {word: "umbrella", hint: "Something that protects you from rain"},
  {word: "fireworks", hint: "A loud and colorful show in the sky"},
  {word: "journey", hint: "A long trip from one place to another"},
  {word: "octopus", hint: "A sea creature with eight arms"},
  {word: "whisper", hint: "To speak softly"},
  {word: "diamond", hint: "A precious stone"},
  {word: "notebook", hint: "Something used to write notes or ideas by hand"},
  {word: "sunshine", hint: "Light and warmth from the sun"},
  {word: "sandwich", hint: "Food made by placing filling between bread"},
  {word: "skeleton", hint: "The framework of bones inside of a body"},
  {word: "monster", hint: "A scary creature"},

];

const hardWords = [
  {word: "brainstorming", hint: "A creative idea generation process"},
  {word: "relationship", hint: "A connection between people"},
  {word: "investigation", hint: "A careful search or examination"},
  {word: "journalist", hint: "Someone who reports the news for TV, newspaper or websites"},
  {word: "wilderness", hint: "Untamed nature, often far from cities"},
  {word: "lighthouse", hint: "A tall structure with beacon to guide ships"},
  {word: "smartphone", hint: "A device that lets you scroll all day"},
  {word: "celebration", hint: "A joyful event"},
  {word: "conversation", hint: "A talk between two or more people"},
  {word: "volunteering", hint: "Helping others without getting paid"},
  {word: "superhero", hint: "Fictional character with amazing powers"},
  {word: "photographer", hint: "A person who takes pictures"},
  {word: "daydreaming", hint: "Letting your mind wander while awake"},
  {word: "houseplant", hint: "Green, living things people keep indoors"},
  {word: "thunderstorm", hint: "A storm with lightning and thunder"},

];

// Game functionality

const inputs = document.querySelector("#letter-container"); // Container for letter-inputs
const letterInput = document.querySelector("#letter"); // Letter input (for mobile)
let randomObject = wordList[Math.floor(Math.random() * wordList.length)]; // Gets a random object from wordList array
let word; // Fetches a random word
let hints; // Fetches a random hint
let corrects = []; // Array of correct letters
let incorrects = []; // Array of incorrect letters
let maxGuess = 8; // Amount of guesses
let score = 0;

const typingInput = document.querySelector("#typing-input");
const wrongLetter = document.querySelector("#wrong-letters");
const guessLeft = document.querySelector("#rem-guess");

function randomWord() {
  changeDiff();
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
  $("#score").text(score);

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" id="letter">`;
  }

  inputs.innerHTML = html;
}

$("#letter").on("input", initGame);

function initGame(e) {
  let key = e.target.value.toLowerCase();
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrects.includes(` ${key}`) &&
    !corrects.includes(key)
  ) {
    console.log(key);
    if (word.includes(key)) {
      // If letter is found in the word
      for (let i = 0; i < word.length; i++) {
        // Showing matched letter in the input value
        if (word[i] === key) {
          corrects.push(key);
          document.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      maxGuess--; // Decrement amount of guesses by 1
      incorrects.push(` ${key}`);
    }

    $("#wrong-letters").text(incorrects).css("text-transform", "uppercase");
    $("#rem-guess").text(maxGuess);
  }
  typingInput.value = ""; // Empty input-field after typing a letter

  let modal = document.getElementById("myModal");

  function closeModal() {
    $(modal).addClass("d-none");
  }

  correctWord = document.querySelectorAll("#letter");

  setTimeout(() => {
    if (corrects.length === word.length) {
      // If user found all letters
      score++;
      $("#score").text(score);
      $(correctWord).css("color", "#56b856");
      setTimeout(randomWord, 600); // The game starts over efter 1000ms
    } else if (maxGuess < 1) {
      // If amount of guesses is less than 1
      setTimeout(function () {
        $(modal).removeClass("d-none");
      }, 400);
      $("#correct-word").text(`The correct word was ${word.toUpperCase()}.`);
      $("#score-count").text(`You got ${score} words right!`);
      $(".close").on("click", closeModal);
      $("#start-over").on("click", closeModal).on("click", randomWord);
      score = 0;

      for (let i = 0; i < word.length; i++) {
        // Show all letters in the input
        document.querySelectorAll("input")[i].value = word[i];
        $(correctWord).css("color", "#f9a1a1ff");
      }
    }
  });
}

$(typingInput).on("input", initGame);
document.addEventListener("keydown", () => typingInput.focus());