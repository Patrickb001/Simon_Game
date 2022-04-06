# Simon Game

## Table of contents

- [Overview](#overview)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Struggles](#struggles)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview
- Simon Game.
- Start the game by pressing any key.
- Click the correct color that flashes to continue to the next level. 
- Remember the previous sequence as each level adds a new color to click.
- If you click the wrong color you lose!

## My process

### Built with

- HTML5 markup
- CSS 
- JavaScript 

### What I learned

- How to build code inside of objects and have the code interact with each other from their object (like an API)

const gameData = {
  pattern: [],
  userClickedPattern: [],
  buttonColors: ["red", "blue", "green", "yellow"],
  button: $("div[type=button]"),
  started: false,
  level: 0,
};

const gameControls = {
  initGame() {
    gameUI.loadAudio();
    this._handleUserClicks();
    $(document).keypress(() => {
      if (gameData.started === false) {
        this._nextSequence();
        gameData.started = true;
      }
    });
  },
  _startOver() {
    gameData.level = 0;
    gameData.pattern = [];
    gameData.started = false;
  },
  _nextSequence() {
    gameData.userClickedPattern = [];
    gameData.level++;
    $("#level-title").text(`Level ${gameData.level}`);
    let randomizer = Math.floor(Math.random() * 4);
    let randomColor = gameData.buttonColors[randomizer];
    gameData.pattern.push(randomColor);
    $(`#${randomColor}`).fadeOut(150).fadeIn(150);

    gameUI.playSound(randomColor);
  },
  ... }
  
### Struggles

- I still have not fixed some of the bugs that are apart of this game. I will attempt to come back to the code at a later date to fix some of the bugs.
- It took a while for me to figure out how I wanted to group all of my functions and data that is apart of my code, but I think I did okay and can still learn from this.
- Initially when I called the setTimeout function and placed the "this" keyword inside of the function it would point to the window instead of the object it was placed inside of.
- I fixed this problem by placing an arrow function inside of the callback function instead of an anonymous function.

  _checkAnswer(currentLevel) {
      if (
        gameData.userClickedPattern[currentLevel] ===
        gameData.pattern[currentLevel]
      ) {
        if (gameData.userClickedPattern.length === gameData.pattern.length) {
          setTimeout(() => {
            this._nextSequence();
          }, 875);
        } ...


### Useful resources

- (https://www.udemy.com/course/the-complete-web-development-bootcamp/) - 

## Author

- Portfolio Page (https://pprograms.netlify.app/)

## Acknowledgments

Dr. Angela Yu and her Web Development Bootcamp Course!
