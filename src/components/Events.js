import * as consts from '../constants/constants.js';
import * as utils from '../utils/utils.js';
import * as sceneHelpers from '../utils/sceneHelpers.js';
import { createTextBox } from '../components/MyTextBox.js';

const { EventEmitter } = require('events');

export default class MariaHillEventEmitter extends EventEmitter {
  constructor(scene) {
    super();
    this.scene = scene
    this.on(consts.EVENT_RAIMU_TEXTBOX, this.selfSpeechBubbleEvent);
    // this.on(consts.EVENT_CONVERSATION_WITH_SACHIE, this.sachieEvent);
    // this.on(consts.EVENT_WATCHED_OVER_BY_MIRAI, this.miraiEvent);
  }
  
  eventHandler(event, delay) {
    // console.log("~~~~~~~~~~~~event handler");

    this.scene.time.addEvent({
      delay: delay,
      callback: ()=>{this.emit(event)},
      // args: [],
      callbackScope: this,
      loop: false,
      repeat: 0,
      startAt: 0,
      timeScale: 1,
      paused: false
    });
  }

  repeatEvent() {
    // TODO: check reserved events of a scene ?

    const event = sceneHelpers.getRandomEvent(this.scene);
    const delay = utils.msToMin(utils.rand(1, 5));
    this.eventHandler(event, delay);
  }

  popUpTextBox() {
    const texts = consts.RAIMU_RANDOM_TEXTS.get(this.scene.lang)
    const typingSpeed = 50;
    const x = 315;
    const y = 620;
    const radNum = utils.rand(0, texts.length-1);
    return createTextBox(this.scene, x, y, consts.boxConfig).start(texts[radNum], typingSpeed);
  }

  selfSpeechBubbleEvent() {
    const textbox = this.popUpTextBox();
    textbox.on('type', function () {
      // TOOD
    })
    .on('complete', function () {
      setTimeout(function(){
        textbox.destroy();
      }, 2000);
    });

    this.repeatEvent();
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

