const mode2Control = document.getElementById("mode2Control")
const mode2Label = document.getElementById("mode2Label");

function mode2Init() {
    controlPanel.insertBefore(mode2Control, progressContainer)

    addHoverListeners()
    randomCountryCode = getRandomCountryCode()
    mode2Label.innerHTML = "Find: " + codeToCountryMap.get(randomCountryCode)
    addClickListener(randomCountryCode)

    colorAllCountries()
}

function addHoverListeners() {
    for(const code of colorMap.keys()) {
        const elements = svg.contentDocument.getElementsByClassName(code);
        for(const element of elements) {
            element.addEventListener("mouseover", hoverCursor)
            element.addEventListener("mouseout", defaultCursor)
        }
    }
}

function removeHoverListeners() {
    for(const code of colorMap.keys()) {
        const elements = svg.contentDocument.getElementsByClassName(code);
        for(const element of elements) {
            element.removeEventListener("mouseover", hoverCursor)
            element.removeEventListener("mouseout", defaultCursor)
        }
    }
}

function addClickListener(code) {
    const elements = svg.contentDocument.getElementsByClassName(code);
    for(const element of elements) {
        element.addEventListener("click", countryClicked)
    }
}

function removeClickListener(code) {
    const elements = svg.contentDocument.getElementsByClassName(code);
    for(const element of elements) {
        element.removeEventListener("click", countryClicked)
    }
}

function removeClickListeners() {
    for(const code of colorMap.keys()) {
        removeClickListener(code)
    }
}

function countryClicked() {
    newCountryFound(randomCountryCode)
    removeClickListener(randomCountryCode)

    if(countriesRemainingArr.length > 0) {
        randomCountryCode = getRandomCountryCode()
        mode2Label.innerHTML = "Find: " + codeToCountryMap.get(randomCountryCode)
        addClickListener(randomCountryCode)
    }
}

function hoverCursor() { svgTag.style.cursor = "pointer" }
function defaultCursor() { svgTag.style.cursor = "auto" }