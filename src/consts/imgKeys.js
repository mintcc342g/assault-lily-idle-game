import * as configs from './configs.js';
// var gameData = require('./gameData.js');


// Map Tile Img
export const BACKGROUND_TILE_IMG_KEY = 'background_tileset';


// Characters
export const CHARACTER_RAIMU_ID = 'character_raimu';
export const CHARACTER_MAI_ID = 'character_mai';


// Object Img
export const CAT_01_IMG_KEY = 'cat_01';
export const CAT_02_IMG_KEY = 'cat_02';
export const CAT_03_IMG_KEY = 'cat_03';
export const CAT_04_IMG_KEY = 'cat_04';
export const CAT_05_IMG_KEY = 'cat_05';
export const CAT_06_IMG_KEY = 'cat_06';


// Main
export const MAIN_BACKGROUND_KEY = 'main_background';
export const START_BUTTON_KEY = 'start_button';


// Character Selection
// export const SELECTION_BACKGROUND_KEYS = new Map([
//     [gameData.ACADEMY_LUDOVIC, 'background_img_ludovic'] // order problem?
// ]);
export const PREV_BUTTON_KEY = 'prev_button';
export const NEXT_BUTTON_KEY = 'next_button';
export const PLAY_BUTTON_KEY = 'play_button';
export const BACK_BUTTON_KEY = 'back_button';
export const CHARACTER_SLOT_KEY = 'character_slot';
export const NEXT_PAGE_KEY = 'next_page_button';


// UI
// export const LOGO_PREFIX = 'logo_'; // need to fix the importing order problem
export const HAND_BOOK_KEY = 'hand_book';
export const LOGO_LINE_KEY = 'logo_line';
export const LOGO_KEY = 'logo';
export const LOGO_DEFAULT_KEY = 'logo_default';
export const LOGO_LUDOVIC_KEY = 'logo_ludovic'; // TODO: logo_prefix + academy_name
export const LOGO_YURIGAOKA_KEY = 'logo_yurigaoka';
export const CLOSE_BUTTON_KEY = 'close_button';
export const MENU_BUTTON_1_KEY = 'open_handbook';
export const MENU_BUTTON_2_KEY = 'character_selection_scene';
export const MENU_BUTTON_3_KEY = 'main_scene';
export const MENU_BUTTON_4_KEY = 'close_menu';
export const MENU_OPTION_KEYS = new Map([
    [MENU_BUTTON_1_KEY, new Map([
        [configs.LANG_KR, '학생수첩'],
        [configs.LANG_EN, 'Hand Book'],
        [configs.LANG_JP, '生徒手帳'],
    ])],
    [MENU_BUTTON_2_KEY, new Map([
        [configs.LANG_KR, '캐릭터 화면'],
        [configs.LANG_EN, 'Character Menu'],
        [configs.LANG_JP, 'キャラクター画面'],
    ])],
    [MENU_BUTTON_3_KEY, new Map([
        [configs.LANG_KR, '시작화면'],
        [configs.LANG_EN, 'Main'],
        [configs.LANG_JP, 'タイトルへ'],
    ])],
    [MENU_BUTTON_4_KEY, new Map([
        [configs.LANG_KR, '닫기'],
        [configs.LANG_EN, 'Close'],
        [configs.LANG_JP, '閉じる'],
    ])],
]);


// Game Play Common
export const MENU_BUTTON_KEY = 'menu_button';


// The Hill Of Maria
export const MARIA_HILL_TILESET_CONFIG_KEY = 'map_maria_hill';


// Yurigaoka Glade
export const YURIGAOKA_GLADE_TILESET_CONFIG_KEY = 'map_yurigaoka_glade';
