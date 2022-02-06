import * as configs from '../consts/configs.js';
import * as css from '../consts/css.js';
import * as gameData from '../consts/gameData.js';
import * as imgKeys from '../consts/imgKeys.js';
import CharacterSlot from '../utils/CharacterSlot.js';
import { CharacterSelectionSetting } from '../mixins/BaseSetting.js'

export default class CharacterSelectionScene extends CharacterSelectionSetting {
  constructor() {
    super(configs.SCENE_CHARACTER_SELECTION);
    this.keys = {
      background: gameData.SELECTION_BACKGROUND_KEYS,
      slot: imgKeys.CHARACTER_SLOT_KEY,
      prev: imgKeys.PREV_BUTTON_KEY,
      next: imgKeys.NEXT_BUTTON_KEY,
      play: imgKeys.PLAY_BUTTON_KEY,
      back: imgKeys.BACK_BUTTON_KEY,
      nextPage: imgKeys.NEXT_PAGE_KEY
    };
    this.position = {
      character: { x: 120, y: 130 },
      slot: { x: 110, y: 124 },
      textBox: { x: 234, y: 105, w: 228, h: 100 },
      action: { x: 475, y: 170 },
      arrows: { x: 27, y: 185, plus: 552 },
      back: { x: 234, y: 259 },
      play: { x: 400, y: 259 }
    };
    this.currentCharacter = { /* sprite and info */ };
		this.currentTextBox = { /* rexUI textBox */ };
    this.backgrounds = new Map();
    this.uiGroup = [];
  }

  init(data) {
    this.lang = data.lang;
  }

	create() {
    this.initResponsiveScreen();
		this.fadeIn(1000);

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
    this.#createSprite(this.position.slot.x, this.position.slot.y, this.keys.slot);

		const characterSlot = new CharacterSlot();

    gameData.CHARACTER_DATA.forEach((val, key) => {
      let sprite = this.#createSprite(
          this.position.character.x,
          this.position.character.y,
          key
        ).setVisible(false);

        characterSlot.addCharacter({ sprite: sprite, info: val });
    });

		this.currentCharacter = characterSlot.firstCharacter();
    this.currentTextBox = this.#initTextBox();

    this.#changeCharacter(true);

		setTimeout(() => { this.#playTextBox(); }, 1000);
	}

  #initTextBox() {
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

    const textbox = this.createTextBox(config, action).setVisible(false);
    
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
    const arrowKeys = [this.keys.prev, this.keys.next];

    for (let i = 0; i < arrowKeys.length; i++) {
      let arrow = this.#createSprite(x, y, arrowKeys[i]);

      arrow
        .setInteractive()
        .on('pointerover', () => {
          this.clickAnim(arrow, false);
        })
        .on('pointerout', () => {
          this.clickAnim(arrow, true);
        })
        .on('pointerup', () => {
          this.#changeCharacter(false);
          this.currentTextBox.destroy();

          this.#setCurrentCharacter(arrowKeys[i]);
          this.currentTextBox = this.#initTextBox();
          this.#changeCharacter(true);
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
		const button = this.#createSprite(this.position.back.x, this.position.back.y, this.keys.back);
		
		button
      .setInteractive()
			.on('pointerdown', () => {
        this.clickAnim(button, false);
			})
      .on('pointerout', () => {
        this.clickAnim(button, true);
      })
      .on('pointerup', () => {
        this.clickAnim(button, true);
        this.#goToNext(configs.SCENE_MAIN);
      });
    
    this.uiGroup.push(button);
	}

	#initPlayButton() {
		const button =  this.#createSprite(this.position.play.x, this.position.play.y, this.keys.play);
		
		button
      .setInteractive()
			.on('pointerdown', () => {
        this.clickAnim(button, false);
			})
      .on('pointerout', () => {
        this.clickAnim(button, true);
      })
      .on('pointerup', () => {
        this.clickAnim(button, true);
        this.#goToNext(
          this.currentCharacter.data.info.get('scene'),
          { lang: this.lang, mainCharacter: this.currentCharacter.data.info }
        );
      });
  
    this.uiGroup.push(button);
	}

  #setCurrentCharacter(key) {
    if(key == this.keys.prev) {
      this.currentCharacter = this.currentCharacter.prev;
    } else {
      this.currentCharacter = this.currentCharacter.next;
    }
  }

  #createSprite(x, y, key) {
    return this.add.sprite(x, y, key)
      .setDepth(configs.LAYER_ABOVE_BACKGROUND)
      .setOrigin(0, 0);
  }

  #changeCharacter(visible) {
    this.currentCharacter.data.sprite.setVisible(visible);
    this.backgrounds.get(this.currentCharacter.data.info.get('academy')).setVisible(visible);
  }
  
  #diableAllInteractions() {
    this.uiGroup.forEach((ui) => {
      ui.disableInteractive();
    });
    this.currentTextBox.disableInteractive();
    this.currentTextBox.pause();
  }

  #goToNext(nextSceneName, data) {
    this.#diableAllInteractions();

    this.fadeOut(1000);

    this.cameras.main.once('camerafadeoutcomplete', (cam, effect) => {					
      this.time.delayedCall(1000, () => {
        this.scene.start(nextSceneName, data);
      });
    });
  }

  #playTextBox() {
    this.currentTextBox
      .setVisible(true)
      .start(this.currentCharacter.data.info.get('intro').get(this.lang), 50);
  }
}