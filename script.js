const generateBubble = () => {
    var clutter = '';
    for (let i = 1; i <= 189; i++) {
        clutter += `<div class="bubble">${Math.ceil(Math.random() * 25)}</div>`;
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