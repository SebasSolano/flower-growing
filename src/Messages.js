const MESSAGES = [
  "¡Hola, mi amor!",
  "Hoy te mostraré algo muy especial que hice para ti.",
  "Y espero que para ti también.",
  "Para entender todo, debes conectarte cada día a las 12 p. m. hasta el 14 de febrero.",
  "Debes cultivar algo, algo muuuuy especial.",
  "Al inicio solo es una semilla, pero con el tiempo esta demostrará como el amor.",
  "Que el que te tengo crece y crece, no solo por estos días, sino siempre.",
  "¿Así que comenzamos?",
];

export class MessageManager {
  constructor() {
    this.currentIndex = 0;
    this.container = document.getElementById("message-container");
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (localStorage.getItem("hasPlanted")) {
      const flowerRoot = document.getElementById("flower-root");
      Array.from(flowerRoot.querySelectorAll(".plant-part")).forEach((part) => {
        part.style.display = "none";
      });
      flowerRoot.classList.remove("hidden");
      this.container.remove();
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
    }, 750);
  }
}
