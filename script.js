window.addEventListener("beforeunload", (event) => {
    if (parseInt(scoreDisplayBox.textContent) > 0) {
        // Display a confirmation message
        event.returnValue = "Leaving/reloading this page will reset your score. Are you sure you want to leave?";
    }
});


let randomNumArr = [];
/**
 * Generates div elements with bubble class having random numbers and ultimately appending it to the "pbtm" element.
 *
 * @return {undefined} No return value
 */
function generateBubble(bubbleCount, bubbleDimenions) {
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= bubbleCount; i++) {
        const randomNum = Math.ceil(Math.random() * 99);
        randomNumArr.push(randomNum);

        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        bubble.style.height = bubbleDimenions;
        bubble.style.width = bubbleDimenions;

        bubble.textContent = randomNum;

        fragment.appendChild(bubble);
    }

    document.getElementById("pbtm").appendChild(fragment);
}


/**
 * Starts a timer that counts down from a specified value as stored in variable `timerCount`
 *
 * @return {undefined} This function does not return a value.
 */
let intervalId, currentTimerCount;
function startTimer(timerCount) {
    intervalId = setInterval(() => {
        if (timerCount === 0 || timerCount < 0) {
            alert("Time Up!");
            clearInterval(intervalId);
        }
        else if (randomNumArr.length === 0) {
            document.querySelector('#winnerMessageModalContainer').style.display = 'fixed'
        }
        else {
            timerCount--;
            document.querySelector("#timerLiveCount").textContent = `${timerCount}s`;
        }
        currentTimerCount = timerCount;
    }, 1000)
}

let randomNumber;
/**
 * Picks a random number from the array 'randomNumArr' and displays it in the element with the id 'numberToHitDisplayBox'.
 *
 * @return {number} The randomly picked number.
 */
function generateRandomNumberToHit() {
    randomNumber = randomNumArr[Math.floor(Math.random() * randomNumArr.length)];
    document.querySelector("#numberToHitDisplayBox").textContent = randomNumber;
    return randomNumber;
}


/**
 * Adds event listeners to bubbles.
 *
 * This function selects all elements with the class "bubble" and adds a click event listener to each one. 
 * When a bubble is clicked, the function checks if its text content matches the global variable "randomNumber".
 * If there is a match, the bubble is removed from the DOM, the global array "randomNumArr" is updated to remove the matched number, 
 * a new random number for hitting is picked, and the score displayed in the element with the id "scoreDisplayBox" is incremented by 1.
 *
 * @return {undefined} This function does not return a value.
 */
const scoreDisplayBox = document.querySelector("#scoreDisplayBox");
function addEventListenerToBubbles() {
    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.addEventListener('click', () => {
            if (bubble.textContent == randomNumber) {
                randomNumArr.splice(randomNumArr.indexOf(parseInt(bubble.textContent)), 1);
                bubble.remove();
                generateRandomNumberToHit();
                scoreDisplayBox.textContent = parseInt(document.querySelector("#scoreDisplayBox").textContent) + 1;
            }
        })
    })
}
addEventListenerToBubbles();

const difficultyChoiceDropdown = document.querySelector('#difficultyChoiceBox');
difficultyChoiceDropdown.addEventListener('change', () => {
    document.querySelector('#pbtm').innerHTML = '';
    randomNumArr = [];
    clearInterval(intervalId);

    const selectedDifficultyOption = difficultyChoiceDropdown.options[difficultyChoiceDropdown.selectedIndex];
    const selectedDifficulty = selectedDifficultyOption.value;

    switch (selectedDifficulty) {
        case 'easy':
            generateBubble(32, "100px");
            generateRandomNumberToHit();
            addEventListenerToBubbles();
            startTimer(150);
            break;
        case 'medium':
            generateBubble(36, "60x");
            generateRandomNumberToHit();
            addEventListenerToBubbles();
            startTimer(330);
            break;
        case 'hard':
            generateBubble(100, "45px");
            generateRandomNumberToHit();
            addEventListenerToBubbles();
            startTimer(630);
            break;
        default:
            alert('Seems like an unknown error occured. Please try again.');
    }
})

// JavaScript for Various Modals
const startGameModalButton = document.querySelector('#startGameModalButton');
startGameModalButton.addEventListener('click', () => {
    document.querySelector('#startGameModalContainer').style.display = 'none';
    if (window.innerWidth > 320) {
        generateBubble(32, "100px");
    }
    else {
        generateBubble(32, "50px");
    }
    addEventListenerToBubbles();
    generateRandomNumberToHit();
    startTimer(150);
})

const playAgainModalButton = document.querySelector('#playAgainModalButton');
playAgainModalButton.addEventListener('click', () => {
    document.querySelector('#winnerMessageModalContainer').style.display = 'none';
    document.querySelector('#startGameModalContainer').style.display = 'flex';
})