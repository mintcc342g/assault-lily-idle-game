import * as events from '../consts/events.js';
import * as utils from '../utils/utils.js';
import * as configs from '../consts/configs.js';
import * as imgKeys from '../consts/imgKeys.js';
import * as css from '../consts/css.js';
import { createTextBox } from './TextBox.js';

const { EventEmitter } = require('events');

export default class MariaHillEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.nextPageKey = imgKeys.NEXT_PAGE_KEY;
    this.css = {
      popUp: { x: 40, y: 570, speed: 50 },
      action: { x: 600, y: 750 },
      box: {
        x: 40,
        y: 570,
        style: {
          fixedWidth: 500,
          fixedHeight: 80,
          color: css.DEFAULT_TEXT_COLOR,
          fontSize: '20px',
          maxLines: 3,
          lineSpacing: css.DEFAULT_LINE_SPACING,
          wordWrap: {
            width: 500,
            useAdvancedWrap: true
          }        
        },
        padding: {
          y: 4
        }
      },
    };
    this.on(events.EVENT_RAIMU_TEXTBOX, this.selfSpeechBubbleEvent);
    // this.on(events.EVENT_CONVERSATION_WITH_SACHIE, this.sachieEvent);
    // this.on(events.EVENT_WATCHED_OVER_BY_MIRAI, this.miraiEvent);
  }

  eventHandler(scene, delay) {
    const event = this.#getCharacterRandomEvent(scene.mainCharacter);
    
    scene.time.addEvent({
      delay: delay,
      callback: () => {this.emit(event, scene)},
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

  #repeatEvent(scene, textbox) {
    setTimeout(() => {
      textbox.destroy();
      const delay = utils.msToSec(utils.rand(10, 15));
      this.eventHandler(scene, delay);
    }, 2000);
  }

  selfSpeechBubbleEvent(scene) {
    const texts = scene.mainCharacter.get('random_texts').get(scene.lang);
    const radNum = utils.rand(0, texts.length-1);
    const action = scene.add.image(
        this.css.action.x,
        this.css.action.y,
        this.nextPageKey
      )
      .setTint(css.DEFAULT_MENU_COLOR_RGB)
      .setOrigin(0, 0)
      .setVisible(false);
    
    const textbox = createTextBox(scene, this.css.box, action).start(texts[radNum], this.css.popUp.speed);

    textbox
      .on('pointerdown', function () {
        action.setVisible(false);
        // this.resetChildVisibleState(action);
        if (this.isTyping) {
          this.stop(true);
        } else if (!this.isLastPage) {
          this.typeNextPage();
        } else {
          this.destroy();
        }
      }, textbox)
      .on('complete', this.#repeatEvent.bind(this, scene, textbox));
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

