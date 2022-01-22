import Phaser from 'phaser';
import { createTextBox } from '../components/MyTextBox.js';
import * as sceneHelpers from '../utils/sceneHelpers.js';
import * as consts from '../constants/constants.js';
import * as utils from '../utils/utils.js';
import MariaHillJSON from '../assets/maps/map-maria-hill.json';
import PlayerRaimuJSON from '../assets/sprites/player-raimu.json';
import MariaHillImage from '../assets/maps/map-maria-hill-tiles.png';
import PlayerRaimuImg from '../assets/sprites/player-raimu.png';

export default class TheHillOfMariaScene extends Phaser.Scene {
  constructor() {
    super('TheHillOfMariaScene');
    this.lang = 'kr'; // TODO: inherit from menu scene
  }

  preload() {
    this.load.tilemapTiledJSON(consts.MARIA_HILL_TILEMAP_KEY, MariaHillJSON);
    this.load.rexImageURI(consts.MARIA_HILL_MAP_IMG_KEY, MariaHillImage);
    this.load.atlas(consts.PLAYER_RAIMU_ID, PlayerRaimuImg, PlayerRaimuJSON);
  }

  create() {
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
      id: this.spriteID,
      sprite: player,
      startPosition: { x: 5, y: -1 },
      speed: 1
    }]);
    sceneHelpers.subscribeCharacterMovements(this, player, 'walking', 'down');
    this.subscribePosition(tileMap);

    // start scene
    this.gridEngine.moveTo(this.spriteID, { x: 1, y: 5 });
  }

  update() {

  }

  subscribePosition(tileMap) {
    this.gridEngine
    .positionChangeFinished()
    .subscribe(({ charId, exitTile, enterTile }) => {
      if (sceneHelpers.hasTrigger(tileMap, enterTile)) {
        this.popUpTextBox(consts.RAIMU_RANDOM_TEXTS.get(this.lang));
      }
    });
  }

  popUpTextBox(texts) {
    const typingSpeed = 50;
    const x = 315;
    const y = 620;
    const radNum = utils.rand(0, texts.length-1);

    const textbox = createTextBox(this, x, y, consts.boxConfig).start(texts[radNum], typingSpeed);
    textbox.on('complete', function () {
      setTimeout(function(){
        textbox.destroy();
          }, 2000);
    })
  }
}
