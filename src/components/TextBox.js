import * as consts from '../variables/constants.js';

const COLOR_TEXTBOX_BACKGROUND = 0xfefefe;
const COLOR_TEXTBOX_LINE = 0x8583c8;
const GetValue = Phaser.Utils.Objects.GetValue;

export function createTextBox (scene, x, y, config) {
  var wrapWidth = GetValue(config, 'wrapWidth', 0);
  var fixedWidth = GetValue(config, 'fixedWidth', 0);
  var fixedHeight = GetValue(config, 'fixedHeight', 0);
  var textBox = scene.rexUI.add.textBox({
    x: x,
    y: y,
    background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_TEXTBOX_BACKGROUND)
      .setOrigin(0, 0)
      .setAlpha(0.85)
      .setStrokeStyle(2, COLOR_TEXTBOX_LINE),
    text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
    action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_TEXTBOX_LINE).setVisible(false), // TODO: nextPage
    space: {
      left: 20, right: 20, top: 20, bottom: 20,
      text: -20,
    }
  })
  .setOrigin(0, 0)
  .setDepth(consts.LAYER_TEXTBOX)
  .layout();

  textBox
    .setInteractive()
    .on('pointerdown', function () {
      if (this.isTyping) {
        this.stop(true);
      } else if (!this.isLastPage) {
        this.typeNextPage();
      } else {
        this.destroy();
      }
    }, textBox)
    .on('pageend', function () {
      if (this.isLastPage) {
        return;
      }
    }, textBox)
    // .on('complete', function () {
    // })
    // .on('type', function () {
    // })

  return textBox;
}

var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.make.text({
    x: 0,
    y: 0,
    style: {
      fixedWidth: fixedWidth,
      fixedHeight: fixedHeight,
      color: consts.COLOR_TEXT,
      fontSize: '20px',
      maxLines: 3,
      lineSpacing: consts.LINE_SPACING,
      wordWrap: {
        width: wrapWidth,
        useAdvancedWrap: true
      }
    },
    padding: {
      y: 4
    }
  })
  .setOrigin(0, 0);
}
