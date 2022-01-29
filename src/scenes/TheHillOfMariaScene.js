import Phaser from 'phaser';
import MariaHillEventEmitter from '../components/Events.js';
import SceneUI from '../components/SceneUI.js';
import * as sceneHelpers from '../utils/sceneHelpers.js';
import * as configs from '../consts/configs.js';
import * as imgKeys from '../consts/imgKeys.js';

export default class TheHillOfMariaScene extends Phaser.Scene {
  constructor() {
    super(configs.SCENE_THE_HILL_OF_MARIA);
    this.name = configs.SCENE_THE_HILL_OF_MARIA;
    this.menuButtonKey = imgKeys.MENU_BUTTON_KEY;
    this.buttonFrame = configs.DEFAULT_BUTTON_ANIM;
    this.layers = configs.MARIA_HILL_LAYERS;
    this.tileset = {
      key: configs.MARIA_HILL_TILESET_KEY,
      imgKey: imgKeys.MARIA_HILL_MAP_IMG_KEY,
      configKey: imgKeys.MARIA_HILL_TILESET_CONFIG_KEY,
    };
    this.characters = new Map([
      [imgKeys.CHARACTER_RAIMU_ID, { /* sprite */ }]
    ]);
    this.position = {
      character: { x: 5, y: -1, speed: 1 },
      menuButton: { x: 565,  y: 30 },
    }
    this.lang = '';
    this.ui = { /* UI instance (TODO: need to change as a Scene) */ };
    this.menuButton = { /* sprite */ };
    this.eventEmitter = { /* Event instance */ };
    this.mainCharacter = { /* sprite from former scene */ };
  }

  init(data) {
    if (!data.hasOwnProperty('lang')) {
      this.lang = configs.LANG_KR  // default lang
    } else {
      this.lang = data.lang;
    }
    
    this.mainCharacter = data.mainCharacter
  }

  create(data) {
    this.#initCharacters();
    const tileMap = sceneHelpers.createTileMap(this);
    this.#initGridEngine(tileMap);
    this.#initUI();
    this.#initEventEmitter();
    
    // start scene
    this.cameras.main.fadeIn(1000, 0, 0, 0)
    this.gridEngine.moveTo(imgKeys.CHARACTER_RAIMU_ID, { x: 1, y: 5 }); // TODO: UI scene would be started after the character's movement be done
    this.#startRandomEvent(tileMap);
  }

  #initCharacters() {
    for(let key of this.characters.keys()) {
      this.characters.set(key, this.add.sprite(0, 0, key).setOrigin(0, 0));
      sceneHelpers.createCharacterAnimation(this, key, configs.CHARACTER_ANIM_KEYS, 6, -1);
    }
  }
  
  #initGridEngine(tileMap) {
    const charactersConfig = [];
    
    this.characters.forEach((val, key)=>{
      charactersConfig.push(
        {
          id: key,
          sprite: val,
          startPosition: { x: this.position.character.x, y: this.position.character.y },
          speed: this.position.character.speed,
        }
      );
    }, this);
    sceneHelpers.initGridEngine(this, tileMap, charactersConfig);

    this.#initMovementSubscriber();
  }

  #initMovementSubscriber() {
    this.characters.forEach((val)=>{
      sceneHelpers.subscribeCharacterMovements(this, val, 'walking', 'down');
    }, this);
  }
  
  #initUI() {
    this.#initMenuButton();

    // TODO: make UI as a scene
    this.ui = new SceneUI();
    this.ui.initMenu(this);
  }

  #initMenuButton() {
    this.menuButton = this.add.sprite(this.position.menuButton.x, this.position.menuButton.y, this.menuButtonKey)
      .setDepth(configs.LAYER_UI)
      .setVisible(true)
      .setInteractive()
      .setOrigin(0, 0);

    this.menuButton
      .on('pointerdown', ()=>{
        this.menuButton.setFrame(this.buttonFrame.get('clicked'));
      }, this)
      .on('pointerup', ()=>{
        this.menuButton.setFrame(this.buttonFrame.get('idle'));
        this.activeMenuButton(false);
        this.ui.openMenu(this); // TODO: stop this scene and call UI scene
      }, this);
  }

  activeMenuButton(isActive) { // TODO: remove when make UI scene
    this.menuButton.enable = isActive;
    this.menuButton.setVisible(isActive);
  }

  #initEventEmitter() {
    this.eventEmitter = new MariaHillEventEmitter();
  }

  #startRandomEvent(tileMap) {
    this.gridEngine
    .positionChangeFinished()
    .subscribe(({ charId, exitTile, enterTile }) => {
      if (sceneHelpers.hasTrigger(tileMap, enterTile)) {
        this.eventEmitter.eventHandler(this, 0);
      }
    });
  }

  pauseTime() {
    this.time.paused = true;
  }
  
  restartTime() {
    this.time.paused = false;
  }
}
