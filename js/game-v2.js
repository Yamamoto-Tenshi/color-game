class ColorSequenceGame {
  constructor() {
    this.colorButtons = document.querySelector(".color-buttons");
    this.playButton = document.querySelector(".play");
    this.infoDisplay = document.querySelector(".info-display");
    this.scoreDisplay = document.querySelector(".score-display__number");
    this.colorButtonMap = {};

    this.colors = ["blue", "red", "green", "yellow"];

    this.colorSequence = [];
    this.score = 0;
    this.gameStateIsOpen = false;
    this.currentSequenceIndex = 0;

    this.generateColorButtons();

    this.colorButtons.addEventListener("click", this.handleColorButtonClick.bind(this));
    this.playButton.addEventListener("click", this.startGame.bind(this));
  }

  generateColorButtons() {
    for (let color of this.colors) {
      const colorButton = document.createElement("button");
      colorButton.setAttribute("data-color", color);
      colorButton.classList.add(...["color-button", `color-button--${color}`]);
      this.colorButtons.appendChild(colorButton);
      this.colorButtonMap[color] = colorButton;
    }
  }

  selectColor(color) {
    this.gameStateIsOpen = false;
    this.colorButtonMap[color].classList.add("color-button--clicked");

    setTimeout(() => {
      this.colorButtonMap[color].classList.remove("color-button--clicked");
      this.checkClickedColor(color);
    }, 1200);
  }

  checkClickedColor(color) {
    if (color !== this.colorSequence[this.currentSequenceIndex]) {
      this.infoDisplay.textContent = "Game Over. You clicked the wrong Color."
      this.gameStateIsOpen = false;
    }
    else {
      this.currentSequenceIndex++;
      this.gameStateIsOpen = true;
      if (this.currentSequenceIndex === this.colorSequence.length) {
        this.gameStateIsOpen = false;
        this.score++;
        this.scoreDisplay.textContent = this.score;
        this.addNextColor();
        this.showSequence(0);
      }
    }
  }

  addNextColor() {
    this.colorSequence.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
  }

  showSequence(index) {
    this.infoDisplay.textContent = "wait for Sequence";

    setTimeout(() => {
      this.colorButtonMap[this.colorSequence[index]].classList.add("color-button--active");
    }, 1000);

    setTimeout(() => {
      this.colorButtonMap[this.colorSequence[index]].classList.remove("color-button--active");

      if (index < this.colorSequence.length - 1) {
        this.showSequence(index+1)
      }
      else {
        this.gameStateIsOpen = true;
        this.currentSequenceIndex = 0;
        this.infoDisplay.textContent = "Your Turn"
      }

    }, 2500);
  }

  startGame() {
    this.score = 0;
    this.colorSequence = [];
    this.currentSequenceIndex = 0;
    this.addNextColor();
    this.showSequence(0);

    this.infoDisplay.classList.remove("hidden");
    this.scoreDisplay.textContent = this.score;
  }

  handleColorButtonClick(e) {
    if (e.target.tagName.toLowerCase() === "button") {

      if (this.gameStateIsOpen) {
        this.selectColor(e.target.getAttribute("data-color"));
      }
    }
  }

}

const colorSequenceGame = new ColorSequenceGame();
