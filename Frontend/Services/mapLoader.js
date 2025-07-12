export async function loadMap(url) {
  const resp = await fetch(url);
  const raw = await resp.json();

  // Harita satırlarını diziye al
  const rows = raw.tiles;

  // Tüm satırların uzunluğunu bul
  const maxLength = Math.max(...rows.map(r => r.length));

  // Satırları maxLength kadar doldur
  const tiles = rows.map(r => {
    if (r.length < maxLength) {
      return r.padEnd(maxLength, '.'); // boş alanlarla doldur
    }
    return r;
  });

  return {
    tiles: tiles.map(r => r.split('')), // karakter diziye çevir
    width: maxLength,
    height: tiles.length
  };
}
