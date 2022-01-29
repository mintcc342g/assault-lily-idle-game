// import { config } from 'webpack';
import * as configs from '../consts/configs.js';
import * as css from '../consts/css.js';
import * as gameData from '../consts/gameData.js';
import * as imgKeys from '../consts/imgKeys.js';

export default class SceneUI {
  constructor() {
    this.handBookKey = imgKeys.HAND_BOOK_KEY;
    this.closeButtonKey = imgKeys.CLOSE_BUTTON_KEY;
    this.menuButtonKeys = imgKeys.MENU_BUTTON_KEYS;
    this.menuButtonTextSuffix = '_text';
    this.buttonFrame = configs.DEFAULT_BUTTON_ANIM;
    this.logoLineKey = imgKeys.LOGO_LINE_KEY;
    this.logoKey ='';
    this.css = {
      handbook: { x: 0, y: 195, },
      logoLine: { x: 102, y: 214 },
      logo: { x: 121, y: 236 },
      motto: { x: 89, y: 460, w: 210, h: 130, padding: 3 },
      selectButton: { x: 340, y: 220, plus: 62 , w: 160, h: 40 },
      closeButton: { x: 548, y: 152 },
      toDoList: { x: 100, y: 210, xPlus: 258 , yPlus: 95,  w: 190, h: 80, padding: 4 },
    };
    this.textMaxLength = new Map([
      [configs.LANG_KR, 27],
      [configs.LANG_EN, 42],
      [configs.LANG_JP, 27]
    ]);
    this.menuGroup = new Map();
    this.closeButton = {};
    this.handBook = {};
    this.toDoList = [];
    this.toDoListEditors = [];
  }

  initMenu(scene) {
    this.#initHandBook(scene);
    this.#initLogoPage(scene);
    this.#initMenuOptionButtons(scene);
    this.#initToDoList(scene);
  }

  openMenu(scene) {
    this.handBook.setVisible(true);
    scene.pauseTime();
    this.#menuGroupVisible(true);
  }
  
