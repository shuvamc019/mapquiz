const mode3Control = document.getElementById("mode3Control")
const mode3Entry = document.getElementById("mode3Entry");
mode3Entry.addEventListener("keyup", mode3Entered);

function mode3Entered(event) {
    
}

function mode3Init() {
    if(controlPanel.contains(mode1Control)) controlPanel.removeChild(mode1Control)
    if(controlPanel.contains(mode2Control)) controlPanel.removeChild(mode2Control)

    if(!controlPanel.contains(mode3Control)) controlPanel.insertBefore(mode3Control, progressContainer)

    randomCountry = getRandomCountry()

    mode3Entry.value = ""
    colorAllCountries()
}