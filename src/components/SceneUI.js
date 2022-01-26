import * as consts from '../variables/constants.js';
import MenuButtonImg from '../assets/ui/menu_button.png';
import MenuOptionButtonImg from '../assets/ui/menu_option_button.png';
import CloseButtonImg from '../assets/ui/close_button.png';
import HandBookImg from '../assets/ui/hand_book.png';
import MenuImg from '../assets/ui/menu.png';

export default class SceneUI {
  constructor() {
    this.config = {
      menuKey: 'menu',
      menuButtonKey: 'menu_button',
      menuOptionImgKey: 'menu_option_button',
      handBookKey: 'hand_book',
      closeButtonKey: 'close_button',
      textMaxLength: new Map([
        [consts.LANG_KR, 27],
        [consts.LANG_EN, 42],
        [consts.LANG_JP, 27]
      ])
    };
    this.buttonFrame = new Map([
      ["idle", 0],
      ["clicked", 1],
    ]);
    this.menuButton = {};
    this.menuOptionGroup = [];
    this.closeButton = {};
    this.handBook = {};
    this.toDoList = [];
    this.toDoListEditors = [];
  }

  loadUIImg(scene) {
    // sprite Imgs
    scene.load.spritesheet(this.config.menuButtonKey, MenuButtonImg, { frameWidth: 45, frameHeight: 45 });
    scene.load.spritesheet(this.config.menuOptionImgKey, MenuOptionButtonImg, { frameWidth: 174, frameHeight: 46 });
    scene.load.spritesheet(this.config.closeButtonKey, CloseButtonImg, { frameWidth: 45, frameHeight: 45 });

    // normal Img
    scene.load.image(this.config.handBookKey, HandBookImg);
    scene.load.image(this.config.menuKey, MenuImg);
  }

  initMenu(scene) {
    this.menuOptionGroup.push(
      scene.add.sprite(185, 240, this.config.menuKey)
        .setDepth(consts.LAYER_POPUP_OBJECT)
        .setVisible(false)
        .disableInteractive()
        .setOrigin(0, 0)
    );

    this.#initMenuButton(scene);
    this.#initMenuOptionButtons(scene);
  }

  #initMenuButton(scene) {
    this.menuButton = scene.add.sprite(565, 30, this.config.menuButtonKey)
      .setDepth(consts.LAYER_UI)
      .setInteractive()
      .setOrigin(0, 0);

