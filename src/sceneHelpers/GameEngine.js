import Phaser from 'phaser';
import { DEFAULT_BG_COLOR_R, DEFAULT_BG_COLOR_G, DEFAULT_BG_COLOR_B } from '../consts/css.js';

export class GameEngine extends Phaser.Scene {
  constructor(service) {
    super(service);
    this.service = service;
  }

  initResponsiveScreen() {
    this.rexScaleOuter.add(this.cameras.main);
  }

  sceneStart(name, data) {
    this.scene.start(name, data);
  }

  fadeIn(delay) {
    this.cameras.main.fadeIn(delay,
      DEFAULT_BG_COLOR_R,
      DEFAULT_BG_COLOR_G,
      DEFAULT_BG_COLOR_B
    );
  }

  fadeOut(delay) {
    this.cameras.main.fadeOut(delay,
      DEFAULT_BG_COLOR_R,
      DEFAULT_BG_COLOR_G,
      DEFAULT_BG_COLOR_B
    );
  }

  makeImage(config) {
    let image = this.add.image(config.x?config.x:0, config.y?config.y:0, config.key);
    image = this.setGameObjectObtions(image, config);
    
    return image
  }

  makeSprite(config) {
    let sprite = this.add.sprite(config.x?config.x:0, config.y?config.y:0, config.key);
    sprite = this.setGameObjectObtions(sprite, config);
    
    return sprite
  }

  /**
   * params
   * @textStyle an object for Phaser3 Text
   */
  makeText(config) {
    let text = this.make.text(config.textStyle);
    text = this.setGameObjectObtions(text, config);

    return text
  }

  /**
   * config object properties
   * @x int, default 0
   * @y int, default 0
   * @key string, image key
   * @originX int, default 0
   * @originY int, default 0
   * @depth int
   * @visible bool
   * @interactive bool
   * @tint hexadecimal color, e.g. 0x7c6953
   */
  setGameObjectObtions(gameObj, config) {
    if (config.hasOwnProperty('depth')) {
      gameObj.setDepth(config.depth);
    }
    if (config.hasOwnProperty('visible')) {
      gameObj.setVisible(config.visible);
    }
    if (config.hasOwnProperty('tint')) {
      gameObj.setTint(config.tint);
    }
    if (config.hasOwnProperty('interactive')) {
      config.interactive?gameObj.setInteractive():gameObj.disableInteractive();
    }

    gameObj.setOrigin(config.originX?config.originX:0, config.originY?config.originY:0);

    return gameObj
  }
}