// Set up worker (source) canvas
const sourceCanvas = document.querySelector("#source-canvas");
const offscreen = sourceCanvas.transferControlToOffscreen();
const worker = new Worker("worker.js");
worker.postMessage({ canvas: offscreen }, [offscreen]);

// Set up destination canvas
const destinationCanvas = document.querySelector("#destination-canvas");
const destinationContext = destinationCanvas.getContext("2d");

// Every frame, draw from the source canvas to the destination canvas
const animationTick = () => {
  destinationContext.drawImage(sourceCanvas, 0, 0);
  requestAnimationFrame(animationTick);
};
animationTick();
