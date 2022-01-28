import * as events from '../consts/events.js';
import * as utils from '../utils/utils.js';
import { createTextBox } from './TextBox.js';

const { EventEmitter } = require('events');

export default class MariaHillEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.css = {
      popUp: { x:40, y: 570, speed: 50 },
      box: { wrapWidth: 500, fixedWidth: 500, fixedHeight: 80 },
    };
    this.on(events.EVENT_RAIMU_TEXTBOX, this.selfSpeechBubbleEvent);
    // this.on(events.EVENT_CONVERSATION_WITH_SACHIE, this.sachieEvent);
    // this.on(events.EVENT_WATCHED_OVER_BY_MIRAI, this.miraiEvent);
  }

  eventHandler(scene, delay) {
    const event = this.#getCharacterRandomEvent(scene.mainCharacter);
  
    scene.time.addEvent({
      delay: delay,
      callback: ()=>{this.emit(event, scene)},
      // args: [],
      callbackScope: this,
      loop: false,
      repeat: 0,
      startAt: 0,
      timeScale: 1,
      paused: false
    });
  }

  #getCharacterRandomEvent(character) {
    const eventList =  character.get('events');
    return eventList[utils.rand(0, eventList.length-1)]
  }

  repeatEvent(scene, minRandTime, maxRandTime) {
    const event = this.getRandomEvent(scene.mainCharacter);
    const delay = utils.msToMin(utils.rand(minRandTime, maxRandTime));
    this.eventHandler(scene, event, delay);
  }
 
  #goToNextEvent(scene, textbox) {
    setTimeout(()=>{
      textbox.destroy();
      this.repeatEvent(scene, 1, 5);
    }, 2000);
  }

  selfSpeechBubbleEvent(scene) {
    var textbox = this.popUpTextBox(scene);
    textbox
      .on('type', function () {
        // TOOD
      })
      .on('complete', this.#goToNextEvent.bind(this, scene, textbox));
  }
  
  popUpTextBox(scene) {
    const texts = scene.mainCharacter.get('random_texts').get(scene.lang);
    const radNum = utils.rand(0, texts.length-1);

    return createTextBox(scene, this.css.popUp.x, this.css.popUp.y, this.css.box)
      .start(texts[radNum], this.css.popUp.speed);
  }

  // sachieEvent() {
  //   // TODO
  //   this.repeatEvent();
  // }
  
  // miraiEvent() {
  //   // TODO
  //   this.repeatEvent();
  // }
}

