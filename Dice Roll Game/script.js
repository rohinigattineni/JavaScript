'use strict';
// Declarating Elements.
let score0Element = document.querySelector('#score--0');
let score1Element = document.querySelector('#score--1');
let diceElement = document.querySelector('.dice');
let player0Element = document.querySelector('.player--0');
let player1Element = document.querySelector('.player--1');
let current0Score = document.getElementById('current--0');
let current1Score = document.getElementById('current--1');

let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer, playing;
// Starting Conditions.
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Score.textContent = 0;
  current1Score.textContent = 0;
};
init();

// Switching player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Rolling Dice functionalitity
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll.
    let dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display Dice.
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    // 3. check for rolled 1:
    if (dice !== 1) {
      // Add Dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //if true, switch to next player.
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if player score is >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
