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
generateBubble(32, "100px");


/**
 * Starts a timer that counts down from a specified value as stored in variable `timerCount`
 *
 * @return {undefined} This function does not return a value.
 */
let intervalId;
function startTimer(timerCount) {
    intervalId = setInterval(() => {
        if (timerCount === 0 || timerCount < 0) {
            alert("Time Up!");
            clearInterval(intervalId);
            return;
        }
        else {
            timerCount--;
            document.querySelector("#timerLiveCount").textContent = `${timerCount}s`;
        }
    }, 1000)
}
startTimer(120);

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
generateRandomNumberToHit();

function addEventListenerToBubbles() {
    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.addEventListener('click', () => {
            if (bubble.textContent == randomNumber) {
                randomNumArr.splice(randomNumArr.indexOf(parseInt(bubble.textContent)), 1);
                bubble.remove();
                generateRandomNumberToHit();
                document.querySelector("#scoreDisplayBox").textContent = parseInt(document.querySelector("#scoreDisplayBox").textContent) + 1;
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
            startTimer(120);
            break;
        case 'medium':
            generateBubble(36, "60x");
            generateRandomNumberToHit();
            addEventListenerToBubbles();
            startTimer(300);
            break;
        case 'hard':
            generateBubble(100, "45px");
            generateRandomNumberToHit();
            addEventListenerToBubbles();
            startTimer(600);
            break;
        default:
            alert('Seems like an unknown error occured. Please try again.');
    }
})