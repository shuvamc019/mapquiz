const mode2Control = document.getElementById("mode2Control")
const mode2Label = document.getElementById("mode2Label");
const mode2SkipButton = document.getElementById("mode2SkipButton")

function mode2Init() {
    console.log("\nMode 2 started")
    controlPanel.insertBefore(mode2Control, progressContainer)

    mode2SkipButton.addEventListener("click", mode2NewCountry)
    
    colorAllCountries()
    addHoverListeners()
    mode2NewCountry()


}

function addHoverListeners() {
    for(const code of countryMap.keys()) {
        const elements = svgTag.getElementsByClassName(code);

        for(const element of elements) {
            if(code == "kn") {
                console.log(element)
                element.addEventListener("click", function(e) {
                    console.log("here")
                    console.log(getPoint(e))
                })
            }
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
    svgTag.style.cursor = "auto"
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
    console.log(countryMap.get(randomCountryCode).name + " found")
    newCountryFound(randomCountryCode)

    mode2NewCountry()
    
}

function mode2NewCountry() {
    removeClickListener(randomCountryCode)
    randomCountryCode = getRandomCountryCode()
    const randomCountry = countryMap.get(randomCountryCode);
    mode2Label.innerHTML = "Find: " + randomCountry.name
    console.log(randomCountry.name + " selected")
    addClickListener(randomCountryCode)
}

function hoverCursor(e) { 
    svgTag.style.cursor = "pointer" 

    /*const c = e.target.classList
    console.log(countryMap.get(c[1]))
    console.log(c)
    console.log(e.target)
    console.log(" ")*/
}
function defaultCursor() { svgTag.style.cursor = "auto" }