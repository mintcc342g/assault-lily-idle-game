import Parser from 'phaser';

import CharacterSlot from '../components/CharacterSlot.js';
import { createTextBox } from '../components/TextBox.js';
import * as sceneHelpers from '../utils/sceneHelpers.js';

import * as configs from '../consts/configs.js';
import * as css from '../consts/css.js';
var gameData = require('../consts/gameData.js');
import * as imgKeys from '../consts/imgKeys.js';

export default class CharacterSelectionScene extends Phaser.Scene {
  constructor() {
    super(configs.SCENE_CHARACTER_SELECTION);
    this.name = configs.SCENE_CHARACTER_SELECTION;
    this.buttonFrame = configs.DEFAULT_BUTTON_ANIM;
    this.keys = {
      background: gameData.SELECTION_BACKGROUND_KEYS,
      slot: imgKeys.CHARACTER_SLOT_KEY,
      prevArrow: imgKeys.PREV_BUTTON_KEY,
      nextArrow: imgKeys.NEXT_BUTTON_KEY,
      play: imgKeys.PLAY_BUTTON_KEY,
      back: imgKeys.BACK_BUTTON_KEY,
      nextPage: imgKeys.NEXT_PAGE_KEY
    };
    this.position = {
      character: { x: 120, y:130 },
      slot: { x: 110, y: 124 },
      textBox: { x: 234, y: 105, w: 228, h: 100 },
      action: { x: 475, y: 170 },
      arrows: { x: 27, y: 185, plus: 552 },
      back: { x: 234, y:259 },
      play: { x: 400, y:259 }
    }
    this.lang = '';
    this.currentCharacter = { /* sprite and info */ };
		this.currentTextBox = { /* rexUI textBox */ };
    this.backgrounds = new Map();
    this.uiGroup = [];
  }

	init(data) {
    if (!data.hasOwnProperty('lang')) {
      this.lang = configs.LANG_KR  // default lang
    } else {
      this.lang = data.lang;
    }
	}

	create() {
		this.cameras.main.fadeIn(1000,
      css.DEFAULT_BACKGROUND_COLOR_RED,
      css.DEFAULT_BACKGROUND_COLOR_GREEN,
      css.DEFAULT_BACKGROUND_COLOR_BLUE
    );

		this.#initBackground();
		this.#initCharacterSlot();
		this.#initArrowButtons();
		this.#initPlayButton();
    this.#initBackButton();
	}

