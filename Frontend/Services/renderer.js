import { items } from '../models/items.js';  // Eğer items kullanıyorsan

export function render(mapData, player, visible) {
  const gameContainer = document.querySelector('.item-2');
  const viewW = 20, viewH = 10;
  const halfW = Math.floor(viewW / 2), halfH = Math.floor(viewH / 2);
  const startX = Math.max(0, Math.min(player.x - halfW, mapData.width - viewW));
  const startY = Math.max(0, Math.min(player.y - halfH, mapData.height - viewH));

  let html = '';
  for (let y = startY; y < startY + viewH; y++) {
    for (let x = startX; x < startX + viewW; x++) {
      const key = `${x},${y}`;
      if (!visible.has(key)) {
        html += '<span class="cell empty"></span>';
      } else if (x === player.x && y === player.y) {
        html += '<span class="cell player">' + (player.char||'@') + '</span>';
      } else if (mapData.tiles[y][x] === '#') {
        html += '<span class="cell wall">#</span>';
      } else {
        const it = items.find(i => i.x === x && i.y === y);
        const ch = it ? it.char : '.';
        html += `<span class="cell floor">${ch}</span>`;
      }
    }
    html += '<br>';
  }
  gameContainer.innerHTML = html;
}
