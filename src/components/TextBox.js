import * as css from '../consts/css.js';
import * as configs from '../consts/configs.js';

export function createTextBox(scene, config, action) {
  var actionX = action.x;
  var actionY = action.y;
  var textBox = scene.rexUI.add.textBox({
    x: config.x,
    y: config.y,
    background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, css.DEFAULT_TEXTBOX_BACKGROUND_COLOR_RGB)
      .setOrigin(0, 0)
      .setAlpha(0.85)
      .setStrokeStyle(2, css.DEFAULT_MENU_COLOR_RGB),
    text: scene.make.text(config).setOrigin(0, 0),
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
      if (this.isLastPage) {
        return;
      }

      var icon = this.getElement('action').setVisible(true);
      this.resetChildVisibleState(icon);
      icon.x = actionX
      icon.y = actionY;
      var tween = scene.tweens.add({
          targets: icon,
          y: '+=30', // '+=100'
          ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
          duration: 500,
          repeat: 0, // -1: infinity
          yoyo: false
      })
    }, textBox);
    // .on('type', function () {
    // })

  return textBox;
}