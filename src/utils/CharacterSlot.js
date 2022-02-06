import * as utils from './utils.js';

class Character {
  constructor(data) {
    this.prev = {};
    this.next = {};
    this.data = data;
  }
}

export default class CharacterSlot {
  constructor() {
    this.first = {};
    this.last = {};
  }

  addCharacter(data) {
    const character = new Character(data);

    if (utils.isEmptyObject(this.first)) {
      this.first = character;
    } else {
      character.prev = this.last;
      this.last.next = character;

    }
    this.last = character;

    this.first.prev = character;
    character.next = this.first;
  }

  firstCharacter() {
    return this.first;
  }
}