import Parser from 'phaser';
import * as configs from '../consts/configs.js';
import * as css from '../consts/css.js';
import * as gameData from '../consts/gameData.js';
import * as imgKeys from '../consts/imgKeys.js';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super(configs.SCENE_MAIN);
    this.name = configs.SCENE_MAIN;
    this.lang = '';
    this.mainImgKey = imgKeys.MAIN_BACKGROUND_KEY;
    this.startButtonKey = imgKeys.START_BUTTON_KEY;
    this.krButtonKey = imgKeys.KR_BUTTON_KEY;
    this.enButtonKey = imgKeys.EN_BUTTON_KEY;
    this.jpButtonKey = imgKeys.JP_BUTTON_KEY;
    this.langButtons = new Map([
      [this.krButtonKey, new Map([ ['lang', configs.LANG_KR], ['button', { /* sprite */ }] ])],
      [this.enButtonKey, new Map([ ['lang', configs.LANG_EN], ['button', { /* sprite */ }] ])],
      [this.jpButtonKey, new Map([ ['lang', configs.LANG_JP], ['button', { /* sprite */ }] ])]
    ]);
    this.position = {
      start: { x: 225, y: 532 },
      lang: { x: 140, y: 654, plus: 129 },
    }
    this.buttonFrame = configs.DEFAULT_BUTTON_ANIM;
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
    this.#initInfoText();
    this.#initStartButton();
    this.#initLangButton();
  }

  #initBackground() {
    this.add.image(0, 0, this.mainImgKey)
    .setDepth(configs.LAYER_BACKGROUND)
    .setOrigin(0, 0);
  }

  #initInfoText() {
    const infoTexts = this.#createInfoText();
      
    this.tweens.add({
      targets: infoTexts,
      alpha: { from: 0, to: 1 },
      duration: 1500,
      repeat: -1,
      yoyo: true,
      delay: (target, targetKey, value, targetIndex, totalTargets, tween) => {
        return targetIndex * 3000;
      },
      repeatDelay: 6000,
    })
    .on('start', function(tween, targets){
      tween.data.forEach((datum) => {
        setTimeout(() => {
          datum.target.setDepth(configs.LAYER_ABOVE_BACKGROUND);
        },datum.delay+100, datum);
      });
    });
  }

  #createInfoText() {
    var result = [];
    const conf = {
      y: 750,
      style: {
        fixedWidth: 640,
        fontSize: '20px',
        align: 'center'
      },
      padding: {
        y: 4
      }
    }

    // TODO: fix a delay problem when use gameData.NOTICE.forEach(() => {})

    conf.text = gameData.NOTICE.get(configs.LANG_EN).get('main-info');
    result.push(this.make.text(conf).setOrigin(0, 0).setDepth(configs.LAYER_ABOVE_BACKGROUND));

    conf.text = gameData.NOTICE.get(configs.LANG_KR).get('main-info');
    result.push(this.make.text(conf).setOrigin(0, 0).setDepth(configs.LAYER_HIDDEN_ITEM));

    conf.text = gameData.NOTICE.get(configs.LANG_JP).get('main-info');
    result.push(this.make.text(conf).setOrigin(0, 0).setDepth(configs.LAYER_HIDDEN_ITEM));

    return result
  }

  #initStartButton() {
    const startButton = this.#createButton(this.startButtonKey, this.position.start.x, this.position.start.y);

    startButton
      .on('pointerdown', () => {
        this.#setDefaultFrame(startButton, false)
      })
      .on('pointerout', () => {
        this.#setDefaultFrame(startButton, true)
      })
      .on('pointerup', () => {
        startButton.disableInteractive();
        this.#setDefaultFrame(startButton, true);
        this.#startGame();
      });
  }

  #initLangButton() {
    var x = this.position.lang.x;
    var y = this.position.lang.y;

    for (let key of this.langButtons.keys()) {
      this.langButtons.get(key)
        .set('button', this.#setButtonInteraction(this.#createButton(key, x, y)));

      x += this.position.lang.plus;
    }

    this.#setDefaultFrame(this.langButtons.get(this.krButtonKey).get('button'), false);
  }

  #createButton(buttonKey, x, y) {
    return this.add.sprite(x, y, buttonKey)
      .setDepth(configs.LAYER_UI)
      .setInteractive()
      .setOrigin(0, 0);
  }

  #setButtonInteraction(button) {
    return button
      .on('pointerup', () => { this.#selectLanguage(button) });
  }

  #selectLanguage(selectedButton) {
    this.langButtons.forEach(item => {
      if (selectedButton.texture.key == item.get('button').texture.key) {
        this.#setDefaultFrame(item.get('button'), false);
        this.lang = item.get('lang');
      } else {
        this.#setDefaultFrame(item.get('button'), true);
      }
    });
  }

  #startGame() {
    this.langButtons.forEach(item => {
      item.get('button').disableInteractive();
    });

    this.cameras.main.fadeOut(1000,
      css.DEFAULT_BACKGROUND_COLOR_RED,
      css.DEFAULT_BACKGROUND_COLOR_GREEN,
      css.DEFAULT_BACKGROUND_COLOR_BLUE
    );
    this.cameras.main.once('camerafadeoutcomplete', (cam, effect) => {
      this.time.delayedCall(1000, () => {
        this.scene.start(configs.SCENE_CHARACTER_SELECTION, { lang: this.lang });
      });
    });
  }
  
  #setDefaultFrame(sprite, isIdle) {
    if (isIdle) {
      sprite.setFrame(this.buttonFrame.get('idle'));
    } else {
      sprite.setFrame(this.buttonFrame.get('clicked'));
    }
  }
}