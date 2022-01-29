import Parser from 'phaser';

import CharacterSlot from '../components/CharacterSlot.js';
import { createTextBox } from '../components/TextBox.js';
import * as sceneHelpers from '../utils/sceneHelpers.js';

import * as configs from '../consts/configs.js';
import * as css from '../consts/css.js';
import * as gameData from '../consts/gameData.js';
import * as imgKeys from '../consts/imgKeys.js';

export default class CharacterSelectionScene extends Phaser.Scene {
  constructor() {
    super(configs.SCENE_CHARACTER_SELECTION);
    this.name = configs.SCENE_CHARACTER_SELECTION;
    this.bgImgKeys = gameData.SELECTION_BACKGROUND_KEYS;
    this.slotImgKey = imgKeys.CHARACTER_SLOT_KEY;
    this.prevImgKey = imgKeys.PREV_BUTTON_KEY;
    this.nextImgKey = imgKeys.NEXT_BUTTON_KEY;
    this.playImgKey = imgKeys.PLAY_BUTTON_KEY;
    this.backImgKey = imgKeys.BACK_BUTTON_KEY;
    this.nextPageKey = imgKeys.NEXT_PAGE_KEY;
    this.buttonAnim = configs.DEFAULT_BUTTON_ANIM;
    this.position = {
      character: { x: 120, y:130 },
      slot: { x: 110, y: 124 },
      textBox: { x: 234, y: 105, w: 228, h: 100 },
      action: { x: 475, y: 170 },
      prev: { x: 27, y: 185 },
      next: { x: 579, y: 185 },
      back: { x: 234, y:259 },
      play: { x: 400, y:259 }
    }
    this.lang = '';
    this.currentCharacter = { /* sprite */ };
		this.currentTextBox = { /* rexUI textBox */ };
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
    // TODO: blick
    this.add.sprite(this.position.slot.x, this.position.slot.y, this.slotImgKey)
      .setDepth(configs.LAYER_ABOVE_BACKGROUND)
      .setOrigin(0, 0);

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
    this.currentTextBox = this.#createTextBox();

    this.#showCharacter(true);
    this.#showBackground(true);
		setTimeout(()=>{ this.#playTextBox(); }, 1000, this);
	}

  #createTextBox() {
    const config = {
      x: this.position.textBox.x,
      y: this.position.textBox.y,
      style: {
        fixedWidth: this.position.textBox.w,
        fixedHeight: this.position.textBox.h,
        color: css.DEFAULT_TEXT_COLOR,
        fontSize: '18px',
        maxLines: 4,
        lineSpacing: css.DEFAULT_LINE_SPACING,
        wordWrap: {
          width: this.position.textBox.w,
          useAdvancedWrap: true
        }        
      },
      padding: {
        y: 3
      }
    }

    const action = this.add.image(this.position.action.x, this.position.action.y, this.nextPageKey)
      .setDepth(configs.LAYER_POPUP_OBJECT)
      .setTint(css.DEFAULT_MENU_COLOR_RGB)
      .setOrigin(0, 0)
      .setVisible(false);

    const textbox = createTextBox(this, config, action).setVisible(false);
    
    textbox
      .on('pointerdown', function () {
        var icon = this.getElement('action').setVisible(false);
        this.resetChildVisibleState(icon);
        if (this.isTyping) {
          this.stop(true);
        } else {
          this.typeNextPage();
        }
      }, textbox);
    
    return textbox
  }

	#initArrowButtons() {
		// TODO: blink button
		this.add.sprite(this.position.prev.x, this.position.prev.y, this.prevImgKey)
      .setDepth(configs.LAYER_ABOVE_BACKGROUND)
      .setInteractive()
      .setOrigin(0, 0)
			.on('pointerdown',()=>{
				this.#showCharacter(false);
        this.#showBackground(false);
				this.currentTextBox.destroy();

				this.currentCharacter = this.currentCharacter.prev;
        this.currentTextBox = this.#createTextBox();
        this.#showBackground(true);
				this.#showCharacter(true);
				this.#playTextBox();
			}, this);

		this.add.sprite(this.position.next.x, this.position.next.y, this.nextImgKey)
      .setDepth(configs.LAYER_ABOVE_BACKGROUND)
      .setInteractive()
      .setOrigin(0, 0)
			.on('pointerdown',()=>{
				this.#showCharacter(false);
        this.#showBackground(false);
				this.currentTextBox.destroy();

				this.currentCharacter = this.currentCharacter.next;
				this.currentTextBox = this.#createTextBox();
        this.#showBackground(true);
        this.#showCharacter(true);
        this.#playTextBox();
			}, this);
	}

	#initBackButton() {
		const button = this.add.sprite(this.position.back.x, this.position.back.y, this.backImgKey)
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
		const button = this.add.sprite(this.position.play.x, this.position.play.y, this.playImgKey)
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