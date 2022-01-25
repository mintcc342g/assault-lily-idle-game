import Parser from 'phaser';
import * as consts from '../variables/constants.js';
import MainImg from '../assets/ui/main.png';
import StartButtonImg from '../assets/ui/start_button.png';
import KrButtonImg from '../assets/ui/lang_button_kr.png';
import JpButtonImg from '../assets/ui/lang_button_jp.png';
import EnButtonImg from '../assets/ui/lang_button_en.png';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.lang = consts.LANG_KR; // default
    this.mainImgKey = 'main_background';
    this.startButtonKey = 'start_button';
    this.krButtonKey = 'kr_button';
    this.enButtonKey = 'en_button';
    this.jpButtonKey = 'jp_button';
    this.langButtons = new Map([
      [this.krButtonKey, new Map([ ['lang', consts.LANG_KR], ['button', {}] ])],
      [this.enButtonKey, new Map([ ['lang', consts.LANG_EN], ['button', {}] ])],
      [this.jpButtonKey, new Map([ ['lang', consts.LANG_JP], ['button', {}] ])]
    ]);
    this.defaultButtonFrame = new Map([
      ['idle', 0],
      ['clicked', 1],
    ]);
  }

  preload() {
    this.load.rexImageURI(this.mainImgKey, MainImg);
    this.load.spritesheet(this.startButtonKey, StartButtonImg, { frameWidth: 406, frameHeight: 106 }); // TODO: fix frame
    this.load.spritesheet(this.krButtonKey, KrButtonImg, { frameWidth: 112, frameHeight: 106 });
    this.load.spritesheet(this.enButtonKey, EnButtonImg, { frameWidth: 112, frameHeight: 106 });
    this.load.spritesheet(this.jpButtonKey, JpButtonImg, { frameWidth: 112, frameHeight: 106 });
  }

  create() {
    this.setBackground();
    this.setInfoText();
    this.createLangButton();
    const startButton = this.createButton(this.startButtonKey, 117, 420);

    startButton
      .once('pointerup', this.startGame.bind(this, startButton));
  }

  setBackground() {
    this.add.image(0, 0, this.mainImgKey)
    .setDepth(consts.LAYER_BACKGROUND)
    .setOrigin(0, 0);
  }

  createInfoText() {
    var result = [];
    const conf = {
      y: 760,
      style: {
        fixedWidth: 640,
        fontSize: '20px',
        align: 'center'
      },
      padding: {
        y: 4
      }
    }

    // TODO: fix a delay problem when use consts.NOTICE.forEach(()=>{})
    
    conf.text = 'select language, then press start button.';
    result.push(this.make.text(conf).setOrigin(0, 0).setDepth(consts.LAYER_ABOVE_BACKGROUND));
    
    conf.text = '언어를 선택한 후 [Start] 버튼을 눌러주세요.';
    result.push(this.make.text(conf).setOrigin(0, 0).setDepth(consts.LAYER_HIDDEN_ITEM));
    
    conf.text = '言語を選択した後、[Start] ボタンを押してください。';
    result.push(this.make.text(conf).setOrigin(0, 0).setDepth(consts.LAYER_HIDDEN_ITEM));

    return result
  }

  setInfoText() {
    const infoTexts = this.createInfoText();
      
    this.tweens.add({
      targets: infoTexts,
      alpha: { from: 0, to: 1 },
      duration: 1500,
      repeat: -1,
      yoyo: true,
      delay: function (target, targetKey, value, targetIndex, totalTargets, tween) {
        return targetIndex * 3000;
      },
      repeatDelay: 6000,
    })
    .on('start', function(tween, targets){
      tween.data.forEach((datum)=> {
        setTimeout(()=>{
          datum.target.setDepth(consts.LAYER_ABOVE_BACKGROUND);
        },datum.delay+100, datum);
      });
    });
  }

  createLangButton() {
    var x = 117;
    var y = 555;
    for (let key of this.langButtons.keys()) {
        this.langButtons
          .get(key)
          .set('button', this.setButtonInteraction(this.createButton(key, x, y)));

        x += (106 + 44);
    }

    this.langButtons.get(this.krButtonKey)
      .get('button')
      .setFrame(this.defaultButtonFrame.get('clicked'));
  }

  createButton(buttonKey, x, y) {
    return this.add.sprite(x, y, buttonKey)
      .setDepth(consts.LAYER_UI)
      .setInteractive()
      .setOrigin(0, 0);
  }

  setButtonInteraction(button) {
    return button
      .on('pointerup', this.selectLanguage.bind(this, button));
  }

  selectLanguage(selectedButton) {
    this.langButtons.forEach(item => {
      if (selectedButton.texture.key == item.get('button').texture.key) {
        item.get('button').setFrame(this.defaultButtonFrame.get('clicked'));
        this.lang = item.get('lang');
      } else {
        item.get('button').setFrame(this.defaultButtonFrame.get('idle'));
      }
    });
  }

  startGame(startButton) {
    this.langButtons.forEach(item => {
      item.get('button').disableInteractive();
    });

    this.cameras.main.fadeOut(1000, 0, 0, 0)
    this.cameras.main.once('camerafadeoutcomplete', (cam, effect) => {
      this.time.delayedCall(1000, () => {
        this.scene.start('TheHillOfMariaScene', { lang: this.lang }); // TODO: create character selection scene
      })
    })
  }
}