// languages
export const LANG_KR = 'kr';
export const LANG_EN = 'en';
export const LANG_JP = 'jp';


// Grid Engine Constants
export const GRID_ENGINE_MOVEMENT_DIRECTION = 4;
export const DEFAULT_FRAME_DURATION = 800;


// Scenes
export const SCENE_BOOT = 'BootScene';
export const SCENE_MAIN = 'MainScene';
export const SCENE_UI = 'UIScene';
export const SCENE_CHARACTER_SELECTION = 'CharacterSelectionScene';
export const SCENE_THE_HILL_OF_MARIA = 'TheHillOfMariaScene';


// Game Layers
export const LAYER_HIDDEN_ITEM = 0;
export const LAYER_BACKGROUND = 1;
export const LAYER_ABOVE_BACKGROUND = 2;
export const LAYER_MAP = 5;
export const LAYER_TEXTBOX = 6;
export const LAYER_POPUP_OBJECT = 7;
export const LAYER_POPUP_OBJECT_CONTENTS = 8;
export const LAYER_UI = 9;


// Character
export const CHARACTER_ANIM_KEYS = ['walking_down','walking_left','walking_right','walking_up'];


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