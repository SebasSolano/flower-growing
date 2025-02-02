export class Flower {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.createFlower();
  }

  createFlower() {
    const flower = document.createElement("div");
    flower.className = "flower-container";


    const pot = this.createPart("pot");
    flower.appendChild(pot);


    const plantParts = [
        this.createPart("stem", "stem"),
        this.createPart("flower-center", "center"),
        ...this.createPetals(),
        ...this.createLeaves(),
    ];


    plantParts.forEach(part => part.classList.add("plant-part"));

    plantParts.forEach((part) => flower.appendChild(part));
    this.container.appendChild(flower);
}

  createPart(className, type) {
    const part = document.createElement("div");
    part.className = `flower-part ${className}`;

    switch (type) {
      case "stem":
        part.style.height = "300px";
        break;
      case "center":
        part.style.top = "-40px";
        break;
    }

    return part;
  }

  createPetals() {
    const petals = [];
    const angles = Array.from({ length: 8 }, (_, i) => i * 45);

    angles.forEach((angle) => {
      const petal = this.createPart("petal");
      petal.style.setProperty("--base-angle", `${angle}deg`);
      petal.style.transform = `rotate(${angle}deg) translateY(110px)`;
      petals.push(petal);
    });

    return petals;
  }

  createLeaves() {
    return [
      this.createLeaf(-45, 90, -30),
      this.createLeaf(5, 160, 30),
      this.createLeaf(-45, 220, -20),
    ];
  }

  createLeaf(left, top, rotate) {
    const leaf = this.createPart("leaf");
    leaf.style.left = `${left}px`;
    leaf.style.top = `${top}px`;
    leaf.style.transform = `rotate(${rotate}deg) translateY(5px)`;
    return leaf;
  }
}
