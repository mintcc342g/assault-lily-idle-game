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
    this.createLangButton();
    const startButton = this.createButton(this.startButtonKey, 117, 420);

    startButton
      .once('pointerup', this.startGame.bind(this, startButton));
  }

  setBackground() {
    this.add.image(0, 0, this.mainImgKey)
    .setDepth(0)
    .setOrigin(0, 0);
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