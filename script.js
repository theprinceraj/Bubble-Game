let randomNumArr = [];
const generateBubble = () => {
    var clutter = '';
    for (let i = 1; i <= 189; i++) {
        randomNumArr.push(Math.ceil(Math.random() * 99))
        clutter += `<div class="bubble">${randomNumArr[randomNumArr.length - 1]}</div>`;
    }
    document.getElementById("pbtm").innerHTML = clutter;
}
generateBubble();

let timerCount = 300;
const startTimer = () => {
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
const generateRandomNumberToHit = () => {
    randomNumber = randomNumArr[Math.floor(Math.random() * randomNumArr.length)];
    document.querySelector("#numberToHit").textContent = randomNumber;
    return randomNumber;
}
generateRandomNumberToHit();

document.querySelectorAll('.bubble').forEach(bubble => {
    bubble.addEventListener('click', () => {
        console.log(randomNumber, bubble.textContent)
        if(bubble.textContent == randomNumber){
            bubble.remove();
            generateRandomNumberToHit();
        }
        // timerCount = 300;
        // startTimer();
    })
})