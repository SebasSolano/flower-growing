import { GrowthManager } from "./GrowthManager";

const MESSAGES = [
  "¡Hola, mi amor!",
  "Hoy te mostraré algo muy especial que hice para ti.",
  "Y espero que para ti también.",
  "Para entender todo, debes conectarte cada día hasta el 14 de febrero.",
  "Debes cultivar algo, algo muuuuy especial.",
  "Al inicio solo es una semilla, pero con el tiempo esta demostrará como el amor.",
  "Que el que te tengo crece y crece, no solo por estos días, sino siempre.",
  "¿Así que comenzamos?",
];

const FINAL_MESSAGES = [
  "¡Nuestro amor ha florecido completamente!",
  "Cada pétalo representa un momento especial juntos",
  "El corazón en el centro simboliza todo lo que siento por ti",
  "Gracias por ser mi luz y mi razón para sonreír",
  "No te pido ser mi San Valentín porque sé que lo serás siempre!",
  "Te amo mucho mi princesita sofia💖",
  "Mi manca",
  "Mi rara",
  "Perooo",
  "Lo mas importante...",
  "Mi mundo. <3",
];

export class MessageManager {
  constructor() {
    this.currentIndex = 0;
    this.container = document.getElementById("message-container");
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (localStorage.getItem("finalStage")) {
      document.getElementById("flower-root").classList.remove("hidden");
      if (this.container) this.container.remove();

      return;
    }

    if (localStorage.getItem("hasPlanted")) {
      const flowerRoot = document.getElementById("flower-root");
      if (flowerRoot) {
        Array.from(flowerRoot.querySelectorAll(".plant-part")).forEach(
          (part) => {
            part.style.display = "none";
          }
        );
        flowerRoot.classList.remove("hidden");
      }
      if (this.container) this.container.remove();
    } else {
      this.showNextMessage();
    }
  }

  showNextMessage() {
    this.container.innerHTML = "";

    if (this.currentIndex >= MESSAGES.length) {
      this.showFinalButton();
      return;
    }

    const messageDiv = document.createElement("div");
    messageDiv.className = "message-card";
    messageDiv.textContent = MESSAGES[this.currentIndex];
    messageDiv.onclick = () => this.handleNextClick(messageDiv);

    const nextButton = document.createElement("button");
    nextButton.className = "next-button";
    nextButton.textContent = "Siguiente";
    nextButton.onclick = () => this.handleNextClick(messageDiv);
    this.container.appendChild(messageDiv);
    this.container.appendChild(nextButton);

    this.currentIndex++;
  }

  showNextMessageFinal() {
    this.container.innerHTML = "";

    if (this.currentIndex >= FINAL_MESSAGES.length) {
      if (this.container) this.container.remove();
      setTimeout(() => location.reload(), 800);
      return;
    }

    const messageDiv = document.createElement("div");
    messageDiv.className = "message-card";
    messageDiv.textContent = FINAL_MESSAGES[this.currentIndex];
    messageDiv.onclick = () => this.handleNextClickFinal(messageDiv);

    const nextButton = document.createElement("button");
    nextButton.className = "next-button";
    nextButton.textContent = "Siguiente";
    nextButton.onclick = () => this.handleNextClickFinal(messageDiv);
    this.container.appendChild(messageDiv);
    this.container.appendChild(nextButton);

    this.currentIndex++;
  }

  showFinalSequence() {
    this.currentIndex = 0;

    // Crear contenedor si no existe
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "message-container";
      document.body.appendChild(this.container);
    }

    document.getElementById("flower-root").classList.add("hidden");
    this.container.style.display = "block";
    this.showNextMessageFinal();
  }

  handleNextClickFinal(messageDiv) {
    messageDiv.classList.add("message-exit");
    setTimeout(() => this.showNextMessageFinal(), 800);
  }

  handleNextClick(messageDiv) {
    messageDiv.classList.add("message-exit");
    setTimeout(() => this.showNextMessage(), 800);
  }

  showFinalButton() {
    this.container.innerHTML = `
        <div>
            <button id="cultivar-btn" class="cultivate-button">🌱</button>
        </div>
    `;
    document.getElementById("cultivar-btn").onclick = () => this.handlePlant();
    const flowerRoot = document.getElementById("flower-root");
    Array.from(flowerRoot.querySelectorAll(".plant-part")).forEach((part) => {
      part.style.display = "none";
    });
    flowerRoot.classList.remove("hidden");
  }
  // Seed animation
  handlePlant() {
    const seed = document.createElement("div");
    seed.className = "seed";
    document.body.appendChild(seed);

    setTimeout(() => {
      seed.remove();
      localStorage.setItem("hasPlanted", "true");
      this.container.remove();
      new GrowthManager();
    }, 750);
  }
}