    this.menuButton
      .on('pointerdown', ()=>{
        this.menuButton.setFrame(this.buttonFrame.get('clicked'));
      }, this)
      .on('pointerup', ()=>{
        this.menuButton.setFrame(this.buttonFrame.get('idle'));
        this.#openMenu(scene);
      }, this);
  }

  #initMenuOptionButtons(scene) { // TODO: refactor
    this.#initOpenHandBookButton(scene);
    this.#initGoToSelectSceneButton(scene);
    this.#initGoToStartButton(scene);
    this.#initCloseMenuButton(scene);
  }

  #initOpenHandBookButton(scene) {
    const x = 185 + 48;
    const y = 240 + 48;

    const button = scene.add.sprite(x, y, this.config.menuOptionImgKey)
      .setDepth(consts.LAYER_POPUP_OBJECT_CONTENTS)
      .setVisible(false)
      .setInteractive()
      .setOrigin(0, 0);
    
    const text = scene.make.text({
      x: x,
      y: y+15,
      text: consts.NOTICE.get(scene.lang).get('open-hand-book'),
      style: {
        fixedWidth: 174,
        fixedHeight: 46,
        color: consts.COLOR_TEXT,
        fontSize: '16px',
        align: 'center',
      },
      padding: {
        y: 3,
      }
    })
    .setDepth(consts.LAYER_UI)
    .setInteractive()
    .setVisible(false)
    .setOrigin(0, 0)
    .on('pointerdown', () => {
      button.setFrame(this.buttonFrame.get('clicked'));
    }, this, button)
    .on('pointerup', () => {
      button.setFrame(this.buttonFrame.get('idle'));
      this.#openHandBook(scene);
    }, this, button);

    this.menuOptionGroup.push(button, text);
  }

  #initGoToSelectSceneButton(scene) {
    const x = 185 + 48;
    const y = 240 + 111;

    const button = scene.add.sprite(x, y, this.config.menuOptionImgKey)
      .setDepth(consts.LAYER_POPUP_OBJECT_CONTENTS)
      .setVisible(false)
      .setInteractive()
      .setOrigin(0, 0);
    
    const text = scene.make.text({
      x: x,
      y: y+15,
      text: consts.NOTICE.get(scene.lang).get('go-to-select-scene'),
      style: {
        fixedWidth: 174,
        fixedHeight: 46,
        color: consts.COLOR_TEXT,
        fontSize: '16px',
        align: 'center',
      },
      padding: {
          y: 3,
      }
    })
    .setDepth(consts.LAYER_UI)
    .setInteractive()
    .setVisible(false)
    .setOrigin(0, 0)
    .on('pointerdown', () => {
      button.setFrame(this.buttonFrame.get('clicked'));
    }, this, button)
    .on('pointerup', () => {
      button.setFrame(this.buttonFrame.get('idle'));
      // this.#goToNext(scene, 'CharacterOptionScene'); // TODO: after boot scene task
    }, this, button);

    this.menuOptionGroup.push(button, text);
  }
  
  #initGoToStartButton(scene) {
    const x = 185 + 48;
    const y = 240 + 173;

    const button = scene.add.sprite(x, y, this.config.menuOptionImgKey)
      .setDepth(consts.LAYER_POPUP_OBJECT_CONTENTS)
      .setVisible(false)
      .setInteractive()
      .setOrigin(0, 0);
    
    const text = scene.make.text({
      x: x,
      y: y+15,
      text: consts.NOTICE.get(scene.lang).get('go-to-start-scene'),
      style: {
        fixedWidth: 174,
        fixedHeight: 46,
        color: consts.COLOR_TEXT,
        fontSize: '16px',
        align: 'center',
      },
      padding: {
        y: 3,
      }
    })
    .setDepth(consts.LAYER_UI)
    .setInteractive()
    .setVisible(false)
    .setOrigin(0, 0)
    .on('pointerdown', () => {
      button.setFrame(this.buttonFrame.get('clicked'));
    }, this, button)
    .on('pointerup', () => {
      button.setFrame(this.buttonFrame.get('idle'));
      // this.#goToNext(scene, 'MainScene'); // TODO: after boot scene task
    }, this, button);

    this.menuOptionGroup.push(button, text);
  }

  #initCloseMenuButton(scene) {
    const x = 185 + 48;
    const y = 240 + 236;

    const button = scene.add.sprite(185+48, 240+236, this.config.menuOptionImgKey)
      .setDepth(consts.LAYER_POPUP_OBJECT_CONTENTS)
      .setVisible(false)
      .setInteractive()
      .setOrigin(0, 0);
    
    const text = scene.make.text({
      x: x,
      y: y+15,
      text: consts.NOTICE.get(scene.lang).get('close-menu'),
      style: {
        fixedWidth: 174,
        fixedHeight: 46,
        color: consts.COLOR_TEXT,
        fontSize: '16px',
        align: 'center',
      },
      padding: {
        y: 3,
      }
    })
    .setDepth(consts.LAYER_UI)
    .setInteractive()
    .setVisible(false)
    .setOrigin(0, 0)
    .on('pointerdown', () => {
      button.setFrame(this.buttonFrame.get('clicked'));
    }, this, button)
    .on('pointerup', () => {
      button.setFrame(this.buttonFrame.get('idle'));
      this.#closeMenu();
      this.#activeMenuButton(true);
      scene.restartTime();
    }, this, button, scene);

    this.menuOptionGroup.push(button, text);
  }

  initHandBook(scene) {
    this.handBook = scene.add.sprite(0, 180, this.config.handBookKey)
      .setDepth(consts.LAYER_POPUP_OBJECT)
      .setVisible(false)
      .disableInteractive()
      .setOrigin(0, 0);
    
    this.#initCloseHandbookButton(scene);
  }

  #initCloseHandbookButton(scene) {
    this.closeButton = scene.add.sprite(535, 165, this.config.closeButtonKey)
      .setDepth(consts.LAYER_UI)
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

  initToDoList(scene) {
    var x = 100;
    var y = 210;
    for (let i = 0; i < 8; i++) {
      if (i == 4) {
        x = 358;
        y = 210;
      }
  
      const content = this.#createToDoContent(scene, x, y);
      this.toDoList.push(content);
      y = (y + 95);
    }
  }

  #createToDoContent(scene, x, y) {
    return scene.make.text({
      x: x,
      y: y,
      text: consts.NOTICE.get(scene.lang).get('todo-place-holder'),
      style: {
        fixedWidth: 190,
        fixedHeight: 80,
        color: consts.COLOR_TEXT,
        fontSize: '18px',
        maxLines: 3,
        align: 'left',
        lineSpacing: consts.LINE_SPACING,
        wordWrap: {
          width: 190,
          useAdvancedWrap: true
        },
      },
      padding: {
        y: 4
      }
    })
    .setInteractive()
    .setDepth(consts.LAYER_POPUP_OBJECT_CONTENTS)
    .setVisible(false)
    .setOrigin(0, 0);
  }

  #openMenu(scene) {
    scene.pauseTime();
    this.#activeMenuButton(false);
    this.menuOptionGroup.forEach((item) => {
      item.setInteractive();
      item.setVisible(true);
    });
  }

  #closeMenu() {
    this.menuOptionGroup.forEach((item) => {
      item.disableInteractive();
      item.setVisible(false);
    })
  }
  
  #activeMenuButton(isActive) {
    this.menuButton.enable = isActive;
    this.menuButton.setVisible(isActive);
  }

  #openHandBook(scene) {
    this.#closeMenu();
    this.handBook.setVisible(true);
    this.closeButton.setVisible(true);
    this.#showToDoList(scene);
  }

  #closeHandBook(scene) {
    this.handBook.setVisible(false);
    this.closeButton.setVisible(false);

    this.#hideToDoList(scene);
    this.#activeMenuButton(true);

    scene.restartTime();
  }

  #showToDoList(scene) {
    this.toDoList.forEach(content => {
      content
        .setVisible(true)
        .on('pointerdown', function(){
          this.toDoListEditors.push(this.#setTextEditor(scene, content)); // TODO
        }, this, content, scene);
    });
  }

  #hideToDoList() {
    this.toDoListEditors.forEach(editor => {
      editor.close();
    });

    this.toDoList.forEach(content => {
      content.setVisible(false);
    });
  }
      
  #setTextEditor(scene, textContent) {
    var config = {
      onTextChanged: this.#onTextChanged.bind(this, scene),
      backgroundColor: '#d8d8d8',
    }
  
    return scene.plugins.get('rexTextEdit').edit(textContent, config);
  }

  #onTextChanged(scene, textObject, text) {
    if (text.length > this.config.textMaxLength.get(scene.lang)) {
      alert(consts.NOTICE.get(scene.lang).get('todo-alert'));
      return
    }
    textObject.text = text;
  }

  #goToNext(scene, nextSceneName) {
    this.#closeMenu();

    return
    
    // TODO: need a boot scene because of preload issue
    // scene.cameras.main.fadeOut(1000, 0, 0, 0);
    // scene.cameras.main.once('camerafadeoutcomplete', (cam, effect) => {
    //   scene.time.delayedCall(1000, () => {
    //     scene.scene.stop();
    //     scene.scene.start(nextSceneName);
    //   }, this);    
    // }, scene);
  }  
}
