import * as consts from '../constants/constants.js';

export function makeTileMap(scene, tileMapKey, tilesetKey, mapImgKey, layerNames) {
  const tileMap = scene.make.tilemap({ key: tileMapKey });
  const tileset = tileMap.addTilesetImage(tilesetKey, mapImgKey);
  for (const layerName of layerNames) {
    tileMap.createLayer(layerName, tileset);
    // scene.physics.add.collider(player, layer);
    // layer.setCollisionByProperty({ collides: true });
  }

  return tileMap
}

export function makePlayerSprite(scene, spriteID) {
  const player = scene.add.sprite(0, 0, spriteID);
  player.scale = 1;

  return player
}

export function makeCharacterAnimation(scene, spriteID, keys, frameRate, repeat) {
  for (const key of keys){
    scene.anims.create({
      key: `${key}`,
      frames: [
        {
          key: spriteID,
          frame: `${key}_01.png`
        },
        {
          key: spriteID,
          frame: `${key}_02.png`
        },
        {
          key: spriteID,
          frame: `${key}_03.png`
        },
        {
          key: spriteID,
          frame: `${key}_04.png`
        },
      ],
      frameRate: frameRate,
      repeat: repeat
    });
  }
}

export function getStopFrame(direction) {
  return `idle_${direction}_01.png`;
}

export function hasTrigger(tileMap, position) {
  return tileMap.layers.some((layer) => {
    const tile = tileMap.getTileAt(position.x, position.y, false, layer.name);
    return tile?.properties?.trigger;
  });
}

export function initGridEngine(scene, tileMap, characters) {
  const gridEngineConfig = {
    characters: characters,
    numberOfDirections: consts.GRID_ENGINE_MOVEMENT_DIRECTION,
  };
  scene.gridEngine.create(tileMap, gridEngineConfig);
}

export function subscribeCharacterMovements(scene, character, movingMotion, stopMotion) {
  scene.gridEngine.movementStarted().subscribe(({ direction }) => {
    character.play(`${movingMotion}_${direction}`);
  });
  
  scene.gridEngine.movementStopped().subscribe(({ direction }) => {
    character.anims.stop();
    character.setFrame(getStopFrame(stopMotion));
  });
  
  scene.gridEngine.directionChanged().subscribe(({ direction }) => {
    character.setFrame(getStopFrame(direction));
  });
}
