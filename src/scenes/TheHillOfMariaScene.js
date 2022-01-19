import Phaser from 'phaser';
import MariaHillMap from '../assets/maps/map-maria-hill.json';
// import MariaHillImage from '../assets/images/map-maria-hill-tiles.png'; // not work by import. use require() now.

// TODO: change to import consts
const MARIA_HILL_LAYER_GROUND = 'ground_unwalkable';
const MARIA_HILL_LAYER_ROAD = 'path_walkable';
const MARIA_HILL_TILESET_NAME = 'maria_hill_tiles';

export default class TheHillOfMariaScene extends Phaser.Scene {
  constructor() {
    super('TheHillOfMariaScene');
    this.mapImgKey = 'hill_tileset';
    this.tilesetKey = 'map_maria_hill';
  }

  preload() {
    const hillImg = require('../assets/images/map-maria-hill-tiles.png');

    this.load.tilemapTiledJSON(this.tilesetKey, MariaHillMap);
    this.load.image(this.mapImgKey, hillImg);
  }

  create() {
    const map = this.make.tilemap({ key: this.tilesetKey });
    const tileset = map.addTilesetImage(MARIA_HILL_TILESET_NAME, this.mapImgKey);
    map.createLayer(MARIA_HILL_LAYER_GROUND, tileset, 0, 0);
    map.createLayer(MARIA_HILL_LAYER_ROAD, tileset, 0, 0);

    const gridEngineConfig = {
    };
    this.gridEngine.create(map, gridEngineConfig);
  }

  update() {

  }
}