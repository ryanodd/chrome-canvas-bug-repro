let fillR = 255;
let fillG = 0;
let fillB = 0;

// Modifies fillR, fillG, or fillB to produce the next color in the looping color sequence.
const incrementFillColor = () => {
  if (fillR === 255) {
    if (fillB > 0) {
      fillB -= 5;
      return;
    }
    if (fillG < 255) {
      fillG += 5;
      return;
    }
    fillR -= 5;
    return;
  }
  if (fillG === 255) {
    if (fillR > 0) {
      fillR -= 5;
      return;
    }
    if (fillB < 255) {
      fillB += 5;
      return;
    }
    fillG -= 5;
    return;
  }
  if (fillB === 255) {
    if (fillG > 0) {
      fillG -= 5;
      return;
    }
    if (fillR < 255) {
      fillR += 5;
      return;
    }
    fillB -= 5;
    return;
  }
};

// reference to the offscreen source canvas, to be received from the main thread
offscreenCanvasContext = null;

// Every frame, draw a new color in the source canvas
const animationTick = () => {
  incrementFillColor();
  offscreenCanvasContext.fillStyle = `rgba(${fillR},${fillG},${fillB})`;
  offscreenCanvasContext.fillRect(0, 0, 300, 150);
  requestAnimationFrame(animationTick);
};

// Receives message from the main thread containing reference to the source canvas
// Stores offscreenCanvasContext then starts the animation loop, drawing to the source canvas every frame
onmessage = function (e) {
  const offscreenCanvas = e.data.canvas;
  offscreenCanvasContext = offscreenCanvas.getContext("2d");
  animationTick();
};
