const defaultGray = "#555555"

function removeTitles() {
    const titles = svg.contentDocument.getElementsByTagName("title");
    for(const title of titles) {
        title.innerHTML = "";
    }
} 

function grayAllCountries() {
    for(const code of countryMap.keys()) {
      const elements = svg.contentDocument.getElementsByClassName(code);
      const color = countryMap.get(code).grayScale
  
      for(const element of elements) {
        element.style.fill = color;

        if(element.classList.contains("oceania-ellipse")) {
          element.style.fill = "transparent";
          element.style.stroke = color;
        }
      }
    }

}

function colorAllCountries() {
    for(const code of countryMap.keys()) {
      colorCountry(code)
    }

}

function colorCountry(code) {
  const elements = svg.contentDocument.getElementsByClassName(code);
  const color = countryMap.get(code).color

  for(const element of elements) {
    element.style.fill = color;

    if(element.classList.contains("oceania-ellipse")) {
      element.style.fill = "transparent";
      element.style.stroke = color;
    }
  }
}

function initSpecialCases() {
  //setting dashed lines for oceania island ellipses
  for(const island of svg.contentDocument.getElementsByClassName("oceania-ellipse")) {
    island.setAttribute("stroke-dasharray", "6 2")
  }

  for(const circleOpaque of svg.contentDocument.getElementsByClassName("circle-opaque")) {
    circleOpaque.style.opacity = "0";
  }
}

function saturateMap(saturation) {
  let elements = svg.contentDocument.getElementsByClassName("landxx")
  for(const element of elements) {
    element.setAttribute("filter", "saturate(1)")
    element.setAttribute("filter", "saturate(" + saturation + ")")
  }
  elements = svg.contentDocument.getElementsByClassName("coastxx")
  for(const element of elements) {
    element.setAttribute("filter", "saturate(1)")
    element.setAttribute("filter", "saturate(" + saturation + ")")
  }
  elements = svg.contentDocument.getElementsByClassName("antxx")
  for(const element of elements) {
    element.setAttribute("filter", "saturate(1)")
    element.setAttribute("filter", "saturate(" + saturation + ")")
  }
  elements = svg.contentDocument.getElementsByClassName("smallislandxx")
  for(const element of elements) {
    element.setAttribute("filter", "saturate(1)")
    element.setAttribute("filter", "saturate(" + saturation + ")")
  }
  elements = svg.contentDocument.getElementsByClassName("oceania-ellipse")
  for(const element of elements) {
    element.setAttribute("filter", "saturate(1)")
    element.setAttribute("filter", "saturate(" + saturation + ")")
  }
}

function setBaselineColors() {
  //color all landmasses as defaultGray
  //anything that is a country will later be overwritten
  //non-countries will always stay defaultGray
  let elements = svg.contentDocument.getElementsByClassName("landxx")
  for(const element of elements) {
    element.style.fill = defaultGray
  }
  elements = svg.contentDocument.getElementsByClassName("coastxx")
  for(const element of elements) {
    element.style.fill = defaultGray
  }
  elements = svg.contentDocument.getElementsByClassName("antxx")
  for(const element of elements) {
    element.style.fill = defaultGray
  }
  elements = svg.contentDocument.getElementsByClassName("smallislandxx")
  for(const element of elements) {
    element.style.fill = defaultGray
  }

  //color Antarctica even though it's a non-country
  elements = svg.contentDocument.getElementsByClassName("an")
  for(const element of elements) {
    element.style.fill = "#D3D3D3"
  }
}

function initMap() {
  setBaselineColors()
  removeTitles();
  initSpecialCases();
  initZoom();
}