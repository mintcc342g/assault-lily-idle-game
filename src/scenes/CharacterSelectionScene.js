import * as configs from '../consts/configs.js';
import * as css from '../consts/css.js';
import * as gameData from '../consts/gameData.js';
import * as imgKeys from '../consts/imgKeys.js';
import CharacterSlot from '../sceneHelpers/CharacterSlot.js';
import { CharacterSelectionSetting } from '../sceneHelpers/BaseSetting.js'

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
    };
    this.position = {
      character: { x: 120, y: 136 },
      characterName: { x: 233, y: 93, w: 240, h: 27 },
      slot: { x: 110, y: 130 },
      textBox: { x: 234, y: 120, w: 228, h: 90 },
      textBoxAction: { x: 477, y: 178 },
      arrows: { x: 27, y: 185, plus: 552 },
      back: { x: 234, y: 263 },
      play: { x: 400, y: 263 }
    };
    this.currentCharacter = { /* sprite, intro and academy */ };
		this.currentTextBox = { /* rexUI textBox */ };
    this.backgrounds = new Map();
  }

  init(data) {
    this.lang = data.lang;
    this.uiGroup = [];
  }

	create() {
    this.initResponsiveScreen();
		this.fadeIn(1000);

    this.initTextBox();
		this.#initBackground();
		this.#initCharacterSlot();
		this.#initArrowButtons();
		this.#initPlayButton();
    this.#initBackButton();

    setTimeout(() => {
      this.currentCharacter.data.name.setVisible(true);
      this.#playTextBox();
    }, 1000);
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

        characterSlot.addCharacter({
          sprite: sprite,
          id: val.get('id'),
          intro: val.get('intro').get(this.lang),
          academy: val.get('academy'),
          scene: val.get('scene'),
          name: this.#createCharacterName(val),
        });
    });

		this.currentCharacter = characterSlot.firstCharacter();
    this.currentTextBox = this.#makeTextBox();
    this.#changeCharacter(true);
	}

  #createCharacterName(characterData) {
    const conf = {
      x: this.position.characterName.x,
      y: this.position.characterName.y,
      text: characterData.get('name').get(this.lang),
      style: {
        fixedWidth: this.position.characterName.w,
        fixedHeight: this.position.characterName.h,
        color: css.DEFAULT_MENU_CLICKED_COLOR,
        backgroundColor: css.DEFAULT_MENU_COLOR,
        fontSize: '16px',
        align: 'left'
      },
      padding: {
        top: 7,
        left: 7,
      }
    }

    return this.make.text(conf).setOrigin(0, 0).setDepth(configs.LAYER_TEXTBOX).setVisible(false);
  }

  #makeTextBox() {
    const config = {
      x: this.position.textBox.x,
      y: this.position.textBox.y,
      style: {
        fixedWidth: this.position.textBox.w,
        fixedHeight: this.position.textBox.h,
        color: css.DEFAULT_TEXT_COLOR,
        fontSize: '16px',
        maxLines: 4,
        lineSpacing: css.DEFAULT_LINE_SPACING,
        wordWrap: {
          width: this.position.textBox.w,
          useAdvancedWrap: true
        }        
      },
      padding: {
        top: 3
      }
    }

    const actionConf = this.position.textBoxAction;

    return this.createIntroduceTextBox(config, actionConf).setVisible(true);
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
          this.currentTextBox = this.#makeTextBox();
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
        this.#goToNext(configs.SCENE_MAIN, { lang: this.lang });
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
          this.currentCharacter.data.scene,
          { lang: this.lang, mainCharacterID: this.currentCharacter.data.id }
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
      .setDepth(configs.LAYER_ON_THE_BACKGROUND)
      .setOrigin(0, 0);
  }

  #changeCharacter(visible) {
    this.currentCharacter.data.sprite.setVisible(visible);
    this.currentCharacter.data.name.setVisible(visible);
    this.backgrounds.get(this.currentCharacter.data.academy).setVisible(visible);
  }
  
  #uiGroupInteraction(active) {
    if (active) {
      this.uiGroup.forEach((ui) => {
        ui.setVisible(active);
      });
    } else {
      this.uiGroup.forEach((ui) => {
        ui.disableInteractive();
      });
      this.currentTextBox.disableInteractive();
      this.currentTextBox.pause();
    }
  }

  #goToNext(nextSceneName, data) {
    this.#uiGroupInteraction(false);

    this.fadeOut(1000);

    this.cameras.main.once('camerafadeoutcomplete', (cam, effect) => {					
      this.time.delayedCall(1000, () => {
        this.scene.start(nextSceneName, data);
      });
    });
  }

  #playTextBox() {
    this.currentTextBox.start(this.currentCharacter.data.intro, 50);
  }
}