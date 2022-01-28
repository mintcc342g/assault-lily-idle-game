import Parser from 'phaser';

// main scene imgs
import MainImg from '../assets/ui/main.png';
import StartButtonImg from '../assets/ui/start_button.png';
import KrButtonImg from '../assets/ui/lang_button_kr.png';
import JpButtonImg from '../assets/ui/lang_button_jp.png';
import EnButtonImg from '../assets/ui/lang_button_en.png';

// selection scene imgs
import SelectionBackgroundImgLudovic from '../assets/ui/character_selection_ludovic.png';
import PrevButtonImg from '../assets/ui/prev_button.png';
import NextButtonImg from '../assets/ui/next_button.png';
import PlayButtonImg from '../assets/ui/play_button.png';
import BackButtonImg from '../assets/ui/back_button.png';

// ui images
import HandBookImg from '../assets/ui/hand_book.png';
import CloseButtonImg from '../assets/ui/close_button.png';
import LogoLineImg from '../assets/ui/logo_line.png';
import LogoDefaultImg from '../assets/ui/logo_al.png';
import LogoLudovicImg from '../assets/ui/logo_ludovic.png';
import MenuButtonFirstImg from '../assets/ui/menu_select_button_1.png';
import MenuButtonSecondImg from '../assets/ui/menu_select_button_2.png';
import MenuButtonThirdImg from '../assets/ui/menu_select_button_3.png';
import MenuButtonFourthImg from '../assets/ui/menu_select_button_4.png';

// hill scene imgs
import MenuButtonImg from '../assets/ui/menu_button.png';
import MariaHillJSON from '../assets/maps/map-maria-hill.json';
import MariaHillImage from '../assets/maps/map-maria-hill-tiles.png';

// characters imgs
import PlayerRaimuJSON from '../assets/sprites/player-raimu.json';
import PlayerRaimuImg from '../assets/sprites/player-raimu.png';

import * as configs from '../consts/configs.js';
import * as gameData from '../consts/gameData.js';
import * as imgKeys from '../consts/imgKeys.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super(configs.SCENE_BOOT);
    this.name = configs.SCENE_BOOT;
  }

  preload() {
    this.startLoadingBar();
    this.loadCharacterImgs();
    this.loadMainSceneImgs();
    this.loadSelectionSceneImgs();
    this.loadUISceneImgs();
    this.loadHillSceneImgs();
  }

  create() {
    this.scene.start(configs.SCENE_MAIN);
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

  loadCharacterImgs() {
    this.load.atlas(imgKeys.CHARACTER_RAIMU_ID, PlayerRaimuImg, PlayerRaimuJSON);
  }

  loadMainSceneImgs() {
    this.load.image(imgKeys.MAIN_BACKGROUND_KEY, MainImg);
    this.load.spritesheet(imgKeys.START_BUTTON_KEY, StartButtonImg, { frameWidth: 188, frameHeight: 92 });
    this.load.spritesheet(imgKeys.KR_BUTTON_KEY, KrButtonImg, { frameWidth: 100, frameHeight: 64 });
    this.load.spritesheet(imgKeys.EN_BUTTON_KEY, EnButtonImg, { frameWidth: 100, frameHeight: 64 });
    this.load.spritesheet(imgKeys.JP_BUTTON_KEY, JpButtonImg, { frameWidth: 100, frameHeight: 64 });
  }

  loadSelectionSceneImgs() {
    this.load.image(gameData.SELECTION_BACKGROUND_KEYS.get(gameData.ACADEMY_LUDOVIC), SelectionBackgroundImgLudovic);
    this.load.image(imgKeys.PREV_BUTTON_KEY, PrevButtonImg);
    this.load.image(imgKeys.NEXT_BUTTON_KEY, NextButtonImg);
    this.load.spritesheet(imgKeys.PLAY_BUTTON_KEY, PlayButtonImg, { frameWidth: 114, frameHeight: 50 });
    this.load.spritesheet(imgKeys.BACK_BUTTON_KEY, BackButtonImg, { frameWidth: 114, frameHeight: 50 });
  }

  loadUISceneImgs() {
    this.load.image(imgKeys.HAND_BOOK_KEY, HandBookImg);
    this.load.image(imgKeys.LOGO_LINE_KEY, LogoLineImg);
    this.load.image(imgKeys.LOGO_DEFAULT_KEY, LogoDefaultImg);
    this.load.image(imgKeys.LOGO_LUDOVIC_KEY, LogoLudovicImg);
    this.load.spritesheet(imgKeys.CLOSE_BUTTON_KEY, CloseButtonImg, { frameWidth: 45, frameHeight: 45 });

    this.load.spritesheet(imgKeys.MENU_BUTTON_1_KEY, MenuButtonFirstImg, { frameWidth: 198, frameHeight: 50 });
    this.load.spritesheet(imgKeys.MENU_BUTTON_2_KEY, MenuButtonSecondImg, { frameWidth: 198, frameHeight: 50 });
    this.load.spritesheet(imgKeys.MENU_BUTTON_3_KEY, MenuButtonThirdImg, { frameWidth: 198, frameHeight: 50 });
    this.load.spritesheet(imgKeys.MENU_BUTTON_4_KEY, MenuButtonFourthImg, { frameWidth: 198, frameHeight: 50 });
  }

  loadHillSceneImgs() {
    this.load.spritesheet(imgKeys.MENU_BUTTON_KEY, MenuButtonImg, { frameWidth: 35, frameHeight: 50 });
    this.load.image(imgKeys.MARIA_HILL_MAP_IMG_KEY, MariaHillImage);
    this.load.tilemapTiledJSON(imgKeys.MARIA_HILL_TILESET_CONFIG_KEY, MariaHillJSON);
  }
}
