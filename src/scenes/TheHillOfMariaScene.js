import Phaser from 'phaser';
import MariaHillMap from '../assets/maps/map-maria-hill.json';
import PlayerRaimu from '../assets/sprites/player-raimu.json';
// import MariaHillImage from '../assets/maps/map-maria-hill-tiles.png'; // not work on images. use require() now.
// import PlayerRaimuImg from '../assets/sprites/player-raimu.png';

// TODO: change to import consts
const MARIA_HILL_LAYER_GROUND = 'ground_unwalkable';
const MARIA_HILL_LAYER_ROAD = 'path_walkable';
const MARIA_HILL_TILESET_NAME = 'maria_hill_tiles';
const PLAYER_ANIM_KEYS = ["walking_down","walking_left","walking_right","walking_up"];
const GRID_ENGINE_MOVEMENT_DIRECTION = 4;

export default class TheHillOfMariaScene extends Phaser.Scene {
  constructor() {
    super('TheHillOfMariaScene');
    this.mapImgKey = 'hill_tileset';
    this.tilesetKey = 'map_maria_hill';
    this.spriteName = 'raimu';
    this.spriteID = 'player_raimu';
  }

  preload() {
    const hillImg = require('../assets/maps/map-maria-hill-tiles.png');
    this.load.tilemapTiledJSON(this.tilesetKey, MariaHillMap);
    this.load.image(this.mapImgKey, hillImg);
    
    const playerImg = require('../assets/sprites/player-raimu.png');
    this.load.atlas(this.spriteID, playerImg, PlayerRaimu);
  }

  create() {
    // init phaser
    const map = this.getMap();
    this.setPlayerSprite();
    this.addAnimationFrames(PLAYER_ANIM_KEYS, 6, -1);
    
    // init grid engine
    this.initGridEngine(map);
    this.setMovementSubscribers();

    // start scene
    this.gridEngine.moveTo(this.spriteID, { x: 1, y: 5 });
  }

  update() {

  }

  getMap() {
    const map = this.make.tilemap({ key: this.tilesetKey });
    const tileset = map.addTilesetImage(MARIA_HILL_TILESET_NAME, this.mapImgKey);
    map.createLayer(MARIA_HILL_LAYER_GROUND, tileset, 0, 0);
    map.createLayer(MARIA_HILL_LAYER_ROAD, tileset, 0, 0);

    return map
  }

  setPlayerSprite() {
    this.player = this.add.sprite(0, 0, this.spriteID);
    this.player.scale = 1;
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

  initGridEngine(map) {
    const gridEngineConfig = {
      characters: [{
          id: this.spriteID,
          sprite: this.player,
          startPosition: { x: 5, y: -1 },
          speed: 1,
      }],
      numberOfDirections: GRID_ENGINE_MOVEMENT_DIRECTION,
    };

    this.gridEngine.create(map, gridEngineConfig);
  }

  setMovementSubscribers() {
    this.gridEngine.movementStarted().subscribe(({ direction }) => {
      this.player.play(`walking_${direction}`);
    });
    
    this.gridEngine.movementStopped().subscribe(({ direction }) => {
      this.player.anims.stop();
      this.player.setFrame(this.getStopFrame(direction));
    });
    
    this.gridEngine.directionChanged().subscribe(({ direction }) => {
      this.player.setFrame(this.getStopFrame(direction));
    });
  };

  getStopFrame(direction) {
    return `idle_${direction}_01`;
  };
}
