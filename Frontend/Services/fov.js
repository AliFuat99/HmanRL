// services/fov.js
export function computeFOV(player, mapData, radius = 12) {
  const visible = new Set();

  // self
  visible.add(`${player.x},${player.y}`);

  // kaç derecelik adımla ışın atacağız (küçük adım = daha düzgün daire)
  const stepDeg = 2; // 2° aralıklarla → 180 ışın
  for (let deg = 0; deg < 360; deg += stepDeg) {
    const rad = deg * Math.PI / 180;
    // her ışın için radius kadar ilerle
    for (let r = 1; r <= radius; r++) {
      const x = Math.round(player.x + Math.cos(rad) * r);
      const y = Math.round(player.y + Math.sin(rad) * r);

      if (x < 0 || y < 0 || x >= mapData.width || y >= mapData.height) {
        break; // sınır dışı, bu ışını sonlandır
      }

      visible.add(`${x},${y}`);

      // duvara çarptıysa arkayı görme, bu ışını bitir
      if (mapData.tiles[y][x] === '#') {
        break;
      }
    }
  }

  return visible;
}
