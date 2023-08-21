const mapContainer = document.getElementsByClassName("mapContainer")[0]
const mobileDevice = window.screen.availHeight > window.screen.availWidth
let isLandscape = true

function initOrientation() {
   window.onresize = orientationChange
   orientationChange()
   
}

function orientationChange() {
    if(window.innerWidth < window.innerHeight && mobileDevice) { //portrait mode
        portrait()

    } else  { //landscape mode
        landscape()
    }
    setViewBox(currentViewBox.minX, currentViewBox.minY, currentViewBox.width, currentViewBox.height)
}

function landscape() {
    WINDOW_MAX_WIDTH = window.screen.availWidth
    WINDOW_MAX_HEIGHT = (window.screen.availHeight - (window.outerHeight - window.innerHeight))
    ASPECT_RATIO = WINDOW_MAX_WIDTH / WINDOW_MAX_HEIGHT

    MAX_HEIGHT = 1440
    MAX_WIDTH = MAX_HEIGHT * ASPECT_RATIO
    MIN_WIDTH = MAX_WIDTH * MIN_SCALE
    MIN_HEIGHT = MAX_HEIGHT * MIN_SCALE

    controlPanel.style.transform = "rotate(0deg)"
    controlPanel.style.setProperty("top", "initial")
    controlPanel.style.bottom = "10%"
    controlPanel.style.left = "3%"

    dialog.style.transform = "rotate(0deg)"

    mapContainer.style.transform = "rotate(0deg)"

    isLandscape = true
}

function portrait() {
    WINDOW_MAX_HEIGHT = window.screen.availWidth
    WINDOW_MAX_WIDTH = (window.screen.availHeight - (window.outerHeight - window.innerHeight))
    ASPECT_RATIO = WINDOW_MAX_WIDTH / WINDOW_MAX_HEIGHT
    console.log("Ratio " + ASPECT_RATIO)

    MAX_HEIGHT = 1440
    MAX_WIDTH = MAX_HEIGHT * ASPECT_RATIO
    console.log(MAX_WIDTH)
    MIN_WIDTH = MAX_WIDTH * MIN_SCALE
    MIN_HEIGHT = MAX_HEIGHT * MIN_SCALE
    
    controlPanel.style.transform = "rotate(90deg)"
    controlPanel.style.setProperty("bottom", "initial")
    controlPanel.style.left = "10%"
    controlPanel.style.top = "3%"

    dialog.style.transform = "rotate(90deg)"

    mapContainer.style.transform = "rotate(90deg)"

    isLandscape = false
}

//change viewbox dimensions based on window dimensions
function resizeWindow() {
    if(isLandscape) {
        let ratio = window.innerWidth / window.innerHeight
  
        const newWidth = clamp(currentViewBox.height * ratio, 0, MAX_WIDTH)
        const newMinX = clamp((currentViewBox.minX + currentViewBox.width / 2) - newWidth / 2, 0, MAX_WIDTH - newWidth)
    
        currentViewBox.width = newWidth
        currentViewBox.minX = newMinX
    } else {
        let ratio = window.innerHeight / window.innerWidth
        console.log(ratio)
  
        const newWidth = clamp(currentViewBox.height * ratio, 0, MAX_WIDTH)
        const newMinX = clamp((currentViewBox.minX + currentViewBox.width / 2) - newWidth / 2, 0, MAX_WIDTH - newWidth)
        console.log(currentViewBox.width + " -> " + newWidth)
    
        currentViewBox.width = newWidth
        currentViewBox.minX = newMinX
    }
    
  }