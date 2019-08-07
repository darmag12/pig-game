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
let scores, roundScore, activePlayer, gamePlaying, dice1, dice2;

let diceDom1 = document.getElementById('dice-1');
let diceDom2 = document.getElementById('dice-2');

initialize();


/// added an event listener for btn roll
document.querySelector('.btn-roll').addEventListener('click', function(){
    // 1. random number
    if(gamePlaying){

    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. display
    // diceDom1 = document.getElementById('dice-1');
    // diceDom2 = document.getElementById('dice-2');
    diceDom1.style.display = 'block';
    diceDom2.style.display = 'block';
    
    diceDom1.src = `dice-${dice1}.png`;
    diceDom2.src = `dice-${dice2}.png`;


    // 3. update the round score if the number was NOT 1
    if (dice1 !== 1 && dice2 !==1){
        roundScore += dice1 + dice2;
        document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    }
    else{
        // next player
        nextPlayer();
        
    }  
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
        diceDom1 .style.display = 'none';
        diceDom2.style.display = 'none';
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
      diceDom1.style.display = 'none';
      diceDom2.style.display = 'none';

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

    diceDom1.style.display = 'none';
    diceDom2.style.display = 'none';
   

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
