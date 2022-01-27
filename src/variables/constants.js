// Grid Engine Constants
export const GRID_ENGINE_MOVEMENT_DIRECTION = 4;


// Layer Constants
export const LAYER_HIDDEN_ITEM = 0;
export const LAYER_BACKGROUND = 1;
export const LAYER_ABOVE_BACKGROUND = 2;
export const LAYER_MAP = 5;
export const LAYER_TEXTBOX = 6;
export const LAYER_POPUP_OBJECT = 7;
export const LAYER_POPUP_OBJECT_CONTENTS = 8;
export const LAYER_UI = 9;


// Scene Name Constants
export const SCENE_BOOT = 'BootScene';
export const SCENE_MAIN = 'MainScene';
export const SCENE_CHARACTER_SELECTION = 'CharacterSelectionScene';
export const SCENE_THE_HILL_OF_MARIA = 'TheHillOfMariaScene';


// TextBox Constants
export const BOX_CONFIG = { wrapWidth: 500, fixedWidth: 500, fixedHeight: 80 };
export const COLOR_TEXT = 0x575a61;
export const FONT_SIZE = '20px';
export const LINE_SPACING = 7;


// Character Common Constants
export const CHARACTER_ANIM_KEYS = ['walking_down','walking_left','walking_right','walking_up'];


// Character Constants
export const CHARACTER_RAIMU_ID = 'player_raimu';


// Main Scene Constants
export const MAIN_BACKGROUND = 'main_background';
export const START_BUTTON = 'start_button';
export const KR_BUTTON_KEY = 'kr_button';
export const EN_BUTTON_KEY = 'en_button';
export const JP_BUTTON_KEY = 'jp_button';


// Scene UI Constants
export const HAND_BOOK_KEY = 'hand_book';
export const MENU_KEY = 'menu';
export const MENU_BUTTON_KEY = 'menu_button';
export const MENU_OPTION_BUTTON_KEY = 'menu_option_button';
export const CLOSE_BUTTON_KEY = 'close_button';


// Character Seletion Constants
export const PREV_BUTTON = 'prev_button';
export const NEXT_BUTTON = 'next_button';
export const SELECTION_BACKGROUND = 'character_selection_background';
export const PLAY_BUTTON = 'play_button';


// The Hill Of Maria Constants
export const MARIA_HILL_TILESET_KEY = 'maria_hill_tiles';
export const MARIA_HILL_MAP_IMG_KEY = 'maria_hill_tileset';
export const MARIA_HILL_TILESET_CONFIG_KEY = 'map_maria_hill';

const MARIA_HILL_LAYER_GROUND = 'ground_unwalkable';
const MARIA_HILL_LAYER_ROAD = 'road_walkable';
const MARIA_HILL_LAYER_COLLISIONS = 'collisions';
export const MARIA_HILL_LAYERS = [MARIA_HILL_LAYER_GROUND, MARIA_HILL_LAYER_ROAD, MARIA_HILL_LAYER_COLLISIONS];


// The Hill Of Maria Events
export const EVENT_RAIMU_TEXTBOX = 'raimu_textbox';
export const EVENT_CONVERSATION_WITH_SACHIE = 'conversation_with_sachie';
export const EVENT_WATCHED_OVER_BY_MIRAI = 'watched_over_by_mirai';
export const EVENT_LIST_MARIA_HILL = [
  EVENT_RAIMU_TEXTBOX,
  // EVENT_CONVERSATION_WITH_SACHIE,
  // EVENT_WATCHED_OVER_BY_MIRAI,
];


// Texts
export const LANG_KR = 'kr';
export const LANG_EN = 'en';
export const LANG_JP = 'jp';

