import Phaser from 'phaser';
import * as configs from '../consts/configs.js';
import * as css from '../consts/css.js';
import * as gameData from '../consts/gameData.js';
import * as imgKeys from '../consts/imgKeys.js';
import * as sceneHelpers from '../utils/sceneHelpers.js';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super(configs.SCENE_UI)
    this.name = configs.SCENE_UI;
    this.menuOptionTextSuffix = '_text';
    this.logoPrefix = 'logo_';
    this.buttonFrame = configs.DEFAULT_BUTTON_ANIM;
    this.keys = {
      menuButton: imgKeys.MENU_BUTTON_KEY,
      menuOptions: imgKeys.MENU_OPTION_KEYS,
      handBook: imgKeys.HAND_BOOK_KEY,
      close: imgKeys.CLOSE_BUTTON_KEY,
      logoLine: imgKeys.LOGO_LINE_KEY,
      logo: '',
      
    },
    this.css = {
      menuButton: { x: 565,  y: 30 },
      handBook: { x: 0, y: 195, bgColor: css.DEFAULT_HAND_BOOK_BACKGROUND_COLOR },
      logoLine: { x: 102, y: 214 },
      logo: { x: 121, y: 236 },
      motto: { x: 89, y: 460, w: 210, h: 130, padding: 3 },
      menuOptions: { x: 340, y: 220, yPlus: 62 , w: 198, h: 40, padding: { left: 50, top: 3 } },
      closeButton: { x: 535, y: 165 },
      toDoList: { x: 100, y: 210, xPlus: 258 , yPlus: 95,  w: 190, h: 80, padding: 4 },
    };
    this.textMaxLength = new Map([
      [configs.LANG_KR, 27],
      [configs.LANG_EN, 42],
      [configs.LANG_JP, 27]
    ]);
    this.lang = '';
    this.currentSceneName = '';
    this.academy = '';
    this.menuGroup = new Map();
    this.menuButton = { /* sprite */ };
    this.handBook = { /* image */ };
    this.closeButton = { /* sprite */ };
    this.toDoList = [];
    this.toDoListEditors = [];
  }

  init(data) {
    this.lang = data.lang;
    this.currentSceneName = data.sceneName;
    this.academy = data.academy;
  }
  
  create() {
    sceneHelpers.setResponsiveScreen(this);

    this.#initMenuButton();
    this.#initHandBook();
    this.#initLogoPage();
    this.#initMenuOptionButtons();
    this.#initToDoList();
  }

  #initMenuButton() {
    this.menuButton = this.add.sprite(
        this.css.menuButton.x,
        this.css.menuButton.y,
        this.keys.menuButton
      )
      .setDepth(configs.LAYER_UI)
      .setVisible(true)
      .setInteractive()
      .setOrigin(0, 0);

    this.menuButton
      .on('pointerout', () => {
        this.#setDefaultFrame(this.menuButton, true);
      })
      .on('pointerdown', () => {
        this.#setDefaultFrame(this.menuButton, false);
      })
      .on('pointerup', () => {
        this.#setDefaultFrame(this.menuButton, true);
        this.#activeMenuButton(false);
        this.#openMenu();
      });
  }

  #openMenu() {
    this.scene.pause(this.currentSceneName);
    this.handBook.setVisible(true);
    this.#menuGroupVisible(true);
  }

  #initHandBook() {
    this.handBook = this.add.sprite(0, 180, this.keys.handBook)
      .setDepth(configs.LAYER_POPUP_OBJECT)
      .setVisible(false)
      .disableInteractive()
      .setOrigin(0, 0);
    
    this.#initCloseHandbookButton();
  }

  #initCloseHandbookButton() {
    this.closeButton = this.add.sprite(
        this.css.closeButton.x,
        this.css.closeButton.y,
        this.keys.close
      )
      .setDepth(configs.LAYER_UI)
      .setVisible(false)
      .setInteractive()
      .setOrigin(0, 0);
    
    this.closeButton
      .on('pointerout', () => {
        this.#setDefaultFrame(this.closeButton, true);
      })
      .on('pointerdown', () => {
        this.#setDefaultFrame(this.closeButton, false);
      })
      .on('pointerup', () => {
        this.#setDefaultFrame(this.closeButton, true);
        this.#closeHandBook();
        this.#activeMenuButton(true);
        this.scene.resume(this.currentSceneName);
      });
  }

  #initLogoPage() {
    this.#initLogo();
    this.#initLogoTextBox();
  }

  #initLogo() {
    const logoLine =  this.add.sprite(
      this.css.logoLine.x,
      this.css.logoLine.y,
      this.keys.logoLine
      )
      .setDepth(configs.LAYER_POPUP_OBJECT_CONTENTS)
      .setVisible(false)
      .disableInteractive()
      .setOrigin(0, 0);
      this.menuGroup.set(this.keys.logoLine, logoLine);
      
    const logoKey = this.logoPrefix + this.academy;
    const logo = this.add.sprite(
        this.css.logo.x,
        this.css.logo.y,
        logoKey)
      .setDepth(configs.LAYER_POPUP_OBJECT_CONTENTS)
      .setVisible(false)
      .disableInteractive()
      .setOrigin(0, 0);
    this.menuGroup.set(logoKey, logo);
  }

  #initLogoTextBox() {
    const text = gameData.ACADEMY_INFO.get(this.academy).get('motto').get(this.lang);
    const textBoxConfig = {
      x: this.css.motto.x,
      y: this.css.motto.y,
      text: text,
      style: {
        fixedWidth: this.css.motto.w,
        fixedHeight: this.css.motto.h,
        color: css.DEFAULT_MENU_COLOR,
        fontSize: '12px',
        align: 'left',
        lineSpacing: css.DEFAULT_LINE_SPACING,
        wordWrap: {
          width: this.css.motto.w,
          useAdvancedWrap: true
        },
      },
      padding: {
        y: this.css.motto.padding,
      }
    };
      
    let textBox = this.make.text(textBoxConfig)
      .setDepth(configs.LAYER_POPUP_OBJECT_CONTENTS)
      .setVisible(false)
      .setOrigin(0, 0);
  
    this.menuGroup.set('motto', textBox);
  }

  #initMenuOptionButtons() {
    this.#createMenuOptions();
    
    this.#setOpenHandBookButtonAction();
    this.#setCharacterSelectionButtonAction();
    this.#setMainSceneButtonAction();
    this.#setCloseMenuButtonAction();
  }

  #createMenuOptions() {
    var x = this.css.menuOptions.x;
    var y = this.css.menuOptions.y;

    for (let [key, val] of  this.keys.menuOptions) {
      let button = this.add.sprite(x, y, key)
        .setDepth(configs.LAYER_POPUP_OBJECT_CONTENTS)
        .setVisible(false)
        .setInteractive()
        .setOrigin(0, 0);

      let text = this.make.text({
        x: x,
        y: y,
        text: val.get(this.lang),
        style: {
          fixedWidth: this.css.menuOptions.w,
          fixedHeight: this.css.menuOptions.h,
          color: css.DEFAULT_MENU_COLOR,
          fontSize: '20px',
          align: 'left',
        },
        padding: {
          left: this.css.menuOptions.padding.left,
          top: this.css.menuOptions.padding.top,
        }
      })
      .setDepth(configs.LAYER_POPUP_OBJECT_CONTENTS)
      .setVisible(false)
      .setInteractive()
      .setOrigin(0, 0)
     
      y += this.css.menuOptions.yPlus;
      this.menuGroup.set(key, button);
      this.menuGroup.set(`${key}${this.menuOptionTextSuffix}`, text);
    }
  }

  #setOpenHandBookButtonAction() {
    const key = imgKeys.MENU_BUTTON_1_KEY;
    const button = this.menuGroup.get(key);
    const text = this.menuGroup.get(`${key}${this.menuOptionTextSuffix}`);

    text
      .on('pointerout', () => {
        this.#setDefaultTextColor(text, true);
        this.#setDefaultFrame(button, true);
      })
      .on('pointerdown', () => {
        this.#setDefaultTextColor(text, false);
        this.#setDefaultFrame(button, false);
      })
      .on('pointerup', () => {
        this.#setDefaultTextColor(text, true);
        this.#setDefaultFrame(button, true);
        this.#openHandBook();
      });
  }
  
  #openHandBook() {
    this.#menuGroupVisible(false);
    this.closeButton.setVisible(true);
    this.#showToDoList();
  }

  #showToDoList() {
    for (let i = 0, len = this.toDoList.length; i < len; i++) {
      let content = this.toDoList[i];
      content.setVisible(true)
        .on('pointerdown', () => {
          this.toDoListEditors[i] = this.#setTextEditor(content);
        });
    }
  }

  #setTextEditor(textContent) {
    var config = {
      backgroundColor: this.css.handBook.bgColor,
      onTextChanged: (textObject, text) => {
        if (text.length > this.textMaxLength.get(this.lang)) {
          alert(gameData.NOTICE.get(this.lang).get('todo-alert'));
          return
        }
        textObject.text = text;
      },
    }
  
    return this.plugins.get('rexTextEdit').edit(textContent, config);
  }

  #setCharacterSelectionButtonAction() {
    const key = imgKeys.MENU_BUTTON_2_KEY;
    const button = this.menuGroup.get(key);
    const text = this.menuGroup.get(`${key}${this.menuOptionTextSuffix}`);

    text
      .on('pointerout', () => {
        this.#setDefaultTextColor(text, true);
        this.#setDefaultFrame(button, true);
      })
      .on('pointerdown', () => {
        this.#setDefaultTextColor(text, false);
        this.#setDefaultFrame(button, false);
      })
      .on('pointerup', () => {
        this.#setDefaultTextColor(text, true);
        this.#setDefaultFrame(button, true);
        this.#goToNext(configs.SCENE_CHARACTER_SELECTION);
      });
  }

  #setMainSceneButtonAction() {
    const key = imgKeys.MENU_BUTTON_3_KEY;
    const button = this.menuGroup.get(key);
    const text = this.menuGroup.get(`${key}${this.menuOptionTextSuffix}`);

    text
      .on('pointerout', () => {
        this.#setDefaultTextColor(text, true);
        this.#setDefaultFrame(button, true);
      })
      .on('pointerdown', () => {
        this.#setDefaultTextColor(text, false);
        this.#setDefaultFrame(button, false);
      })
      .on('pointerup', () => {
        this.#setDefaultTextColor(text, true);
        this.#setDefaultFrame(button, true);
        this.#goToNext(configs.SCENE_MAIN);
      });
  }

  #setCloseMenuButtonAction() {
    const key = imgKeys.MENU_BUTTON_4_KEY;
    const button = this.menuGroup.get(key);
    const text = this.menuGroup.get(`${key}${this.menuOptionTextSuffix}`);

    text
      .on('pointerout', () => {
        this.#setDefaultTextColor(text, true);
        this.#setDefaultFrame(button, true);
      })
      .on('pointerdown', () => {
        this.#setDefaultTextColor(text, false);
        this.#setDefaultFrame(button, false);
      })
      .on('pointerup', () => {
        this.#setDefaultTextColor(text, true);
        this.#setDefaultFrame(button, true);
        this.#closeHandBook();
        this.#activeMenuButton(true);
        this.scene.resume(this.currentSceneName);
      });
  }

  #initToDoList() {
    var x = this.css.toDoList.x;
    var y = this.css.toDoList.y;

    for (let i = 0; i < 8; i++) {
      if (i == 4) {
        x += this.css.toDoList.xPlus;
        y = this.css.toDoList.y;
      }
  
      const content = this.#createToDoContent(x, y);
      this.toDoList.push(content);
      y += this.css.toDoList.yPlus;
    }

    // TODO: alarming service
    // TODO: insert To-Do list to character.events for random text event
  }

  #createToDoContent(x, y) {
    return this.make.text({
      x: x,
      y: y,
      text: gameData.NOTICE.get(this.lang).get('todo-place-holder'),
      style: {
        fixedWidth: this.css.toDoList.w,
        fixedHeight: this.css.toDoList.h,
        color: css.DEFAULT_TEXT_COLOR,
        fontSize: '18px',
        maxLines: 3,
        align: 'left',
        lineSpacing: css.DEFAULT_LINE_SPACING,
        wordWrap: {
          width: this.css.toDoList.w,
          useAdvancedWrap: true
        },
      },
      padding: {
        y: this.css.toDoList.padding
      }
    })
    .setInteractive()
    .setDepth(configs.LAYER_POPUP_OBJECT_CONTENTS)
    .setVisible(false)
    .setOrigin(0, 0);
  }

  #activeMenuButton(isActive) {
    this.menuButton.enable = isActive;
    this.menuButton.setVisible(isActive);
  }

  #setDefaultFrame(sprite, isIdle) {
    if (isIdle) {
      sprite.setFrame(this.buttonFrame.get('idle'));
    } else {
      sprite.setFrame(this.buttonFrame.get('clicked'));
    }
  }

  #setDefaultTextColor(textObj, isIdle) {
    if (isIdle) {
      textObj.setColor(css.DEFAULT_MENU_COLOR);
    } else {
      textObj.setColor(css.DEFAULT_MENU_CLICKED_COLOR);
    }
  }

  #menuGroupVisible(isVisible) {
    for(let val of this.menuGroup.values()) {
      if (isVisible) {
        val.setInteractive();
      } else {
        val.disableInteractive();
      }
      val.setVisible(isVisible);
    }
  }

  #closeHandBook() {
    this.#menuGroupVisible(false);
    this.handBook.setVisible(false);
    this.closeButton.setVisible(false);
    this.#hideToDoList();
  }

  #hideToDoList() {
    this.toDoListEditors.forEach(editor => {
      editor.close();
    });

    this.toDoList.forEach(content => {
      content.setVisible(false);
    });
  }

  #goToNext(nextSceneName) {
    this.#closeHandBook();
    
    this.cameras.main.fadeOut(1000,
      css.DEFAULT_BACKGROUND_COLOR_RED,
      css.DEFAULT_BACKGROUND_COLOR_GREEN,
      css.DEFAULT_BACKGROUND_COLOR_BLUE
    );
    this.cameras.main.once('camerafadeoutcomplete', (cam, effect) => {
      this.scene.stop(this.currentSceneName);
      this.time.delayedCall(1000, () => {
        this.scene.start(nextSceneName);
      });
    });
  }
}