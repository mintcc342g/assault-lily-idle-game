import {
  SCENE_KEY_UI, SCENE_KEY_CHARACTER_SELECTION, SCENE_KEY_MAIN,
  LAYER_UI, LAYER_POPUP_OBJECT, LAYER_POPUP_OBJECT_CONTENTS
} from '../consts/configs.js';
import {
  DEFAULT_HAND_BOOK_BACKGROUND_COLOR, DEFAULT_TEXT_COLOR,
  DEFAULT_MENU_COLOR, DEFAULT_MENU_CLICKED_COLOR, DEFAULT_LINE_SPACING
} from '../consts/css.js';
import {
  MENU_BUTTON_KEY, HAND_BOOK_KEY, CLOSE_BUTTON_KEY, LOGO_LINE_KEY, LOGO_KEY,
  MENU_OPTION_KEYS, MENU_BUTTON_1_KEY, MENU_BUTTON_2_KEY, MENU_BUTTON_3_KEY, MENU_BUTTON_4_KEY
} from '../consts/keys.js';
import { UISetting } from '../sceneHelpers/BaseSetting.js';

export default class UIScene extends UISetting {
  constructor() {
    super(SCENE_KEY_UI)
    this.menuOptionTextSuffix = 'text';
    this.logoImgPrefix = 'logo';
    this.keys = {
      menuButton: MENU_BUTTON_KEY,
      menuOptions: MENU_OPTION_KEYS,
      handBook: HAND_BOOK_KEY,
      close: CLOSE_BUTTON_KEY,
      logoLine: LOGO_LINE_KEY,
      logo: LOGO_KEY,
      toDoListLimit: 8
    },
    this.css = {
      menuButton: { x: 565,  y: 30 },
      handBook: { x: 0, y: 195, bgColor: DEFAULT_HAND_BOOK_BACKGROUND_COLOR },
      logoLine: { x: 102, y: 214 },
      logo: { x: 124, y: 236 },
      motto: { x: 89, y: 460, w: 210, h: 130, padding: 3 },
      menuOptions: { x: 340, y: 220, yPlus: 62, w: 198, h: 40, padding: { left: 40, top: 3 } },
      closeButton: { x: 535, y: 165 },
      toDoList: { x: 120, y: 210, xPlus: 250, yPlus: 95,  w: 170, h: 80, padding: 4 },
    };
    this.currentSceneName = '';
    this.academy = '';
    this.menuGroup = new Map();
    this.menuButton = { /* sprite */ };
    this.handBook = { /* image */ };
    this.closeButton = { /* sprite */ };
    this.toDoList = [];
    this.toDoListEditors = [];
    this.toDoListNumbers = [];
  }

  init(data) {
    this.lang = data.lang;
    this.currentSceneName = data.sceneName;
    this.academy = data.academy;
  }
  
  create() {
    this.initResponsiveScreen();
    this.initCustomAnimation();

    this.#initMenuButton();
    this.#initHandBook();
    this.#initLogoPage();
    this.#initMenuOptionButtons();
    this.#initToDoList();
  }

  #initMenuButton() {
    this.menuButton = this.makeSprite({
      x: this.css.menuButton.x,
      y: this.css.menuButton.y,
      key: this.keys.menuButton,
      depth: LAYER_UI,
      visible: true,
      interactive: true,
    });