export const RAIMU_RANDOM_TEXTS = new Map([
  [LANG_KR, [
    `(마리아 언덕...\n난 여기가 좋아.)`,
    `(미라이 언니..\n보고 싶다..)`,
    `(사치에 언니는 지금 어디 계실까?)`,
    `(사치에 언니랑 크레이프 먹으러 가는 거 기대된다! 헤헷.)`,
    `(졸려...)`,
    `(후아암...)`,
    `(더 강해지지 않으면...!)`,
    `(클라라쨩 아까 세렌쨩을 찾던데..\n찾았으려나?)`,
  ]],
  [LANG_EN, [
    `(The hill of Maria...\nI like this place.)`,
    `(My sister, Mirai..\nI miss you a lot.)`,
    `(I wonder where Sachie-Sama is now.)`,
    `(I look forward to eat crepes with Sachie-Sama!)`,
    `(I'm so sleepy...)`,
    `(YAWN...)`,
    `(I want to be stronger...!)`,
    `(Clara-chan was looking for Seren-chan a minute ago.\nI wonder whether she met Seren-chan or not.)`,
  ]],
  [LANG_JP, [
    `(マリアの丘...\nここ好きなの.)`,
    `(未来お姉ちゃん..\n会いたいな..)`,
    `(幸恵お姉さま、今どこにいらっしゃるんだろう)`,
    `(幸恵お姉さまとクレープ食べに行くの楽しみ！へへっ。)`,
    `(眠いな...)`,
    `(ふぁーぁ...)`,
    `(もっと強くならなきゃ...!)`,
    `(クララちゃん、さっき聖恋ちゃん探してたよね。\n会えたのかな。)`,
  ]]
]);

export const NOTICE = new Map([
  [
    LANG_KR, new Map([
      ['todo-alert', '(내용이 너무 긴 것 같아. 좀 줄일까..?)'],
      ['todo-place-holder', '할 일을 적고 엔터키를 입력하자.'],
      ['open-hand-book', '학생수첩'],
      ['character-selection-scene', '캐릭터 화면'],
      ['main-scene', '시작화면'],
      ['close-menu', '닫기'],
      // ['info-text', '언어를 선택한 후 [Start] 버튼을 눌러주세요.']
    ])
  ],
  [
    LANG_EN, new Map([
      ['todo-alert', '(I think the text is too long.. How about shortening it?)'],
      ['todo-place-holder', 'Let\'s input To-do things. Then press Enter.'],
      ['open-hand-book', 'Hand Book'],
      ['character-selection-scene', 'Character Menu'],
      ['main-scene', 'Main'],
      ['close-menu', 'Close'],
      // ['info-text', 'select language, then press start button.']
    ])
  ],
  [
    LANG_JP, new Map([
      ['todo-alert', '(ちょっと長いかな。短くした方がいいかも。)'],
      ['todo-place-holder', 'やることを書いた後、エンターキーを押そう。'],
      ['open-hand-book', '生徒手帳'],
      ['character-selection-scene', 'キャラクター画面'],
      ['main-scene', 'タイトルへ'],
      ['close-menu', '閉じる'],
      // ['info-text', '言語を選択した後、[Start] ボタンを押してください。']
    ])
  ],
]);

export const CHARACTER_INFO = new Map([
  [
    CHARACTER_RAIMU_ID, new Map([
      [
        'scene', SCENE_THE_HILL_OF_MARIA
      ],
      [
        'intro', new Map([
          [LANG_KR, '사립 루도비코 여학원의 1학년생. 소속 레기온은 \'아이언 사이드\'. 언니의 의지를 이어 릴리가 되었다. 마리아 언덕에 자주 가는 듯 하다.'],
          [LANG_EN, 'A new first-year student at the private Ludovic Girls Academy. She became a lily to inherit her sister\'s will. Apparently she often go to the Hill Of Maria.'],
          [LANG_JP, '私立ルドビコ女学院の1年生。所属レギオンは「アイアンサイド」。姉の意思を継いでリリィになった。戦死したリリィたちが眠っているマリアの丘によく行くらしい。'],
        ])
      ]
    ])
  ],
]);
