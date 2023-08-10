const mode2Control = document.getElementById("mode2Control")
const mode2Label = document.getElementById("mode2Label");

function mode2Init() {
    controlPanel.insertBefore(mode2Control, progressContainer)

    addHoverListeners()
    randomCountryCode = getRandomCountryCode()
    const randomCountry = countryMap.get(randomCountryCode)
    mode2Label.innerHTML = "Find: " + randomCountry.name
    addClickListener(randomCountryCode)

    colorAllCountries()
}

function addHoverListeners() {
    for(const code of countryMap.keys()) {
        const elements = svg.contentDocument.getElementsByClassName(code);
        for(const element of elements) {
            element.addEventListener("mouseover", hoverCursor)
            element.addEventListener("mouseout", defaultCursor)
        }
    }
}

function removeHoverListeners() {
    for(const code of countryMap.keys()) {
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
    for(const code of countryMap.keys()) {
        removeClickListener(code)
    }
}

function countryClicked() {
    newCountryFound(randomCountryCode)
    removeClickListener(randomCountryCode)

    if(countriesRemainingArr.length > 0) {
        randomCountryCode = getRandomCountryCode()
        const randomCountry = countryMap.get(randomCountryCode);
        mode2Label.innerHTML = "Find: " + randomCountry.name
        addClickListener(randomCountryCode)
    }
}

function hoverCursor() { svgTag.style.cursor = "pointer" }
function defaultCursor() { svgTag.style.cursor = "auto" }