    this.menuButton
      .on('pointerout', () => {
        this.clickAnim(this.menuButton, true);
      })
      .on('pointerdown', () => {
        this.clickAnim(this.menuButton, false);
      })
      .on('pointerup', () => {
        this.clickAnim(this.menuButton, true);
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
    this.handBook = this.makeSprite({
      y: 180,
      key: this.keys.handBook,
      depth: LAYER_POPUP_OBJECT,
      visible: false,
      interactive: false,
    });
    
    this.#initCloseHandbookButton();
  }

  #initCloseHandbookButton() {
    this.closeButton = this.makeSprite({
      x: this.css.closeButton.x,
      y: this.css.closeButton.y,
      key: this.keys.close,
      depth: LAYER_UI,
      visible: false,
      interactive: true,
    });
    
    this.closeButton
      .on('pointerout', () => {
        this.clickAnim(this.closeButton, true);
      })
      .on('pointerdown', () => {
        this.clickAnim(this.closeButton, false);
      })
      .on('pointerup', () => {
        this.clickAnim(this.closeButton, true);
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
    const logoImgKey = `${this.logoImgPrefix}_${this.academy}`;

    const logoLine = this.makeSprite({
      x: this.css.logoLine.x,
      y: this.css.logoLine.y,
      key: this.keys.logoLine,
      depth: LAYER_POPUP_OBJECT_CONTENTS,
      visible: false,
      interactive: false,
    });

    const logo = this.makeSprite({
      x: this.css.logo.x,
      y: this.css.logo.y,
      key: logoImgKey,
      depth: LAYER_POPUP_OBJECT_CONTENTS,
      visible: false,
      interactive: false,
    });

    this.menuGroup.set(this.keys.logoLine, logoLine);
    this.menuGroup.set(this.keys.logo, logo);
  }

  #initLogoTextBox() {
    const text = this.transRepo.motto(this.academy, this.lang);
    const textBoxConfig = {
      x: this.css.motto.x,
      y: this.css.motto.y,
      text: text,
      style: {
        fixedWidth: this.css.motto.w,
        fixedHeight: this.css.motto.h,
        color: DEFAULT_MENU_COLOR,
        fontSize: '12px',
        align: 'left',
        lineSpacing: DEFAULT_LINE_SPACING,
        wordWrap: {
          width: this.css.motto.w,
          useAdvancedWrap: true
        },
      },
      padding: {
        y: this.css.motto.padding
      }
    };
      
    let textBox = this.make.text(textBoxConfig)
      .setDepth(LAYER_POPUP_OBJECT_CONTENTS)
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

    for (let key of this.keys.menuOptions) {
      let button = this.makeSprite({ x: x, y: y, key: key,
        depth: LAYER_POPUP_OBJECT_CONTENTS,
        visible: false, interactive: true,
      });

      let text = this.make.text({
        x: x,
        y: y,
        text: this.transRepo.translatedMenu(key, this.lang),
        style: {
          fixedWidth: this.css.menuOptions.w,
          fixedHeight: this.css.menuOptions.h,
          color: DEFAULT_MENU_COLOR,
          fontSize: '18px',
          align: 'left'
        },
        padding: {
          left: this.css.menuOptions.padding.left,
          top: this.css.menuOptions.padding.top
        }
      })
      .setDepth(LAYER_POPUP_OBJECT_CONTENTS)
      .setVisible(false)
      .setInteractive()
      .setOrigin(0, 0)
     
      y += this.css.menuOptions.yPlus;
      this.menuGroup.set(key, button);
      this.menuGroup.set(`${key}_${this.menuOptionTextSuffix}`, text);
    }
  }

  #setOpenHandBookButtonAction() {
    const key = MENU_BUTTON_1_KEY;
    const button = this.menuGroup.get(key);
    const text = this.menuGroup.get(`${key}_${this.menuOptionTextSuffix}`);

    text
      .on('pointerout', () => {
        this.#setDefaultTextColor(text, true);
        this.clickAnim(button, true);
      })
      .on('pointerdown', () => {
        this.#setDefaultTextColor(text, false);
        this.clickAnim(button, false);
      })
      .on('pointerup', () => {
        this.#setDefaultTextColor(text, true);
        this.clickAnim(button, true);
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
      this.toDoListNumbers[i].setVisible(true);

      let content = this.toDoList[i];
      
      content.setVisible(true)
        .on('pointerdown', () => {
          let config = this.#getEditorConfig();

          this.toDoListEditors[i] = this.plugins.get('rexTextEdit').edit(content, config);
          this.#storeChanedContent(i, content);
        });
    }
  }

  #storeChanedContent(index, content) {
    const userToDoList = this.userRepo.toDoContents();

    if (userToDoList[index] == null || userToDoList[index] == undefined) {
      userToDoList[index] = { content: content, time: 0 };
    }
  }

  #getEditorConfig() {
    const maxTextLength = this.transRepo.maxLength(this.lang)
    const alertText = this.transRepo.toDoAlert(this.lang);

