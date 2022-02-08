import * as css from '../../consts/css.js';
import * as events from '../../consts/events.js';
import * as gameData from '../../consts/gameData.js';
import * as imgKeys from '../../consts/imgKeys.js';
import * as utils from '../../utils/utils.js';

const { EventEmitter } = require('events');

export const BaseEventMixin = superclass => class extends superclass {
	#initEventConfig() {
		this.nextPageKey = imgKeys.NEXT_PAGE_KEY;
		this.textBoxCss = {
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

		this.eventEmitter = new EventEmitter();
	}

	initDefaultEvent() {
		this.#initEventConfig();

		this.eventEmitter.on(events.EVENT_TEXTBOX, () => { this.selfSpeechBubbleEvent() });
		this.eventEmitter.on(events.EVENT_TO_DO_TEXTBOX, () => { this.eventToDoTextBox() });
	}

  eventHandler(delay) {
    const event = this.#getCharacterRandomEvent();
    
    this.time.addEvent({
      delay: delay,
      callback: () => { this.eventEmitter.emit(event) },
      // args: [],
      callbackScope: this,
      loop: false,
      repeat: 0,
      startAt: 0,
      timeScale: 1,
      paused: false
    });
  }
	
  selfSpeechBubbleEvent() {
    const texts = this.mainCharacter.get('random_texts').get(this.lang);
    const randNum = utils.rand(0, texts.length-1);

    this.#startTextBox(texts[randNum]);
  }

  eventToDoTextBox() {
    const toDoList = gameData.USER_DATA.get('to_do_list');
    if (toDoList.length == 0 || this.isMainCharacterPlaying()) {
      return this.selfSpeechBubbleEvent()
    }
    
    let toDoEventText = gameData.NOTICE.get(this.lang).get('todo-list-prefix');
    toDoList.forEach((item)=>{
      toDoEventText += item.content.text?`▶ ${item.content.text}\n`:'';
    });

    this.#startTextBox(toDoEventText);
  }

  #getCharacterRandomEvent() {
    const probability = utils.rand(0, 100);
    const eventMap =  this.mainCharacter.get('events');

    if (probability <= events.EVENT_PROBABILITY_20) {
      return eventMap.get(events.EVENT_PROBABILITY_20);
    }
    
    return eventMap.get(events.EVENT_PROBABILITY_90);
  }

  #repeatEvent(textbox) {
    setTimeout(() => {
      if (textbox !== undefined && textbox !== null) {
        textbox.destroy();
      }

      const delay = utils.msToSec(utils.rand(10, 15));
      this.eventHandler(delay);
    }, 2000);
  }

  #startTextBox(text) {
    const action = this.add.image(
      this.textBoxCss.action.x,
      this.textBoxCss.action.y,
      this.nextPageKey
    )
    .setTint(css.DEFAULT_MENU_COLOR_RGB)
    .setOrigin(0, 0)
    .setVisible(false);
  
    const textbox = this.createTextBox(this.textBoxCss.box, action).start(text, this.textBoxCss.popUp.speed);

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
      .on('complete', this.#repeatEvent.bind(this, textbox));
  }
}
