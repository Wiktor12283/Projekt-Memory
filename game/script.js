const cards = document.querySelectorAll(".memory-card");
const clock = document.querySelector(".clock");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let seconds = 0;
let minutes = 0;
let hours = 0;

function manageClock() {
  let clockTxt = ``;
  if (seconds == 60) {
    seconds = 0;
    minutes += 1;
  }
  if (minutes == 60) {
    minutes = 0;
    hours += 1;
  }
  if (hours < 10) {
    clockTxt += `0${hours}:`;
  } else {
    clockTxt += String(hours) + ":";
  }
  if (minutes < 10) {
    clockTxt += `0${minutes}:`;
  } else {
    clockTxt += String(minutes) + ":";
  }
  if (seconds < 10) {
    clockTxt += `0${seconds}`;
  } else {
    clockTxt += String(seconds);
  }
  seconds += 1;
  if (!checkForWin()) {
    clock.textContent = clockTxt;
  }
}

function flipCard() {
  if (lockBoard) {
    return;
  }
  if (this === firstCard) {
    return;
  }

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

  isMatch ? disableCards() : unflipCards();
}

function checkForWin() {
  let isWin = false;
  cards.forEach((card) => {
    isWin = card.classList.contains("flip");
  });
  return isWin;
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach((card) => {
  let randomPos = Math.floor(Math.random() * 12);
  card.style.order = randomPos;
});

cards.forEach((card) => card.addEventListener("click", flipCard));

setInterval(manageClock, 1000);

document.addEventListener("keypress", function (event) {
  if (event.key == "d") {
    cards.forEach((card) => {
      card.classList.toggle("dark");
    });
    document.body.classList.toggle("dark");
  }
});
