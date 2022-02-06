import * as configs from '../consts/configs.js';
import * as css from '../consts/css.js';

export const CameraMixin = superclass => class extends superclass {
  initResponsiveScreen() {
    this.rexScaleOuter.add(this.cameras.main);
  }

  fadeIn(delay) {
    this.cameras.main.fadeIn(delay,
      css.DEFAULT_BACKGROUND_COLOR_RED,
      css.DEFAULT_BACKGROUND_COLOR_GREEN,
      css.DEFAULT_BACKGROUND_COLOR_BLUE
    );
  }

  fadeOut(delay) {
    this.cameras.main.fadeOut(delay,
      css.DEFAULT_BACKGROUND_COLOR_RED,
      css.DEFAULT_BACKGROUND_COLOR_GREEN,
      css.DEFAULT_BACKGROUND_COLOR_BLUE
    );
  }
}

export const GraphicMixin = superclass => class extends superclass {

  /// Phaser 3

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

  initCharacters() {
    for(let key of this.characters.keys()) {
      let sprite = this.add.sprite(0, 0, key).setOrigin(0, 0);
      this.characters.set(key, sprite);
      this.createCharacterAnimation(key, configs.CHARACTER_ANIM_KEYS, configs.DEFAULT_ANIM_FRAME_DURATION, -1);
    }
  }

  createCharacterAnimation(characterID, keys, duration, repeat) {
    for (const key of keys){
      let config = this.#createDefaultAnimationConfig(characterID, key, duration, repeat);

      if (key == configs.DEFAULT_ANIM_SLEEP_KEY) {
        config.duration = configs.DEFAULT_SLEEP_ANIM_FRAME_DURATION;
        config.repeatDuration = configs.DEFAULT_SLEEP_ANIM_REPEAT_DURATION;
      }

      this.anims.create(config);
    }

    this.#setCleanUpEvent(keys);
  }

  #createDefaultAnimationConfig(characterID, key, duration, repeat) {
    return {
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
      duration: duration, // ms
      repeat: repeat?repeat:-1,
    }
  }

  #setCleanUpEvent(keys) {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      for (let key of keys) {
        this.anims.remove(key);
      }
    });
  }

  /// Grid Engine

  initGridEngine(tileMap) {
    const charactersConfig = this.#createCharacterConfig();
    const gridEngineConfig = {
      characters: charactersConfig,
      numberOfDirections: configs.GRID_ENGINE_MOVEMENT_DIRECTION,
    };

    this.gridEngine.create(tileMap, gridEngineConfig);
    this.#subscribeDefaultMovement();
  }

  #createCharacterConfig() {
    const charactersConfig = [];

    this.characters.forEach((val, key) => {
      charactersConfig.push({
        id: key,
        sprite: val,
        startPosition: {
          x: this.position.mainCharacter.startX,
          y: this.position.mainCharacter.startY
        },
        speed: this.position.mainCharacter.speed,
      });
    });

    return charactersConfig
  }

  #subscribeDefaultMovement() {
    this.characters.forEach((val) => {
      this.subscribeCharacterMovements(val, 'walking', 'down');
    });
  }

  subscribeCharacterMovements(character, movingMotion, stopMotion) {
    this.gridEngine.movementStarted().subscribe(({ direction }) => {
      character.play(`${movingMotion}_${direction}`);
    });
    
    this.gridEngine.movementStopped().subscribe(({ direction }) => {
      character.anims.stop();
      character.setFrame(this.getIdleStopFrame(stopMotion));
    });
    
    this.gridEngine.directionChanged().subscribe(({ direction }) => {
      character.setFrame(this.getIdleStopFrame(direction));
    });
  }

  getIdleStopFrame(direction) {
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
        }, 5000);
      }, this);
      // .on('type', function () {
      // })
  
    return textBox;
  }
}

export const AnimMixin = superclass => class extends superclass {
  clickAnim(sprite, isIdle) {
    if (isIdle) {
      sprite.setFrame(this.customAnim.button.get('idle'));
    } else {
      sprite.setFrame(this.customAnim.button.get('clicked'));
    }
  }
}