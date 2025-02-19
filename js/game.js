"use strict";

const colors = ["blue", "red", "green", "yellow"];

let colorSequence = [];
  
let score = 0;
  
let gameStateIsOpen = false;
let currentSequenceIndex = 0;
  
const playButton = document.querySelector(".play");
const infoDisplay = document.querySelector(".info-display");
const scoreDisplay = document.querySelector(".score-display__number");
const colorButtons = document.querySelector(".color-buttons");
const colorButtonMap = {}

function generateColorButtons() {
  for (let color of colors) {
    const colorButton = document.createElement("button");
    colorButton.setAttribute("data-color", color);
    colorButton.classList.add(...["color-button", `color-button--${color}`]);
    colorButtons.appendChild(colorButton);
    colorButtonMap[color] = colorButton;
  }
}
  
function selectColor(color) {
  gameStateIsOpen = false;
  colorButtonMap[color].classList.add("color-button--clicked");
  
  setTimeout(() => {
    colorButtonMap[color].classList.remove("color-button--clicked");
    checkClickedColor(color);
  }, 1200);
}
  
function checkClickedColor(color) {
  if (color !== colorSequence[currentSequenceIndex]) {
    infoDisplay.textContent = "Game Over. You clicked the wrong Color."
    gameStateIsOpen = false;
  }
  else {
    currentSequenceIndex++;
    gameStateIsOpen = true;
    if (currentSequenceIndex === colorSequence.length) {
      gameStateIsOpen = false;
      score++;
      scoreDisplay.textContent = score;
      addNextColor();
      showSequence(0);
    }
  }
}
  
function addNextColor() {
  colorSequence.push(colors[Math.floor(Math.random() * colors.length)]);
}
  
function showSequence(index) {
  infoDisplay.textContent = "wait for Sequence";
  
  setTimeout(() => {
    colorButtonMap[colorSequence[index]].classList.add("color-button--active");
  }, 1000);
  
  setTimeout(() => {
    colorButtonMap[colorSequence[index]].classList.remove("color-button--active");
    
    if (index < colorSequence.length - 1) {
      showSequence(index+1)
    }
    else {
      gameStateIsOpen = true;
      currentSequenceIndex = 0;
      infoDisplay.textContent = "Your Turn"
    }
    
  }, 2500);
}
  
function startGame() {
  score = 0;
  colorSequence = [];
  currentSequenceIndex = 0;
  addNextColor();
  showSequence(0);
  
  infoDisplay.classList.remove("hidden");
  scoreDisplay.textContent = score;
}
  
colorButtons.addEventListener("click", e => {
  if (e.target.tagName.toLowerCase() === "button") {
    
    if (gameStateIsOpen) {
      selectColor(e.target.getAttribute("data-color"));
    }
  }
});
  
playButton.addEventListener("click", startGame);

generateColorButtons();