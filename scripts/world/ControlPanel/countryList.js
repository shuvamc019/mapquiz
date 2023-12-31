const showCountryButton = document.getElementById("showCountryButton")
const countryListContainer = document.getElementsByClassName("countryListContainer")[0]
const countryListDiv = document.createElement("div")

const defaultLabelDivColor = "#844b84"
const notFoundLabelDivColor = "#b50d0d"

const continentDivs = []

showCountryButton.onclick = showCountryList
let expanded = false

function showCountryList() {
    if(expanded) {
        showCountryButton.innerHTML = "Show Country List ▶"
        controlPanel.style.bottom = "10%"
        countryListContainer.removeChild(countryListDiv)
        document.getElementsByClassName("helpTooltip")[0].style.maxHeight = "1750%"
    } else {
        showCountryButton.innerHTML = "Hide Country List ▼"
        controlPanel.style.bottom = "2%"
        countryListContainer.appendChild(countryListDiv)
        document.getElementsByClassName("helpTooltip")[0].style.maxHeight = "1000%"
    }

    expanded = !expanded
}

function hideCountryLabels() {
    for(const continentDiv of countryListDiv.getElementsByClassName("continentDiv")) {
        for(const countryLabel of continentDiv.getElementsByClassName("countryLabel")) {
            countryLabel.style.opacity = 0
        }

        for(const labelDiv of continentDiv.getElementsByClassName("labelDiv")) {
            labelDiv.style.backgroundColor = defaultLabelDivColor
        }

        const continentLabel = continentDiv.getElementsByTagName("h3")[0]
        const labelText = continentLabel.innerHTML
        if(labelText.includes("✓")) {
            continentLabel.innerHTML = labelText.slice(0, labelText.length - 4)
        }
    }

    countryListDiv.scrollTop = 0;
}

function showLabel(code) {
    const countryName = removeWhiteSpace(countryMap.get(code).name)

    for(const countryLabel of countryListDiv.getElementsByClassName("countryLabel")) {
        if(countryLabel.id === (countryName + "label")) {
            countryLabel.style.opacity = 1;
            countryLabel.style.color = "black"
            countryLabel.scrollIntoView({block: "center"})

            const continentDiv = countryLabel.parentElement.parentElement.parentElement
            if(continentCompleted(continentDiv)) {
                const continentLabel = continentDiv.getElementsByClassName("continentLabel")[0]
                continentLabel.innerHTML = continentLabel.innerHTML + " - ✓"
            }
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

//check if all countries in a continent div have been found 
function continentCompleted(continentDiv) {
    for(const countryLabel of continentDiv.getElementsByClassName("countryLabel")) {
        if(countryLabel.style.opacity == 0) {
            return false;
        }
    }
    return true;
}


function initCountryList() {
    countryListDiv.classList.add("countryListDiv")

    for(let i = 0; i < continents.length; i++) {
        const continent = continents[i]
        const countryArr = continent.countries

        const continentDiv = document.createElement("div")
        continentDiv.classList.add("continentDiv")
        continentDiv.id = removeWhiteSpace(continent.name)

        const continentLabel = document.createElement("h3")
        continentLabel.classList.add("continentLabel")
        continentLabel.innerHTML = continent.name

        const countryGrid = document.createElement("div");
        countryGrid.classList.add("countryGrid")

        for(let i = 1; i < countryArr.length; i++) {
            const country = countryArr[i];
            
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

        continentDiv.appendChild(continentLabel)
        continentDiv.appendChild(countryGrid)
        countryListDiv.appendChild(continentDiv)
        continentDivs.push(continentDiv)
    }
        
}

function resetCountryList(continentName) {
    //clearing all continent divs to reset
    for(const continentDiv of continentDivs) {
        if(countryListDiv.contains(continentDiv)) countryListDiv.removeChild(continentDiv)
    }

    for(const continentDiv of continentDivs) {
        if(continentName === "Whole World") {
            countryListDiv.appendChild(continentDiv)
        } else if(continentDiv.id === removeWhiteSpace(continentName)) {
            countryListDiv.appendChild(continentDiv)
        }
    }

    hideCountryLabels();
} 

function removeWhiteSpace(str) {
    return str.replace(/\s/g,"")
}