$("#yellow").click(() => {
  if (!isGameOver) {
    clicked("yellow");
    checkClicked("yellow");
  }
});
$("#green").click(() => {
  if (!isGameOver) {
    clicked("green");
    checkClicked("green");
  }
});
$("#red").click(() => {
  if (!isGameOver) {
    clicked("red");
    checkClicked("red");
  }
});
$("#blue").click(() => {
  if (!isGameOver) {
    clicked("blue");
    checkClicked("blue");
  }
});
$("play-btn").click(() => {
  if (!isGameOver) {
    clicked("blue");
    checkClicked("blue");
  }
});

//TODO: the center number should say clicks left to be correct. then show wait during next blink
//TODO: disable sound option.
//TODO: disable show number of clicks left option
//TODO: change each level to have 10 items in the patern then increment the game speed.

const yellowSound = new Audio("./sounds/yellow.mp3");
const greenSound = new Audio("./sounds/green.mp3");
const redSound = new Audio("./sounds/red.mp3");
const blueSound = new Audio("./sounds/blue.mp3");
const wrongSound = new Audio("./sounds/wrong.mp3");

yellowSound.volume = 0.4;
greenSound.volume = 0.4;
redSound.volume = 0.4;
blueSound.volume = 0.4;
wrongSound.volume = 0.1;

let isGameOver = true;

const buttons = ["yellow", "green", "red", "blue"];
const sounds = {
  yellow: yellowSound,
  green: greenSound,
  red: redSound,
  blue: blueSound,
  wrong: wrongSound,
};

const pattern = [];
let clickNum = 0;

const randomBtn = () => {
  return buttons[Math.floor(Math.random() * (buttons.length - 1))];
};

const resetPatern = () => {
  while (pattern.length !== 0) {
    pattern.pop();
  }
};

const blink = (btn) => {
  $(`#${btn}`).addClass("blink");
  setTimeout(() => {
    $(`#${btn}`).removeClass("blink");
  }, 350);
};

const playAudio = (audio) => {
  audio.play();
};

const clicked = (btn) => {
  $(`#${btn}`).addClass("pressed");
  setTimeout(() => {
    $(`#${btn}`).removeClass("pressed");
  }, 250);
};

const nextBtn = () => {
  const nextBtn = randomBtn();
  blink(nextBtn);
  populatePatern(nextBtn);
  playAudio(sounds[nextBtn]);
  return nextBtn;
};

const populatePatern = (btn) => {
  pattern.push(btn);
  updateLevel();
};

const riseClickNum = () => {
  clickNum += 1;
};

const resetClickNum = () => {
  clickNum = 0;
};

const checkClicked = (btn) => {
  if (btn === pattern[clickNum] && !isGameOver) {
    playAudio(sounds[btn]);
    riseClickNum();
    $("#subtitle").text(`${clickNum}`);
    if (clickNum === pattern.length && !isGameOver) {
      setTimeout(() => {
        nextBtn();
        resetClickNum();
      }, 1000);
    }
  } else {
    resetClickNum();
    resetPatern();
    $("#level-title").text("GAME OVER!");
    // $("#subtitle").removeClass("invisible");
    $("#subtitle").text("Reload");
    setTimeout(() => {
      isGameOver = true;
      resetClickNum();
    }, 1000);

    playAudio(sounds["wrong"]);
  }
};

const updateLevel = () => {
  $("#level-title").text(`Level ${pattern.length}`);
};

$(".play-btn").click(() => {
  if (isGameOver) {
    $("#subtitle").text(`${clickNum}`);
    isGameOver = false;
    nextBtn();
  }
});
