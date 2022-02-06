// languages
export const LANG_KR = 'kr';
export const LANG_EN = 'en';
export const LANG_JP = 'jp';


// Phaser 3 Constants
export const DEFAULT_ANIM_WALKING_DOWN_KEY = 'walking_down';
export const DEFAULT_ANIM_WALKING_LEFT_KEY = 'walking_left';
export const DEFAULT_ANIM_WALKING_RIGHT_KEY = 'walking_right';
export const DEFAULT_ANIM_WALKING_UP_KEY = 'walking_up';
export const DEFAULT_ANIM_SLEEP_KEY = 'sleep';
export const CHARACTER_ANIM_KEYS = [
  DEFAULT_ANIM_WALKING_DOWN_KEY,
  DEFAULT_ANIM_WALKING_LEFT_KEY,
  DEFAULT_ANIM_WALKING_RIGHT_KEY,
  DEFAULT_ANIM_WALKING_UP_KEY,
  DEFAULT_ANIM_SLEEP_KEY
];
export const DEFAULT_ANIM_FRAME_DURATION = 800;
export const DEFAULT_SLEEP_ANIM_FRAME_DURATION = 2000;
export const DEFAULT_SLEEP_ANIM_REPEAT_DURATION = 1000;

// Grid Engine Constants
export const GRID_ENGINE_MOVEMENT_DIRECTION = 4;


// Scenes
export const SCENE_BOOT = 'BootScene';
export const SCENE_MAIN = 'MainScene';
export const SCENE_UI = 'UIScene';
export const SCENE_CHARACTER_SELECTION = 'CharacterSelectionScene';
export const SCENE_THE_HILL_OF_MARIA = 'TheHillOfMariaScene';
export const SCENE_YURIGAOKA_GLADE = 'YurigaokaGladeScene';


// Game Layers
export const LAYER_HIDDEN_ITEM = 0;
export const LAYER_BACKGROUND = 1;
export const LAYER_ABOVE_BACKGROUND = 2;
export const LAYER_MAP = 5;
export const LAYER_TEXTBOX = 6;
export const LAYER_POPUP_OBJECT = 7;
export const LAYER_POPUP_OBJECT_CONTENTS = 8;
export const LAYER_UI = 9;


// UI
export const DEFAULT_BUTTON_ANIM = new Map([
  ['idle', 0],
  ['clicked', 1],
]);


// Tile JSON
export const BACKGROUND_TILESET_NAME = 'background_tiles';

const MARIA_HILL_LAYER_GROUND = 'ground_unwalkable';
const MARIA_HILL_LAYER_ROAD = 'road_walkable';
const MARIA_HILL_LAYER_FLOWER = 'flower';
const MARIA_HILL_LAYER_COLLIDE = 'collide';
export const MARIA_HILL_LAYERS = [MARIA_HILL_LAYER_GROUND, MARIA_HILL_LAYER_ROAD, MARIA_HILL_LAYER_FLOWER, MARIA_HILL_LAYER_COLLIDE];

const GLADE_LAYER_GROUND = 'ground';
const GLADE_LAYER_TREE = 'tree';
const GLADE_LAYER_FLOWER = 'flower';
export const YURIGAOKA_GLADE_LAYERS = [GLADE_LAYER_GROUND, GLADE_LAYER_TREE, GLADE_LAYER_FLOWER];
