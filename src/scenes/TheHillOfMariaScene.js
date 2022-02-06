import * as configs from '../consts/configs.js';
import * as imgKeys from '../consts/imgKeys.js';
import { TheHillOfMariaSetting } from '../mixins/BaseSetting.js';

export default class TheHillOfMariaScene extends TheHillOfMariaSetting {
  constructor() {
    super(configs.SCENE_THE_HILL_OF_MARIA);
    this.keys = {
      layers: configs.MARIA_HILL_LAYERS,
      tileset: {
        name: configs.BACKGROUND_TILESET_NAME,
        img: imgKeys.BACKGROUND_TILE_IMG_KEY,
        config: imgKeys.MARIA_HILL_TILESET_CONFIG_KEY
      }
    };
    this.position = {
      mainCharacter: { startX: 5, startY: 0, speed: 1 },
    };
    this.characters = new Map([
      [imgKeys.CHARACTER_RAIMU_ID, { /* sprite */ }]
    ]);
    this.mainCharacter = { /* map */ };
    this.eventEmitter = { /* Event instance */ };
  }

  init(data) {
    this.lang = data.lang;
    this.mainCharacter = data.mainCharacter;
  }

  create() {
    this.initResponsiveScreen();

    this.initCharacters();
    this.initEvent();
    
    const tileMap = this.createTileMap();
    this.initGridEngine(tileMap);
    this.#initPositionChangeSubscriber(tileMap);
    
    // start scene
    this.fadeIn(1000);
    this.gridEngine.moveTo(imgKeys.CHARACTER_RAIMU_ID, { x: 1, y: 5 });
  }

  #initPositionChangeSubscriber(tileMap) {
    this.gridEngine
    .positionChangeFinished()
    .subscribe(({ charId, exitTile, enterTile }) => {
      if (this.#sceneStart(tileMap, enterTile)) {
        this.scene.launch(configs.SCENE_UI,
          {
            lang: this.lang,
            sceneName: this.name,
            academy: this.mainCharacter.get('academy'),
          }
        );
        this.eventHandler(0);
      }
    });
  }

  #sceneStart(tileMap, position) {
    return tileMap.layers.some((layer) => {
      const tile = tileMap.getTileAt(position.x, position.y, false, layer.name);
      return tile?.properties?.speechBubbleTrigger;
    });
  }
}
