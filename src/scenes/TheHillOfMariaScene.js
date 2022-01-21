import Phaser from 'phaser';
import { createTextBox } from '../components/MyTextBox.js';
import MariaHillJSON from '../assets/maps/map-maria-hill.json';
import PlayerRaimuJSON from '../assets/sprites/player-raimu.json';
// import MariaHillImage from '../assets/maps/map-maria-hill-tiles.png'; // not work on images. use require() now.
// import PlayerRaimuImg from '../assets/sprites/player-raimu.png';

// TODO: change to import consts
const MARIA_HILL_LAYER_GROUND = 'ground_unwalkable';
const MARIA_HILL_LAYER_ROAD = 'road_walkable';
const MARIA_HILL_LAYER_COLLISIONS = 'collisions';
const MARIA_HILL_TILESET_NAME = 'maria_hill_tiles';
const PLAYER_ANIM_KEYS = ["walking_down","walking_left","walking_right","walking_up"];
const GRID_ENGINE_MOVEMENT_DIRECTION = 4;
const content = `(The hill of Maria...\nI like this place.)`

export default class TheHillOfMariaScene extends Phaser.Scene {
  constructor() {
    super('TheHillOfMariaScene');
    this.mapImgKey = 'hill_tileset';
    this.tileMapKey = 'map_maria_hill';
    this.spriteID = 'player_raimu';
  }

  preload() {
    const hillImg = require('../assets/maps/map-maria-hill-tiles.png');
    this.load.tilemapTiledJSON(this.tileMapKey, MariaHillJSON);
    this.load.image(this.mapImgKey, hillImg);
    
    const playerImg = require('../assets/sprites/player-raimu.png');
    this.load.atlas(this.spriteID, playerImg, PlayerRaimuJSON);
  }

  create() {
    // init phaser
    const player = this.makePlayerSprite();
    const tileMap = this.makeTileMap(player);
    this.addAnimationFrames(PLAYER_ANIM_KEYS, 6, -1);
    
    // init grid engine
    this.initGridEngine(tileMap, player);
    this.setMovementSubscribers(player);
    this.setPositionSubscribers(tileMap);

    // start scene
    this.gridEngine.moveTo(this.spriteID, { x: 1, y: 5 });
  }

  update() {

  }

  makeTileMap(player) {
    const tileMap = this.make.tilemap({ key: this.tileMapKey });
    const tileset = tileMap.addTilesetImage(MARIA_HILL_TILESET_NAME, this.mapImgKey);
    tileMap.createLayer(MARIA_HILL_LAYER_GROUND, tileset);
    tileMap.createLayer(MARIA_HILL_LAYER_ROAD, tileset);
    tileMap.createLayer(MARIA_HILL_LAYER_COLLISIONS, tileset);

    // this.physics.add.collider(player, groundLayer);
    // groundLayer.setCollisionByProperty({ collides: true });

    return tileMap
  }

  makePlayerSprite() {
    const player = this.add.sprite(0, 0, this.spriteID);
    player.scale = 1;

    return player
  }

  addAnimationFrames(keys, frameRate, repeat) {
    for (const key of keys){
      this.anims.create({
        key: `${key}`,
        frames: [
          {
            key: this.spriteID,
            frame: `${key}_01.png`
          },
          {
            key: this.spriteID,
            frame: `${key}_02.png`
          },
          {
            key: this.spriteID,
            frame: `${key}_03.png`
          },
          {
            key: this.spriteID,
            frame: `${key}_04.png`
          },
        ],
        frameRate: frameRate,
        repeat: repeat
      });
    }
  };

  initGridEngine(tileMap, player) {
    const gridEngineConfig = {
      characters: [{
          id: this.spriteID,
          sprite: player,
          startPosition: { x: 5, y: -1 },
          speed: 1
      }],
      numberOfDirections: GRID_ENGINE_MOVEMENT_DIRECTION,
    };

    this.gridEngine.create(tileMap, gridEngineConfig);
  }

  setMovementSubscribers(player) {
    this.gridEngine.movementStarted().subscribe(({ direction }) => {
      player.play(`walking_${direction}`);
    });
    
    this.gridEngine.movementStopped().subscribe(({ direction }) => {
      player.anims.stop();
      player.setFrame(this.getStopFrame('down'));
    });
    
    this.gridEngine.directionChanged().subscribe(({ direction }) => {
      player.setFrame(this.getStopFrame(direction));
    });
  };

  getStopFrame(direction) {
    return `idle_${direction}_01.png`;
  };

  setPositionSubscribers(tileMap) {
    this.gridEngine
    .positionChangeFinished()
    .subscribe(({ charId, exitTile, enterTile }) => {
      if (this.hasTrigger(tileMap, enterTile)) {
        const typingSpeed = 50;
        const x = 315;
        const y = 620;
        const boxConfig = { wrapWidth: 500, fixedWidth: 500, fixedHeight: 80 };

        const textbox = createTextBox(this, x, y, boxConfig).start(content, typingSpeed);
        textbox.on('complete', function () {
          setTimeout(function(){
            textbox.destroy();
          }, 2000);
        })
      }
    });
  }
  
  hasTrigger(tileMap, position) {
      return tileMap.layers.some((layer) => {
        const tile = tileMap.getTileAt(position.x, position.y, false, layer.name);
        return tile?.properties?.speechBubbleTrigger;
      });
  }
}
