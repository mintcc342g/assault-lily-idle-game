import * as configs from '../consts/configs.js';
import * as events from '../consts/events.js';
import * as gameData from '../consts/gameData.js';
import * as imgKeys from '../consts/imgKeys.js';
import * as scenario from '../consts/scenario.js';
import { GamePlaySetting } from '../sceneHelpers/BaseSetting.js';
import Character from '../sceneHelpers/Character.js';

export default class TheHillOfMariaScene extends GamePlaySetting {
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
    this.mainCharacterID = '';
    this.eventCharacterID = '';
  }

  init(data) {
    this.lang = data.lang;
    this.mainCharacterID = data.mainCharacterID;
    this.characters = new Map([]);
  }
  
  create() {
    this.initResponsiveScreen();
    
    this.#prepareScenario();
    this.initCharacterSprites();
    this.initTextBox();
    
    const tileMap = this.createTileMap();
    this.initGridEngine(tileMap);
    this.#addMovementSubscriber(tileMap);
    
    // start scene
    this.fadeIn(1000);
    const mainCharacter = this.characters.get(this.mainCharacterID);
    mainCharacter.setVisible(true);
    this.gridEngine.moveTo(mainCharacter.id, {
      x: mainCharacter.getPosition('fixed').x,
      y: mainCharacter.getPosition('fixed').y 
    });
  }

  #prepareScenario() {
    this.initDefaultEvents();

    switch (this.mainCharacterID) {
      case imgKeys.CHARACTER_RAIMU_ID:
        this.#createCastsForRaimu();
        this.#createEventsForRaimu();
        break;
    
      default:
        break;
    }
  }

  #createCastsForRaimu() {
    const raimu = new Character(imgKeys.CHARACTER_RAIMU_ID);
    raimu.addPosition('start', 5, 0, 'down');
    raimu.addPosition('fixed', 1, 5, 'down');
    raimu.setSpeed(1);

    const sachie = new Character(imgKeys.CHARACTER_SACHIE_ID);
    sachie.addPosition('start', 5, 0, 'down');
    sachie.addPosition('meet_raimu', 5, 5, 'left');
    sachie.addPosition(events.EVENT_CONVERSATION, 2, 5, 'down');
    sachie.addPosition(events.EVENT_CONVERSATION_DONE, 5, 0, 'up');
    sachie.setSpeed(1);

    this.characters.set(raimu.id, raimu);
    this.characters.set(sachie.id, sachie);
  }

	#createEventsForRaimu() {
		this.addEvent(events.EVENT_APPEAR_SACHIE, () => { this.appearSachie() });
	}

  appearSachie() {
    const eventCharacter = this.characters.get(imgKeys.CHARACTER_SACHIE_ID);
    const nextEvent = eventCharacter.getPosition('meet_raimu');

    if (eventCharacter.isVisible()) {
      return
    }

    eventCharacter.setVisible(true);
    this.gridEngine.moveTo(eventCharacter.id, { x: nextEvent.x, y: nextEvent.y } );
  }

  setCharacterFrameByEvent(characterID, eventName) {
    this.characters.get(characterID).setFrameByName(eventName);
  }

  #addMovementSubscriber() {
    this.gridEngine
      .movementStopped()
      .subscribe(({ charId, direction }) => {
        this.#selectEvent(charId);
      });
  }

  #selectEvent(characterID) {
    const character = this.characters.get(characterID);
    const currentPosition = this.gridEngine.getPosition(characterID);
    const startScene = character.getPosition('fixed');
    const eventMeetRaimu = character.getPosition('meet_raimu');
    const eventTalk = character.getPosition(events.EVENT_CONVERSATION);
    const eventLeave = character.getPosition(events.EVENT_CONVERSATION_DONE);

    if (currentPosition.x == startScene?.x && currentPosition.y == startScene?.y) {
      this.setCharacterFrameByEvent(characterID, 'fixed');
      this.#startScene(characterID);
      return
    }

    if (currentPosition.x == eventMeetRaimu?.x && currentPosition.y == eventMeetRaimu?.y) {
      this.eventCharacterID = characterID;
      this.#eventMeetRaimu(events.EVENT_CONVERSATION);
      return
    }
    
    if (currentPosition.x == eventTalk?.x && currentPosition.y == eventTalk?.y) {
      this.eventCharacterID = characterID;
      this.characters.get(this.mainCharacterID).setIdleFrame('down');
      this.characters.get(this.eventCharacterID).setIdleFrame('down');
      this.eventHandler(5000, events.EVENT_CONVERSATION);
      return
    }
    
    if (currentPosition.x == eventLeave?.x && currentPosition.y == eventLeave?.y) {
      this.eventCharacterID = characterID;
      this.#disappearEventCharacter();
      return
    }
  }

  #startScene(characterID) {
    this.eventHandler(1000, events.EVENT_SELF_SPEECH);

    this.scene.launch(configs.SCENE_UI,
      {
        lang: this.lang,
        sceneName: this.name,
        academy: gameData.CHARACTER_DATA.get(characterID).get('academy')
      }
    );
  }

  #eventMeetRaimu(nextEvent) {
    this.lookCharacter(this.mainCharacterID);
    this.lookCharacter(this.eventCharacterID);

    const scripts = scenario.RANDOM_CONVERSATION.get(this.mainCharacterID).get(this.eventCharacterID).get('start').get(this.lang);
    const nextPosition = this.characters.get(this.eventCharacterID).getPosition(nextEvent);

    let scriptNum = 0;
    let speaker = scripts[scriptNum][0];
    let script = scripts[scriptNum][1];
    
    const scriptReader = (textBox, action) => {
      scriptNum++;

      if (scriptNum >= scripts.length) {
        this.endConversation(textBox, nextPosition);
        return
      }

      speaker = scripts[scriptNum][0]; // fix: show the speaker's name
      script = scripts[scriptNum][1];

      action.setVisible(false);
      textBox.start(script, 50);
    };

    this.createConversationTextBox(null, null, scriptReader).start(script, 50);
  }

  endConversation(textBox, nextPosition) {
    textBox.destroy();
    this.moveCharacterTo(this.eventCharacterID, nextPosition.x, nextPosition.y);
  }

  #disappearEventCharacter() {
    this.characters.get(this.eventCharacterID).setVisible(false);
    this.characters.get(this.mainCharacterID).setIdleFrame('down');
    this.eventHandler(2000, events.EVENT_SELF_SPEECH);
  }
}
