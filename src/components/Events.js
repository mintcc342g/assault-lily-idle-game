import * as events from '../consts/events.js';
import * as utils from '../utils/utils.js';
import * as gameData from '../consts/gameData.js';
import * as imgKeys from '../consts/imgKeys.js';
import * as css from '../consts/css.js';
import * as configs from '../consts/configs.js';

const { EventEmitter } = require('events');

export default class MariaHillEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.nextPageKey = imgKeys.NEXT_PAGE_KEY;
    this.css = {
      popUp: { x: 40, y: 570, speed: 50 },
      action: { x: 550, y: 620 },
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
    this.on(events.EVENT_TEXTBOX, this.selfSpeechBubbleEvent);
    this.on(events.EVENT_TO_DO_TEXTBOX, this.eventToDoTextBox);
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
    const probability = utils.rand(0, 100);
    const eventMap =  character.get('events');

    if (probability <= events.EVENT_PROBABILITY_20) {
      return eventMap.get(events.EVENT_PROBABILITY_20);
    }
    
    return eventMap.get(events.EVENT_PROBABILITY_90);
  }

  #repeatEvent(scene, textbox) {
    setTimeout(() => {
      if (textbox !== undefined && textbox !== null) {
        textbox.destroy();
      }

      const delay = utils.msToSec(utils.rand(10, 15));
      this.eventHandler(scene, delay);
    }, 2000);
  }

  #initTextBox(scene, text) {
    const action = scene.add.image(
      this.css.action.x,
      this.css.action.y,
      this.nextPageKey
    )
    .setTint(css.DEFAULT_MENU_COLOR_RGB)
    .setOrigin(0, 0)
    .setVisible(false);
  
    const textbox = scene.createTextBox(this.css.box, action).start(text, this.css.popUp.speed);

    textbox
      .on('pointerdown', function () {
        if (this.isTyping) {
          this.stop(true);
        } else if (!this.isLastPage) {
          action.setVisible(false);
          // this.resetChildVisibleState(action);
          this.typeNextPage();
        } else {
          this.destroy();
        }
      }, textbox)
      .on('complete', this.#repeatEvent.bind(this, scene, textbox));
  }

  selfSpeechBubbleEvent(scene) {
    const texts = scene.mainCharacter.get('random_texts').get(scene.lang);
    const randNum = utils.rand(0, texts.length-1);

    this.#initTextBox(scene, texts[randNum]);
  }

  eventToDoTextBox(scene) {
    const toDoList = gameData.USER_DATA.get('to_do_list');
    if (toDoList.length == 0) {
      return this.selfSpeechBubbleEvent(scene)
    }
    
    let toDoContent = gameData.NOTICE.get(scene.lang).get('todo-list-prefix');
    toDoList.forEach((textObj)=>{
        toDoContent += textObj.text?`▶ ${textObj.text}\n`:'';
    });

    this.#initTextBox(scene, toDoContent);
  }
}
