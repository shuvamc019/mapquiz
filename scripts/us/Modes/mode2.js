const mode2Control = document.getElementById("mode2Control")
const mode2Label = document.getElementById("mode2Label");
const mode2SkipButton = document.getElementById("mode2SkipButton")

function mode2Init() {
    console.log("\nMode 2 started")
    //controlPanel.insertBefore(mode2Control, progressContainer)
    mode2Control.style.display = "flex"

    mode2SkipButton.onclick = mode2NewCountry
    
    colorAllCountries()
    addHoverListeners()
    mode2NewCountry()

}

function addHoverListeners() {
    for(const code of stateMap.keys()) {
        const elements = svgTag.getElementsByClassName(code);

        for(const element of elements) {
            element.onmouseover = hoverCursor
            element.onmouseout = defaultCursor
        }
    }
}

function removeHoverListeners() {
    for(const code of stateMap.keys()) {
        const elements = svg.contentDocument.getElementsByClassName(code);
        for(const element of elements) {
            element.onmouseover = hoverCursor
            element.onmouseout = defaultCursor
        }
    }
    svgTag.style.cursor = "auto"
}

function addClickListener(code) {
    const elements = svg.contentDocument.getElementsByClassName(code);
    for(const element of elements) {
        element.onclick = countryClicked
    }
}

function removeClickListener(code) {
    const elements = svg.contentDocument.getElementsByClassName(code);
    for(const element of elements) {
        element.onclick = null
    }
}

function removeClickListeners() {
    for(const code of stateMap.keys()) {
        removeClickListener(code)
    }
}

function countryClicked() {
    console.log(stateMap.get(randomCountryCode).name + " found")
    newCountryFound(randomCountryCode)

    if(countriesRemainingArr.length > 0) mode2NewCountry()
    
}

function mode2NewCountry() {
    removeClickListener(randomCountryCode)
    randomCountryCode = getRandomCountryCode()
    const randomCountry = stateMap.get(randomCountryCode);
    mode2Label.innerHTML = "Find: " + randomCountry.name
    console.log(randomCountry.name + " selected")
    addClickListener(randomCountryCode)
}

function hoverCursor(e) { 
    svgTag.style.cursor = "pointer" 

    /*const c = e.target.classList
    console.log(stateMap.get(c[1]))
    console.log(c)
    console.log(e.target)
    console.log(" ")*/
}
function defaultCursor() { svgTag.style.cursor = "auto" }