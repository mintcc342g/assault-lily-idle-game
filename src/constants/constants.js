// Grid Engine Constants
export const GRID_ENGINE_MOVEMENT_DIRECTION = 4;

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

// Texts
export const RAIMU_RANDOM_TEXTS = new Map([
  ["kr", [
    `(마리아 언덕...\n난 여기가 좋아.)`,
    `(미라이 언니..\n보고 싶다..)`,
  ]],
  ["en", [
    `(The hill of Maria...\nI like this place.)`,
    `(My sister, Mirai..\nI miss you..)`,
  ]],
  ["jp", [
    `(マリアの丘...\nここ好きなの.)`,
    `(未来お姉ちゃん..\n会いたいな..)`,
  ]]
]);