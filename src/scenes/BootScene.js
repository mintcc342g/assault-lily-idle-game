import Parser from 'phaser';
import MainImg from '../assets/ui/main.png';
import StartButtonImg from '../assets/ui/start_button.png';
import KrButtonImg from '../assets/ui/lang_button_kr.png';
import JpButtonImg from '../assets/ui/lang_button_jp.png';
import EnButtonImg from '../assets/ui/lang_button_en.png';
import MenuButtonImg from '../assets/ui/menu_button.png';
import MenuOptionButtonImg from '../assets/ui/menu_option_button.png';
import CloseButtonImg from '../assets/ui/close_button.png';
import HandBookImg from '../assets/ui/hand_book.png';
import MenuImg from '../assets/ui/menu.png';
import MariaHillJSON from '../assets/maps/map-maria-hill.json';
import MariaHillImage from '../assets/maps/map-maria-hill-tiles.png';
import PlayerRaimuJSON from '../assets/sprites/player-raimu.json';
import PlayerRaimuImg from '../assets/sprites/player-raimu.png';
import * as consts from '../variables/constants.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
      super('BootScene');
      this.name = 'BootScene';
  }

  preload() {
    this.startLoadingBar();

    // load images for MainScene
    this.load.rexImageURI(consts.MAIN_BACKGROUND, MainImg);
    this.load.spritesheet(consts.START_BUTTON, StartButtonImg, { frameWidth: 400, frameHeight: 100 });
    this.load.spritesheet(consts.KR_BUTTON_KEY, KrButtonImg, { frameWidth: 112, frameHeight: 85 });
    this.load.spritesheet(consts.EN_BUTTON_KEY, EnButtonImg, { frameWidth: 112, frameHeight: 85 });
    this.load.spritesheet(consts.JP_BUTTON_KEY, JpButtonImg, { frameWidth: 112, frameHeight: 85 });
    
    // load images for The Hill Of Maria Scene
    this.load.tilemapTiledJSON(consts.MARIA_HILL_TILESET_CONFIG_KEY, MariaHillJSON);
    this.load.rexImageURI(consts.MARIA_HILL_MAP_IMG_KEY, MariaHillImage);
    this.load.atlas(consts.PLAYER_RAIMU_ID, PlayerRaimuImg, PlayerRaimuJSON);

    // load images for Scene UI
    this.load.image(consts.HAND_BOOK_KEY, HandBookImg);
    this.load.image(consts.MENU_KEY, MenuImg);
    this.load.spritesheet(consts.MENU_BUTTON_KEY, MenuButtonImg, { frameWidth: 45, frameHeight: 45 });
    this.load.spritesheet(consts.MENU_OPTION_BUTTON_KEY, MenuOptionButtonImg, { frameWidth: 174, frameHeight: 46 });
    this.load.spritesheet(consts.CLOSE_BUTTON_KEY, CloseButtonImg, { frameWidth: 45, frameHeight: 45 });
  }

  create() {
    this.scene.start('MainScene');
  }

  // see https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/?a=13
  startLoadingBar() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(160, 270, 320, 50);
    
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);
    
    var assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    assetText.setOrigin(0.5, 0.5);
    
    this.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(160, 280, 300 * value, 30);
    });

    this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
    });
  }
}