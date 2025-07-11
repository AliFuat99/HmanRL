import { items } from '../models/items.js';
import { player } from '../models/player.js';
import { updateInventoryUI } from '../ui/inventoryPanel.js';

export function pickupItemIfExists(x, y) {
  const index = items.findIndex(it => it.x === x && it.y === y);
  if (index !== -1) {
    const item = items.splice(index, 1)[0];
    player.inventory.push(item);
    updateInventoryUI();
  }
}
