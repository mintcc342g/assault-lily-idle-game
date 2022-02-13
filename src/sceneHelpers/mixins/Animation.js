export const AnimMixin = superclass => class extends superclass {
  initCustomAnimation() {
    this.customAnim = {
      button: new Map([
        ['idle', 0],
        ['clicked', 1],
      ])
    };
  }

  clickAnim(sprite, isIdle) {
    if (isIdle) {
      sprite.setFrame(this.customAnim.button.get('idle'));
    } else {
      sprite.setFrame(this.customAnim.button.get('clicked'));
    }
  }

  endConversationAnim() {
    this.characters.forEach((character)=>{
      character.setIdleFrame('down');
    });
  }

  lookCharacter(characterID) {
    let target = this.getCharacterPosition(characterID);

    this.characters.forEach((other)=>{
      if (other.isVisible() && other.id != characterID) {
        let otherPos = this.getCharacterPosition(other.id);
        other.setIdleFrame(this.getDirection(target, otherPos));
      }
    });
  }

  lookCharacterByDist(characterID) {
    const target = this.gridEngine.getPosition(characterID);

    this.characters.forEach((other)=>{
      if (other.isVisible() && other.id != characterID) {
        let otherPos = this.gridEngine.getPosition(other.id);
        let dist = Phaser.Math.Distance.Between(target.x, target.y, otherPos.x, otherPos.y);

        if (dist <= 5) {
          other.setIdleFrame(this.getDirection(target, otherPos));
        }
      }
    });
  }

  lookOther(characterID) {
    const characterPos = this.getCharacterPosition(characterID);
    const character = this.characters.get(characterID);

    this.characters.forEach((other)=>{
      if (other.isVisible() && other.id != characterID) {
        let otherPos = this.getCharacterPosition(other.id);
        character.setIdleFrame(this.getDirection(otherPos, characterPos));
      }
    });
  }

  getDirection(target, position) {
    if (target.y > position.y) {
      return 'up'
    } else if (target.y < position.y) {
      return 'down'
    } else if (target.x > position.x) {
      return 'right'
    } else if (target.x < position.x) {
      return 'left'
    }
  }

  getCharacterPosition(characterID) {
    return this.gridEngine.getPosition(characterID)
  }

  moveCharacterTo(characterID, x, y) {
    this.gridEngine.moveTo(characterID, { x: x, y: y });
  }
}