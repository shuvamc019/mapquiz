const dialog = document.getElementById("dialog")
const dialogHeader = document.getElementById("dialogHeader")
const dialogText = document.getElementById("dialogText")
const dialogCloseButton = document.getElementById("dialogCloseButton")
const dialogRestartButton = document.getElementById("dialogRestartButton")
const scoreListContainer = document.getElementsByClassName("scoreListContainer")[0]

const GIVE_UP = 1, GAME_WON = 2

dialogRestartButton.addEventListener("click", function() {
    dialog.close()
    restart();
});
dialogCloseButton.addEventListener("click", function() { dialog.close() });

function gameEnd(type) {
    timerPause()

    //disable all inputs since game is over
    mode1Entry.disabled = true
    mode3Entry.disabled = true
    mode3SkipButton.disabled = true
    mode2SkipButton.disabled = true
    giveUpButton.disabled = true

    //remove mode 2 listeners
    removeClickListeners()
    removeHoverListeners()

    showNotFoundCountryLabels()

    //set up dialog header
    if(type == GAME_WON) {
        dialogHeader.innerHTML = "Good Job!"
    } else {
        dialogHeader.innerHTML = "Better luck next time"
    }

    //set up score description section
    const timeString = timerTextToTimeString(timer.innerHTML)
    dialogText.innerHTML = "Mode: " + modeDropdown.value + "<br>Region: " + regionDropdown.value + "<br><br>You found " + countriesFound + " out of " + totalCountries + " countries in " + timeString

    //set up high score list section
    addScore()
    initScoreSection()

    dialog.showModal()
}

function initScoreSection() {
    scoreListContainer.innerHTML = "" //clear all children

    let scoreExists = false //keeps track of whether any previous scores exist for this configuration

    for(const score of scores) {
        if(score.mode === modeDropdown.value && score.region === regionDropdown.value) {
            scoreExists = true

            const scoreDiv = document.createElement("div")
            scoreDiv.classList.add("scoreDiv")

            const modeLabel = document.createElement("p")
            modeLabel.classList.add("scoreLabel")
            modeLabel.innerHTML = score.mode
            scoreDiv.appendChild(modeLabel)

            const regionLabel = document.createElement("p")
            regionLabel.classList.add("scoreLabel")
            regionLabel.innerHTML = score.region
            scoreDiv.appendChild(regionLabel)

            const foundLabel = document.createElement("p")
            foundLabel.classList.add("scoreLabel")
            foundLabel.innerHTML = score.found + " / " + score.total
            scoreDiv.appendChild(foundLabel)

            const timeLabel = document.createElement("p")
            timeLabel.classList.add("scoreLabel")
            console.log(score.time)
            timeLabel.innerHTML = score.time
            scoreDiv.appendChild(timeLabel)

            scoreListContainer.appendChild(scoreDiv)
        }
    }

    if(!scoreExists) {

    }


}

//adds current game score to scores array
function addScore() {
    if(countriesFound > 0) { //dont' count it as a score if nothing found
        const score = new Score(modeDropdown.value, regionDropdown.value, countriesFound, totalCountries, timer.innerHTML)
        scores.push(score)
    }
}