    return {
      backgroundColor: this.css.handBook.bgColor,
      onTextChanged: (content, text) => {
        if (text.length > maxTextLength) {
          alert(alertText);
          return
        }
        content.text = text;
      },
    }
  }

  #setCharacterSelectionButtonAction() {
    const key = MENU_BUTTON_2_KEY;
    const button = this.menuGroup.get(key);
    const text = this.menuGroup.get(`${key}_${this.menuOptionTextSuffix}`);

    text
      .on('pointerout', () => {
        this.#setDefaultTextColor(text, true);
        this.clickAnim(button, true);
      })
      .on('pointerdown', () => {
        this.#setDefaultTextColor(text, false);
        this.clickAnim(button, false);
      })
      .on('pointerup', () => {
        this.#setDefaultTextColor(text, true);
        this.clickAnim(button, true);
        this.#goToNext(SCENE_KEY_CHARACTER_SELECTION, { lang: this.lang });
      });
  }

  #setMainSceneButtonAction() {
    const key = MENU_BUTTON_3_KEY;
    const button = this.menuGroup.get(key);
    const text = this.menuGroup.get(`${key}_${this.menuOptionTextSuffix}`);

    text
      .on('pointerout', () => {
        this.#setDefaultTextColor(text, true);
        this.clickAnim(button, true);
      })
      .on('pointerdown', () => {
        this.#setDefaultTextColor(text, false);
        this.clickAnim(button, false);
      })
      .on('pointerup', () => {
        this.#setDefaultTextColor(text, true);
        this.clickAnim(button, true);
        this.#goToNext(SCENE_KEY_MAIN, { lang: this.lang });
      });
  }

  #setCloseMenuButtonAction() {
    const key = MENU_BUTTON_4_KEY;
    const button = this.menuGroup.get(key);
    const text = this.menuGroup.get(`${key}_${this.menuOptionTextSuffix}`);

    text
      .on('pointerout', () => {
        this.#setDefaultTextColor(text, true);
        this.clickAnim(button, true);
      })
      .on('pointerdown', () => {
        this.#setDefaultTextColor(text, false);
        this.clickAnim(button, false);
      })
      .on('pointerup', () => {
        this.#setDefaultTextColor(text, true);
        this.clickAnim(button, true);
        this.#closeHandBook();
        this.#activeMenuButton(true);
        this.scene.resume(this.currentSceneName);
      });
  }

  #initToDoList() {
    let x = this.css.toDoList.x;
    let y = this.css.toDoList.y;
    const nextPage = this.keys.toDoListLimit / 2;

    for (let i = 0; i < this.keys.toDoListLimit; i++) {
      if (i == nextPage) {
        x += this.css.toDoList.xPlus;
        y = this.css.toDoList.y;
      }
  
      let item = this.userRepo.toDoContent(i);
      this.toDoList[i] = this.#createToDoContent(x, y, item?item.content.text:'').setInteractive();
      this.toDoListNumbers[i] = this.#createToDoContent(x-30, y, `${i+1}. `).disableInteractive();
      
      y += this.css.toDoList.yPlus;
    }

    // TODO: change toDoContent item as a class, not a phaser Text obj
    // TODO: alarming service
  }

  #createToDoContent(x, y, text) {
    return this.make.text({
      x: x,
      y: y,
      text: text,
      style: {
        fixedWidth: this.css.toDoList.w,
        fixedHeight: this.css.toDoList.h,
        color: DEFAULT_TEXT_COLOR,
        fontSize: '18px',
        maxLines: 3,
        align: 'left',
        lineSpacing: DEFAULT_LINE_SPACING,
        wordWrap: {
          width: this.css.toDoList.w,
          useAdvancedWrap: true
        },
      },
      padding: {
        y: this.css.toDoList.padding
      }
    })
    .setDepth(LAYER_POPUP_OBJECT_CONTENTS)
    .setVisible(false)
    .setOrigin(0, 0);
  }

  #activeMenuButton(isActive) {
    this.menuButton.enable = isActive;
    this.menuButton.setVisible(isActive);
  }

  #setDefaultTextColor(textObj, isIdle) {
    if (isIdle) {
      textObj.setColor(DEFAULT_MENU_COLOR);
    } else {
      textObj.setColor(DEFAULT_MENU_CLICKED_COLOR);
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
    for (let i = 0; i < this.keys.toDoListLimit; i++) {
      let editor = this.toDoListEditors[i];
      if (editor !== undefined && editor !== null) {
        editor.close(); // NOTE: 1) close editor,
      }

      this.toDoList[i].setVisible(false); // NOTE: 2) hide Text Obj. (the order is important.)
      this.toDoListNumbers[i].setVisible(false);
    }
  }

  #goToNext(nextSceneName, data) {
    this.#closeHandBook();
    
    this.fadeOut(1000);

    this.cameras.main.once('camerafadeoutcomplete', (cam, effect) => {
      this.scene.stop(this.currentSceneName);
      this.time.delayedCall(1000, () => {
        this.scene.start(nextSceneName, data);
      });
    });
  }
}