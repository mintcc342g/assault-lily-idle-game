/* characters imgs */ 
import CharacterRaimuJSON from '../assets/sprites/character_raimu.json';
import CharacterRaimuImg from '../assets/sprites/character_raimu.png';
import CharacterMaiJSON from '../assets/sprites/character_mai.json';
import CharacterMaiImg from '../assets/sprites/character_mai.png';
import CharacterSachieJSON from '../assets/sprites/character_sachie.json';
import CharacterSachieImg from '../assets/sprites/character_sachie.png';

/* map imgs */
import BackgroundTileImage from '../assets/maps/background_tiles.png';

/* object imgs */
import CatImage01 from '../assets/objects/cat_01.png';
import CatImage02 from '../assets/objects/cat_02.png';
import CatImage03 from '../assets/objects/cat_03.png';
import CatImage04 from '../assets/objects/cat_04.png';
import CatImage05 from '../assets/objects/cat_05.png';
import CatImage06 from '../assets/objects/cat_06.png';

/* main scene imgs */
import MainImg from '../assets/ui/main.png';
import StartButtonImg from '../assets/ui/start_button.png';
import KrButtonImg from '../assets/ui/lang_button_kr.png';
import JpButtonImg from '../assets/ui/lang_button_jp.png';
import EnButtonImg from '../assets/ui/lang_button_en.png';

/* selection scene imgs */
import SelectionBackgroundImgLudovic from '../assets/ui/character_selection_ludovic.png';
import SelectionBackgroundImgYurigaoka from '../assets/ui/character_selection_yurigaoka.png';
import CharacterSlotImg from '../assets/ui/character_slot.png';
import PrevButtonImg from '../assets/ui/prev_button.png';
import NextButtonImg from '../assets/ui/next_button.png';
import PlayButtonImg from '../assets/ui/play_button.png';
import BackButtonImg from '../assets/ui/back_button.png';

/* ui images */
import HandBookImg from '../assets/ui/hand_book.png';
import CloseButtonImg from '../assets/ui/close_button.png';
import LogoLineImg from '../assets/ui/logo_line_motto.png';
import LogoLudovicImg from '../assets/ui/logo_ludovic_small.png';
import LogoYurigaokaImg from '../assets/ui/logo_yurigaoka_middle.png';
import MenuButtonImg from '../assets/ui/menu_button.png';
import MenuButtonFirstImg from '../assets/ui/menu_select_button_1.png';
import MenuButtonSecondImg from '../assets/ui/menu_select_button_2.png';
import MenuButtonThirdImg from '../assets/ui/menu_select_button_3.png';
import MenuButtonFourthImg from '../assets/ui/menu_select_button_4.png';

/* hill scene imgs */
import MariaHillJSON from '../assets/maps/map_maria_hill.json';
import GladeJSON from '../assets/maps/map_yurigaoka_glade.json';

import * as imgKeys from '../consts/imgKeys.js';
import { SCENE_BOOT, SCENE_MAIN } from '../consts/configs.js';
import { BaseSetting } from '../sceneHelpers/BaseSetting.js';

export default class BootScene extends BaseSetting {
  constructor() {
    super(SCENE_BOOT);
  }

  preload() {
    this.#startLoadingBar();
    this.#loadCharacterImgs();
    this.#loadMapImgs();
    this.#loadObjectImgs();
    this.#loadMainSceneImgs();
    this.#loadSelectionSceneImgs();
    this.#loadUISceneImgs();
  }

  create() {
    this.initResponsiveScreen();
    this.scene.start(SCENE_MAIN);
  }

  // see https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/?a=13
  #startLoadingBar() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x000000, 0.8);
    progressBox.fillRect(160, 270, 320, 50);
    
    var width = this.rexScaleOuter.innerViewport.width;
    var height = this.rexScaleOuter.innerViewport.height;
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

