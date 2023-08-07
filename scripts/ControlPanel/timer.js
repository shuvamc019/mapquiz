const timer = document.getElementById("timer")
let timerRunning = false
let timerId = 0
let seconds = 0

function timerStart() {
    let start = Date.now()
    timerRunning = true
    timerId = setInterval(function() {
        let delta = Date.now() - start;
        let secondsElapsed = Math.floor(delta / 1000)
        timer.innerHTML = formatTime(secondsElapsed + seconds)
    }, 100)
}

function timerPause() {
    seconds = getSecondsPassed()
    clearInterval(timerId)
    timerRunning = false
}

function timerReset() {
    clearInterval(timerId)
    timer.innerHTML = "00:00"
    seconds = 0
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    seconds = seconds % 60

    mString = String(minutes).padStart(2, "0")
    sString = String(seconds).padStart(2, "0")

    return mString + ":" + sString
}

function getSecondsPassed() {
    displayString = timer.innerHTML.split(":")
    const seconds = parseInt(displayString[1])
    const minutes = parseInt(displayString[0])

    return 60 * minutes + seconds
}