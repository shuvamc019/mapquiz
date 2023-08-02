const groupColors = []; //array to hold color for each group
const colorMap = new Map(); //map country code to color
const grayMap = new Map(); //map country code to grayscale color
const codeMap = new Map(); //map different country names to country code

const svg = document.getElementById("map");

async function init() {
  //read in group csv and build data structure
  await fetch("resources/groups.csv").then(r=>r.text()).then(readGroupFile);

  //read in country csv and build data structure
  await fetch("resources/countries.csv").then(r=>r.text()).then(readCountryFile);

  //read in country codes csv and build data structure
  await fetch("resources/codes.csv").then(r=>r.text()).then(readCodesFile);

  grayAllCountries();  
  removeTitles();
  timerStart();
}

//based on codes.csv, build map from country name to code
function readCodesFile(fileText) {
  //split text by newline
  const lines = fileText.split("\n");

  //start from i=1 since first line of csv is header
  for(let i = 1; i < lines.length; i++) {
    const line = lines[i].split(",");
    codeMap.set(line[0].trim().toLowerCase(), line[1].trim());
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
    const grayScale = line[2];
    groupColors[2 * i - 2] = color;
    groupColors[2 * i - 1] = grayScale;
  }
}

//based on countries.csv, build map from country code to color
function readCountryFile(fileText) {
  //split text by newline
  const lines = fileText.split("\n");

  //start from i=1 since first line of csv is header
  for(let i = 1; i < lines.length; i++) {
    const line = lines[i].split(",");
    const countryCode = line[1].trim();
    const groupNum = parseInt(line[3]);

    const color = groupColors[2 * groupNum - 2];
    colorMap.set(countryCode, color);

    const grayScale = groupColors[2 * groupNum - 1];
    grayMap.set(countryCode, grayScale);
  }
}

svg.addEventListener("load", init, false);