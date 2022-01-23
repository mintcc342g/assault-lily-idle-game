import Phaser from 'phaser';
import MariaHillEventEmitter from '../components/Events.js';
import * as ui from '../components/UI.js';
import * as sceneHelpers from '../utils/sceneHelpers.js';
import * as consts from '../variables/constants.js';
import MariaHillJSON from '../assets/maps/map-maria-hill.json';
import PlayerRaimuJSON from '../assets/sprites/player-raimu.json';
import MariaHillImage from '../assets/maps/map-maria-hill-tiles.png';
import PlayerRaimuImg from '../assets/sprites/player-raimu.png';

export default class TheHillOfMariaScene extends Phaser.Scene {
  constructor() {
    super('TheHillOfMariaScene');
    this.name = 'scene_the_hill_of_maria';
    this.lang = 'kr'; // TODO: inherit from menu scene
    this.eventList = consts.EVENT_LIST_MARIA_HILL;
    this.eventEmitter = new MariaHillEventEmitter();
  }

  preload() {
    this.load.tilemapTiledJSON(consts.MARIA_HILL_TILEMAP_KEY, MariaHillJSON);
    this.load.rexImageURI(consts.MARIA_HILL_MAP_IMG_KEY, MariaHillImage);
    this.load.atlas(consts.PLAYER_RAIMU_ID, PlayerRaimuImg, PlayerRaimuJSON);
    this.prepareUI();
  }

  create(data) {
    // init phaser
    const player = sceneHelpers.makePlayerSprite(this, consts.PLAYER_RAIMU_ID);
    const tileMap = sceneHelpers.makeTileMap(
      this,
      consts.MARIA_HILL_TILEMAP_KEY,
      consts.MARIA_HILL_TILESET_KEY,
      consts.MARIA_HILL_MAP_IMG_KEY,
      consts.MARIA_HILL_LAYERS
    );
    sceneHelpers.makeCharacterAnimation(this, consts.PLAYER_RAIMU_ID, consts.PLAYER_ANIM_KEYS, 6, -1);

    // init grid engine
    sceneHelpers.initGridEngine(this, tileMap, [{
      id: consts.PLAYER_RAIMU_ID,
      sprite: player,
      startPosition: { x: 5, y: -1 },
      speed: 1
    }]);
    sceneHelpers.subscribeCharacterMovements(this, player, 'walking', 'down');

    // start scene
    this.setUI();
    this.gridEngine.moveTo(consts.PLAYER_RAIMU_ID, { x: 1, y: 5 });
    this.startRandomEvent(tileMap);
  }

  update(time, delta) {
  }

  startRandomEvent(tileMap) {
    this.gridEngine
    .positionChangeFinished()
    .subscribe(({ charId, exitTile, enterTile }) => {
      if (sceneHelpers.hasTrigger(tileMap, enterTile)) {
        this.eventEmitter.eventHandler(this, consts.EVENT_RAIMU_TEXTBOX, 0);
      }
    });
  }
  
  prepareUI() {
    ui.loadButton(this);
    ui.loadNote(this);
  }

  setUI() {
    // Menu Button
    ui.setButton(this);
  }
}
