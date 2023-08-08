const groupColors = []; //array to hold color for each group
const colorMap = new Map(); //map country code to color
const grayMap = new Map(); //map country code to grayscale color
const countryToCodeMap = new Map(); //map different country names to country code
const codeToCountryMap = new Map(); //map different country codes to main country name
const allCountries = []; //map country code to whether they were found yet
const viewboxMap = new Map(); //map country code to viewbox

//2D array that holds the countries in each continent, first element in each array is continent name
const continents = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"]
const continentCountries = [[], [], [], [], [], []]
const continentViewboxes = ["968 126 752 400", "1104 63 1553 826", "968 126 752 400", "0 41 1401 745", "1520 578 1170 622", "160 595 1203 640"];

//based on codes.csv, build map from country name to code
function readCodesFile(fileText) {
    //split text by newline
    const lines = fileText.split("\n");
  
    //start from i=1 since first line of csv is header
    for(let i = 1; i < lines.length; i++) {
      const line = lines[i].split(",");
      countryToCodeMap.set(line[0].trim().toLowerCase(), line[1].trim());
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
  
      const countryName = line[0]
      const countryCode = line[1]
      const continent = line[2]
      const groupNum = parseInt(line[3]);
  
      const color = groupColors[2 * groupNum - 2];
      colorMap.set(countryCode, color);
  
      const grayScale = groupColors[2 * groupNum - 1];
      grayMap.set(countryCode, grayScale);
  
      allCountries.push(countryCode)
  
      codeToCountryMap.set(countryCode, countryName)
  
      const continentInd = continents.indexOf(continent)
      continentCountries[continentInd].push(countryName)

      const minX = parseInt(line[4]), minY = parseInt(line[5])
      const width = parseInt(line[6]), height = parseInt(line[7])
      viewboxMap.set(countryCode, {minX: minX, minY: minY, width: width, height: height})
    }
  }