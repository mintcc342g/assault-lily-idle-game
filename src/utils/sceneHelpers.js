import * as configs from '../consts/configs.js';

export function createTileMap(scene) {
  const tileMap = scene.make.tilemap({ key: scene.tileset.configKey });
  const tileset = tileMap.addTilesetImage(scene.tileset.key, scene.tileset.imgKey);
  for (const layerName of scene.layers) {
    tileMap.createLayer(layerName, tileset);
    // scene.physics.add.collider(player, layer);
    // layer.setCollisionByProperty({ collides: true });
  }

  return tileMap
}

export function createCharacterAnimation(scene, characterID, keys, frameRate, repeat) {
  for (const key of keys){
    scene.anims.create({
      key: `${key}`,
      frames: [
        {
          key: characterID,
          frame: `${key}_01.png`
        },
        {
          key: characterID,
          frame: `${key}_02.png`
        },
        {
          key: characterID,
          frame: `${key}_03.png`
        },
        {
          key: characterID,
          frame: `${key}_04.png`
        },
      ],
      frameRate: frameRate,
      repeat: repeat?repeat:-1
    });
  }
}

export function getStopFrame(direction) {
  return `idle_${direction}_01.png`;
}

export function initGridEngine(scene, tileMap, characters) {
  const gridEngineConfig = {
    characters: characters,
    numberOfDirections: configs.GRID_ENGINE_MOVEMENT_DIRECTION,
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

export function setResponsiveScreen(scene) {
  scene.rexScaleOuter.add(scene.cameras.main);
}