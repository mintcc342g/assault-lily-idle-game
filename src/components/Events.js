import * as consts from '../constants/constants.js';
import * as utils from '../utils/utils.js';
import * as sceneHelpers from '../utils/sceneHelpers.js';
import { createTextBox } from './TextBox.js';

const { EventEmitter } = require('events');

export default class MariaHillEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.on(consts.EVENT_RAIMU_TEXTBOX, this.selfSpeechBubbleEvent);
    // this.on(consts.EVENT_CONVERSATION_WITH_SACHIE, this.sachieEvent);
    // this.on(consts.EVENT_WATCHED_OVER_BY_MIRAI, this.miraiEvent);
  }
  
  eventHandler(scene, event, delay) {
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

  pauseEvent(scene) {
    scene.time.paused = true;
  }

  startEvent(scene) {
    scene.time.paused = false;
  }

  repeatEvent(scene) {
    const event = sceneHelpers.getRandomEvent(scene);
    const delay = utils.msToMin(utils.rand(1, 5));
    this.eventHandler(scene, event, delay);
  }

  popUpTextBox(scene) {
    const texts = consts.RAIMU_RANDOM_TEXTS.get(scene.lang)
    const typingSpeed = 50;
    const x = 315;
    const y = 620;
    const radNum = utils.rand(0, texts.length-1);
    return createTextBox(scene, x, y, consts.boxConfig).start(texts[radNum], typingSpeed);
  }
  
  selfSpeechBubbleEvent(scene) {
    var textbox = this.popUpTextBox(scene);
    textbox
      .on('type', function () {
        // TOOD
      })
      .on('complete', function () {
        const emitter = this;
        setTimeout(function(){
          textbox.destroy();
          emitter.repeatEvent(scene);
        }, 2000, emitter);
      }, this);
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

