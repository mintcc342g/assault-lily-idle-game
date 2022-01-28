import * as configs from './configs.js';
var gameData = require('./gameData.js');

// Characters
export const CHARACTER_RAIMU_ID = 'player_raimu';


// Main
export const MAIN_BACKGROUND_KEY = 'main_background';
export const START_BUTTON_KEY = 'start_button';
export const KR_BUTTON_KEY = 'kr_button';
export const EN_BUTTON_KEY = 'en_button';
export const JP_BUTTON_KEY = 'jp_button';


// Character Selection
// export const SELECTION_BACKGROUND_KEYS = new Map([
//     [gameData.ACADEMY_LUDOVIC, 'background_img_ludovic'] // the order problem?
// ]);
export const PREV_BUTTON_KEY = 'prev_button';
export const NEXT_BUTTON_KEY = 'next_button';
export const PLAY_BUTTON_KEY = 'play_button';
export const BACK_BUTTON_KEY = 'back_button';

// UI
export const HAND_BOOK_KEY = 'hand_book';
export const LOGO_LINE_KEY = 'logo_line';
export const LOGO_DEFAULT_KEY = 'logo_default';
export const LOGO_LUDOVIC_KEY = 'logo_ludovic';
export const CLOSE_BUTTON_KEY = 'close_button';
export const MENU_BUTTON_1_KEY = 'open-handbook';
export const MENU_BUTTON_2_KEY = 'character-selection-scene';
export const MENU_BUTTON_3_KEY = 'main-scene';
export const MENU_BUTTON_4_KEY = 'close-menu';
export const MENU_BUTTON_KEYS = new Map([
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


// The Hill Of Maria
export const MENU_BUTTON_KEY = 'menu_button';
export const MARIA_HILL_MAP_IMG_KEY = 'maria_hill_tileset';
export const MARIA_HILL_TILESET_CONFIG_KEY = 'map_maria_hill';
