import { loadMap } from './services/mapLoader.js';
import { render } from './Services/renderer.js';
import { player } from './models/player.js';
import { pickupItemIfExists } from './services/itemSystem.js';

let mapData = null;

document.addEventListener('DOMContentLoaded', async () => {
  mapData = await loadMap('./Maps/Level1/Lvl1Present.json');
  render(mapData, player);
});

document.addEventListener('keydown', (e) => {
  const dirs = {
    ArrowUp:    [0, -1],
    ArrowDown:  [0, 1],
    ArrowLeft:  [-1, 0],
    ArrowRight: [1, 0]
  };

  if (!dirs[e.key]) return;

  const [dx, dy] = dirs[e.key];
  const nx = player.x + dx;
  const ny = player.y + dy;

  if (mapData.tiles[ny]?.[nx] === '.') {
    player.x = nx;
    player.y = ny;
    pickupItemIfExists(nx, ny);
    render(mapData, player);
  }
});
