const COLOR_TEXTBOX_BACKGROUND = 0x565f75;
const COLOR_TEXTBOX_LINE = 0xf3f7f7;
const COLOR_TEXT = 0xf8fcfd;
const GetValue = Phaser.Utils.Objects.GetValue;

export function createTextBox (scene, x, y, config) {
  var wrapWidth = GetValue(config, 'wrapWidth', 0);
  var fixedWidth = GetValue(config, 'fixedWidth', 0);
  var fixedHeight = GetValue(config, 'fixedHeight', 0);
  var textBox = scene.rexUI.add.textBox({
    x: x,
    y: y,

    background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_TEXTBOX_BACKGROUND)
      .setAlpha(0.85)
      .setStrokeStyle(2, COLOR_TEXTBOX_LINE),

    // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
    text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

    action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_TEXTBOX_LINE).setVisible(false),

    space: {
      left: 20, right: 20, top: 20, bottom: 20,
      text: -20,
    }
  })
  .setDepth(5)
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
    //   console.log('all pages typing complete')
    // })
    // .on('type', function () {
    // })

  return textBox;
}

var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.add.text(0, 0, '', {
      fontSize: '20px',
      wordWrap: {
          width: wrapWidth
      },
      maxLines: 3
  })
  .setFixedSize(fixedWidth, fixedHeight);
}

var getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.rexUI.add.BBCodeText(0, 0, '', {
    fixedWidth: fixedWidth,
    fixedHeight: fixedHeight,
    color: COLOR_TEXT,
    fontSize: '20px',
    wrap: {
        mode: 'word',
        width: wrapWidth
    },
    maxLines: 3
  })
}
