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

  /**
   * config object properties
   * @x int, default 0
   * @y int, default 0
   * @key string, image key
   * @originX int, default 0
   * @originY int, default 0
   * @depth int
   * @visible bool
   * @tint hexadecimal color, e.g. 0x7c6953
   */
  makeImage(config) {
    const image = this.add.image(config.x?config.x:0, config.y?config.y:0, config.key);

    if (config.hasOwnProperty('depth')) {
      image.setDepth(config.depth);
    }
    if (config.hasOwnProperty('visible')) {
      image.setVisible(config.visible);
    }
    if (config.hasOwnProperty('tint')) {
      image.setTint(config.tint);
    }

    image.setOrigin(config.originX?config.originX:0, config.originY?config.originY:0);
    
    return image
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
   */
  makeSprite(config) {
    const sprite = this.add.sprite(config.x?config.x:0, config.y?config.y:0, config.key);

    if (config.hasOwnProperty('depth')) {
      sprite.setDepth(config.depth);
    }
    if (config.hasOwnProperty('visible')) {
      sprite.setVisible(config.visible);
    }
    if (config.hasOwnProperty('interactive')) {
      config.interactive?sprite.setInteractive():sprite.disableInteractive();
    }

    sprite.setOrigin(config.originX?config.originX:0, config.originY?config.originY:0);
    
    return sprite
  }
}