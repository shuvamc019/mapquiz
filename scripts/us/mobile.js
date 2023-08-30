let mobileBox, message

function isMobile() {
  if ("maxTouchPoints" in navigator) {
    return navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
    return navigator.msMaxTouchPoints > 0;
  } else {
    const mQ = matchMedia?.("(pointer:coarse)");
    if (mQ?.media === "(pointer:coarse)") {
      return !!mQ.matches;
    } else if ("orientation" in window) {
      return true;
    } else {
      const UA = navigator.userAgent;
      return   /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
               /\b(Android|Windows Phone|iPod)\b/i.test(UA);
    }
  }
}

function initMobile() {
  //create message saying that website is not usable on mobile
  mobileBox = document.createElement("div")
  message = document.createElement("p")
  message.innerHTML = "<strong>Please use landscape mode for US States Quiz</strong>"
  mobileBox.appendChild(message)
  mobileBox.classList.add("panelStyle")
  mobileBox.style.position = "fixed"
  mobileBox.style.top = "50%"
  mobileBox.style.left = "50%"
  mobileBox.style.width = "250px"
  mobileBox.style.height = "auto"
  mobileBox.style.padding = "2%"
  mobileBox.style.transform = "translate(-50%, -50%) scale(1.25)"
  document.getElementsByTagName("body")[0].appendChild(mobileBox)

  window.onresize = resizeMobile
  resizeMobile()
}

function resizeMobile() {
  let mobileHeight, mobileWidth, mobileMinX, mobileMinY

  if(window.innerWidth > window.innerHeight) { //landscape mode
    const mapContainer = document.getElementsByClassName("mapContainer")[0]
    mapContainer.style.right = 0

    mobileBox.style.display = "none"
    controlPanel.style.display = "block"
    controlPanel.style.minWidth = 0
    if(controlPanel.offsetWidth < 300) {
      const fontSize = parseFloat(window.getComputedStyle(controlPanel, null).getPropertyValue('font-size'))
      const fontScale = controlPanel.offsetWidth / 300
      for(const child of controlPanel.getElementsByTagName("*")) {
        child.style.fontSize = (fontSize * fontScale) + "px"
      }

    }
    

    restart()
  } else { //portrait mode
    mobileHeight = 510
    mobileWidth = mobileHeight * window.screen.availWidth / window.screen.availHeight
    mobileMinX = 330
    mobileMinY = 40

    const mapContainer = document.getElementsByClassName("mapContainer")[0]
    mapContainer.style.removeProperty("right");

    colorAllCountries();
    controlPanel.style.display = "none"
    mobileBox.style.display = "block"

    svgTag.setAttribute("viewBox", viewBoxString(mobileMinX, mobileMinY, mobileWidth, mobileHeight))
  }

 
}