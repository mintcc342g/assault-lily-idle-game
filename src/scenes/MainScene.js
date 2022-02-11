import * as configs from '../consts/configs.js';
import * as gameData from '../consts/gameData.js';
import * as imgKeys from '../consts/imgKeys.js';
import { UISetting } from '../sceneHelpers/BaseSetting.js';

export default class MainScene extends UISetting {
  constructor() {
    super(configs.SCENE_MAIN);
    this.keys = {
      background: imgKeys.MAIN_BACKGROUND_KEY,
      start: imgKeys.START_BUTTON_KEY,
      kr: configs.LANG_KR,
      en: configs.LANG_EN,
      jp: configs.LANG_JP
    };
    this.position = {
      start: { x: 225, y: 532 },
      lang: { x: 140, y: 654, plus: 129 },
    };
    this.langButtons = new Map([
      [this.keys.kr, new Map([ ['lang', configs.LANG_KR], ['button', { /* sprite */ }] ])],
      [this.keys.en, new Map([ ['lang', configs.LANG_EN], ['button', { /* sprite */ }] ])],
      [this.keys.jp, new Map([ ['lang', configs.LANG_JP], ['button', { /* sprite */ }] ])]
    ]);
  }

  init(data) {
    if (data.hasOwnProperty('lang')) {
      this.lang = data.lang;
    }
  }

  create() {
    this.initResponsiveScreen();
    this.fadeIn(1000);
    
    this.#initBackground();
    this.#initInfoText();
    this.#initStartButton();
    this.#initLangButton();
  }

  #initBackground() {
    this.add.image(0, 0, this.keys.background)
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
          datum.target.setDepth(configs.LAYER_ON_THE_BACKGROUND);
        }, datum.delay+100, datum);
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
    };

    // TODO: fix a delay problem when use gameData.NOTICE.forEach(() => {})

    conf.text = gameData.NOTICE.get(configs.LANG_EN).get('main-info');
    result.push(this.make.text(conf).setOrigin(0, 0).setDepth(configs.LAYER_ON_THE_BACKGROUND));

    conf.text = gameData.NOTICE.get(configs.LANG_KR).get('main-info');
    result.push(this.make.text(conf).setOrigin(0, 0).setDepth(configs.LAYER_HIDDEN_ITEM));

    conf.text = gameData.NOTICE.get(configs.LANG_JP).get('main-info');
    result.push(this.make.text(conf).setOrigin(0, 0).setDepth(configs.LAYER_HIDDEN_ITEM));

    return result
  }

  #initStartButton() {
    const startButton = this.#createButton(this.keys.start, this.position.start.x, this.position.start.y);

    startButton
      .on('pointerdown', () => {
        this.clickAnim(startButton, false);
      })
      .on('pointerout', () => {
        this.clickAnim(startButton, true);
      })
      .on('pointerup', () => {
        startButton.disableInteractive();
        this.clickAnim(startButton, true);
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

    this.clickAnim(this.langButtons.get(this.lang).get('button'), false);
  }

  #createButton(buttonKey, x, y) {
    return this.add.sprite(x, y, buttonKey)
      .setDepth(configs.LAYER_UI)
      .setInteractive()
      .setOrigin(0, 0);
  }

  #setButtonInteraction(button) {
    return button.on('pointerup', () => { this.#selectLanguage(button) });
  }

  #selectLanguage(selectedButton) {
    this.langButtons.forEach(item => {
      if (selectedButton.texture.key == item.get('button').texture.key) {
        this.clickAnim(item.get('button'), false);
        this.lang = item.get('lang');
      } else {
        this.clickAnim(item.get('button'), true);
      }
    });
  }

  #startGame() {
    this.langButtons.forEach(item => {
      item.get('button').disableInteractive();
    });

    this.fadeOut(1000);

    this.cameras.main.once('camerafadeoutcomplete', (cam, effect) => {
      this.time.delayedCall(1000, () => {
        this.scene.start(configs.SCENE_CHARACTER_SELECTION, { lang: this.lang });
      });
    });
  }
}