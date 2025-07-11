export async function loadMap(path) {
  const res = await fetch(path);
  const raw = await res.json();

  let tiles;
  if (typeof raw.tiles[0] === 'string') {
    tiles = raw.tiles.map(row => row.split(''));
  } else {
    tiles = raw.tiles;
  }

  console.log(`Loaded map size ${tiles.length} rows x ${tiles[0].length} cols`);

  return {
    tiles,
    width: tiles[0].length,
    height: tiles.length
  };
}
