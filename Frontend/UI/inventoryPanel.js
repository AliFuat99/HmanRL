import { player } from '../models/player.js';

export function updateInventoryUI() {
  const invPanel = document.getElementById('inventory-panel');
  invPanel.innerHTML = '';
  player.inventory.forEach(item => {
    const slot = document.createElement('div');
    slot.className = 'inventory-slot';
    slot.textContent = item.char;
    invPanel.appendChild(slot);
  });
}
