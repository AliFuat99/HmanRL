import * as ROT from 'https://unpkg.com/rot-js@2.2.1/lib/index.js';

export function createFOV(mapData) {
  const isOpaque = (x, y) => {
    if (x < 0 || y < 0 || y >= mapData.height || x >= mapData.width) return true;
    const row = mapData.tiles[y];
    if (!row) return true;
    const tile = row[x];
    if (!tile) return true;
    return tile === '#';
  };

  // ROT.FOV.DiscreteShadowcasting ile deneyelim
  return new ROT.FOV.DiscreteShadowcasting(isOpaque);
}

export function computeFOV(player, mapData, radius = 10) {
  const fov = createFOV(mapData);
  const visibleTiles = new Set();

  fov.compute(player.x, player.y, radius, (x, y) => {
    console.log(`Visible tile: ${x},${y}`); // debug amaçlı
    visibleTiles.add(`${x},${y}`);
  });

  return visibleTiles;
}