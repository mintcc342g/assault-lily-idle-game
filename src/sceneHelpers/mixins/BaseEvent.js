import {
  EVENT_THINKING, EVENT_CHECK_TO_DO_LIST,
  EVENT_CONVERSATION, EVENT_REPEAT_CONVERSATION, EVENT_CONVERSATION_DONE,
  EVENT_PROBABILITY_20, EVENT_PROBABILITY_30, EVENT_PROBABILITY_90
} from '../../consts/events.js';
import { msToSec, minToMs, rand } from '../../utils/utils.js';

const { EventEmitter } = require('events');

export const BaseEventMixin = superclass => class extends superclass {
  #initEventConfig() {
    this.eventEmitter = new EventEmitter();
    this.timerRunning = false;
    this.eventTimeOut = false;
  }

  initDefaultEvents() {
    this.#initEventConfig();

    this.eventEmitter.on(EVENT_THINKING, () => { this.eventThinking() });
    this.eventEmitter.on(EVENT_CHECK_TO_DO_LIST, () => { this.eventCheckToDoList() });
    this.eventEmitter.on(EVENT_CONVERSATION, () => { this.eventConversation() });
    this.eventEmitter.on(EVENT_REPEAT_CONVERSATION, () => { this.repeatConversation() });
  }

  addEvent(eventName, callback) {
    this.eventEmitter.on(eventName, callback);
  }

  eventHandler(delay, event) {
    this.time.addEvent({
      delay: delay,
      callback: () => { this.eventEmitter.emit(this.#getCharacterRandomEvent(event), event) },
      // args: [],
      callbackScope: this,
      loop: false,
      repeat: 0,
      startAt: 0,
      timeScale: 1,
      paused: false
    });
  }
	
  eventThinking() {
    const texts = this.dialRepo.characterThinking(this.mainCharacterID, this.lang)
    const randNum = rand(0, texts.length-1);
    
    this.#startTextBox(texts[randNum]);
  }

  eventCheckToDoList() {
    const userToDoList = this.userRepo.toDoContents();
    let text = this.transRepo.toDoLine(this.lang);

    if (userToDoList.length == 0 || this.characters.get(this.mainCharacterID).isPlaying()) {
      return this.eventThinking()
    }

    userToDoList.forEach((toDo)=>{
      text += toDo.content.text?`▶ ${toDo.content.text}\n`:'';
    });

    this.#startTextBox(text);
  }

  eventConversation() {
    if (this.eventTimeOut) {
      return this.#finishConversationEvent()
    }

    this.#setTimer(15, 30);

    const dialogues = this.dialRepo.dialogues(this.mainCharacterID, this.partnerID, 'random', this.lang);
    const randNum = rand(0, dialogues.length-1);
    const scripts = dialogues[randNum];

    this.startDialogue(scripts, EVENT_REPEAT_CONVERSATION);
  }

  repeatConversation() {
    this.endConversationAnim();
    this.#repeatEvent(null, EVENT_CONVERSATION);
  }

  #finishConversationEvent() {
    this.eventTimeOut = false;
    const scripts = this.dialRepo.dialogues(this.mainCharacterID, this.partnerID, 'end', this.lang);
    this.startDialogue(scripts, EVENT_CONVERSATION_DONE);
  }

  #getCharacterRandomEvent(event) {
    if (event) {
      return event
    }

    const probability = rand(0, 100);
    const events =  this.eventRepo.characterEvents(this.mainCharacterID);

    if (probability <= EVENT_PROBABILITY_20) {
      event = events.get(EVENT_PROBABILITY_20);
      return this.#getCharacterRandomEvent(event);
    }

    if (probability <= EVENT_PROBABILITY_30) {
      event = events.get(EVENT_PROBABILITY_30);
      return this.#getCharacterRandomEvent(event);
    }
    
    return events.get(EVENT_PROBABILITY_90);
  }

  #repeatEvent(textbox, eventName) {
    setTimeout(() => {
      if (textbox !== undefined && textbox !== null) {
        textbox.destroy();
      }

      const delay = msToSec(rand(10, 15));
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

    const duration = minToMs(rand(minDuration, maxDuration));
    this.timerRunning = true;

    setTimeout(() => {
      this.timerRunning = false;
      this.eventTimeOut = true;
    }, duration);
  }
}
