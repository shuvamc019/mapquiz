const mode2Control = document.getElementById("mode2Control")
const mode2Label = document.getElementById("mode2Label");

function mode2Init() {
    if(controlPanel.contains(mode1Control)) controlPanel.removeChild(mode1Control)
    if(controlPanel.contains(mode3Control)) controlPanel.removeChild(mode3Control)

    if(!controlPanel.contains(mode2Control)) controlPanel.insertBefore(mode2Control, progressContainer)

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
            element.addEventListener("mouseover", function() { svgTag.style.cursor = "pointer" })
            element.addEventListener("mouseout", function() { svgTag.style.cursor = "auto" })
        }
    }
}

function removeHoverListeners() {
    for(const code of colorMap.keys()) {
        const elements = svg.contentDocument.getElementsByClassName(code);
        for(const element of elements) {
            element.removeEventListener("mouseover", function() { svgTag.style.cursor = "pointer" })
            element.removeEventListener("mouseout", function() { svgTag.style.cursor = "auto" })
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

function countryClicked() {
    newCountryFound(randomCountryCode)
    if(countriesRemainingArr.length > 0) {
        randomCountryCode = getRandomCountryCode()
        mode2Label.innerHTML = "Find: " + codeToCountryMap.get(randomCountryCode)
        addClickListener(randomCountryCode)
    }
}