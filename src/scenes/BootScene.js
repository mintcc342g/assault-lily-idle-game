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

import * as keys from '../consts/keys.js';
import { SCENE_KEY_BOOT, SCENE_KEY_MAIN } from '../consts/configs.js';
import { BaseSetting } from '../sceneHelpers/BaseSetting.js';

export default class BootScene extends BaseSetting {
  constructor() {
    super(SCENE_KEY_BOOT);
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
    this.sceneStart(SCENE_KEY_MAIN);
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
    this.load.atlas(keys.CHARACTER_ID_RAIMU, CharacterRaimuImg, CharacterRaimuJSON);
    this.load.atlas(keys.CHARACTER_ID_MAI, CharacterMaiImg, CharacterMaiJSON);
    this.load.atlas(keys.CHARACTER_ID_SACHIE, CharacterSachieImg, CharacterSachieJSON);
  }

  #loadMapImgs() {
    this.load.image(keys.BACKGROUND_TILE_IMG_KEY, BackgroundTileImage);
    this.load.tilemapTiledJSON(keys.MARIA_HILL_TILESET_CONFIG_KEY, MariaHillJSON);
    this.load.tilemapTiledJSON(keys.YURIGAOKA_GLADE_TILESET_CONFIG_KEY, GladeJSON);
  }
  
  #loadObjectImgs() {
    this.load.image(keys.CAT_IMG_KEY+'1', CatImage01);
    this.load.image(keys.CAT_IMG_KEY+'2', CatImage02);
    this.load.image(keys.CAT_IMG_KEY+'3', CatImage03);
    this.load.image(keys.CAT_IMG_KEY+'4', CatImage04);
    this.load.image(keys.CAT_IMG_KEY+'5', CatImage05);
    this.load.image(keys.CAT_IMG_KEY+'6', CatImage06);
  }

  #loadMainSceneImgs() {
    this.load.image(keys.MAIN_BACKGROUND_KEY, MainImg);
    this.load.spritesheet(keys.START_BUTTON_KEY, StartButtonImg, { frameWidth: 188, frameHeight: 92 });
    this.load.spritesheet(keys.LANG_KR, KrButtonImg, { frameWidth: 100, frameHeight: 64 });
    this.load.spritesheet(keys.LANG_EN, EnButtonImg, { frameWidth: 100, frameHeight: 64 });
    this.load.spritesheet(keys.LANG_JP, JpButtonImg, { frameWidth: 100, frameHeight: 64 });
  }

  #loadSelectionSceneImgs() {
    this.load.image(keys.LUDOVIC_HANDBOOK_IMG_KEY, SelectionBackgroundImgLudovic);
    this.load.image(keys.YURIGAOKA_HANDBOOK_IMG_KEY, SelectionBackgroundImgYurigaoka);
    this.load.image(keys.CHARACTER_SLOT_KEY, CharacterSlotImg);
    this.load.image(keys.NEXT_PAGE_KEY, 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
    this.load.spritesheet(keys.PREV_BUTTON_KEY, PrevButtonImg, { frameWidth: 36, frameHeight: 42 });
    this.load.spritesheet(keys.NEXT_BUTTON_KEY, NextButtonImg, { frameWidth: 36, frameHeight: 42 });
    this.load.spritesheet(keys.PLAY_BUTTON_KEY, PlayButtonImg, { frameWidth: 114, frameHeight: 50 });
    this.load.spritesheet(keys.BACK_BUTTON_KEY, BackButtonImg, { frameWidth: 114, frameHeight: 50 });
  }

  #loadUISceneImgs() {
    this.load.image(keys.HAND_BOOK_KEY, HandBookImg);
    this.load.image(keys.LOGO_LINE_KEY, LogoLineImg);
    this.load.image(keys.LOGO_LUDOVIC_KEY, LogoLudovicImg);
    this.load.image(keys.LOGO_YURIGAOKA_KEY, LogoYurigaokaImg);
    this.load.spritesheet(keys.CLOSE_BUTTON_KEY, CloseButtonImg, { frameWidth: 45, frameHeight: 45 });
    this.load.spritesheet(keys.MENU_BUTTON_KEY, MenuButtonImg, { frameWidth: 39, frameHeight: 54 });
    this.load.spritesheet(keys.MENU_BUTTON_1_KEY, MenuButtonFirstImg, { frameWidth: 198, frameHeight: 50 });
    this.load.spritesheet(keys.MENU_BUTTON_2_KEY, MenuButtonSecondImg, { frameWidth: 198, frameHeight: 50 });
    this.load.spritesheet(keys.MENU_BUTTON_3_KEY, MenuButtonThirdImg, { frameWidth: 198, frameHeight: 50 });
    this.load.spritesheet(keys.MENU_BUTTON_4_KEY, MenuButtonFourthImg, { frameWidth: 198, frameHeight: 50 });
  }
}
