const dialog = document.getElementById("dialog")
const dialogHeader = document.getElementById("dialogHeader")
const dialogText = document.getElementById("dialogText")
const dialogCloseButton = document.getElementById("dialogCloseButton")
const dialogRestartButton = document.getElementById("dialogRestartButton")
const scoreTable = document.getElementsByClassName("scoreTable")[0]

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
    dialogText.innerHTML = "Mode: " + modeDropdown.value + "<br><br>You found " + countriesFound + " out of " + totalCountries + " countries in " + timeString

    //set up high score list section
    addScore()
    initScoreSection()

    dialog.showModal()
}

function initScoreSection() {
    scoreTable.innerHTML = "" //clear all children

    scores.sort((a, b) => {
        if(a.found > b.found) {
            return -1;
        } else if(b.found > a.found) {
            return 1;
        } else {
            return a.time < b.time ? -1 : 1;
        }
    })

    let currentScoreDiv = null
    let rankNum = 1
    for(const score of scores) {
        if(score.mode === modeDropdown.value) {
            const scoreDiv = document.createElement("div")
            scoreDiv.classList.add("scoreDiv")

            const rankLabel = document.createElement("p")
            rankLabel.classList.add("rankLabel")
            rankLabel.innerHTML = (rankNum++) + "."
            scoreDiv.appendChild(rankLabel)

            const modeLabel = document.createElement("p")
            modeLabel.classList.add("scoreLabel")
            modeLabel.innerHTML = score.mode
            scoreDiv.appendChild(modeLabel)

            const foundLabel = document.createElement("p")
            foundLabel.classList.add("scoreLabel")
            foundLabel.innerHTML = score.found + " / " + score.total
            scoreDiv.appendChild(foundLabel)

            const timeLabel = document.createElement("p")
            timeLabel.classList.add("scoreLabel")
            timeLabel.innerHTML = formatTime(score.time)
            scoreDiv.appendChild(timeLabel)

            scoreTable.appendChild(scoreDiv)

            //adding line under each score div
            const lineDiv = document.createElement("div")
            lineDiv.classList.add("lineDiv")
            scoreTable.appendChild(lineDiv)

            if(matchesCurrentScore(score)) {
                currentScoreDiv = scoreDiv
            }
        }
    }

    if(currentScoreDiv != null) {
        setTimeout(function () {
            currentScoreDiv.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
       }, 100);
    } else {
        scoreTable.scrollTop = 0;
    }

    dialog.style.transform = "translate(-75%, -50%)"
}

//adds current game score to scores array
function addScore() {
    if(countriesFound > 0) { //dont' count it as a score if nothing found
        const score = new Score(modeDropdown.value, "USA", countriesFound, totalCountries, seconds)
        scores.push(score)
    }
}

//returns whether a given score is the current game's score
function matchesCurrentScore(score) {
    return score.mode == modeDropdown.value && score.found == countriesFound && score.time == seconds
}