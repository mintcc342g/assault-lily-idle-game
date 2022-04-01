import {
  DEFAULT_TEXT_COLOR, DEFAULT_MENU_COLOR_RGB, DEFAULT_MENU_COLOR,
  DEFAULT_TEXTBOX_BACKGROUND_COLOR_RGB, DEFAULT_LINE_SPACING
} from '../../consts/css.js';
import { LAYER_TEXTBOX } from '../../consts/configs.js';
import { NEXT_PAGE_KEY } from '../../consts/keys.js';

export const TextBoxMixin = superclass => class extends superclass {
  initTextBox() {
    this.nextPageKey = NEXT_PAGE_KEY;
    this.defaultConf = {
      box: {
        x: 40,
        y: 600,
        style: {
          fixedWidth: 500,
          fixedHeight: 80,
          color: DEFAULT_TEXT_COLOR,
          fontSize: '20px',
          maxLines: 3,
          lineSpacing: DEFAULT_LINE_SPACING,
          wordWrap: {
            width: 500,
            useAdvancedWrap: true
          }
        },
        padding: { y: 4 }
      },
      action: { x: 550, y: 650 },
      nameTag: {
        x: 39, y: 573, w: 240, h: 27,
        fontSize: '16px',
        padding: { top: 7, left: 7 },
      },
    };
  }

  createTextBox(boxConf, actionConf) {
    const action = this.#createActionIcon(boxConf);
    const actionX = actionConf?actionConf.x:this.defaultConf.action.x;
    const actionY = actionConf?actionConf.y:this.defaultConf.action.y;
    const textBox = this.rexUI.add.textBox(this.#createBoxConfig(boxConf, action));
    let timer = false;

    textBox
      .setOrigin(0, 0)
      .setInteractive()
      .setDepth(LAYER_TEXTBOX)
      .layout()
      .on('pageend', function () {
        if (textBox.isLastPage) {
          return
        }
        this.#playActionIcon(action, actionX, actionY);
        timer = this.#nextPageWithDelay(textBox, action, 4000);
      }, this)
      .on('pointerdown', function () {
        if (timer) {
          clearTimeout(timer);
        }

        if (this.isTyping) {
          this.stop(true);
        } else if (!this.isLastPage) {
          action.setVisible(false);
          this.typeNextPage();
        } else {
          action.setVisible(false);
          this.destroy();
        }
      }, textBox)
  
    return textBox;
  }

  createIntroduceTextBox(boxConf, actionConf) {
    const action = this.#createActionIcon(boxConf);
    const actionX = actionConf?actionConf.x:this.defaultConf.action.x;
    const actionY = actionConf?actionConf.y:this.defaultConf.action.y;
    const textBox = this.rexUI.add.textBox(this.#createBoxConfig(boxConf, action));
    let timer = false;

    textBox
      .setOrigin(0, 0)
      .setInteractive()
      .setDepth(LAYER_TEXTBOX)
      .layout()
      .on('pageend', function () {
        if (textBox.isLastPage) {
          return
        }
        this.#playActionIcon(action, actionX, actionY);
        timer = this.#nextPageWithDelay(textBox, action, 4000);
      }, this)
      .on('pointerdown', function () {
        if (timer) {
          clearTimeout(timer);
        }

        if (textBox.isTyping) {
          textBox.stop(true);
          return
        }
        textBox.typeNextPage();
        action.setVisible(false);
      }, this);
  
    return textBox;
  }

  startDialogue(scripts, nextEvent) {
    let scriptNum = 0;
    let speakerID = scripts[scriptNum][0];
    let script = scripts[scriptNum][1];

    const nameTag = this.createNameTag(
      this.charaRepo.name(speakerID, this.lang),
      this.defaultConf.nameTag).setVisible(true);

    this.lookOther(speakerID);
    
    const scriptReader = (textBox, action) => {
      scriptNum++;
      this.lookCharacter(speakerID);

      if (scriptNum >= scripts.length) {
        this.eventHandler(0, nextEvent);
        textBox.destroy();
        nameTag.destroy();
        return
      }

      speakerID = scripts[scriptNum][0];
      script = scripts[scriptNum][1];

      action.setVisible(false);
      nameTag.setText(this.charaRepo.name(speakerID, this.lang));
      textBox.start(script, 50);
    };

    this.createConversationTextBox(scriptReader).start(script, 50);
  }

  createNameTag(name, config) {
    const textConf = {
      x: config.x,
      y: config.y,
      text: name,
      style: {
        fixedWidth: config.w,
        fixedHeight: config.h,
        color: '#ffffff',
        backgroundColor: DEFAULT_MENU_COLOR,
        fontSize: config.fontSize,
        align: 'left'
      },
      padding: config.padding,
    }

    return this.makeText(textConf, { depth: LAYER_TEXTBOX });
  }

  createConversationTextBox(scriptReader) {
    const action = this.#createActionIcon(false);
    const actionX = this.defaultConf.action.x;
    const actionY = this.defaultConf.action.y;
    const textBox = this.rexUI.add.textBox(this.#createBoxConfig(false, action));

    let timer = false;

    textBox
      .setOrigin(0, 0)
      .setInteractive()
      .setDepth(LAYER_TEXTBOX)
      .layout()
      .on('pageend', function () {
        if (textBox.isLastPage) {
          timer = setTimeout(() => {
            if (textBox.active) {
              scriptReader(textBox, action);
            }
          }, 5000);
          return
        }
        this.#playActionIcon(action, actionX, actionY);
      }, this)
      .on('pointerdown', () => {
        if (timer) {
          clearTimeout(timer);
        }

        if (textBox.isTyping) {
          textBox.stop(true);
        } else if (textBox.isLastPage) {
          scriptReader(textBox, action);
          action.setVisible(false);
        } else {
          textBox.typeNextPage();
          action.setVisible(false);
        }
      });
  
    return textBox;
  }

  #createBoxConfig(conf, action) {
    return {
      x: conf?conf.x:this.defaultConf.box.x,
      y: conf?conf.y:this.defaultConf.box.y,
      background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, DEFAULT_TEXTBOX_BACKGROUND_COLOR_RGB)
        .setOrigin(0, 0)
        .setAlpha(0.85)
        .setStrokeStyle(2, DEFAULT_MENU_COLOR_RGB),
      text: this.makeText({ textStyle: conf?conf:this.defaultConf.box }),
      action: action,
      space: {
        left: 20, right: 20, top: 20, bottom: 20,
        text: -20,
      }
    }
  }

  #createActionIcon(conf) {
    return this.makeImage({
      x: conf?conf.x:this.defaultConf.action.x,
      y: conf?conf.y:this.defaultConf.action.y,
      key: this.nextPageKey,
      tint: DEFAULT_MENU_COLOR_RGB,
      visible: false,
    });
  }

  createSpeechBubble(boxX, boxY, textConf) {
    const bubble = this.rexUI.add.textBox({
      x: boxX,
      y: boxY,
      background: this.#createSpeechBubbleShape(DEFAULT_TEXTBOX_BACKGROUND_COLOR_RGB, DEFAULT_MENU_COLOR_RGB),
      text: this.makeText({ textStyle: textConf }), // NOTE: don't set the text property before the background property.
      space: {
        left: 10, right: 10, top: 10, bottom: 25,
        text: 10,
      }
    })
    .setOrigin(0, 1)
    .setDepth(LAYER_TEXTBOX)
    .layout();
    
    return bubble;
  }

  #createSpeechBubbleShape(fillColor, strokeColor) {
    return this.rexUI.add.customShapes({
      create: { lines: 1 },
      update: function () {
        var radius = 20;
        var indent = 10; // triangle 
        var left = 0, right = this.width,
            top = 0, bottom = this.height,
            boxBottom = bottom - indent;

        this.getShapes()[0]
          .lineStyle(2, strokeColor, 1)
          .fillStyle(fillColor, 1)
          // top line, right arc
          .startAt(left + radius, top).lineTo(right - radius, top).arc(right - radius, top + radius, radius, 270, 360)
          // right line, bottom arc
          .lineTo(right, boxBottom - radius).arc(right - radius, boxBottom - radius, radius, 0, 90)
          // bottom indent                    
          .lineTo(left + 40, boxBottom).lineTo(left + 30, bottom).lineTo(left + 20, boxBottom)
          // bottom line, left arc
          .lineTo(left + radius, boxBottom).arc(left + radius, boxBottom - radius, radius, 90, 180)
          // left line, top arc
          .lineTo(left, top + radius).arc(left + radius, top + radius, radius, 180, 270)
          .close();
      }
    });
  }

  #nextPageWithDelay(textBox, action, delay) {
    return setTimeout(() => {
      if (textBox.active) {
        action.setVisible(false);
        textBox.typeNextPage();
      }
    }, delay);
  }
 
  #playActionIcon(action, x, y) {
    action.setVisible(true);
    action.x = x;
    action.y = y;

    this.tweens.add({
      targets: action,
      y: '+=30',
      ease: 'Bounce',
      duration: 500,
      repeat: 0,
      yoyo: false
    });
  }
}