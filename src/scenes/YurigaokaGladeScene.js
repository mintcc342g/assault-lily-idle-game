import {
  SCENE_YURIGAOKA_GLADE, SCENE_UI,
  BACKGROUND_TILESET_NAME, YURIGAOKA_GLADE_LAYERS, LAYER_ON_THE_BACKGROUND
} from '../consts/configs.js';
import {
  BACKGROUND_TILE_IMG_KEY, YURIGAOKA_GLADE_TILESET_CONFIG_KEY,
  CAT_01_IMG_KEY, CAT_02_IMG_KEY, CAT_03_IMG_KEY, CAT_04_IMG_KEY, CAT_05_IMG_KEY, CAT_06_IMG_KEY
} from '../consts/imgKeys.js';
import { DEFAULT_TEXT_COLOR_RGB } from '../consts/css.js';
import { shuffle, rand, minToMs } from '../utils/utils.js';
import { GamePlaySetting } from '../sceneHelpers/BaseSetting.js';
import Character from '../sceneHelpers/Character.js';

export default class YurigaokaGladeScene extends GamePlaySetting {
  constructor() {
    super(SCENE_YURIGAOKA_GLADE);
    this.keys = {
      layers: YURIGAOKA_GLADE_LAYERS,
      tileset: {
        name: BACKGROUND_TILESET_NAME,
        img: BACKGROUND_TILE_IMG_KEY,
        config: YURIGAOKA_GLADE_TILESET_CONFIG_KEY
      },
      cats: [
        CAT_01_IMG_KEY,
        CAT_02_IMG_KEY,
        CAT_03_IMG_KEY,
        CAT_04_IMG_KEY,
        CAT_05_IMG_KEY,
        CAT_06_IMG_KEY,
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
    this.partnerID = '';
  }

  init(data) {
    this.lang = data.lang;
    this.mainCharacterID = data.mainCharacterID;
    this.characters = new Map([]);
  }

  create() {
    this.initResponsiveScreen();
    this.initTextBox();
    this.initCustomAnimation();
    this.initDefaultEvents();

    this.#prepareScenario();
    this.initCharacterSprites();

    const tileMap = this.createTileMap();
    this.initGridEngine(tileMap);

    this.#sceneStart();
  }

  #prepareScenario() {
    switch (this.mainCharacterID) {
      case this.keyRepo.maiID():
        this.#createCastsForMai();
        this.#initCats();
        break;
    
      default:
        break;
    }
  }

  #createCastsForMai() {
    const mai = new Character(this.keyRepo.maiID());
    mai.addPosition('start', 3, 4, 'down');
    mai.setSpeed(1);

    this.characters.set(mai.id, mai);
  }

  #initCats() {
    shuffle(this.position.cats);
    
    const catLine = this.transRepo.catLine(this.lang);
    let i = 0;

    this.position.cats.forEach((catPos)=>{
      let range =  new Phaser.Geom.Rectangle(catPos.x, catPos.y, catPos.w, catPos.h);
      let point = range.getRandomPoint();
      
      let cat = this.add.sprite(point.x, point.y, this.keys.cats[i])
        .setDepth(LAYER_ON_THE_BACKGROUND)
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
          
          bubble.start(catLine, 50)
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
        color: DEFAULT_TEXT_COLOR_RGB,
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
      const min = rand(1, 5);
      const delay = minToMs(min);
  
      setTimeout(()=>{
        if (cat.active) {
          cat.setPosition(point.x, point.y);
  
          this.tweens.add(
            {
              targets: cat,
              alpha: { from: 0, to: 1 },
              duration: 1000,
            }
          );
  
          cat.setInteractive();
        }
      }, delay);
    });
  }

  #sceneStart() {
    this.fadeIn(1000);

    this.characters.get(this.mainCharacterID).setVisible(true).play('sleep', 'down');

    setTimeout(()=>{
      this.scene.launch(SCENE_UI,
        {
          lang: this.lang,
          sceneName: this.name,
          academy: this.charaRepo.academy(this.mainCharacterID),
        }
      );

      this.eventHandler(1000);
    }, 1000);
  }
}