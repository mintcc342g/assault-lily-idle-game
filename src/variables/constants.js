// Grid Engine Constants
export const GRID_ENGINE_MOVEMENT_DIRECTION = 4;

// Layer Constants
export const LAYER_BACKGROUND = 5;
export const LAYER_UI = 6;
export const LAYER_UI_CONTENTS = 7;
export const LAYER_POPUP_OBJECT = 8;
export const LAYER_POPUP_OBJECT_CONTENTS = 9;

// TextBox Constants
export const boxConfig = { wrapWidth: 500, fixedWidth: 500, fixedHeight: 80 };

// Character Common Constants
export const PLAYER_ANIM_KEYS = ["walking_down","walking_left","walking_right","walking_up"];

// Character RAIMU Constants
export const PLAYER_RAIMU_ID = 'player_raimu';

// The Hill Of Maria Constants
export const MARIA_HILL_TILESET_KEY = 'maria_hill_tiles';
export const MARIA_HILL_TILEMAP_KEY = 'map_maria_hill';
export const MARIA_HILL_MAP_IMG_KEY = 'maria_hill_tileset';
export const MARIA_HILL_LAYER_GROUND = 'ground_unwalkable';
export const MARIA_HILL_LAYER_ROAD = 'road_walkable';
export const MARIA_HILL_LAYER_COLLISIONS = 'collisions';
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
export const RAIMU_RANDOM_TEXTS = new Map([
  ["kr", [
    `(마리아 언덕...\n난 여기가 좋아.)`,
    `(미라이 언니..\n보고 싶다..)`,
    `(사치에 언니는 지금 어디 계실까?)`,
    `(사치에 언니랑 크레이프 먹으러 가는 거 기대된다! 헤헷.)`,
    `(졸려...)`,
    `(후아암...)`,
    `(더 강해지지 않으면...!)`,
    `(클라라쨩 아까 세렌쨩을 찾던데..\n찾았으려나?)`,
  ]],
  ["en", [
    `(The hill of Maria...\nI like this place.)`,
    `(My sister, Mirai..\nI miss you a lot.)`,
    `(I wonder where Sachie-Sama is now.)`,
    `(I look forward to eat crepes with Sachie-Sama!)`,
    `(I'm so sleepy...)`,
    `(YAWN...)`,
    `(I want to be stronger...!)`,
    `(Clara-chan was looking for Seren-chan a minute ago.\nI wonder whether she met Seren-chan or not.)`,
  ]],
  ["jp", [
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