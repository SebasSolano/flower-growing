import { Flower } from "./Flower";
import { GrowthManager } from "./GrowthManager.js";
import { MessageManager } from "./Messages.js";

new Flower("flower-root");
document.getElementById("flower-root").classList.add("hidden");

new MessageManager();

const container = document.getElementById("fireflies-container");

// Firefly configuration
const FIREFLY_CONFIG = {
  // Maximum number of fireflies visible
  count: 50,
  // Minimum and maximum size in px
  sizeRange: [2, 5],
  // Animation duration in seconds
  durationRange: [1, 3],
  // Appearance interval in ms
  spawnInterval: [100, 500],
};

function createFirefly() {
  const firefly = document.createElement("div");
  firefly.className = "firefly";

  // Random position
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  firefly.style.left = `${x}%`;
  firefly.style.top = `${y}%`;

  // Random size
  const size = randomInRange(...FIREFLY_CONFIG.sizeRange);
  firefly.style.width = `${size}px`;
  firefly.style.height = `${size}px`;

  // Random animation duration
  const duration = randomInRange(...FIREFLY_CONFIG.durationRange);
  firefly.style.animationDuration = `${duration}s`;

  container.appendChild(firefly);

  // Delete element after animation
  firefly.addEventListener("animationend", () => {
    firefly.remove();
  });
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Firefly generation control
function spawnFireflies() {
  const interval = randomInRange(...FIREFLY_CONFIG.spawnInterval);

  const currentFireflies = container.childElementCount;
  if (currentFireflies < FIREFLY_CONFIG.count) {
    createFirefly();
  }
  setTimeout(spawnFireflies, interval);
}

// Initiate firefly generation
spawnFireflies();

// Optimization: Clean non-visible elements
setInterval(() => {
  const fireflies = document.getElementsByClassName("firefly");
  const toRemove = [];

  for (let firefly of fireflies) {
    const opacity = parseFloat(getComputedStyle(firefly).opacity);
    if (opacity < 0.1) {
      toRemove.push(firefly);
    }
  }
}, 5000);

if (localStorage.getItem("hasPlanted")) {
  new GrowthManager()
}
