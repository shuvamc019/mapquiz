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
    controlPanel.remove()


    //TODO: fix viewbox
    const height = MAX_HEIGHT
    const width = MAX_HEIGHT * window.screen.availHeight / window.screen.availWidth
    svgTag.setAttribute("viewBox", viewBoxString(0, 0, width, height))

    //rotate map 90 degrees and style
    const mapContainer = document.getElementsByClassName("mapContainer")[0]
    mapContainer.style.right = null
    mapContainer.style.transform = "rotate(90deg) translate(-150%, 5%)"
    mapContainer.style.width = "100vw"
    mapContainer.style.height = "auto"

    //create message saying that website is not usable on mobile
    const mobileBox = document.createElement("div")
    const message = document.createElement("p")
    message.innerHTML = "This website is not currently usable on mobile. <br/> <br/> Check back again later."
    mobileBox.appendChild(message)

    mobileBox.classList.add("panelStyle")
    mobileBox.style.position = "fixed"
    mobileBox.style.top = "50%"
    mobileBox.style.left = "50%"
    mobileBox.style.width = "50%"
    mobileBox.style.height = "auto"
    mobileBox.style.padding = "5%"
    mobileBox.style.transform = "translate(-50%, -50%) rotate(90deg) scale(1.25)"

    document.getElementsByTagName("body")[0].appendChild(mobileBox)
}