import { items } from '../models/items.js';

export function render(mapData, player, visible) {
  const gameContainer = document.querySelector('.item-2');
  const viewW = 20, viewH = 10;
  const halfW = Math.floor(viewW / 2), halfH = Math.floor(viewH / 2);
  const startX = Math.max(0, Math.min(player.x - halfW, mapData.width - viewW));
  const startY = Math.max(0, Math.min(player.y - halfH, mapData.height - viewH));

  const lines = [];
  for (let y = startY; y < startY + viewH; y++) {
    let row = '';
    for (let x = startX; x < startX + viewW; x++) {
      const key = `${x},${y}`;
      if (!visible.has(key)) {
        row += ' ';
      } else if (x === player.x && y === player.y) {
        row += player.char || '@';
      } else if (mapData.tiles[y][x] === '#') {
        row += '#';     // Duvar
      } else {
        // Zemin veya eşya
        const it = items.find(i => i.x === x && i.y === y);
        row += it ? it.char : mapData.tiles[y][x] || '.';
      }
    }
    lines.push(row);
  }

  gameContainer.textContent = lines.join('\n');
}
