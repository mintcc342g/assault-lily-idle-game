import * as consts from '../variables/constants.js';
import MenuButtonImg from '../assets/ui/menu_button.png';
import NoteButtonImg from '../assets/ui/note_button.png';
import NoteImg from '../assets/ui/note.png';

export default class UI {
  constructor() {
    this.defaultConfig = {
      menuButtonKey: 'menu_button',
      noteButtonKey: 'note_button',
      textMaxLength: new Map([
        [consts.LANG_KR, 27],
        [consts.LANG_EN, 42],
        [consts.LANG_JP, 27]
      ])
    };
    this.menuButton = {};
    this.noteButton = {};
    this.defaultButtonFrame = new Map([
      ["idle", 0],
      ["clicked", 1],
    ]);
    this.note = {};
    this.toDoList = [];
    this.toDoListEditors = [];
  }

  loadUIImg(scene) {
    // Button Imgs
    scene.load.spritesheet(this.menuButtonKey, MenuButtonImg, { frameWidth: 43, frameHeight: 43 });
    scene.load.image(this.noteButtonKey, NoteButtonImg);

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
      onTextChanged: this.onTextChanged.bind(this, scene),
      backgroundColor: 0xe7e5e6
    }
  
    return scene.plugins.get('rexTextEdit').edit(textContent, config);
  }

  onTextChanged(scene, textObject, text) {
    if (text.length > this.textMaxLength.get(scene.lang)) {
      alert(consts.NOTICE.get(scene.lang).get('todo-alert'));
      return
    }
    textObject.text = text;
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
    this.menuButton = this.createButton(scene, this.menuButtonKey, 580, 50, 0.75);
    
    this.menuButton
    .on('pointerdown', this.prepareMenu.bind(this))
    .on('pointerup', this.openMenu.bind(this, scene));
  }

  initNote(scene) {
    this.note = scene.add.sprite(314, 350, 'note')
    .setDepth(consts.LAYER_POPUP_OBJECT)
    .setVisible(false)
    .disableInteractive()
  }

  initNoteButton(scene) {
    this.noteButton = this.createButton(scene, this.noteButtonKey, 560, 145, 1);
    
    this.noteButton
      .setVisible(false)
      .on('pointerup', this.closeNote.bind(this, scene));
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

  prepareMenu() {
    this.menuButton.setFrame(this.defaultButtonFrame.get('clicked'));
  }

  openMenu(scene) {
    this.menuButton.setFrame(this.defaultButtonFrame.get('idle'));
    scene.pauseTime();
    this.disableUISprite(this.menuButton);
    this.openNote();
    this.showToDoList(scene);
    this.openTextEditor(scene);
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

  closeNote(scene) {
    this.closeTextEditors();
    this.hideNoteUI();
    this.hideToDoList(scene);
    this.enableUISprite(this.menuButton);
    scene.restartTime();
  }
  
  hideNoteUI() {
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
