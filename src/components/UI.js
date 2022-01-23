import * as consts from '../variables/constants.js';
import MenuButtonImg from '../assets/ui/menu-button.png';
import NoteImg from '../assets/ui/note.png';

export function loadButton(scene) {
  scene.load.spritesheet('menu_button', MenuButtonImg, { frameWidth: 46, frameHeight: 46 });
}

export function setButton(scene) {
  var button = scene.plugins.get('rexButtonn').add(
    scene.add.sprite(580, 50, 'menu_button', 0).setAlpha(0.75),
    { enable: true }
  );

  button.on('click', function () {
    button.enable = false;
    scene.eventEmitter.pauseEvent(scene);
    handleNote(scene, button);
  }, scene);
}

export function loadNote(scene) {
  scene.load.rexImageURI('note', NoteImg);
}

function handleNote(scene, button) {
  const duration = 100 // ms
  var note = scene.add.sprite(314, 350, 'note')
  .setDepth(consts.LAYER_POPUP_OBJECT)
  .setInteractive()
  .on('pointerup', function() {
    scene.plugins.get('rexFade')
    .fadeOutDestroy(note, duration)
    .on('complete', function(note, fade){
      scene.eventEmitter.startEvent(scene);
      button.enable = true;
    }, scene, button);
  }, scene, note, duration, button);
  
  scene.rexUI.fadeIn(note, duration);
  return note
}
