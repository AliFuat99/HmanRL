import { BaseStats } from './config/baseStats.js';
import { PlayerStats } from '/models/PlayerStats.js'; // Küçük harfli klasör ismi
// Eğer varsa: import { PlayerService } from './services/PlayerService.js';

const player = new PlayerStats(BaseStats);

console.log('Starting Stats:', player);

player.updateStats({ strength: 5, constitution: 4, intelligence: 3, wisdom: 5 });
console.log('Updated Stats :', player);


player.gainXP(100);
console.log('100 xp added the current level is :', player.level)
console.log('and the new stats are :', player)
