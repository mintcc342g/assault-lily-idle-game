import { SCENE_THE_HILL_OF_MARIA, SCENE_UI, MARIA_HILL_LAYERS, BACKGROUND_TILESET_NAME } from '../consts/configs.js';
import { EVENT_THINKING, EVENT_APPEAR_SACHIE, EVENT_CONVERSATION, EVENT_CONVERSATION_DONE } from '../consts/events.js';
import { BACKGROUND_TILE_IMG_KEY, MARIA_HILL_TILESET_CONFIG_KEY } from '../consts/imgKeys.js';
import { GamePlaySetting } from '../sceneHelpers/BaseSetting.js';
import Character from '../sceneHelpers/Character.js';

export default class TheHillOfMariaScene extends GamePlaySetting {
  constructor() {
    super(SCENE_THE_HILL_OF_MARIA);
    this.keys = {
      layers: MARIA_HILL_LAYERS,
      tileset: {
        name: BACKGROUND_TILESET_NAME,
        img: BACKGROUND_TILE_IMG_KEY,
        config: MARIA_HILL_TILESET_CONFIG_KEY
      }
    };
    this.mainCharacterID = '';
    this.partnerID = '';
  }


  init(data) {
    this.lang = data.lang;
    this.mainCharacterID = data.mainCharacterID;
    this.characters = new Map([]);
  }
  
  create() {
    /* mixin init */
    this.initResponsiveScreen();
    this.initTextBox();
    this.initCustomAnimation();
    this.initDefaultEvents();

    /* prepare character */
    this.#prepareScenario();
    this.initCharacterSprites();

    /* prepare map */
    const tileMap = this.createTileMap();
    this.initGridEngine(tileMap);
    this.#addMovementSubscriber(tileMap);
    
    /* start scene */
    this.fadeIn(1000);
    const mainCharacter = this.characters.get(this.mainCharacterID);
    mainCharacter.setVisible(true);
    this.gridEngine.moveTo(mainCharacter.id, {
      x: mainCharacter.getPosition('fixed').x,
      y: mainCharacter.getPosition('fixed').y 
    });
  }

  #prepareScenario() {
    switch (this.mainCharacterID) {
      case this.keyRepo.raimuID():
        this.#createCastsForRaimu();
        this.#createEventsForRaimu();
        break;
    
      default:
        break;
    }
  }

  #createCastsForRaimu() {
    const raimu = new Character(this.keyRepo.raimuID());
    raimu.addPosition('start', 5, 0);
    raimu.addPosition('fixed', 1, 5);
    raimu.setSpeed(1);

    const sachie = new Character(this.keyRepo.sachieID());
    sachie.addPosition('start', 5, 0);
    sachie.addPosition('meet_raimu', 5, 5);
    sachie.addPosition('go_to_bench', 2, 5);
    sachie.addPosition(EVENT_CONVERSATION_DONE, 5, 0);
    sachie.setSpeed(1);

    this.characters.set(raimu.id, raimu);
    this.characters.set(sachie.id, sachie);

    this.partnerID = sachie.id // TODO: set partnerID using events
  }

  #createEventsForRaimu() {
    this.addEvent(EVENT_APPEAR_SACHIE, () => { this.appearPartner() });
    this.addEvent('go_to_bench', (eventName) => { this.endConversation(eventName) });
    this.addEvent(EVENT_CONVERSATION_DONE, (eventName) => { this.endConversation(eventName) });
  }

  appearPartner() {
    const partner = this.characters.get(this.partnerID);
    const nextEvent = partner.getPosition('meet_raimu');

    if (partner.isVisible()) {
      return
    }

    partner.setVisible(true);
    this.gridEngine.moveTo(partner.id, { x: nextEvent.x, y: nextEvent.y } );
  }

  #addMovementSubscriber() {
    this.gridEngine
      .movementStopped()
      .subscribe(({ charId, direction }) => {
        this.#startEvent(charId);
      });
  }

  #startEvent(characterID) {
    const character = this.characters.get(characterID);
    const currentPosition = this.gridEngine.getPosition(characterID);

    if (character.isEventPosition(currentPosition, 'fixed')) {
      character.setIdleFrame('down');
      this.#startScene(character.id);
      return
    }

    if (character.isEventPosition(currentPosition, 'meet_raimu')) {
      this.partnerID = characterID;
      this.lookCharacterByDist(this.mainCharacterID);
      this.#eventMeetRaimu('go_to_bench');
      return
    }
    
    if (character.isEventPosition(currentPosition, 'go_to_bench')) {
      this.partnerID = characterID;
      this.endConversationAnim();
      this.eventHandler(5000, EVENT_CONVERSATION);
      return
    }
    
    if (character.isEventPosition(currentPosition, EVENT_CONVERSATION_DONE)) {
      this.partnerID = characterID;
      this.#disappearPartner();
      return
    }
  }

  #startScene(characterID) {
    this.eventHandler(1000, EVENT_THINKING);

    this.scene.launch(SCENE_UI,
      {
        lang: this.lang,
        sceneName: this.name,
        academy: this.charaRepo.academy(characterID)
      }
    );
  }

  #eventMeetRaimu(nextEvent) {
    const scripts = this.dialRepo.dialogues(this.mainCharacterID, this.partnerID, 'start', this.lang);
    this.startDialogue(scripts, nextEvent);
  }

  endConversation(nextEvent) {
    const nextPosition = this.characters.get(this.partnerID).getPosition(nextEvent);
    this.moveCharacterTo(this.partnerID, nextPosition.x, nextPosition.y);
  }

  #disappearPartner() {
    this.characters.get(this.partnerID).setVisible(false);
    this.characters.get(this.mainCharacterID).setIdleFrame('down');
    this.eventHandler(2000, EVENT_THINKING);
  }
}
