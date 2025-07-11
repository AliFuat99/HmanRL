import { items } from '../models/items.js';
import { computeFOV } from './fov.js';

export function render(mapData, player) {
  const gameContainer = document.querySelector('.item-2');

  const viewWidth  = 20;
  const viewHeight = 10;
  const halfW = Math.floor(viewWidth / 2);
  const halfH = Math.floor(viewHeight / 2);

  const startX = Math.max(0, Math.min(player.x - halfW, mapData.width - viewWidth));
  const startY = Math.max(0, Math.min(player.y - halfH, mapData.height - viewHeight));

  const visible = computeFOV(player, mapData, 8);

  const lines = [];

  for (let y = startY; y < startY + viewHeight; y++) {
    let row = '';
    for (let x = startX; x < startX + viewWidth; x++) {
      if (!visible.has(`${x},${y}`)) {
        row += ' ';
      } else if (player.x === x && player.y === y) {
        row += player.char;
      } else {
        const it = items.find(i => i.x === x && i.y === y);
        row += it ? it.char : mapData.tiles[y][x] || ' ';
      }
    }
    lines.push(row);
  }

  gameContainer.textContent = lines.join('\n');
}
