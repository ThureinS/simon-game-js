let buttonColors = ["red", "blue", "green", "yellow"];
let gameLevel = 1;
let gamePattern = [];
let userClickPattern = [];

function nextSequence() {
  let randomNumber = Math.round(Math.random() * 3);

  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  let buttonAudio = new Audio(`./sounds/${randomChosenColor}.mp3`);
  buttonAudio.play();

  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

  $("h1").text(`Level ${gameLevel}`);
  return gameLevel++;
}

$("[type|='button']").click(function (event) {
  let userChosenColor = event.target.id;
  userClickPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickPattern.length - 1);
});

function playSound(name) {
  let buttonAudio = new Audio(`./sounds/${name}.mp3`);
  buttonAudio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

$(document).keypress(function () {
  if (gameLevel === 1) {
    nextSequence();
  } else {
    $(document).off();
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    console.log("Success");
  } else {
    let wrongAudio = new Audio(`./sounds/wrong.mp3`);
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
  if (
    gamePattern.length - 1 === currentLevel &&
    userClickPattern.length - 1 === currentLevel
  ) {
    setTimeout(nextSequence, 1000);
    userClickPattern = [];
  }
}

function startOver() {
  gameLevel = 1;
  gamePattern = [];
  userClickPattern = [];
  $(document).keypress(function () {
    if (gameLevel === 1) {
      nextSequence();
    } else {
      $(document).off();
    }
  });
}
