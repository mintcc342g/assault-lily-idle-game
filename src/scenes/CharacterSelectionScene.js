import Parser from 'phaser';
import CharacterSlot from '../components/CharacterSlot.js';
import { createTextBox } from '../components/TextBox.js';
import * as consts from '../variables/constants.js';
import * as sceneHelpers from '../utils/sceneHelpers.js';

export default class CharacterSelectionScene extends Phaser.Scene {
  constructor() {
    super(consts.SCENE_CHARACTER_SELECTION);
    this.name = consts.SCENE_CHARACTER_SELECTION;
		this.lang = consts.LANG_KR; // default lang
		this.backgroundImgKey = consts.SELECTION_BACKGROUND;
		this.prevKey = consts.PREV_BUTTON;
		this.nextKey = consts.NEXT_BUTTON;
		this.currentCharacter = {};
		this.currentTextBox = {};
		this.playKey = consts.PLAY_BUTTON;
		this.defaultButtonFrame = new Map([
      ['idle', 0],
      ['clicked', 1],
    ]);
  }

	init(data) {
    this.lang = data.lang;
	}

	create() {
		this.cameras.main.fadeIn(1000, 0, 0, 0)

		this.#initBackground();
		this.#initCharacterSlot();
		this.#initArrowButtons();
		this.#initPlayButton();
	}

	#initBackground() {
		this.add.image(0, 0, this.backgroundImgKey)
    .setDepth(consts.LAYER_BACKGROUND)
    .setOrigin(0, 0);
	}

	#initCharacterSlot() {
		const characterSlot = new CharacterSlot();

		consts.CHARACTER_INFO.forEach((val, key)=>{
      let sprite = this.add.sprite(284, 98, key).setOrigin(0, 0).setDepth(consts.LAYER_ABOVE_BACKGROUND).setVisible(false);
			characterSlot.addCharacter({ sprite: sprite, info: val });
			sceneHelpers.createCharacterAnimation(this, key, consts.CHARACTER_ANIM_KEYS, 6, -1);
    }, this, characterSlot);

		this.currentCharacter = characterSlot.firstCharacter();
		this.currentCharacter.data.sprite.setVisible(true);
		this.currentTextBox = createTextBox(this, 40, 300, consts.BOX_CONFIG).setVisible(false);

		setTimeout(()=>{
			this.currentTextBox
				.setVisible(true)
				.start(this.currentCharacter.data.info.get('intro').get(this.lang), 50); // TODO: change box design
		}, 1000, this)
	}

	#initArrowButtons() {
		// TODO: blink button
		this.add.sprite(221, 129, this.prevKey)
      .setDepth(consts.LAYER_ABOVE_BACKGROUND)
      .setInteractive()
      .setOrigin(0, 0)
			.on('pointerdown',()=>{
				this.currentCharacter.data.sprite.setVisible(false);
				this.currentTextBox.destroy();

				this.currentCharacter = this.currentCharacter.prev;
				this.currentCharacter.data.sprite.setVisible(true);
				this.currentTextBox = createTextBox(this, 40, 300, consts.BOX_CONFIG)
					.start(this.currentCharacter.data.info.get('intro').get(this.lang), 50); // TODO: change box design
			}, this);

		this.add.sprite(395, 129, this.nextKey)
      .setDepth(consts.LAYER_ABOVE_BACKGROUND)
      .setInteractive()
      .setOrigin(0, 0)
			.on('pointerdown',()=>{
				this.currentCharacter.data.sprite.setVisible(false);
				this.currentTextBox.destroy();

				this.currentCharacter = this.currentCharacter.next;
				this.currentCharacter.data.sprite.setVisible(true);
				this.currentTextBox = createTextBox(this, 40, 300, consts.BOX_CONFIG)
					.start(this.currentCharacter.data.info.get('intro').get(this.lang), 50); // TODO: change box design
			}, this);
	}

	#initPlayButton() {
		const button = this.add.sprite(120, 678, this.playKey)
			.setDepth(consts.LAYER_ABOVE_BACKGROUND)
			.setInteractive()
			.setOrigin(0, 0);
		
		button
			.once('pointerdown', ()=>{
				button.setFrame(this.defaultButtonFrame.get('clicked'));
			}, this, button)
      .once('pointerup', ()=>{
				button.setFrame(this.defaultButtonFrame.get('idle'));

				this.cameras.main.fadeOut(1000, 0, 0, 0)
				this.cameras.main.once('camerafadeoutcomplete', (cam, effect) => {					
					this.time.delayedCall(1000, () => {
						this.scene.start(this.currentCharacter.data.info.get('scene'), { lang: this.lang });
					});
				});
			}, this, button);
	}
}