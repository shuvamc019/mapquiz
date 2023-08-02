const timer = document.getElementById("timer")
let timerId = 0

function timerStart() {
    timer.innerHTML = "00:00"

    const start = Date.now()
    timerId = setInterval(function() {
        let delta = Date.now() - start;
        let secondsElapsed = Math.floor(delta / 1000)
        timer.innerHTML = formatTime(secondsElapsed)
    }, 500)
}

function timerStop() {
    clearInterval(timerId)
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    seconds = seconds % 60

    mString = String(minutes).padStart(2, "0")
    sString = String(seconds).padStart(2, "0")

    return mString + ":" + sString
}