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
    scene.load.spritesheet(this.defaultConfig.menuButtonKey, MenuButtonImg, { frameWidth: 43, frameHeight: 43 });
    scene.load.image(this.defaultConfig.noteButtonKey, NoteButtonImg);

    // Note Img
    scene.load.image('note', NoteImg);
  }

  createButton(scene, buttonKey, x, y, alpha) {
    return scene.add.sprite(x, y, buttonKey)
      .setDepth(consts.LAYER_UI)
      .setInteractive()
      .setOrigin(0, 0);
  }
  
  setTextEditor(scene, textContent) {
    var config = {
      onTextChanged: this.onTextChanged.bind(this, scene),
      backgroundColor: '#d8d8d8',
    }
  
    return scene.plugins.get('rexTextEdit').edit(textContent, config);
  }

  onTextChanged(scene, textObject, text) {
    if (text.length > this.defaultConfig.textMaxLength.get(scene.lang)) {
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
        fixedWidth: 190,
        fixedHeight: 80,
        color: consts.COLOR_TEXT,
        fontSize: '18px',
        maxLines: 3,
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

  initMenuButton(scene) {
    this.menuButton = this.createButton(scene, this.defaultConfig.menuButtonKey, 565, 40);
    
    this.menuButton
    .on('pointerdown', this.prepareMenu.bind(this))
    .on('pointerup', this.openMenu.bind(this, scene));
  }

  initNote(scene) {
    this.note = scene.add.sprite(0, 180, 'note')
      .setDepth(consts.LAYER_POPUP_OBJECT)
      .setVisible(false)
      .disableInteractive()
      .setOrigin(0, 0);
  }

  initNoteButton(scene) {
    this.noteButton = this.createButton(scene, this.defaultConfig.noteButtonKey, 540, 165);
    
    this.noteButton
      .setVisible(false)
      .on('pointerup', this.closeNote.bind(this, scene));
  }

  initToDoList(scene) {
    var x = 100;
    var y = 210;
    for (let i = 0; i < 8; i++) {
      if (i == 4) {
        x = 358;
        y = 210;
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
    this.activeMenuButton(false);
    this.openNote();
    this.showToDoList(scene);
    this.openTextEditor(scene);
  }
  
  activeMenuButton(isActive) {
    this.menuButton.enable = isActive;
    this.menuButton.setVisible(isActive);
  }

  openNote() {
    this.note.setVisible(true);
    this.noteButton.setVisible(true);
  }

  closeNote(scene) {
    this.closeTextEditors();
    this.hideNoteUI();
    this.hideToDoList(scene);
    this.activeMenuButton(true);
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
