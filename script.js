let randomNumArr = [];
(function generateBubble() {
    var clutter = '';
    for (let i = 1; i <= 189; i++) {
        randomNumArr.push(Math.ceil(Math.random() * 99))
        clutter += `<div class="bubble">${randomNumArr[randomNumArr.length - 1]}</div>`;
    }
    document.getElementById("pbtm").innerHTML = clutter;
})(); // generateBubble();

let timerCount = 300;
(function startTimer() {
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
})(); // startTimer();

let randomNumber;
(function generateRandomNumberToHit() {
    randomNumber = randomNumArr[Math.floor(Math.random() * randomNumArr.length)];
    document.querySelector("#numberToHitDisplayBox").textContent = randomNumber;
    return randomNumber;
})(); // generateRandomNumberToHit();

document.querySelectorAll('.bubble').forEach(bubble => {
    bubble.addEventListener('click', () => {
        if (bubble.textContent == randomNumber) {
            bubble.remove();
            document.querySelector("#scoreDisplayBox").textContent = parseInt(document.querySelector("#scoreDisplayBox").textContent) + 1;
            generateRandomNumberToHit();
        }
        timerCount = 300;
        startTimer();
    })
})