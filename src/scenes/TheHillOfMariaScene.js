import Phaser from 'phaser';
import MariaHillEventEmitter from '../components/Events.js';
import * as sceneHelpers from '../utils/sceneHelpers.js';
import * as configs from '../consts/configs.js';
import * as css from '../consts/css.js';
import * as imgKeys from '../consts/imgKeys.js';

export default class TheHillOfMariaScene extends Phaser.Scene {
  constructor() {
    super(configs.SCENE_THE_HILL_OF_MARIA);
    this.name = configs.SCENE_THE_HILL_OF_MARIA;
    this.menuButtonKey = imgKeys.MENU_BUTTON_KEY;
    this.buttonFrame = configs.DEFAULT_BUTTON_ANIM;
    this.layers = configs.MARIA_HILL_LAYERS;
    this.tileset = {
      key: configs.MARIA_HILL_TILESET_KEY,
      imgKey: imgKeys.MARIA_HILL_MAP_IMG_KEY,
      configKey: imgKeys.MARIA_HILL_TILESET_CONFIG_KEY,
    };
    this.characters = new Map([
      [imgKeys.CHARACTER_RAIMU_ID, { /* sprite */ }]
    ]);
    this.position = {
      character: { x: 5, y: -1, speed: 1 },
    }
    this.lang = '';
    this.eventEmitter = { /* Event instance */ };
    this.mainCharacter = { /* map */ };
  }

  init(data) {
    if (!data.hasOwnProperty('lang')) {
      this.lang = configs.LANG_KR  // default lang
    } else {
      this.lang = data.lang;
    }
    
    this.mainCharacter = data.mainCharacter
  }

  create(data) {
    sceneHelpers.setResponsiveScreen(this);
    
    const tileMap = sceneHelpers.createTileMap(this);
    this.#initCharacters();
    this.#initGridEngine(tileMap);
    this.#initEventEmitter();
    
    // start scene
    this.cameras.main.fadeIn(1000,
      css.DEFAULT_BACKGROUND_COLOR_RED,
      css.DEFAULT_BACKGROUND_COLOR_GREEN,
      css.DEFAULT_BACKGROUND_COLOR_BLUE
    );
    this.gridEngine.moveTo(imgKeys.CHARACTER_RAIMU_ID, { x: 1, y: 5 });
  }

  #initCharacters() {
    for(let key of this.characters.keys()) {
      this.characters.set(key, this.add.sprite(0, 0, key).setOrigin(0, 0));
      sceneHelpers.createCharacterAnimation(this, key, configs.CHARACTER_ANIM_KEYS, 6, -1);
    }
  }
  
  #initGridEngine(tileMap) {
    const charactersConfig = [];
    
    this.characters.forEach((val, key) => {
      charactersConfig.push({
        id: key,
        sprite: val,
        startPosition: {
          x: this.position.character.x,
          y: this.position.character.y
        },
        speed: this.position.character.speed,
      });
    });
    sceneHelpers.initGridEngine(this, tileMap, charactersConfig);

    this.#initMovementSubscriber();
    this.#initPositionChangeSubscriber(tileMap);
  }

  #initMovementSubscriber() {
    this.characters.forEach((val) => {
      sceneHelpers.subscribeCharacterMovements(this, val, 'walking', 'down');
    });
  }

  #initEventEmitter() {
    this.eventEmitter = new MariaHillEventEmitter();
  }

  #initPositionChangeSubscriber(tileMap) {
    this.gridEngine
    .positionChangeFinished()
    .subscribe(({ charId, exitTile, enterTile }) => {
      if (this.#isGameStartTrigger(tileMap, enterTile)) {
        this.scene.launch(configs.SCENE_UI,
          {
            lang: this.lang,
            sceneName: this.name,
            academy: this.mainCharacter.get('academy'),
          }
        );
        this.eventEmitter.eventHandler(this, 0);
      }
    });
  }

  #isGameStartTrigger(tileMap, position) {
    return tileMap.layers.some((layer) => {
      const tile = tileMap.getTileAt(position.x, position.y, false, layer.name);
      return tile?.properties?.speechBubbleTrigger;
    });
  }
}
