const mapContainer = document.getElementsByClassName("mapContainer")[0]
let screenOrientation = "landscape"

function initOrientation() {
    window.addEventListener("resize", function() {
        if(window.innerWidth > window.innerHeight) { //landscape mode
            controlPanel.style.transform = "rotate(0deg)"
            controlPanel.style.setProperty("top", "initial")
            controlPanel.style.bottom = "10%"
            controlPanel.style.left = "3%"

            dialog.style.transform = "rotate(0deg)"

            mapContainer.style.transform = "rotate(0deg)"

            screenOrientation = "landscape"

        } else { //portrait mode
            controlPanel.style.transform = "rotate(90deg)"
            controlPanel.style.setProperty("bottom", "initial")
            controlPanel.style.left = "10%"
            controlPanel.style.top = "3%"

            dialog.style.transform = "rotate(90deg)"

            mapContainer.style.transform = "rotate(90deg)"

            screenOrientation = "portrait"
        }
        setViewBox(currentViewBox.minX, currentViewBox.minY, currentViewBox.width, currentViewBox.height)
    })
}

//change viewbox dimensions based on window dimensions
function resizeWindow() {
    let ratio = window.innerWidth / window.innerHeight
  
    const newWidth = clamp(currentViewBox.height * ratio, 0, MAX_WIDTH)
    const newMinX = clamp((currentViewBox.minX + currentViewBox.width / 2) - newWidth / 2, 0, MAX_WIDTH - newWidth)
  
    currentViewBox.width = newWidth
    currentViewBox.minX = newMinX
  }