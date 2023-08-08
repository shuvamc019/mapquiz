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
  
      for(const continentArr of continentCountries) {
        if(continentArr[0] === continent) {
          continentArr.push(countryName)
        }
      }
    }
  }