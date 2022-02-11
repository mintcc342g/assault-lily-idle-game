import * as configs from '../../consts/configs.js';
import * as css from '../../consts/css.js';
import * as imgKeys from '../../consts/imgKeys.js';

export const TextBoxMixin = superclass => class extends superclass {
  initTextBox() {
    this.nextPageKey = imgKeys.NEXT_PAGE_KEY;
    this.defaultConf = {
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
        padding: { y: 4 }
      },
    };
  }

  createTextBox(boxConf, actionConf) {
    const action = this.#createActionIcon(boxConf);
    const actionX = actionConf?actionConf.x:this.defaultConf.action.x;
    const actionY = actionConf?actionConf.y:this.defaultConf.action.y;
    const textBox = this.rexUI.add.textBox(this.#createBoxConfig(boxConf, action));
    let timer = null;

    textBox
      .setOrigin(0, 0)
      .setInteractive()
      .setDepth(configs.LAYER_TEXTBOX)
      .layout()
      .on('pageend', function () {
        if (textBox.isLastPage) {
          return
        }
        this.#playActionIcon(action, actionX, actionY)
        timer = this.#nextPageWithDelay(textBox, action, 5000);
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
    let timer = null;

    textBox
      .setOrigin(0, 0)
      .setInteractive()
      .setDepth(configs.LAYER_TEXTBOX)
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

  createConversationTextBox(boxConf, actionConf, scriptReader) { // fix: add a space for a speaker's name in the design
    const action = this.#createActionIcon(actionConf);
    const actionX = actionConf?actionConf.x:this.defaultConf.action.x;
    const actionY = actionConf?actionConf.y:this.defaultConf.action.y;
    const textBox = this.rexUI.add.textBox(this.#createBoxConfig(boxConf, action));
    let timer = null;

    textBox
      .setOrigin(0, 0)
      .setInteractive()
      .setDepth(configs.LAYER_TEXTBOX)
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
      background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, css.DEFAULT_TEXTBOX_BACKGROUND_COLOR_RGB)
        .setOrigin(0, 0)
        .setAlpha(0.85)
        .setStrokeStyle(2, css.DEFAULT_MENU_COLOR_RGB),
      text: this.make.text(conf?conf:this.defaultConf.box).setOrigin(0, 0),
      action: action,
      space: {
        left: 20, right: 20, top: 20, bottom: 20,
        text: -20,
      }
    }
  }

  #createActionIcon(conf) {
    return this.add.image(
      conf?conf.x:this.defaultConf.action.x,
      conf?conf.y:this.defaultConf.action.y,
      this.nextPageKey
    )
    .setTint(css.DEFAULT_MENU_COLOR_RGB)
    .setOrigin(0, 0)
    .setVisible(false);
  }

  createSpeechBubble(boxX, boxY, textConf) {
    const bubble = this.rexUI.add.textBox({
      x: boxX,
      y: boxY,
      background: this.#createSpeechBubbleShape(css.DEFAULT_TEXTBOX_BACKGROUND_COLOR_RGB, css.DEFAULT_MENU_COLOR_RGB),
      text: this.make.text(textConf).setOrigin(0, 0), // text param should be located next of background param
      space: {
        left: 10, right: 10, top: 10, bottom: 25,
        text: 10,
      }
    })
    .setOrigin(0, 1)
    .setDepth(configs.LAYER_TEXTBOX)
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