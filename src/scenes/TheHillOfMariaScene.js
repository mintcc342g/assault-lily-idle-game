import Phaser from 'phaser';
import MariaHillEventEmitter from '../components/Events.js';
import SceneUI from '../components/SceneUI.js';
import * as sceneHelpers from '../utils/sceneHelpers.js';
import * as consts from '../variables/constants.js';
import MariaHillJSON from '../assets/maps/map-maria-hill.json';
import PlayerRaimuJSON from '../assets/sprites/player-raimu.json';
import MariaHillImage from '../assets/maps/map-maria-hill-tiles.png';
import PlayerRaimuImg from '../assets/sprites/player-raimu.png';

export default class TheHillOfMariaScene extends Phaser.Scene {
  constructor() {
    super('TheHillOfMariaScene');
    this.name = 'TheHillOfMariaScene';
    this.lang = consts.LANG_KR; // default lang
    this.tileset = {
      key: consts.MARIA_HILL_TILESET_KEY,
      imgKey: consts.MARIA_HILL_MAP_IMG_KEY,
      configKey: consts.MARIA_HILL_TILESET_CONFIG_KEY,
    };
    this.layers = consts.MARIA_HILL_LAYERS;
    this.character = {
      id: consts.PLAYER_RAIMU_ID,
    };
    this.ui = new SceneUI();
    this.eventList = consts.EVENT_LIST_MARIA_HILL;
    this.eventEmitter = new MariaHillEventEmitter();
  }

  init(data) {
    this.lang = data.lang;
  }

  preload() {
    this.load.tilemapTiledJSON(this.tileset.configKey, MariaHillJSON);
    this.load.rexImageURI(this.tileset.imgKey, MariaHillImage);
    this.load.atlas(this.character.id, PlayerRaimuImg, PlayerRaimuJSON);
    this.prepareUI();
  }

  create(data) {
    // init phaser
    const player = sceneHelpers.createPlayerSprite(this);
    const tileMap = sceneHelpers.createTileMap(this);
    sceneHelpers.createCharacterAnimation(this, consts.PLAYER_ANIM_KEYS, 6, -1);

    // init grid engine
    sceneHelpers.initGridEngine(this, tileMap, [{
      id: this.character.id,
      sprite: player,
      startPosition: { x: 5, y: -1 },
      speed: 1
    }]);
    sceneHelpers.subscribeCharacterMovements(this, player, 'walking', 'down');

    // init UI
    this.initUI();

    // start scene
    this.cameras.main.fadeIn(1000, 0, 0, 0)
    this.gridEngine.moveTo(this.character.id, { x: 1, y: 5 });
    this.startRandomEvent(tileMap);
  }

  update(time, delta) {
  }

  prepareUI() {
    this.ui.loadUIImg(this);
  }

  initUI() {
    this.ui.initMenu(this);
    this.ui.initHandBook(this);
    this.ui.initToDoList(this);
  }

  startRandomEvent(tileMap) {
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
