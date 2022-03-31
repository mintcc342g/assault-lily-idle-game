import {
  GRID_ENGINE_MOVEMENT_DIRECTION, CHARACTER_ANIM_KEYS, DEFAULT_ANIM_FRAME_DURATION,
  DEFAULT_ANIM_SLEEP_DOWN_KEY, DEFAULT_SLEEP_ANIM_FRAME_DURATION, DEFAULT_SLEEP_ANIM_REPEAT_DURATION
} from '../../consts/configs.js';

export const GraphicMixin = superclass => class extends superclass {

  /**
   * Phaser 3
   * 
   */
  createTileMap() {
    const tileMap = this.make.tilemap({ key: this.keys.tileset.config });
    const tileset = tileMap.addTilesetImage(this.keys.tileset.name, this.keys.tileset.img);

    for (const layerName of this.keys.layers) {
      tileMap.createLayer(layerName, tileset);
    }
  
    return tileMap
  }

  initCharacterSprites() {
    for(let characterID of this.characters.keys()) {
      let sprite = this.makeSprite({ key: characterID, visible: false });
      this.characters.get(characterID).setSprite(sprite);
      this.#createAnimFrame(characterID, CHARACTER_ANIM_KEYS, DEFAULT_ANIM_FRAME_DURATION, -1);
    }
  }

  #createAnimFrame(characterID, animKeys, duration, repeat) {
    for (const animKey of animKeys){
      let config = this.#createAnimConfig(characterID, animKey, duration, repeat);

      if (animKey == DEFAULT_ANIM_SLEEP_DOWN_KEY) {
        config.duration = DEFAULT_SLEEP_ANIM_FRAME_DURATION;
        config.repeatDuration = DEFAULT_SLEEP_ANIM_REPEAT_DURATION;
      }

      this.anims.create(config);
      this.#setCleanUpAnimEvent(characterID, animKey);
    }
  }

  #createAnimConfig(characterID, animKey, duration, repeat) {
    return {
      key: `${characterID}_${animKey}`, // NOTE: characterID_movingMotion_direction
      frames: [
        {
          key: characterID,
          frame: `${animKey}_01.png`
        },
        {
          key: characterID,
          frame: `${animKey}_02.png`
        },
        {
          key: characterID,
          frame: `${animKey}_03.png`
        },
        {
          key: characterID,
          frame: `${animKey}_04.png`
        },
      ],
      duration: duration, // NOTE: ms
      repeat: repeat?repeat:-1,
    }
  }

  #setCleanUpAnimEvent(characterID, animKey) {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.anims.remove(`${characterID}_${animKey}`);
    });
  }


  /**
   * Grid Engine
   * 
   */
  initGridEngine(tileMap) {
    const charactersConfig = this.#createCharacterConfig();
    const gridEngineConfig = {
      characters: charactersConfig,
      numberOfDirections: GRID_ENGINE_MOVEMENT_DIRECTION,
    };

    this.gridEngine.create(tileMap, gridEngineConfig);
    this.#subscribeDefaultMovement();
  }

  #createCharacterConfig() {
    const charactersConfig = [];

    this.characters.forEach((character) => {
      charactersConfig.push({
        id: character.id,
        sprite: character.sprite,
        startPosition: {
          x: character.getPosition('start').x,
          y: character.getPosition('start').y
        },
        speed: character.speed,
      });
    });

    return charactersConfig
  }

  #subscribeDefaultMovement() {
    this.characters.forEach((character) => {
      this.#subscribeCharacterMovements(character, 'walking');
    });
  }

  #subscribeCharacterMovements(character, movingMotion) {
    this.gridEngine.movementStarted().subscribe(({ charId, direction }) => {
      if (!character.isEqual(charId)) {
        return
      }
      character.play(movingMotion, direction);
    });
    
    this.gridEngine.movementStopped().subscribe(() => {
      character.stop();
    });
    
    this.gridEngine.directionChanged().subscribe(({ direction }) => {
      character.setIdleFrame(direction);
    });
  }
};