  #loadCharacterImgs() {
    this.load.atlas(this.keyRepo.raimuID(), CharacterRaimuImg, CharacterRaimuJSON);
    this.load.atlas(this.keyRepo.maiID(), CharacterMaiImg, CharacterMaiJSON);
    this.load.atlas(this.keyRepo.sachieID(), CharacterSachieImg, CharacterSachieJSON);
  }

  #loadMapImgs() {
    this.load.image(imgKeys.BACKGROUND_TILE_IMG_KEY, BackgroundTileImage);
    this.load.tilemapTiledJSON(imgKeys.MARIA_HILL_TILESET_CONFIG_KEY, MariaHillJSON);
    this.load.tilemapTiledJSON(imgKeys.YURIGAOKA_GLADE_TILESET_CONFIG_KEY, GladeJSON);
  }
  
  #loadObjectImgs() {
    this.load.image(imgKeys.CAT_01_IMG_KEY, CatImage01);
    this.load.image(imgKeys.CAT_02_IMG_KEY, CatImage02);
    this.load.image(imgKeys.CAT_03_IMG_KEY, CatImage03);
    this.load.image(imgKeys.CAT_04_IMG_KEY, CatImage04);
    this.load.image(imgKeys.CAT_05_IMG_KEY, CatImage05);
    this.load.image(imgKeys.CAT_06_IMG_KEY, CatImage06);
  }

  #loadMainSceneImgs() {
    this.load.image(imgKeys.MAIN_BACKGROUND_KEY, MainImg);
    this.load.spritesheet(imgKeys.START_BUTTON_KEY, StartButtonImg, { frameWidth: 188, frameHeight: 92 });
    this.load.spritesheet(this.keyRepo.kr(), KrButtonImg, { frameWidth: 100, frameHeight: 64 });
    this.load.spritesheet(this.keyRepo.en(), EnButtonImg, { frameWidth: 100, frameHeight: 64 });
    this.load.spritesheet(this.keyRepo.jp(), JpButtonImg, { frameWidth: 100, frameHeight: 64 });
  }

  #loadSelectionSceneImgs() {
    this.load.image(imgKeys.LUDOVIC_HANDBOOK_IMG_KEY, SelectionBackgroundImgLudovic);
    this.load.image(imgKeys.YURIGAOKA_HANDBOOK_IMG_KEY, SelectionBackgroundImgYurigaoka);
    this.load.image(imgKeys.CHARACTER_SLOT_KEY, CharacterSlotImg);
    this.load.image(imgKeys.NEXT_PAGE_KEY, 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
    this.load.spritesheet(imgKeys.PREV_BUTTON_KEY, PrevButtonImg, { frameWidth: 36, frameHeight: 42 });
    this.load.spritesheet(imgKeys.NEXT_BUTTON_KEY, NextButtonImg, { frameWidth: 36, frameHeight: 42 });
    this.load.spritesheet(imgKeys.PLAY_BUTTON_KEY, PlayButtonImg, { frameWidth: 114, frameHeight: 50 });
    this.load.spritesheet(imgKeys.BACK_BUTTON_KEY, BackButtonImg, { frameWidth: 114, frameHeight: 50 });
  }

  #loadUISceneImgs() {
    this.load.image(imgKeys.HAND_BOOK_KEY, HandBookImg);
    this.load.image(imgKeys.LOGO_LINE_KEY, LogoLineImg);
    this.load.image(imgKeys.LOGO_LUDOVIC_KEY, LogoLudovicImg);
    this.load.image(imgKeys.LOGO_YURIGAOKA_KEY, LogoYurigaokaImg);
    this.load.spritesheet(imgKeys.CLOSE_BUTTON_KEY, CloseButtonImg, { frameWidth: 45, frameHeight: 45 });
    this.load.spritesheet(imgKeys.MENU_BUTTON_KEY, MenuButtonImg, { frameWidth: 39, frameHeight: 54 });
    this.load.spritesheet(imgKeys.MENU_BUTTON_1_KEY, MenuButtonFirstImg, { frameWidth: 198, frameHeight: 50 });
    this.load.spritesheet(imgKeys.MENU_BUTTON_2_KEY, MenuButtonSecondImg, { frameWidth: 198, frameHeight: 50 });
    this.load.spritesheet(imgKeys.MENU_BUTTON_3_KEY, MenuButtonThirdImg, { frameWidth: 198, frameHeight: 50 });
    this.load.spritesheet(imgKeys.MENU_BUTTON_4_KEY, MenuButtonFourthImg, { frameWidth: 198, frameHeight: 50 });
  }
}
