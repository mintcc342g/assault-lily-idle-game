export const AnimMixin = superclass => class extends superclass {
	clickAnim(sprite, isIdle) {
		if (isIdle) {
			sprite.setFrame(this.customAnim.button.get('idle'));
		} else {
			sprite.setFrame(this.customAnim.button.get('clicked'));
		}
	}

	isMainCharacterPlaying() {
		return this.characters.get(this.mainCharacter.get('id')).anims.isPlaying
	}
}