	#initBackground() {
    for (let [key, val] of this.keys.background) {
      this.backgrounds.set(key,
        this.add.image(0, 0, val)
        .setDepth(configs.LAYER_BACKGROUND)
        .setVisible(false)
        .setOrigin(0, 0)
      )
    }
	}

	#initCharacterSlot() {
    this.add.sprite(this.position.slot.x, this.position.slot.y, this.keys.slot)
      .setDepth(configs.LAYER_ABOVE_BACKGROUND)
      .setOrigin(0, 0);

		const characterSlot = new CharacterSlot();
		gameData.CHARACTER_DATA.forEach((val, key) => {
      let sprite = this.add.sprite(this.position.character.x, this.position.character.y, key)
        .setOrigin(0, 0)
        .setDepth(configs.LAYER_ABOVE_BACKGROUND)
        .setVisible(false);
      characterSlot.addCharacter({ sprite: sprite, info: val });
			sceneHelpers.createCharacterAnimation(this, key, configs.CHARACTER_ANIM_KEYS, configs.DEFAULT_FRAME_RATE);
    });

		this.currentCharacter = characterSlot.firstCharacter();
    this.currentTextBox = this.#createTextBox();

    this.#showCharacter(true);
    this.#showBackground(true);
		setTimeout(() => { this.#playTextBox(); }, 1000);
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

    const action = this.add.image(this.position.action.x, this.position.action.y, this.keys.nextPage)
      .setDepth(configs.LAYER_POPUP_OBJECT)
      .setTint(css.DEFAULT_MENU_COLOR_RGB)
      .setOrigin(0, 0)
      .setVisible(false);

    const textbox = createTextBox(this, config, action).setVisible(false);
    
    textbox
      .on('pointerdown', function () {
        if (this.isTyping) {
          this.stop(true);
        } else {
          action.setVisible(false);
          // this.resetChildVisibleState(action);
          this.typeNextPage();
        }
      }, textbox, action);
    
    return textbox
  }

	#initArrowButtons() {
    let x = this.position.arrows.x;
    let y = this.position.arrows.y;
    const arrows = [];
    const arrowKeys = [this.keys.prevArrow, this.keys.nextArrow];
    const setCurrentCharacter = (key)=>{
      if(key == this.keys.prevArrow) {
        this.currentCharacter = this.currentCharacter.prev;
      } else {
        this.currentCharacter = this.currentCharacter.next;
      }
    };

    for (let i = 0; i < arrowKeys.length; i++) {
      let arrow = this.add.sprite(x, y, arrowKeys[i])
        .setDepth(configs.LAYER_ABOVE_BACKGROUND)
        .setInteractive()
        .setOrigin(0, 0);

      arrow
        .on('pointerover', () => {
          this.#setDefaultFrame(arrow, false);
        })
        .on('pointerout', () => {
          this.#setDefaultFrame(arrow, true);
        })
        .on('pointerup', () => {
          this.#showCharacter(false);
          this.#showBackground(false);
          this.currentTextBox.destroy();

          setCurrentCharacter(arrowKeys[i]);
          this.currentTextBox = this.#createTextBox();
          this.#showBackground(true);
          this.#showCharacter(true);
          this.#playTextBox();
        });

      x += this.position.arrows.plus;
      arrows[i] = arrow;
    }

    this.tweens.add({
      targets: arrows,
      alpha: { from: 0, to: 1 },
      duration: 1000,
      repeat: -1,
      yoyo: true,
    });
    this.uiGroup.push(...arrows);
	}

	#initBackButton() {
		const button = this.add.sprite(this.position.back.x, this.position.back.y, this.keys.back)
			.setDepth(configs.LAYER_ABOVE_BACKGROUND)
			.setInteractive()
			.setOrigin(0, 0);
		
		button
			.on('pointerdown', () => {
        this.#setDefaultFrame(button, false);
			})
      .on('pointerout', () => {
        this.#setDefaultFrame(button, true);
      })
      .on('pointerup', () => {
        this.#setDefaultFrame(button, true);
        this.#goToNext(configs.SCENE_MAIN);
      });
    
    this.uiGroup.push(button);
	}

  #setDefaultFrame(sprite, isIdle) {
    if (isIdle) {
      sprite.setFrame(this.buttonFrame.get('idle'));
    } else {
      sprite.setFrame(this.buttonFrame.get('clicked'));
    }
  }

	#initPlayButton() {
		const button = this.add.sprite(this.position.play.x, this.position.play.y, this.keys.play)
			.setDepth(configs.LAYER_ABOVE_BACKGROUND)
			.setInteractive()
			.setOrigin(0, 0);
		
		button
			.on('pointerdown', () => {
        this.#setDefaultFrame(button, false);
			})
      .on('pointerout', () => {
        this.#setDefaultFrame(button, true);
      })
      .on('pointerup', () => {
        this.#setDefaultFrame(button, true);
        this.#goToNext(
          this.currentCharacter.data.info.get('scene'),
          { lang: this.lang, mainCharacter: this.currentCharacter.data.info }
        );
      });
  
    this.uiGroup.push(button);
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
    this.#diableAllInteractions();

    this.cameras.main.fadeOut(1000,
      css.DEFAULT_BACKGROUND_COLOR_RED,
      css.DEFAULT_BACKGROUND_COLOR_GREEN,
      css.DEFAULT_BACKGROUND_COLOR_BLUE
    );
    this.cameras.main.once('camerafadeoutcomplete', (cam, effect) => {					
      this.time.delayedCall(1000, () => {
        this.scene.start(nextSceneName, data);
      });
    });
  }

  #diableAllInteractions() {
    this.uiGroup.forEach((ui) => {
      ui.disableInteractive();
    });
    this.currentTextBox.disableInteractive();
    this.currentTextBox.pause();
  }
}