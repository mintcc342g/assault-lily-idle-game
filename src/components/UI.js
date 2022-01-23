import MenuButtonImg from '../assets/ui/menu-button.png';
import NoteImg from '../assets/ui/note.png';

export function loadButton(scene) {
  scene.load.spritesheet('menu_button', MenuButtonImg, { frameWidth: 46, frameHeight: 46 });
}

export function setButton(scene) {
  var button = scene.add.sprite(580, 50, 'menu_button', 0)
    .setAlpha(0.75)
    .setInteractive();

  button.on('pointerup', function () {
    scene.eventEmitter.pauseEvent(scene);
    handleNote(scene);
  }, scene);
}

export function loadNote(scene) {
  scene.load.rexImageURI('note', NoteImg);
}

function handleNote(scene) {
  const duration = 100 // ms
  var note = scene.add.sprite(314, 350, 'note')
  .setDepth(11)
  .setInteractive();
  scene.rexUI.fadeIn(note, duration);

  note.on('pointerup', function() {
    var fade = scene.plugins.get('rexFade').fadeOutDestroy(note, duration);
    fade.on('complete', function(note, fade){
      scene.eventEmitter.startEvent(scene);
    }, scene);
  }, scene, note, duration);
}
