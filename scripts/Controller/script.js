const svg = document.getElementById("map");
let svgTag = null

async function init() {
  svgTag = svg.contentDocument.getElementsByTagName("svg")[0]
  
  //read in group csv and build data structure
  await fetch("resources/groups.csv").then(r=>r.text()).then(readGroupFile);

  //read in country csv and build data structure
  await fetch("resources/countries.csv").then(r=>r.text()).then(readCountryFile);

  //read in country codes csv and build data structure
  await fetch("resources/codes.csv").then(r=>r.text()).then(readCodesFile);

  initMap();
  initControlPanel();

  //automateCountryLabels();
}

svg.addEventListener("load", init, false);