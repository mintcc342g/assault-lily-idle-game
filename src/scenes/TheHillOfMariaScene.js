import Phaser from 'phaser';
import MariaHillEventEmitter from '../components/Events.js';
import SceneUI from '../components/SceneUI.js';
import * as sceneHelpers from '../utils/sceneHelpers.js';
import * as consts from '../variables/constants.js';

export default class TheHillOfMariaScene extends Phaser.Scene {
  constructor() {
    super(consts.SCENE_THE_HILL_OF_MARIA);
    this.name = consts.SCENE_THE_HILL_OF_MARIA;
    this.lang = consts.LANG_KR; // default lang
    this.tileset = {
      key: consts.MARIA_HILL_TILESET_KEY,
      imgKey: consts.MARIA_HILL_MAP_IMG_KEY,
      configKey: consts.MARIA_HILL_TILESET_CONFIG_KEY,
    };
    this.layers = consts.MARIA_HILL_LAYERS;
    this.characters = new Map([
      [consts.CHARACTER_RAIMU_ID, {}]
    ]);
    this.ui = {};
    this.eventList = consts.EVENT_LIST_MARIA_HILL;
    this.eventEmitter = {};
  }

  init(data) {
    this.lang = data.lang;
  }

  create(data) {
    this.#initCharacters();
    const tileMap = sceneHelpers.createTileMap(this);
    this.#initGridEngine(tileMap);
    this.#initUI();
    this.#initEventEmitter();
    
    // start scene
    this.cameras.main.fadeIn(1000, 0, 0, 0)
    this.gridEngine.moveTo(consts.CHARACTER_RAIMU_ID, { x: 1, y: 5 });
    this.#startRandomEvent(tileMap);
  }

  #initCharacters() {
    for(let key of this.characters.keys()) {
      this.characters.set(key, this.add.sprite(0, 0, key).setOrigin(0, 0));
      sceneHelpers.createCharacterAnimation(this, key, consts.CHARACTER_ANIM_KEYS, 6, -1);
    }
  }
  
  #initGridEngine(tileMap) {
    const charactersConfig = [];
    
    this.characters.forEach((val, key)=>{
      charactersConfig.push(
        {
          id: key,
          sprite: val,
          startPosition: { x: 5, y: -1 },
          speed: 1
        }
      );
    }, this);
    sceneHelpers.initGridEngine(this, tileMap, charactersConfig);

    this.#initMovementSubscriber();
  }

  #initMovementSubscriber() {
    this.characters.forEach((val)=>{
      sceneHelpers.subscribeCharacterMovements(this, val, 'walking', 'down');
    }, this);
  }
  
  #initUI() {
    this.ui = new SceneUI();
    this.ui.initMenu(this);
    this.ui.initHandBook(this);
    this.ui.initToDoList(this);
  }

  #initEventEmitter() {
    this.eventEmitter = new MariaHillEventEmitter();
  }

  #startRandomEvent(tileMap) {
    this.gridEngine
    .positionChangeFinished()
    .subscribe(({ charId, exitTile, enterTile }) => {
      if (sceneHelpers.hasTrigger(tileMap, enterTile)) {
        sceneHelpers.eventHandler(this, consts.EVENT_RAIMU_TEXTBOX, 0);
      }
    });
  }

  pauseTime() {
    this.time.paused = true;
  }
  
  restartTime() {
    this.time.paused = false;
  }
}
