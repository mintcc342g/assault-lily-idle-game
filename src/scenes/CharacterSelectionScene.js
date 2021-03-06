import {
  LUDOVIC_HANDBOOK_IMG_KEY, YURIGAOKA_HANDBOOK_IMG_KEY,
  CHARACTER_SLOT_KEY, PREV_BUTTON_KEY, NEXT_BUTTON_KEY, PLAY_BUTTON_KEY, BACK_BUTTON_KEY
} from '../consts/imgKeys.js';
import { SCENE_CHARACTER_SELECTION, SCENE_MAIN, LAYER_BACKGROUND, LAYER_ON_THE_BACKGROUND } from '../consts/configs.js';
import { DEFAULT_TEXT_COLOR, DEFAULT_LINE_SPACING } from '../consts/css.js';
import { CharacterSelectionSetting } from '../sceneHelpers/BaseSetting.js'
import CharacterSlot from '../sceneHelpers/CharacterSlot.js';

export default class CharacterSelectionScene extends CharacterSelectionSetting {
  constructor() {
    super(SCENE_CHARACTER_SELECTION);
    this.keys = {
      slot: CHARACTER_SLOT_KEY,
      prev: PREV_BUTTON_KEY,
      next: NEXT_BUTTON_KEY,
      play: PLAY_BUTTON_KEY,
      back: BACK_BUTTON_KEY,
      background: new Map([
        [this.keyRepo.ludovic(), LUDOVIC_HANDBOOK_IMG_KEY],
        [this.keyRepo.yurigaoka(), YURIGAOKA_HANDBOOK_IMG_KEY],
      ])
    };
    this.position = {
      character: { x: 120, y: 136 },
      nameTag: {
        x: 233, y: 93, w: 240, h: 27,
        fontSize: '16px',
        padding: { top: 7, left: 7 },
      },
      slot: { x: 110, y: 130 },
      textBox: { x: 234, y: 120, w: 228, h: 90 },
      textBoxAction: { x: 477, y: 178 },
      arrows: { x: 27, y: 185, plus: 552 },
      back: { x: 234, y: 263 },
      play: { x: 400, y: 263 }
    };
  }

  init(data) {
    this.lang = data.lang;
    this.uiGroup = [];
    this.backgrounds = new Map([]);
    this.currentCharacter = { /* sprite, intro and academy */ };
    this.currentTextBox = { /* rexUI textBox */ };
  }

  create() {
    this.initResponsiveScreen();
    this.initCustomAnimation();
    this.initTextBox();

    this.fadeIn(1000);

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
    for (let [academyName, imgKey] of this.keys.background) {
      this.backgrounds.set(academyName,
        this.add.image(0, 0, imgKey)
        .setDepth(LAYER_BACKGROUND)
        .setVisible(false)
        .setOrigin(0, 0)
      );
    }
  }

  #initCharacterSlot() {
    this.#createSprite(this.position.slot.x, this.position.slot.y, this.keys.slot);

    const characterSlot = new CharacterSlot();
    const characters = this.keyRepo.mainCharacterIDs()
    
    for (let id of characters) {
      let sprite = this.#createSprite(
        this.position.character.x,
        this.position.character.y,
        id
      ).setVisible(false);

      characterSlot.addCharacter({
        sprite: sprite,
        id: id,
        intro: this.charaRepo.introduction(id, this.lang),
        academy: this.charaRepo.academy(id),
        scene: this.charaRepo.stage(id),
        name: this.createNameTag(
          this.charaRepo.name(id, this.lang),
          this.position.nameTag).setVisible(false),
      });
    }

    this.currentCharacter = characterSlot.firstCharacter();
    this.currentTextBox = this.#makeTextBox();
    this.#changeCharacter(true);
	}

  #makeTextBox() {
    const config = {
      x: this.position.textBox.x,
      y: this.position.textBox.y,
      style: {
        fixedWidth: this.position.textBox.w,
        fixedHeight: this.position.textBox.h,
        color: DEFAULT_TEXT_COLOR,
        fontSize: '16px',
        maxLines: 4,
        lineSpacing: DEFAULT_LINE_SPACING,
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
        this.#goToNext(SCENE_MAIN, { lang: this.lang });
      });
    
    this.uiGroup.push(button);
  }

  #initPlayButton() {
    const button = this.#createSprite(this.position.play.x, this.position.play.y, this.keys.play);
    
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
      .setDepth(LAYER_ON_THE_BACKGROUND)
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