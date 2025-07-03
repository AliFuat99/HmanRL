import { PlayerStats } from '../Models/PlayerStats.js';
import { BaseStats } from '../config/baseStats.js';

export class PlayerService {
  constructor() {
    this.playerStats = new PlayerStats(BaseStats);
  }

  updateStats(newStats) {
    this.playerStats.updateStats(newStats);
  }

  getStats() {
    return this.playerStats;
  }
}
