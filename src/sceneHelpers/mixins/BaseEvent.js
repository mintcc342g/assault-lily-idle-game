import * as events from '../../consts/events.js';
import * as gameData from '../../consts/gameData.js';
import * as scenario from '../../consts/scenario.js';
import * as utils from '../../utils/utils.js';

const { EventEmitter } = require('events');

export const BaseEventMixin = superclass => class extends superclass {
  #initEventConfig() {
    this.eventEmitter = new EventEmitter();
    this.timerRunning = false;
    this.eventTimeOut = false;
  }

  initDefaultEvents() {
    this.#initEventConfig();

    this.eventEmitter.on(events.EVENT_SELF_SPEECH, () => { this.eventSelfSpeech() });
    this.eventEmitter.on(events.EVENT_CHECK_TO_DO_LIST, () => { this.eventCheckToDoList() });
    this.eventEmitter.on(events.EVENT_CONVERSATION, () => { this.eventConversation() });
  }

  addEvent(eventName, callback) {
    this.eventEmitter.on(eventName, callback);
  }

  eventHandler(delay, event) {
    this.time.addEvent({
      delay: delay,
      callback: () => { this.eventEmitter.emit(this.#getCharacterRandomEvent(event)) },
      // args: [],
      callbackScope: this,
      loop: false,
      repeat: 0,
      startAt: 0,
      timeScale: 1,
      paused: false
    });
  }
	
  eventSelfSpeech() {
    const texts = scenario.RANDOM_TEXTS.get(this.mainCharacterID).get(this.lang);
    const randNum = utils.rand(0, texts.length-1);
    
    this.#startTextBox(texts[randNum]);
  }

  eventCheckToDoList() {
    const userToDoList = gameData.USER_DATA.get('to_do_list');
    const text = gameData.NOTICE.get(this.lang).get('todo-list-prefix');

    if (userToDoList.length == 0 || this.characters.get(this.mainCharacterID).isPlaying()) {
      return this.eventSelfSpeech()
    }

    userToDoList.forEach((toDo)=>{
      text += toDo.content.text?`▶ ${toDo.content.text}\n`:'';
    });

    this.#startTextBox(text);
  }

  eventConversation() {
    if (this.eventTimeOut) {
      return this.#eventEndConversation()
    }

    this.#setTimer(15, 30);
    this.lookCharacter(this.mainCharacterID); // fix: use the speaker_id in scripts?
    this.lookCharacter(this.eventCharacterID); // fix: see the speaker after first script be finished

    const scenarios = scenario.RANDOM_CONVERSATION.get(this.mainCharacterID).get(this.eventCharacterID).get('random').get(this.lang);
    const randNum = utils.rand(0, scenarios.length-1);
    const scripts = scenarios[randNum];

    let scriptNum = 0;
    let speaker = scripts[scriptNum][0];
    let script = scripts[scriptNum][1];
    
    const scriptReader = (textBox, action) => {
      scriptNum++;

      if (scriptNum >= scripts.length) {
        textBox.destroy();
        this.characters.get(this.mainCharacterID).setIdleFrame('down');
        this.characters.get(this.eventCharacterID).setIdleFrame('down');
        this.#repeatEvent(textBox, events.EVENT_CONVERSATION);
        return
      }

      speaker = scripts[scriptNum][0]; // fix: show the speaker's name
      script = scripts[scriptNum][1];
      action.setVisible(false);
      textBox.start(script, 50);
    }

    this.createConversationTextBox(null, null, scriptReader).start(script, 50);
  }

  #eventEndConversation() {
    this.eventTimeOut = false;

    const scripts = scenario.RANDOM_CONVERSATION.get(this.mainCharacterID).get(this.eventCharacterID).get('end').get(this.lang);
    const nextPosition = this.characters.get(this.eventCharacterID).getPosition(events.EVENT_CONVERSATION_DONE);
    
    let scriptNum = 0;
    let speaker = scripts[scriptNum][0];
    let script = scripts[scriptNum][1];
    
    this.lookCharacter(this.mainCharacterID);
    this.lookCharacter(this.eventCharacterID);

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
    }

    this.createConversationTextBox(null, null, scriptReader).start(script, 50);
  }

  #getCharacterRandomEvent(event) {
    if (event) {
      return event
    }

    const probability = utils.rand(0, 100);
    const characterEvents =  gameData.CHARACTER_DATA.get(this.mainCharacterID).get('events');

    if (probability <= events.EVENT_PROBABILITY_20) {
      event = characterEvents.get(events.EVENT_PROBABILITY_20);
      return this.#getCharacterRandomEvent(event);
    }

    if (probability <= events.EVENT_PROBABILITY_30) {
      event = characterEvents.get(events.EVENT_PROBABILITY_30);
      return this.#getCharacterRandomEvent(event);
    }
    
    return characterEvents.get(events.EVENT_PROBABILITY_90);
  }

  #repeatEvent(textbox, eventName) {
    setTimeout(() => {
      if (textbox !== undefined && textbox !== null) {
        textbox.destroy();
      }

      const delay = utils.msToSec(utils.rand(10, 15));
      this.eventHandler(delay, eventName);
    }, 2000);
  }

  #startTextBox(text, eventName) {
    const textbox = this.createTextBox().start(text, 50);
    textbox.on('complete', this.#repeatEvent.bind(this, textbox, eventName));
  }

  #setTimer(minDuration, maxDuration) {
    if (this.timerRunning) {
      return
    }

    const duration = utils.minToMs(utils.rand(minDuration, maxDuration));
    this.timerRunning = true;

    setTimeout(() => {
      this.timerRunning = false;
      this.eventTimeOut = true;
    }, duration);
  }
}