  #menuGroupVisible(isVisible) {
    for(let val of this.menuGroup.values()) {
      if (isVisible) {
        val.setInteractive();
      } else {
        val.disableInteractive(); // setInteractive(false) 되는지 테스트
      }
      val.setVisible(isVisible);
    }
  }

  #initHandBook(scene) {
    this.handBook = scene.add.sprite(0, 180, this.handBookKey)
      .setDepth(configs.LAYER_POPUP_OBJECT)
      .setVisible(false)
      .disableInteractive()
      .setOrigin(0, 0);
    
    this.#initCloseHandbookButton(scene);
  }

  #initCloseHandbookButton(scene) {
    this.closeButton = scene.add.sprite(535, 165, this.closeButtonKey)
      .setDepth(configs.LAYER_UI)
      .setVisible(false)
      .setInteractive()
      .setOrigin(0, 0);
    
    this.closeButton
      .on('pointerdown', () => {
        this.closeButton.setFrame(this.buttonFrame.get('clicked'));
      }, this)
      .on('pointerup', ()=>{
        this.closeButton.setFrame(this.buttonFrame.get('idle'));
        this.#closeHandBook(scene);
      }, this);
  }

  #closeHandBook(scene) {
    this.#menuGroupVisible(false);
    this.handBook.setVisible(false);
    this.closeButton.setVisible(false);
    this.#hideToDoList(scene);

    // TODO: make UI scene
    scene.activeMenuButton(true);
    scene.restartTime();
  }
  
  #hideToDoList() {
    this.toDoListEditors.forEach(editor => {
      editor.close();
    });

    this.toDoList.forEach(content => {
      content.setVisible(false);
    });
  }

  #initLogoPage(scene) {
    this.#initLogo(scene);
    this.#initLogoTextBox(scene);
  }

  #initLogo(scene) {
    const logoLine =  scene.add.sprite(this.css.logoLine.x, this.css.logoLine.y, this.logoLineKey)
      .setDepth(configs.LAYER_POPUP_OBJECT_CONTENTS)
      .setVisible(false)
      .disableInteractive()
      .setOrigin(0, 0);

    this.menuGroup.set(this.logoLineKey, logoLine);

    this.logoKey = 'logo_'+scene.mainCharacter.get('academy'); // TODO: move to init function
    const logo = scene.add.sprite(this.css.logo.x, this.css.logo.y, this.logoKey)
      .setDepth(configs.LAYER_POPUP_OBJECT_CONTENTS)
      .setVisible(false)
      .disableInteractive()
      .setOrigin(0, 0);

    this.menuGroup.set(this.logoKey, logo);
  }

  #initLogoTextBox(scene) {
    const text = gameData.ACADEMY_INFO.get(scene.mainCharacter.get('academy')).get('motto').get(scene.lang);
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
      
    let textBox = scene.make.text(textBoxConfig)
      .setDepth(configs.LAYER_POPUP_OBJECT_CONTENTS)
      .setVisible(false)
      .setOrigin(0, 0);
  
    this.menuGroup.set('motto', textBox);
  }

  #initMenuOptionButtons(scene) {
    this.#createMenuButtons(scene);
    
    this.#initOpenHandBookButton(scene);
    this.#initCharacterSelectionSceneButton(scene);
    this.#initMainSceneButton(scene);
    this.#initCloseMenuButton(scene);
  }

  #createMenuButtons(scene) {
    var x = this.css.selectButton.x;
    var y = this.css.selectButton.y;

    for (let [key, val] of  this.menuButtonKeys) {
      let button = scene.add.sprite(x, y, key)
        .setDepth(configs.LAYER_POPUP_OBJECT_CONTENTS)
        .setVisible(false)
        .setInteractive()
        .setOrigin(0, 0);

      let text = scene.make.text({
        x: x+45,
        y: y,
        text: val.get(scene.lang),
        style: {
          fixedWidth: this.css.selectButton.w,
          fixedHeight: this.css.selectButton.h,
          color: css.DEFAULT_MENU_COLOR,
          fontSize: '18px',
          align: 'left',
        },
        padding: {
          y: 3,
        }
      })
      .setDepth(configs.LAYER_POPUP_OBJECT_CONTENTS)
      .setVisible(false)
      .setInteractive()
      .setOrigin(0, 0)
     
      y += this.css.selectButton.plus;
      this.menuGroup.set(key, button);
      this.menuGroup.set(`${key}${this.menuButtonTextSuffix}`, text);
    }
  }

  #initOpenHandBookButton(scene) {
    const key = imgKeys.MENU_BUTTON_1_KEY;
    const button = this.menuGroup.get(key);
    const text = this.menuGroup.get(`${key}${this.menuButtonTextSuffix}`);

    text
      .on('pointerdown', () => {
        text.setColor(css.DEFAULT_MENU_CLICKED_COLOR);
        button.setFrame(this.buttonFrame.get('clicked'));
      }, this, button, text)
      .on('pointerup', () => {
        text.setColor(css.DEFAULT_MENU_COLOR);
        button.setFrame(this.buttonFrame.get('idle'));
        this.#openHandBook(scene);
      }, this, button, text);
  }
  
  #openHandBook(scene) {
    this.#menuGroupVisible(false);
    this.closeButton.setVisible(true);
    this.#showToDoList(scene);
  }

  #showToDoList(scene) {
    this.toDoList.forEach(content => {
      content
        .setVisible(true)
        .on('pointerdown', function(){
          this.toDoListEditors.push(this.#setTextEditor(scene, content));
        }, this, content, scene);
    });
  }

  #setTextEditor(scene, textContent) {
    var config = {
      onTextChanged: this.#onTextChanged.bind(this, scene),
      backgroundColor: '#d8d8d8', // TODO: move to consts
    }
  
    return scene.plugins.get('rexTextEdit').edit(textContent, config);
  }
    
  #onTextChanged(scene, textObject, text) {
    if (text.length > this.textMaxLength.get(scene.lang)) {
      alert(gameData.NOTICE.get(scene.lang).get('todo-alert'));
      return
    }
    textObject.text = text;
  }

  #initCharacterSelectionSceneButton(scene) {
    const key = imgKeys.MENU_BUTTON_2_KEY;
    const button = this.menuGroup.get(key);
    const text = this.menuGroup.get(`${key}${this.menuButtonTextSuffix}`);

    text
      .on('pointerdown', () => {
        text.setColor(css.DEFAULT_MENU_CLICKED_COLOR);
        button.setFrame(this.buttonFrame.get('clicked'));
      }, this, button)
      .on('pointerup', () => {
        text.setColor(css.DEFAULT_MENU_COLOR);
        button.setFrame(this.buttonFrame.get('idle'));
        this.#goToNext(scene, configs.SCENE_CHARACTER_SELECTION);
      }, this, button);
  }
  
  #initMainSceneButton(scene) {
    const key = imgKeys.MENU_BUTTON_3_KEY;
    const button = this.menuGroup.get(key);
    const text = this.menuGroup.get(`${key}${this.menuButtonTextSuffix}`);

    text
      .on('pointerdown', () => {
        text.setColor(css.DEFAULT_MENU_CLICKED_COLOR);
        button.setFrame(this.buttonFrame.get('clicked'));
      }, this, button)
      .on('pointerup', () => {
        text.setColor(css.DEFAULT_MENU_COLOR);
        button.setFrame(this.buttonFrame.get('idle'));
        this.#goToNext(scene, configs.SCENE_MAIN);
      }, this, button);
  }

  #goToNext(scene, nextSceneName) {
    this.#closeHandBook(scene);
    
    scene.cameras.main.fadeOut(1000, 0, 0, 0);
    scene.cameras.main.once('camerafadeoutcomplete', (cam, effect) => {
      scene.scene.start(nextSceneName);
      // scene.time.delayedCall(1000, () => {}, scene);
    }, scene);
  }

  #initCloseMenuButton(scene) {
    const key = imgKeys.MENU_BUTTON_4_KEY;
    const button = this.menuGroup.get(key);
    const text = this.menuGroup.get(`${key}${this.menuButtonTextSuffix}`);

    text
      .on('pointerdown', () => {
        text.setColor(css.DEFAULT_MENU_CLICKED_COLOR);
        button.setFrame(this.buttonFrame.get('clicked'));
      }, this, button)
      .on('pointerup', () => {
        text.setColor(css.DEFAULT_MENU_COLOR);
        button.setFrame(this.buttonFrame.get('idle'));
        this.#closeHandBook(scene);
        scene.activeMenuButton(true); // TODO: edit after UI scene create
        scene.restartTime();
      }, this, button, scene);
  }

  #initToDoList(scene) {
    var x = this.css.toDoList.x;
    var y = this.css.toDoList.y;

    for (let i = 0; i < 8; i++) {
      if (i == 4) {
        x += this.css.toDoList.xPlus;
        y = this.css.toDoList.y;
      }
  
      const content = this.#createToDoContent(scene, x, y);
      this.toDoList.push(content);
      y += this.css.toDoList.yPlus;
    }

    // TODO: alarming service
  }

  #createToDoContent(scene, x, y) {
    return scene.make.text({
      x: x,
      y: y,
      text: gameData.NOTICE.get(scene.lang).get('todo-place-holder'),
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
}
