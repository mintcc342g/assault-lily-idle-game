import { 
  SCENE_KEY_MAIN, SCENE_KEY_CHARACTER_SELECTION,
  LAYER_BACKGROUND, LAYER_ON_THE_BACKGROUND, LAYER_HIDDEN_ITEM, LAYER_UI,
} from '../consts/configs.js';
import { LANG_KR, LANG_EN, LANG_JP } from '../consts/keys.js';
import { MAIN_BACKGROUND_KEY, START_BUTTON_KEY } from '../consts/keys.js';
import { UISetting } from '../sceneHelpers/BaseSetting.js';

export default class MainScene extends UISetting {
  constructor() {
    super(SCENE_KEY_MAIN);
    this.keys = {
      background: MAIN_BACKGROUND_KEY,
      start: START_BUTTON_KEY,
      kr: LANG_KR,
      en: LANG_EN,
      jp: LANG_JP,
    };
    this.position = {
      start: { x: 225, y: 532 },
      lang: { x: 140, y: 654, plus: 129 },
    };
    this.langButtons = new Map([
      [this.keys.kr, new Map([ ['lang', this.keys.kr], ['button', { /* sprite */ }] ])],
      [this.keys.en, new Map([ ['lang', this.keys.en], ['button', { /* sprite */ }] ])],
      [this.keys.jp, new Map([ ['lang', this.keys.jp], ['button', { /* sprite */ }] ])]
    ]);
  }

  init(data) {
    if (data.hasOwnProperty('lang')) {
      this.lang = data.lang;
    }
  }
  
  create() {
    this.initResponsiveScreen();
    this.initCustomAnimation();

    this.fadeIn(1000);
    
    this.#initBackground();
    this.#initInfoText();
    this.#initStartButton();
    this.#initLangButton();
  }

  #initBackground() {
    this.makeImage({ key: this.keys.background, depth: LAYER_BACKGROUND });
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
          datum.target.setDepth(LAYER_ON_THE_BACKGROUND);
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

    conf.text = this.transRepo.mainInfo(this.keys.en);
    result.push(this.make.text(conf).setOrigin(0, 0).setDepth(LAYER_ON_THE_BACKGROUND));

    conf.text = this.transRepo.mainInfo(this.keys.kr);
    result.push(this.make.text(conf).setOrigin(0, 0).setDepth(LAYER_HIDDEN_ITEM));

    conf.text = this.transRepo.mainInfo(this.keys.jp);
    result.push(this.make.text(conf).setOrigin(0, 0).setDepth(LAYER_HIDDEN_ITEM));

    return result
  }

  #initStartButton() {
    const startButton = this.makeSprite({
      x: this.position.start.x,
      y: this.position.start.y,
      key: this.keys.start,
      depth: LAYER_UI,
      interactive: true
    });

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
      let langButton = this.makeSprite({ x: x, y: y,
        key: key, depth: LAYER_UI, interactive: true,
      });

      this.langButtons.get(key).set('button', this.#setButtonInteraction(langButton));
      
      x += this.position.lang.plus;
    }

    this.clickAnim(this.langButtons.get(this.lang).get('button'), false);
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
        this.scene.start(SCENE_KEY_CHARACTER_SELECTION, { lang: this.lang });
      });
    });
  }
}