/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
	if (checkWinner() === 1){
		return 0;
	}

	var dice = Math.floor(Math.random() * 6) + 1;
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice + '.png';

	if (dice !== 1){
		window.roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = window.roundScore;
	}else{
		window.roundScore = 0;
		document.querySelector('#current-' + activePlayer).textContent = window.roundScore;
		chooseNextPlayer();
	}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	var diceDOM = document.querySelector('.dice');
	var tmp = window.scores[window.activePlayer] + window.roundScore;
	window.scores[window.activePlayer] = tmp;
	window.roundScore = 0;
	document.querySelector('#score-' + activePlayer).textContent = tmp;
	document.querySelector('#current-' + activePlayer).textContent = window.roundScore;
	if (checkWinner() === 1){
		return 0;
	}
	chooseNextPlayer();
});

document.querySelector('.btn-new').addEventListener('click', function(){
	init();
});

var chooseNextPlayer = function(){
	
	var diceDOM = document.querySelector('.dice');
	document.querySelector('.player-' + window.activePlayer + '-panel').classList.remove('active');
	window.activePlayer = (window.activePlayer === 0) ? 1 : 0;
	document.querySelector('.player-' + window.activePlayer + '-panel').classList.add('active');
	diceDOM.style.display = 'none';
};

var checkWinner = function(){

	if (window.scores[window.activePlayer] >= 100){
		var winnerText = 'Player ' + (window.activePlayer + 1) + ' is winner';
		document.querySelector('#name-' + window.activePlayer).textContent = winnerText;
		return 1;
	}else {
		return 0;
	}
};

function init(){
	window.scores = [0,0];
	window.roundScore = 0;
	window.activePlayer = 0;

	document.querySelector('#score-0').textContent = 0;
	document.querySelector('#current-0').textContent = 0;
	document.querySelector('#score-1').textContent = 0;
	document.querySelector('#current-1').textContent = 0;
	//document.querySelector('#current-' + activePlayer).innerHTML = dice;
		
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

	document.querySelector('.dice').style.display = 'none';
}