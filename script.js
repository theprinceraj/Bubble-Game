let randomNumArr = [];
/**
 * Generates div elements with bubble class having random numbers and ultimately appending it to the "pbtm" element.
 *
 * @return {undefined} No return value
 */
function generateBubble() {
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= 189; i++) {
        const randomNum = Math.ceil(Math.random() * 99);
        randomNumArr.push(randomNum);

        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.textContent = randomNum;

        fragment.appendChild(bubble);
    }

    document.getElementById("pbtm").appendChild(fragment);
}
generateBubble();

let timerCount = 300;
/**
 * Starts a timer that counts down from a specified value as stored in variable `timerCount`
 *
 * @return {undefined} This function does not return a value.
 */
function startTimer() {
    const intervalId = setInterval(() => {
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
startTimer();

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

document.querySelectorAll('.bubble').forEach(bubble => {
    bubble.addEventListener('click', () => {
        if (bubble.textContent == randomNumber) {
            bubble.remove();
            generateRandomNumberToHit();
            document.querySelector("#scoreDisplayBox").textContent = parseInt(document.querySelector("#scoreDisplayBox").textContent) + 1;
        }
        // timerCount = 300;
        // startTimer();
    })
})
