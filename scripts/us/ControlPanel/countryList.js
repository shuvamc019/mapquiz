const showCountryButton = document.getElementById("showCountryButton")
const countryListContainer = document.getElementsByClassName("countryListContainer")[0]
const countryListDiv = document.createElement("div")

const defaultLabelDivColor = "#844b84"
const notFoundLabelDivColor = "#b50d0d"

showCountryButton.onclick = showCountryList
let expanded = false

function showCountryList() {
    if(expanded) {
        showCountryButton.innerHTML = "Show State List ▶"
        controlPanel.style.bottom = "10%"
        countryListContainer.removeChild(countryListDiv)
        document.getElementsByClassName("helpTooltip")[0].style.maxHeight = "1750%"
    } else {
        showCountryButton.innerHTML = "Hide State List ▼"
        controlPanel.style.bottom = "2%"
        countryListContainer.appendChild(countryListDiv)
        document.getElementsByClassName("helpTooltip")[0].style.maxHeight = "1000%"
    }

    expanded = !expanded
}

function hideCountryLabels() {
    for(const countryLabel of countryListDiv.getElementsByClassName("countryLabel")) {
        countryLabel.style.opacity = 0
    }

    for(const labelDiv of countryListDiv.getElementsByClassName("labelDiv")) {
        labelDiv.style.backgroundColor = defaultLabelDivColor
    }

    countryListDiv.scrollTop = 0;
}

function showLabel(code) {
    const countryName = removeWhiteSpace(stateMap.get(code).name)

    for(const countryLabel of countryListDiv.getElementsByClassName("countryLabel")) {
        if(countryLabel.id === (countryName + "label")) {
            countryLabel.style.opacity = 1;
            countryLabel.style.color = "black"
            countryLabel.scrollIntoView({block: "center"})
        }
    }
}

function showNotFoundCountryLabels() {
    for(const labelDiv of countryListDiv.getElementsByClassName("labelDiv")) {
        const countryLabel = labelDiv.getElementsByClassName("countryLabel")[0]
        if(countryLabel.style.opacity == 0) {
            countryLabel.style.opacity = 1
            labelDiv.style.backgroundColor = notFoundLabelDivColor
        }
    }
}

function initCountryList() {
    countryListDiv.classList.add("countryListDiv")

    const countryGrid = document.createElement("div");
    countryGrid.classList.add("countryGrid")

    for(const code of stateMap.keys()) {
        const country = stateMap.get(code)
        
        const labelDiv = document.createElement("div");
        labelDiv.style.backgroundColor = defaultLabelDivColor
        labelDiv.classList.add("labelDiv")

        const countryLabel = document.createElement("p")
        countryLabel.classList.add("countryLabel")
        countryLabel.id = removeWhiteSpace(country.name) + "label"
        countryLabel.innerHTML = country.name

        labelDiv.appendChild(countryLabel)
        countryGrid.appendChild(labelDiv)
    }

    countryListDiv.appendChild(countryGrid)
        
}

function resetCountryList() {
    hideCountryLabels();
} 

function removeWhiteSpace(str) {
    return str.replace(/\s/g,"")
}