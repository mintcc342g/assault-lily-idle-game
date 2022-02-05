import * as configs from '../consts/configs.js';
import * as css from '../consts/css.js';

export const CameraMixin = superclass => class extends superclass {
  initResponsiveScreen() {
    this.rexScaleOuter.add(this.cameras.main);
  }
}

export const GraphicMixin = superclass => class extends superclass {
  createTileMap() {
    const tileMap = this.make.tilemap({ key: this.keys.tileset.config });
    const tileset = tileMap.addTilesetImage(this.keys.tileset.name, this.keys.tileset.img);
    for (const layerName of this.keys.layers) {
      tileMap.createLayer(layerName, tileset);
      // this.physics.add.collider(player, layer);
      // layer.setCollisionByProperty({ collides: true });
    }
  
    return tileMap
  }

  createCharacterAnimation(characterID, keys, dutaion, repeat) {
    for (const key of keys){
      this.anims.create({
        key: `${key}`,
        frames: [
          {
            key: characterID,
            frame: `${key}_01.png`
          },
          {
            key: characterID,
            frame: `${key}_02.png`
          },
          {
            key: characterID,
            frame: `${key}_03.png`
          },
          {
            key: characterID,
            frame: `${key}_04.png`
          },
        ],
        duration: dutaion, // ms
        repeat: repeat?repeat:-1
      });
    }
  }

  initGridEngine(tileMap, characters) {
    const gridEngineConfig = {
      characters: characters,
      numberOfDirections: configs.GRID_ENGINE_MOVEMENT_DIRECTION,
    };
    this.gridEngine.create(tileMap, gridEngineConfig);
  }

  subscribeCharacterMovements(character, movingMotion, stopMotion) {
    this.gridEngine.movementStarted().subscribe(({ direction }) => {
      character.play(`${movingMotion}_${direction}`);
    });
    
    this.gridEngine.movementStopped().subscribe(({ direction }) => {
      character.anims.stop();
      character.setFrame(this.getStopFrame(stopMotion));
    });
    
    this.gridEngine.directionChanged().subscribe(({ direction }) => {
      character.setFrame(this.getStopFrame(direction));
    });
  }

  getStopFrame(direction) {
    return `idle_${direction}_01.png`;
  }  
};

export const TextBoxMixin = superclass => class extends superclass {
  createTextBox(config, action) {
    let actionX = action.x;
    let actionY = action.y;
    
    const textBox = this.rexUI.add.textBox({
      x: config.x,
      y: config.y,
      background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, css.DEFAULT_TEXTBOX_BACKGROUND_COLOR_RGB)
        .setOrigin(0, 0)
        .setAlpha(0.85)
        .setStrokeStyle(2, css.DEFAULT_MENU_COLOR_RGB),
      text: this.make.text(config).setOrigin(0, 0),
      action: action,
      space: {
        left: 20, right: 20, top: 20, bottom: 20,
        text: -20,
      }
    })
    .setOrigin(0, 0)
    .setDepth(configs.LAYER_TEXTBOX)
    .layout();
  
    textBox
      .setInteractive()
      .on('pageend', function () {
        if (textBox.isLastPage) {
          return
        }
  
        action.setVisible(true);
        // textBox.resetChildVisibleState(action);
        action.x = actionX;
        action.y = actionY;
        this.tweens.add({
            targets: action,
            y: '+=30', // '+=100'
            ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            repeat: 0, // -1: infinity
            yoyo: false
        });
  
        setTimeout(() => {
          textBox.typeNextPage();
        }, 2000);
      }, this);
      // .on('type', function () {
      // })
  
    return textBox;
  }
}