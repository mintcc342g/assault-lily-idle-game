import * as configs from '../consts/configs.js';
import * as imgKeys from '../consts/imgKeys.js';
import { GamePlayBaseScene } from './BaseScene.js';

export default class YurigaokaGladeScene extends GamePlayBaseScene {
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
      mainCharacter: { startX: 3, startY: 4, speed: 1 },
    };
    this.characters = new Map([
      [imgKeys.CHARACTER_MAI_ID, { /* sprite */ }]
    ]);
    this.mainCharacter = { /* map */ };
    this.eventEmitter = { /* Event instance */ };
  }

  init(data) {
    this.lang = data.lang;
    this.mainCharacter = data.mainCharacter;
  }

  create() {
    this.initResponsiveScreen();

    this.initCharacters();
    // this.#initEventEmitter();

    const tileMap = this.createTileMap();
    this.initGridEngine(tileMap);

    this.#sceneStart();
  }

  // #initEventEmitter() {
  //   this.eventEmitter = new YurigaokaGladeEventEmitter();
  // }

  #sceneStart() {
    this.fadeIn(1000);
    this.characters.get(imgKeys.CHARACTER_MAI_ID).play('sleep');

    setTimeout(()=>{
      this.scene.launch(configs.SCENE_UI,
        {
          lang: this.lang,
          sceneName: this.name,
          academy: this.mainCharacter.get('academy'),
        }
      );

      // this.eventEmitter.eventHandler(this, 0);
    }, 1000);
  }
}