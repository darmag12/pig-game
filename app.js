/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

///======================== my code starts here ==============================///

/// declared my variables here
let scores, roundScore, activePlayer, dice, gamePlaying, lastDice;

initialize();


/// added an event listener for btn roll
document.querySelector('.btn-roll').addEventListener('click', function(){
    // 1. random number
    if(gamePlaying){

    dice = Math.floor(Math.random() * 6) + 1;

    // 2. display
    let diceDom =  document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = `dice-${dice}.png`;

    // 3. update the round score if the number was NOT 1
    // also if you roll a 6 twice your global will reset to 0
    if ( dice === 6 && lastDice === 6){
        scores [activePlayer] = 0
        document.getElementById(`score-${activePlayer}`).textContent = '0';
        nextPlayer();
    }
    else if (dice !== 1){
        roundScore += dice;
        document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    }
    else{
        // next player
        nextPlayer();
        
    }
    
    lastDice = dice;
}
        

}) // end of listener


/// event listener for btn hold
document.querySelector('.btn-hold').addEventListener('click', function(){
    // adding the current scores to the global scores 
    if(gamePlaying){

    scores[activePlayer] += roundScore;

    // updating the UI with the new scores
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    }

    let input = document.querySelector('.winning-score').value;
    let winningScore;

    if(input){
        winningScore = input;
    } 
    else{
        winningScore = 100;
    }

    //check if player has won the game
    if(scores[activePlayer] >= winningScore){
        document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
        gamePlaying = false;
    }
    else{
    // called the next player function
    nextPlayer();
    }

}) // end of listener


/// added a function to enforce the DRY principal
function nextPlayer () {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

        // set the round score to 0 so that the player can have a clear score before rolling the dice again
        roundScore = 0;

        // set the current scores to 0
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        // adding a class with special styles to the active player
        document.querySelector(`.player-0-panel`).classList.toggle('active');
        document.querySelector(`.player-1-panel`).classList.toggle('active');

        // hide the dice during the next player's turn
        document.querySelector('.dice').style.display = 'none';

} // end of nextPlayer function

/// event listener for new game btn
document.querySelector('.btn-new').addEventListener('click', initialize);

/// added a function to reset the game 
function initialize () {
// reset
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById(`name-0`).textContent = 'Player 1';
    document.getElementById(`name-1`).textContent = 'Player 2';
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.add('active');
    


} // end of initialize function
