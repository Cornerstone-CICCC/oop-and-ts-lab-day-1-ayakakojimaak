class Animal {
  static #id = 0;
  static #remainingAnimalsArray = [];
  static remainingAnimals = 0;
  #animalName;
  #species;
  #energy;

  constructor(animalName, species) {
    Animal.setRemainingAnimals(animalName, species, 0);
    this.#animalName = animalName;
    this.#species = species;
    this.#energy = 0;
    this.id = Animal.id;
  }

  static setRemainingAnimals(animalName, species, energy) {
    Animal.#id++;
    Animal.remainingAnimals++;
    Animal.#remainingAnimalsArray.push({ id: this.#id, name: animalName, species: species, energy: energy });
  }

  updateRemainingAnimals(id, animalName, species, energy) {
    const array = Animal.#remainingAnimalsArray;
    const index = array.findIndex((item) => item.id === id);
    if (energy <= 0) {
      array.splice(index, 1);
    } else {
      array[index] = { ...array[index], ...{ name: animalName, species: species, energy: energy } };
    }
    Animal.remainingAnimals = Animal.#remainingAnimalsArray.length;
  }

  attack(target, value) {
    if (this.energy < 0) {
      console.log(`${this.animalName} is out of energy and cannot attack!`);
      return;
    }
    if (target.energy < 0) {
      console.log(`${target.animalName} is already out of energy!`);
      return;
    }
    target.energy -= value;
    this.energy -= value;
    console.log(
      `${this.#animalName} attack ${target.animalName}!\n${this.#animalName}'s energy: ${this.#energy}\n${
        target.animalName
      }'s energy: ${target.energy}`
    );
    if (target.energy <= 0) {
      console.log(`${this.animalName} wins! ${target.animalName} is out of energy!`);
    }
    if (this.#energy <= 0) {
      console.log(`${target.animalName} wins! ${this.animalName} is out of energy!`);
    }
  }

  eat(value) {
    this.energy += value;
    console.log(`${this.#animalName} eats and gains energy!\n${this.#animalName}'s energy: ${this.#energy}`);
  }

  get animalName() {
    return this.#animalName;
  }
  get species() {
    return this.#species;
  }
  get energy() {
    return this.#energy;
  }

  set animalName(newName) {
    this.#animalName = newName;
    updateRemainingAnimals;
    this.updateRemainingAnimals(this.id, newName, this.species, this.energy);
  }
  set species(newSpecies) {
    this.#species = newSpecies;
    this.updateRemainingAnimals(this.id, this.animalName, newSpecies, this.energy);
  }
  set energy(newEnergy) {
    this.#energy = newEnergy;
    this.updateRemainingAnimals(this.id, this.animalName, this.species, newEnergy);
  }
}

class Bird extends Animal {
  #canFly;
  constructor(name, species, canFly) {
    super(name, species);
    this.#canFly = canFly;
    this.energy = 100;
  }
  get canFly() {
    return this.#canFly;
  }
  set canFly(value) {
    this.#canFly = value;
  }
  eat() {
    super.eat(10);
  }
  attack(target) {
    super.attack(target, 20);
  }
}

class Mammal extends Animal {
  #furColor;
  constructor(name, species, furColor) {
    super(name, species);
    this.#furColor = furColor;
    this.energy = 200;
  }
  get furColor() {
    return this.#furColor;
  }
  set furColor(value) {
    this.#furColor = value;
  }
  eat() {
    super.eat(20);
  }
  attack(target) {
    super.attack(target, 50);
  }
}

class Reptile extends Animal {
  #coldBlooded;
  constructor(name, species, coldBlooded) {
    super(name, species);
    this.#coldBlooded = coldBlooded;
    this.energy = 100;
  }
  get coldBlooded() {
    return this.#coldBlooded;
  }
  set coldBlooded(value) {
    this.#coldBlooded = value;
  }
  eat() {
    super.eat(15);
  }
  attack(target) {
    super.attack(target, 30);
  }
}

// DRIVER CODE: Create instances of the subclasses and use their properties and methods. You can modify this to add more attacks and eating actions.

const eagle = new Bird("Eagle", "Bird of Prey", true);
console.log(`Name: ${eagle.animalName}, Species: ${eagle.species}, Can Fly: ${eagle.canFly}`);

const lion = new Mammal("Lion", "Big Cat", "Golden");
console.log(`Name: ${lion.animalName}, Species: ${lion.species}, Fur Color: ${lion.furColor}`);

const snake = new Reptile("Snake", "Serpent", true);
console.log(`Name: ${snake.animalName}, Species: ${snake.species}, Cold-Blooded: ${snake.coldBlooded}`);

// Example attack
console.log("\n--- Attacks ---");
eagle.attack(lion);
lion.attack(snake);

// Display the remaining number of animals with energy
console.log(`Remaining animals with energy: ${Animal.remainingAnimals}`);

// // Example eating
console.log("\n--- Eating ---");
eagle.eat();
lion.eat();
snake.eat();

// Additional tests: Attack validations
console.log("\n--- Attack Validations ---");
for (let i = 0; i < 5; i++) {
  eagle.attack(snake); // Repeatedly attack until energy is depleted
}
console.log(`${eagle.animalName} Energy: ${eagle.energy}`);
console.log(`${snake.animalName} Energy: ${snake.energy}`);
console.log(`Remaining animals with energy: ${Animal.remainingAnimals}`);
