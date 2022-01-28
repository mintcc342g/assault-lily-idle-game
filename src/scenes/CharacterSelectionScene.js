import Parser from 'phaser';

import CharacterSlot from '../components/CharacterSlot.js';
import { createTextBox } from '../components/TextBox.js';
import * as sceneHelpers from '../utils/sceneHelpers.js';

import * as configs from '../consts/configs.js';
import * as gameData from '../consts/gameData.js';
import * as imgKeys from '../consts/imgKeys.js';

export default class CharacterSelectionScene extends Phaser.Scene {
  constructor() {
    super(configs.SCENE_CHARACTER_SELECTION);
    this.name = configs.SCENE_CHARACTER_SELECTION;
    this.bgImgKeys = gameData.SELECTION_BACKGROUND_KEYS;
    this.prevKey = imgKeys.PREV_BUTTON_KEY;
    this.nextKey = imgKeys.NEXT_BUTTON_KEY;
    this.playKey = imgKeys.PLAY_BUTTON_KEY;
    this.backKey = imgKeys.BACK_BUTTON_KEY;
    this.buttonAnim = configs.DEFAULT_BUTTON_ANIM;
    this.position = {
      character: { x: 126, y:532 },
      textBox: { x: 220, y: 504, w: 250, h: 110 },
      prev: { x: 21, y: 585 },
      next: { x: 587, y: 585 },
      back: { x: 240, y:658 },
      play: { x: 406, y:658 }
    }
    this.lang = '';
    this.currentCharacter = {};
		this.currentTextBox = {};
    this.backgrounds = new Map();
  }

	init(data) {
    if (!data.hasOwnProperty('lang')) {
      this.lang = configs.LANG_KR  // default lang
    } else {
      this.lang = data.lang;
    }
	}

	create() {
		this.cameras.main.fadeIn(1000, 0, 0, 0)

		this.#initBackground();
		this.#initCharacterSlot();
		this.#initArrowButtons();
		this.#initPlayButton();
    this.#initBackButton();
	}

	#initBackground() {
    for (let [key, val] of this.bgImgKeys) {
      this.backgrounds.set(key,
        this.add.image(0, 0, val)
        .setDepth(configs.LAYER_BACKGROUND)
        .setVisible(false)
        .setOrigin(0, 0)
      )
    }
	}

	#initCharacterSlot() {
		const characterSlot = new CharacterSlot();
		gameData.CHARACTER_DATA.forEach((val, key)=>{
      let sprite = this.add.sprite(this.position.character.x, this.position.character.y, key)
        .setOrigin(0, 0)
        .setDepth(configs.LAYER_ABOVE_BACKGROUND)
        .setVisible(false);

      characterSlot.addCharacter({ sprite: sprite, info: val });
			sceneHelpers.createCharacterAnimation(this, key, configs.CHARACTER_ANIM_KEYS, configs.DEFAULT_FRAME_RATE);
    }, this, characterSlot);

		this.currentCharacter = characterSlot.firstCharacter();
    this.currentTextBox = createTextBox(
      this,
      this.position.textBox.x,
      this.position.textBox.y,
      { fixedWidth: this.position.textBox.w, fixedHeight: this.position.textBox.h }
    ).setVisible(false); // TODO: change box design

    this.#showCharacter(true);
    this.#showBackground(true);
		setTimeout(()=>{ this.#playTextBox(); }, 1000, this);
	}

	#initArrowButtons() {
		// TODO: blink button
		this.add.sprite(this.position.prev.x, this.position.prev.y, this.prevKey)
      .setDepth(configs.LAYER_ABOVE_BACKGROUND)
      .setInteractive()
      .setOrigin(0, 0)
			.on('pointerdown',()=>{
				this.#showCharacter(false);
        this.#showBackground(false);
				this.currentTextBox.destroy();

				this.currentCharacter = this.currentCharacter.prev;
        this.currentTextBox = createTextBox(
          this,
          this.position.textBox.x,
          this.position.textBox.y,
          { fixedWidth: this.position.textBox.w, fixedHeight: this.position.textBox.h }
        ); // TODO: change box design
        this.#showBackground(true);
				this.#showCharacter(true);
				this.#playTextBox();
			}, this);

		this.add.sprite(this.position.next.x, this.position.next.y, this.nextKey)
      .setDepth(configs.LAYER_ABOVE_BACKGROUND)
      .setInteractive()
      .setOrigin(0, 0)
			.on('pointerdown',()=>{
				this.#showCharacter(false);
        this.#showBackground(false);
				this.currentTextBox.destroy();

				this.currentCharacter = this.currentCharacter.next;
				this.currentTextBox = createTextBox(
          this,
          this.position.textBox.x,
          this.position.textBox.y,
          { fixedWidth: this.position.textBox.w, fixedHeight: this.position.textBox.h }
        );
        this.#showBackground(true);
        this.#showCharacter(true);
        this.#playTextBox();
			}, this);
	}

	#initBackButton() {
		const button = this.add.sprite(this.position.back.x, this.position.back.y, this.backKey)
			.setDepth(configs.LAYER_ABOVE_BACKGROUND)
			.setInteractive()
			.setOrigin(0, 0);
		
		button
			.once('pointerdown', ()=>{
				button.setFrame(this.buttonAnim.get('clicked'));
			}, this, button)
      .once('pointerup', ()=>{
				button.setFrame(this.buttonAnim.get('idle'));
        this.#goToNext(configs.SCENE_MAIN);
      }, this, button);
	}

	#initPlayButton() {
		const button = this.add.sprite(this.position.play.x, this.position.play.y, this.playKey)
			.setDepth(configs.LAYER_ABOVE_BACKGROUND)
			.setInteractive()
			.setOrigin(0, 0);
		
		button
			.once('pointerdown', ()=>{
				button.setFrame(this.buttonAnim.get('clicked'));
			}, this, button)
      .once('pointerup', ()=>{
        button.disableInteractive();
				button.setFrame(this.buttonAnim.get('idle'));
        this.#goToNext(
          this.currentCharacter.data.info.get('scene'),
          { lang: this.lang, mainCharacter: this.currentCharacter.data.info }
        );
      }, this, button);
	}

  #showCharacter(visible) {
    this.currentCharacter.data.sprite.setVisible(visible);
  }

  #showBackground(visible) {
    this.backgrounds.get(this.currentCharacter.data.info.get('academy')).setVisible(visible);
  }

  #playTextBox() {
    this.currentTextBox
				.setVisible(true)
				.start(this.currentCharacter.data.info.get('intro').get(this.lang), 50)
  }

  #goToNext(nextSceneName, data) {
    this.cameras.main.fadeOut(1000, 0, 0, 0)
    this.cameras.main.once('camerafadeoutcomplete', (cam, effect) => {					
      this.time.delayedCall(1000, () => {
        this.scene.start(nextSceneName, data);
      });
    });
  }  
}