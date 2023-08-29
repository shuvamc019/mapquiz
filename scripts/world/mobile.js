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
colorAllCountries();
controlPanel.style.display = "none"

const mapContainer = document.getElementsByClassName("mapContainer")[0]
mapContainer.style.removeProperty("right");
mapContainer.style.marginLeft = "auto";
mapContainer.style.marginRight = "auto";

//create message saying that website is not usable on mobile
const mobileBox = document.createElement("div")
const message = document.createElement("p")
message.innerHTML = "<strong>US States Quiz is not currently supported on mobile.</strong> <br/> <br/> Check back again later."
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
//center viewbox on Africa/Asia/Europe
const mobileHeight = 510, mobileWidth = mobileHeight * window.screen.availWidth / window.screen.availHeight
const mobileMinX = 330, mobileMinY = 40
svgTag.setAttribute("viewBox", viewBoxString(mobileMinX, mobileMinY, mobileWidth, mobileHeight))
}