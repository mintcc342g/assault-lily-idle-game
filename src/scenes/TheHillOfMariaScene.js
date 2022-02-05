import * as configs from '../consts/configs.js';
import * as css from '../consts/css.js';
import * as imgKeys from '../consts/imgKeys.js';
import MariaHillEventEmitter from '../components/Events.js';
import { GamePlayBaseScene } from './BaseScene.js';

export default class TheHillOfMariaScene extends GamePlayBaseScene {
  constructor() {
    super(configs.SCENE_THE_HILL_OF_MARIA);
    this.keys = {
      layers: configs.MARIA_HILL_LAYERS,
      tileset: {
        name: configs.BACKGROUND_TILESET_NAME,
        img: imgKeys.BACKGROUND_TILE_IMG_KEY,
        config: imgKeys.MARIA_HILL_TILESET_CONFIG_KEY
      }
    };
    this.position = {
      mainCharacter: { startX: 5, startY: 0, speed: 1 },
    };
    this.characters = new Map([
      [imgKeys.CHARACTER_RAIMU_ID, { /* sprite */ }]
    ]);
    this.mainCharacter = { /* map */ };
    this.eventEmitter = { /* Event instance */ };
  }

  init(data) {
    this.lang = data.lang;
    this.mainCharacter = data.mainCharacter
  }

  create() {
    this.initResponsiveScreen();

    const tileMap = this.createTileMap();
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
      this.createCharacterAnimation(key, configs.CHARACTER_ANIM_KEYS, configs.DEFAULT_FRAME_DURATION, -1);
    }
  }
  
  #initGridEngine(tileMap) {
    const charactersConfig = [];
    
    this.characters.forEach((val, key) => {
      charactersConfig.push({
        id: key,
        sprite: val,
        startPosition: {
          x: this.position.mainCharacter.startX,
          y: this.position.mainCharacter.startY
        },
        speed: this.position.mainCharacter.speed,
      });
    });
    this.initGridEngine(tileMap, charactersConfig);

    this.#initMovementSubscriber();
    this.#initPositionChangeSubscriber(tileMap);
  }

  #initMovementSubscriber() {
    this.characters.forEach((val) => {
      this.subscribeCharacterMovements(val, 'walking', 'down');
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
