const dialog = document.getElementById("dialog")
const dialogHeader = document.getElementById("dialogHeader")
const dialogText = document.getElementById("dialogText")
const dialogCloseButton = document.getElementById("dialogCloseButton")
const dialogRestartButton = document.getElementById("dialogRestartButton")

const GIVE_UP = 1, GAME_WON = 2

dialogRestartButton.addEventListener("click", function() {
    dialog.close()
    restart();
});
dialogCloseButton.addEventListener("click", function() { dialog.close() });

function gameEnd(type) {
    timerPause()

    mode1Entry.disabled = true
    mode3Entry.disabled = true
    mode3SkipButton.disabled = true
    mode2SkipButton.disabled = true
    giveUpButton.disabled = true

    removeClickListeners()
    removeHoverListeners()
    showNotFoundCountryLabels()

    if(type == GAME_WON) {
        dialogHeader.innerHTML = "Good Job!"
    } else {
        dialogHeader.innerHTML = "Better luck next time"
    }

    const timeString = timerTextToTimeString(timer.innerHTML)
    dialogText.innerHTML = "Mode: " + modeDropdown.value + "<br>Region: " + regionDropdown.value + "<br><br>You found " + countriesFound + " out of " + totalCountries + " countries in " + timeString

    dialog.showModal()
}