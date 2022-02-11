export const AnimMixin = superclass => class extends superclass {
	clickAnim(sprite, isIdle) {
		if (isIdle) {
			sprite.setFrame(this.customAnim.button.get('idle'));
		} else {
			sprite.setFrame(this.customAnim.button.get('clicked'));
		}
	}

  lookCharacter(characterID) {
    let target = this.getCharacterPosition(characterID);

    this.characters.forEach((character)=>{
      let another = this.getCharacterPosition(character.id);

      if (another.y < target.y) {
        character.setIdleFrame('up');
      } else if (another.y > target.y) {
        character.setIdleFrame('down');
      } else if (another.x < target.x) {
        character.setIdleFrame('right');
      } else if (another.x > target.x) {
        character.setIdleFrame('left');
      }
    });
  }

  getCharacterPosition(characterID) {
    return this.gridEngine.getPosition(characterID)
  }

  moveCharacterTo(characterID, x, y) {
    this.gridEngine.moveTo(characterID, { x: x, y: y });
  }
}