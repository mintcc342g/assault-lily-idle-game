import * as configs from '../consts/configs.js';
import * as css from '../consts/css.js';
import * as gameData from '../consts/gameData.js';
import * as imgKeys from '../consts/imgKeys.js';
import * as utils from '../utils/utils.js';
import { GamePlaySetting } from '../sceneHelpers/BaseSetting.js';
import Character from '../sceneHelpers/Character.js';

export default class YurigaokaGladeScene extends GamePlaySetting {
  constructor() {
    super(configs.SCENE_YURIGAOKA_GLADE);
    this.keys = {
      layers: configs.YURIGAOKA_GLADE_LAYERS,
      tileset: {
        name: configs.BACKGROUND_TILESET_NAME,
        img: imgKeys.BACKGROUND_TILE_IMG_KEY,
        config: imgKeys.YURIGAOKA_GLADE_TILESET_CONFIG_KEY
      },
      cats: [
        imgKeys.CAT_01_IMG_KEY,
        imgKeys.CAT_02_IMG_KEY,
        imgKeys.CAT_03_IMG_KEY,
        imgKeys.CAT_04_IMG_KEY,
        imgKeys.CAT_05_IMG_KEY,
        imgKeys.CAT_06_IMG_KEY,
      ]
    };
    this.position = {
      cats: [
        { x: 182, y: 182, w: 148, h: 58 },
        { x: 92, y: 272, w: 238, h: 58 },
        { x: 92, y: 362, w: 148, h: 148 },
        { x: 92, y: 542, w: 148, h: 148 },
        { x: 272, y: 542, w: 238, h: 58 },
        { x: 272, y: 632, w: 148, h: 148 },
      ],
      bubble: {
        cat: { w: 40, h: 16 }
      }
    };
    this.mainCharacterID = '';
    this.eventCharacterID = '';
  }

  init(data) {
    this.lang = data.lang;
    this.mainCharacterID = data.mainCharacterID;
    this.characters = new Map([]);
  }

  create() {
    this.initResponsiveScreen();

    this.#prepareScenario();
    this.initCharacterSprites();
    this.initTextBox();

    const tileMap = this.createTileMap();
    this.initGridEngine(tileMap);

    this.#sceneStart();
  }

  #prepareScenario() {
    this.initDefaultEvents();

    switch (this.mainCharacterID) {
      case imgKeys.CHARACTER_MAI_ID:
        this.#createCastsForMai();
        this.#initCats();
        break;
    
      default:
        break;
    }
  }

  #createCastsForMai() {
    const mai = new Character(imgKeys.CHARACTER_MAI_ID);
    mai.addPosition('start', 3, 4, 'down');
    mai.setSpeed(1);

    this.characters.set(mai.id, mai);
  }

  #initCats() {
    utils.shuffle(this.position.cats);
    
    let i = 0;
    this.position.cats.forEach((item)=>{
      let range =  new Phaser.Geom.Rectangle(item.x, item.y, item.w, item.h);
      let point = range.getRandomPoint();
      
      let cat = this.add.sprite(point.x, point.y, this.keys.cats[i])
        .setDepth(configs.LAYER_ON_THE_BACKGROUND)
        .setVisible(true)
        .setOrigin(0, 0)
        .setInteractive();

      cat
        .on('pointerdown', () => {
          cat.disableInteractive();

          const bubble = this.#createBubble(
            cat.x-10,
            cat.y-3,
            this.position.bubble.cat.w,
            this.position.bubble.cat.h,
            '13px'
          );
          
          bubble
            .on('complete', () => {
              const timeline = this.tweens.createTimeline();
              this.#setHideCatAnim(timeline, bubble, cat);
              this.#setAppearCatAnim(timeline, cat, range.getRandomPoint());
              timeline.play();
            });
          
          bubble.start(gameData.NOTICE.get(this.lang).get('cat'), 50)
        });
      
      i++;
    });
  }

  #createBubble(x, y, w, h, fontSize) {
    const config = {
      x: 0,
      y: 0,
      style: {
        fixedWidth: w,
        fixedHeight: h,
        color: css.DEFAULT_TEXT_COLOR_RGB,
        fontSize: fontSize,
      },
      padding: {
        left: 2,
        top: 4
      }
    }
  
    return this.createSpeechBubble(x, y, config)
  }

  #setHideCatAnim(timeline, bubble, cat) {
    timeline.add({
      targets: bubble,
      alpha: { from: 1, to: 0 },
      delay: 1000,
      duration: 0,
    });
    timeline.add({
      targets: cat,
      alpha: { from: 1, to: 0 },
      delay: 200,
      duration: 700,
      repeat: 1,
      yoyo: true,
    });
    timeline.add({
      targets: cat,
      alpha: { from: 1, to: 0 },
      duration: 1000,
    });
  }

  #setAppearCatAnim(timeline, cat, point) {
    timeline.on('complete', () => {
      const min = utils.rand(1, 5);
      const delay = utils.minToMs(min);
  
      setTimeout(()=>{
        cat.setPosition(point.x, point.y);

        this.tweens.add(
          {
            targets: cat,
            alpha: { from: 0, to: 1 },
            duration: 1000,
          }
        );

        cat.setInteractive();
      }, delay);
    });
  }

  #sceneStart() {
    this.fadeIn(1000);

    this.characters.get(this.mainCharacterID).setVisible(true).play('sleep', 'down');

    setTimeout(()=>{
      this.scene.launch(configs.SCENE_UI,
        {
          lang: this.lang,
          sceneName: this.name,
          academy: gameData.CHARACTER_DATA.get(this.mainCharacterID).get('academy'),
        }
      );

      this.eventHandler(1000);
    }, 1000);
  }
}