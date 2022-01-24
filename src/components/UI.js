import * as consts from '../variables/constants.js';
import MenuButtonImg from '../assets/ui/menu_button.png';
import NoteButtonImg from '../assets/ui/note_button.png';
import NoteImg from '../assets/ui/note.png';

export default class UI {
  constructor() {
    this.menuButton = {};
    this.noteButton = {};
    this.note = {};
    this.toDoList = [];
    this.toDoListEditors = [];
  }

  loadUIImg(scene) {
    // Button Imgs
    scene.load.spritesheet(consts.MENU_BUTTON_KEY, MenuButtonImg, { frameWidth: 43, frameHeight: 43 });
    scene.load.image(consts.NOTE_BUTTON_KEY, NoteButtonImg);

    // Note Img
    scene.load.image('note', NoteImg);
  }

  createButton(scene, buttonKey, x, y, alpha) {
    return scene.add.sprite(x, y, buttonKey)
      .setDepth(consts.LAYER_UI)
      .setInteractive();
  }
  
  setTextEditor(scene, textContent) {
    var config = {
      onOpen: function (textObject) {
        textCache = textObject.text;
      },
      onTextChanged: function (textObject, text) {
        if (text.length > consts.TO_DO_CONTENT_MAXLENGTH.get(scene.lang)) {
          alert(consts.NOTICE.get(scene.lang).get('todo-alert'));
          return
        }
        textObject.text = text;
      },
      // onClose: function (textObject) {
      // },
      backgroundColor: 0xe7e5e6
    }
  
    return scene.plugins.get('rexTextEdit').edit(textContent, config);
  }

  createToDoContent(scene, x, y) {
    return scene.make.text({
      x: x,
      y: y,
      text: consts.NOTICE.get(scene.lang).get('todo-place-holder'),
      align: 'left',
      style: {
        maxLines: 3,
        fixedWidth: 180,
        fixedHeight: 80,
        fontSize: '20px',
        color: 0x575a61,
        wordWrap: {
          width: 180,
          useAdvancedWrap: true
        }
      }
    })
    .setInteractive()
    .setDepth(consts.LAYER_POPUP_OBJECT_CONTENTS)
    .setVisible(false)
  }

  initMenuButton(scene) {
    this.menuButton = this.createButton(scene, consts.MENU_BUTTON_KEY, 580, 50, 0.75);
    
    this.menuButton
    .on('pointerdown', function () {
      this.menuButton.setFrame(consts.UI_DEFAULT_FRAME.get('clicked'));
    }, this, scene)
    .on('pointerup', function () {
      this.menuButton.setFrame(consts.UI_DEFAULT_FRAME.get('idle'));
      scene.pauseTime();
      this.disableUISprite(this.menuButton);
      this.openNote();
      this.showToDoList(scene);
      this.openTextEditor(scene);
    }, this, scene);
  }

  initNote(scene) {
    this.note = scene.add.sprite(314, 350, 'note')
    .setDepth(consts.LAYER_POPUP_OBJECT)
    .setVisible(false)
    .disableInteractive()
  }

  initNoteButton(scene) {
    this.noteButton = this.createButton(scene, consts.NOTE_BUTTON_KEY, 560, 145, 1);
    
    this.noteButton
      .setVisible(false)
      .on('pointerup', function () {
        this.closeTextEditors();
        this.closeNote(scene);
        this.hideToDoList(scene);
        this.enableUISprite(this.menuButton);
        scene.restartTime();
    }, this, scene);
  }

  initToDoList(scene) {
    var x = 95;
    var y = 175;
    for (let i = 0; i < 8; i++) {
      if (i == 4) {
        x = 353;
        y = 175;
      }
  
      const content = this.createToDoContent(scene, x, y)
      this.toDoList.push(content);
      y = (y + 95);
    }
  }  
  
  enableUISprite(uiSprite) {
    uiSprite.enable = true;
  }

  disableUISprite(uiSprite) {
    uiSprite.enable = false;
  }

  openNote() {
    this.note.setVisible(true);
    this.noteButton.setVisible(true);
  }

  closeNote() {
    this.note.setVisible(false);
    this.noteButton.setVisible(false);
  }

  showToDoList() {
    this.toDoList.forEach(content => {
      content.setVisible(true);
    });
  }

  hideToDoList() {
    this.toDoList.forEach(content => {
      content.setVisible(false);
    });
  }

  openTextEditor(scene) {
    this.toDoList.forEach(content => {
      content.on('pointerdown', function(){
        this.toDoListEditors.push(this.setTextEditor(scene, content));
      }, this, content, scene);
    });
  }

  closeTextEditors() {
    this.toDoListEditors.forEach(editor => {
      editor.close();
    });
  }
}
