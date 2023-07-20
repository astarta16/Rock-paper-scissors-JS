function game() {
    const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const userWinVariation = ['scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors',
    'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'];
    let userChoice = '';
    let compChoice = '';
    const userChoiseEl = document.querySelector('.user-choice');
    const pickedEl = document.querySelector('.picked');
    const userPickEl = document.querySelector('.user-pick');
    const pcPickEl = document.querySelector('.pc-pick');
    const resultEl = document.querySelector('.result');
    const resultTitleEl = resultEl.querySelector('.title');
    const scoreCountEl = document.querySelector('.score-count');

    let currentScore = 0;

 // When the page finishes loading
window.addEventListener('load', () => {
    // Retrieve the user's score from local storage and update the currentScore variable
    retrieveScoreFromLocalStorage();

    // Select all the user's choice cards (rock, paper, scissors, lizard, spock)
    document.querySelectorAll('.user-choice .game-card').forEach(card => {
        // Add a click event listener to each user's choice card
        card.addEventListener('click', (ev) => {
            // Get the user's choice based on the clicked card
            userChoice = getUserChoice(ev.target);

            // Randomly select the computer's choice
            compChoice = getComputerChoice();

            // Start the game and calculate the winner
            startGame();
        })
    });

    // Add a click event listener to the "Try Again" button
    resultEl.querySelector('button').addEventListener('click', tryAgain);
})
 
    function startGame() {
        calculateWinner(userChoice, compChoice);
        userChoiseEl.classList.add('hidden');
        pickedEl.classList.remove('hidden');
        clearResultBeforeAppend();
        buildChoiceElement(true, userChoice);
        buildChoiceElement(false, compChoice);
    }
    
    function getUserChoice(target) {
        if (target.nodeName === 'IMG') {
            return target.parentElement.classList[1];
        }
        return target.classList[1];
    }
    
    function getComputerChoice() {
        return actions[Math.floor(Math.random() * 5)];
    }

    function calculateWinner(user, comp) {
        if (user === comp) {
            resultTitleEl.innerText = 'Tie';
        } else if (getUserWinsStatus(user + comp)) {
            resultTitleEl.innerText = 'You win';
            calculateScore(1);
        } else {
            resultTitleEl.innerText = 'You lose';
            calculateScore(-1);
        }
    }

    function getUserWinsStatus(result) {
        return userWinVariation.some(winStr => winStr === result);
    }

    function buildChoiceElement(isItUserElement, className) {
        const el = document.createElement('div');
        el.classList = [`game-card ${className}`];
        el.innerHTML = `<img src="/images/icon-${className}.svg" alt="${className}">`;
        if (isItUserElement) {
            userPickEl.append(el);
        } else {
            pcPickEl.append(el);
        }
    }

    function tryAgain() {
        userChoiseEl.classList.remove('hidden');
        pickedEl.classList.add('hidden');
    }

    function clearResultBeforeAppend() {
        userPickEl.innerHTML = '';
        pcPickEl.innerHTML = '';
    }

    function calculateScore(roundResult) {
        currentScore += roundResult;
        updateScoreBoard();
    }

    function retrieveScoreFromLocalStorage() {
        const score =+ window.localStorage.getItem('gameScore') || 0;
        currentScore = score;
        updateScoreBoard();
    }

    function updateScoreBoard() {
        scoreCountEl.innerText = currentScore;
        window.localStorage.setItem('gameScore', currentScore);
    }

    function calculateScore(roundResult) {
        currentScore += roundResult;
        if (currentScore < 0) {
            currentScore = 0;
        }
        updateScoreBoard();
    }

    function resetScores() {
        currentScore = 0;
        updateScoreBoard();
    }

    //work with modal
    const rulesBtn = document.querySelector('.rules-btn');
    const modalBg = document.querySelector('.modal-bg');
    const modal = document.querySelector('.modal');

    rulesBtn.addEventListener('click', () => {
        modal.classList.add('active');
        modalBg.classList.add('active');
    });

    modalBg.addEventListener('click', (event) => {
        if (event.target === modalBg) {
            hideModal();
        }
    });

    document.querySelector('.close').addEventListener('click', hideModal);

    function hideModal() {
        modal.classList.remove('active');
        modalBg.classList.remove('active');  
    }

    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', resetScores);
}

game();