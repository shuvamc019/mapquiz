const svg = document.getElementById("map").contentDocument;

const groupColors = []; //array to hold color for each group
const colorMap = new Map(); //map country code to color

async function init() {
  //read in group csv and build data structure
  await fetch("resources/groups.csv").then(r=>r.text()).then(readGroupFile);

  //read in country csv and build data structure
  await fetch("resources/countries.csv").then(r=>r.text()).then(readCountryFile);

  colorAllCountries();
}


function colorAllCountries() {
  for(const code of colorMap.keys()) {
    const elements = svg.getElementsByClassName(code);
    for(const element of elements) {
      console.log(element)
      element.style.fill = "black";
    }
  }
}

//based on groups.csv, build array of group colors
function readGroupFile(fileText) {
  //split text by newline
  const lines = fileText.split("\n");

  //start from i=1 since first line of csv is header
  for(let i = 1; i < lines.length; i++) {
    const line = lines[i].split(",");
    const color = line[1];
    groupColors[i] = color;
  }
}

//based on countries.csv, build map from country code to color
function readCountryFile(fileText) {
  //split text by newline
  const lines = fileText.split("\n");

  //start from i=1 since first line of csv is header
  for(let i = 1; i < lines.length; i++) {
    const line = lines[i].split(",");
    const countryCode = line[1];
    const groupNum = parseInt(line[3]);
    const color = groupColors[groupNum];

    colorMap.set(countryCode, color);
  }
}

window.onload = init();