import * as consts from '../variables/constants.js';
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

  goToNextEvent(scene, textbox) {
    setTimeout(function(){
      textbox.destroy();
      sceneHelpers.repeatEvent(scene, 1, 5);
    }, 2000);
  }
  
  popUpTextBox(scene) {
    const texts = consts.RAIMU_RANDOM_TEXTS.get(scene.lang)
    const typingSpeed = 50;
    const x = 40;
    const y = 570;
    const radNum = utils.rand(0, texts.length-1);
    return createTextBox(scene, x, y, consts.BOX_CONFIG).start(texts[radNum], typingSpeed); fixme
  }

  selfSpeechBubbleEvent(scene) {
    var textbox = this.popUpTextBox(scene);
    textbox
      .on('type', function () {
        // TOOD
      })
      .on('complete', this.goToNextEvent.bind(this, scene, textbox));
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

