const showCountryButton = document.getElementById("showCountryButton")
const countryListContainer = document.getElementsByClassName("countryListContainer")[0]
const countryListDiv = document.createElement("div")

const defaultCountryLabelColor = "black"
const notFoundCountryLabelColor = "red"

showCountryButton.addEventListener("click", showCountryList);
let expanded = false

function showCountryList() {
    if(expanded) {
        showCountryButton.innerHTML = "Show Country List ▶"
        controlPanel.style.bottom = "15%"
        countryListContainer.removeChild(countryListDiv)
    } else {
        showCountryButton.innerHTML = "Hide Country List ▼"
        controlPanel.style.bottom = "5%"
        countryListContainer.appendChild(countryListDiv)
    }

    expanded = !expanded
}

function hideCountryLabels() {
    for(const continentDiv of countryListDiv.getElementsByClassName("continentDiv")) {
        for(const countryLabel of continentDiv.getElementsByClassName("countryLabel")) {
            countryLabel.style.opacity = 0
            countryLabel.style.color = defaultCountryLabelColor
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
    for(const countryLabel of countryListDiv.getElementsByClassName("countryLabel")) {
        if(countryLabel.style.opacity == 0) {
            countryLabel.style.opacity = 1
            countryLabel.style.color = notFoundCountryLabelColor
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
        const continentArr = continentCountries[i]

        const continentDiv = document.createElement("div")
        continentDiv.classList.add("continentDiv")

        const continentLabel = document.createElement("h3")
        continentLabel.classList.add("continentLabel")
        continentLabel.innerHTML = continent

        const countryGrid = document.createElement("div");
        countryGrid.classList.add("countryGrid")

        for(let i = 1; i < continentArr.length; i++) {
            const country = continentArr[i];
            
            const labelDiv = document.createElement("div");
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
    }
    
    
    hideCountryLabels();
}

function removeWhiteSpace(str) {
    return str.replace(/\s/g,"")
}