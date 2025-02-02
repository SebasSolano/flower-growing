import { MessageManager } from "./Messages";

export class GrowthManager {
  constructor() {
    this.steps = [
      "stem",
      "leaf",
      "leaf",
      "leaf",
      "center",
      ...Array(8).fill("petal"),
    ];
    this.currentStep = parseInt(localStorage.getItem("growthStep") || 0);
    this.waterButton = this.createWaterButton();
    this.init();
  }

  init() {
    console.log(this.currentStep);
    if (this.currentStep >= 0) this.showWaterButton();
    this.updatePlant();
  }

  createWaterButton() {
    const btn = document.createElement("button");
    btn.id = "water-btn";
    btn.className = "water-button";
    btn.textContent = "💧";
    btn.onclick = () => this.waterPlant();
    return btn;
  }

  showWaterButton() {
    document.body.appendChild(this.waterButton);
    if (this.currentStep >= this.steps.length) this.waterButton.remove();
  }

  getPlantParts() {
    return {
      stem: document.querySelector(".stem"),
      leaves: Array.from(document.querySelectorAll(".leaf")),
      center: document.querySelector(".flower-center"),
      petals: Array.from(document.querySelectorAll(".petal")),
    };
  }

  updatePlant() {
    const parts = this.getPlantParts();

    // Mostrar partes según el paso actual
    if (this.currentStep >= 1) parts.stem.style.display = "block";
    if (this.currentStep >= 2)
      parts.leaves
        .slice(0, this.currentStep - 1)
        .forEach((l) => (l.style.display = "block"));
    if (this.currentStep >= 5) parts.center.style.display = "block";
    if (this.currentStep >= 6)
      parts.petals
        .slice(0, this.currentStep - 5)
        .forEach((p) => (p.style.display = "block"));
  }

  showHeartAnimation() {
    const heart = document.createElement("div");
    heart.className = "heart-animation";
    heart.innerHTML = "❤️";
    document.getElementById("flower-root").appendChild(heart);

    setTimeout(() => {
      heart.remove();
      this.showFinalMessages();
    }, 5000);
  }

  showFinalMessages() {
    const messageManager = new MessageManager();
    messageManager.checkLocalStorage = () => {};
    messageManager.showFinalSequence();
  }

  waterPlant() {
    if (this.currentStep >= this.steps.length) return;

    const waterEffect = document.createElement("div");
    waterEffect.className = "water-effect";
    document.body.appendChild(waterEffect);

    setTimeout(() => {
      waterEffect.remove();
      this.currentStep++;
      localStorage.setItem("growthStep", this.currentStep);
      this.updatePlant();

      if (this.currentStep >= this.steps.length) {
        this.waterButton.remove();
        this.showHeartAnimation();
      }
    }, 850);
  }
}
