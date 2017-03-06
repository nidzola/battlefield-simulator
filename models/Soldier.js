const Unit = require('./Unit');
const Helper = require('../helper');

class Soldier extends Unit {
    constructor() {
        super(Helper.random(100, 2000));
        this.experience = 0;
        // this.isRecharging = false;
    }

    addExperience() {
        if(this.experience < 50) this.experience++;
    }

    getAttackChance() {
        return 0.5 * (1 + this.getHealth() / 100) * Helper.random(50 + this.experience, 100) / 100;
    }

    attack(enemyUnit) {
        // if(!this.isRecharging) {
        enemyUnit.takeDamage(this.getDamageAmount());
        this.addExperience();
        // this.isRecharging = true;
        // setTimeout(() => {
        // 	this.isRecharging = false;
        // }, this.recharge);
        // }
    }

    getHealth() {
        return this.health < 0 ? 0 : this.health;
    }

    isActive() {
        return this.getHealth() > 0;
    }

    getDamageAmount() {
        return 0.05 + this.experience / 100;
    }

    takeDamage(dmg) {
        this.health -= dmg;
    }
}

module.exports = Soldier;