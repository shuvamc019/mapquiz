function initControlPanel() {
    document.addEventListener("visibilitychange", () => {
        if(timerRunning) {
            if (document.visibilityState === "visible") {
                timerStart()
            } else {
                timerPause()
            }
        } 
    });

    document.getElementsByClassName("timerContainer")[0].removeChild(timer)
    textEntry.disabled = true
    giveUpButton.disabled = true

    initCountryList();
    initButtons();
}