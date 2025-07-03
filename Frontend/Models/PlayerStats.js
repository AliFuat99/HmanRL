import { LevelXPTable } from '../config/levelXPTable.js';

export class PlayerStats {
  constructor(stats) {
    this.strength = stats.strength;
    this.constitution = stats.constitution;
    this.dexterity = stats.dexterity;
    this.intelligence = stats.intelligence;
    this.wisdom = stats.wisdom;
    this.charisma = stats.charisma;

    this.maxHealth = this.calculateMaxHealth();
    this.maxMana = this.calculateMaxMana();

    this.currentHealth = this.maxHealth;
    this.currentMana = this.maxMana;

    this.level = this.calculateLevel();
    this.currentXP = 0;
  }

  calculateMaxHealth() {
    return 50 + this.constitution * 10;
  }

  calculateMaxMana() {
    return 30 + this.wisdom * 5 + this.intelligence * 3;
  }

  
  calculateLevel() {
  let level = 1;

  for (const [Lvl, requiredXP] of Object.entries(LevelXPTable).sort((a, b) => a[0] - b[0])) {
    if (this.currentXP >= requiredXP) {
      level = Number(Lvl);
    } else {
      break;
    }
  }

  return level;
}

  gainXP(amount) {
    this.currentXP += amount;
    const newLevel = this.calculateLevel();

    if (newLevel > this.level) {
      console.log(`Level up! ${this.level} → ${newLevel}`);
      this.level = newLevel;

      // Örneğin her level'da otomatik +1 stat verilebilir:
      this.strength += 1;
      this.constitution += 1;
      this.wisdom += 1;
      this.intelligence += 1;
      this.dexterity += 1;
      this.charisma +=1;

      // Yeni statlarla max değerler yeniden hesaplanmalı:
      this.updateStats(this);
    }
  }

  // Stat güncellendiğinde çağrılabilir
  updateStats(newStats) {
    Object.assign(this, newStats);
    this.maxHealth = this.calculateMaxHealth();
    this.maxMana = this.calculateMaxMana();

    // Güncellenen maxHealth/maxMana’ya göre current değerleri düzenle
    if (this.currentHealth > this.maxHealth) this.currentHealth = this.maxHealth;
    if (this.currentMana > this.maxMana) this.currentMana = this.maxMana;
  }
}
