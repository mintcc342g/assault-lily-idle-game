import * as configs from '../consts/configs.js';
import * as css from '../consts/css.js';

export const TextBoxMixin = superclass => class extends superclass {
  createTextBox(config, action) {
    let actionX = action.x;
    let actionY = action.y;
    
    const textBox = this.rexUI.add.textBox({
      x: config.x,
      y: config.y,
      background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, css.DEFAULT_TEXTBOX_BACKGROUND_COLOR_RGB)
        .setOrigin(0, 0)
        .setAlpha(0.85)
        .setStrokeStyle(2, css.DEFAULT_MENU_COLOR_RGB),
      text: this.make.text(config).setOrigin(0, 0),
      action: action,
      space: {
        left: 20, right: 20, top: 20, bottom: 20,
        text: -20,
      }
    })
    .setOrigin(0, 0)
    .setDepth(configs.LAYER_TEXTBOX)
    .layout();
  
    textBox
      .setInteractive()
      .on('pageend', function () {
        if (textBox.isLastPage) {
          return
        }

				setTimeout(() => {
					if (textBox.active) {
						textBox.typeNextPage();
					}
				}, 2000);
  
        action.setVisible(true);
        // textBox.resetChildVisibleState(action);
        action.x = actionX;
        action.y = actionY;
        this.tweens.add({
            targets: action,
            y: '+=30', // '+=100'
            ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            repeat: 0, // -1: infinity
            yoyo: false
        });
      }, this);
      // .on('type', function () {
      // })
  
    return textBox;
  }

  createSpeechBubble(x, y, config) {
    const bubble = this.rexUI.add.textBox({
      x: x,
      y: y,
      background: this.#createSpeechBubbleShape(css.DEFAULT_TEXTBOX_BACKGROUND_COLOR_RGB, css.DEFAULT_MENU_COLOR_RGB),
      text: this.make.text(config).setOrigin(0, 0), // text param should be located next of background param
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
}