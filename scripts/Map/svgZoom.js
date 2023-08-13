let mouseDown = false
let panOrigin = null

const MIN_SCALE = 1 / 10;

const MAX_WIDTH = 2700, MAX_HEIGHT = 1440, MIN_WIDTH = MAX_WIDTH * MIN_SCALE, MIN_HEIGHT = MAX_HEIGHT * MIN_SCALE

const defaultViewBox = {
  minX: 0,
  minY: 0,
  width: MAX_WIDTH,
  height: MAX_HEIGHT
}

const aspectRatio = defaultViewBox.height / defaultViewBox.width

let currentViewBox = {
  minX: 0,
  minY: 0,
  width: MAX_WIDTH,
  height: MAX_HEIGHT
}

function initZoom() {
  svg.contentDocument.addEventListener("wheel", zoom);
  svgTag.addEventListener("mousedown", function(mouseEvent) {
    mouseDown = true
    panOrigin = getPoint(mouseEvent)
  });
  svg.contentDocument.addEventListener("mouseup", function() { mouseDown = false });
  svg.contentDocument.addEventListener("mouseleave", function() { mouseDown = false });
  svg.contentDocument.addEventListener("mousemove", pan);

  zoomToFullScreen()

  svgTag.addEventListener("keydown", function() {
    console.log(parseInt(currentViewBox.minX) + "," + parseInt(currentViewBox.minY) + "," + parseInt(currentViewBox.width) + "," + parseInt(currentViewBox.height))
  })
}

function getPoint(event) {
    //convert screen coordinates to SVG coordinates
    let point = svgTag.createSVGPoint()
    point.x = event.clientX
    point.y = event.clientY
    point = point.matrixTransform(svgTag.getScreenCTM().inverse());
    return point
}

function pan(mouseEvent) {
  if(mouseDown) { //can only pan if mouse is down and being dragged
    mouseEvent.preventDefault() //stops a selection being made

    const point = getPoint(mouseEvent)

    const newMinX = clamp(currentViewBox.minX + (panOrigin.x - point.x), 0, MAX_WIDTH - currentViewBox.width)
    const newMinY = clamp(currentViewBox.minY + (panOrigin.y - point.y), 0, MAX_HEIGHT - currentViewBox.height)

    setViewBox({minX: newMinX, minY: newMinY, width: currentViewBox.width, height: currentViewBox.height})
  }
  
}

function zoom(wheelEvent) {
  //can't zoom in more if already fully zoomed
  if(wheelEvent.deltaY > 0 && currentViewBox.width == MIN_WIDTH && currentViewBox.height == MIN_HEIGHT) return

  const point = getPoint(wheelEvent)
  const factor = 0.9993 ** wheelEvent.deltaY

  const newWidth = clamp(currentViewBox.width * factor, MIN_WIDTH, MAX_WIDTH)
  const newHeight = clamp(currentViewBox.height * factor, MIN_HEIGHT, MAX_HEIGHT)

  const newMinX = clamp(point.x - ((point.x - currentViewBox.minX) * factor), 0, MAX_WIDTH - newWidth)
  const newMinY = clamp(point.y - ((point.y - currentViewBox.minY) * factor), 0, MAX_HEIGHT - newHeight)

  setViewBox({minX: newMinX, minY: newMinY, width: newWidth, height: newHeight})
}

//fits val inside min and max
function clamp(val, min, max) {
  if(val < min) return min;
  if(val > max) return max;
  return val;
}

function zoomToFullScreen() {
  animateSetViewBox(defaultViewBox)
}

function setViewBox(viewBox) {
  currentViewBox = viewBox
  svgTag.setAttribute("viewBox", viewBoxString(viewBox))
}

function animateSetViewBox(viewBox) {
  currentViewBox = viewBox
  gsap.to(svgTag, 0.75, { 
    attr: { viewBox: viewBoxString(viewBox)
  }, 
  ease:"power2.inOut"})
}

function viewBoxString(viewBox) {
  return viewBox.minX.toString() + " " + viewBox.minY.toString() + " " + viewBox.width.toString() + " " + viewBox.height.toString()
}