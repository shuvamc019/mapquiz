const svg = document.getElementById("map");
let svgTag = null

function Country(name, continent, group, color, grayScale, viewBox) {
  this.name = name;
  this.continent = continent;
  this.group = group;
  this.color = color;
  this.grayScale = grayScale;
  this.viewBox = viewBox;
}

async function init() {
  svgTag = svg.contentDocument.getElementsByTagName("svg")[0]
  
  //read in group csv and build data structure
  await fetch("resources/groups.csv").then(r=>r.text()).then(readGroupFile);

  //read in country codes csv and build data structure
  await fetch("resources/codes.csv").then(r=>r.text()).then(readCodesFile);

  //read in country codes csv and build data structure
  await fetch("resources/regions.csv").then(r=>r.text()).then(readRegionFile);

  //read in country csv and build data structure
  await fetch("resources/countries.csv").then(r=>r.text()).then(readCountryFile);

  initMap();
  initControlPanel();

  //automateCountryLabels();
}

svg.addEventListener("load", init, false);