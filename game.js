const gameData = {
  pattern: [],
  userClickedPattern: [],
  buttonColors: ["red", "blue", "green", "yellow"],
  button: $("div[type=button]"),
  started: false,
  level: 0,
};

const gameUI = {
  animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(() => {
      $(`#${currentColor}`).removeClass("pressed");
    }, 125);
  },
  loadAudio() {
    let audio = new Audio("./sounds/green.mp3");
  },
  playSound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
  },
};

const gameControls = {
  initGame() {
    gameUI.loadAudio();
    $(document).keypress(() => {
      if (gameData.started === false) {
        this._nextSequence();
        gameData.started = true;
        if (gameData.started === true) {
          $(gameData.button).on("click", this._handleClicks.bind(this));
        }
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
  _checkAnswer(currentLevel) {
    if (
      gameData.userClickedPattern[currentLevel] ===
      gameData.pattern[currentLevel]
    ) {
      if (gameData.userClickedPattern.length === gameData.pattern.length) {
        setTimeout(() => {
          this._nextSequence();
        }, 875);
      }
    } else {
      $(gameData.button).off("click");
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 300);
      let wrongAudio = new Audio("./sounds/wrong.mp3");
      wrongAudio.play();

      this._startOver();
    }
  },
  _handleClicks(e) {
    let userChosenColor = e.target.id;
    gameData.userClickedPattern.push(userChosenColor);

    gameUI.playSound(userChosenColor);
    gameUI.animatePress(userChosenColor);
    this._checkAnswer(gameData.userClickedPattern.length - 1);
  },
};

gameControls.initGame();
