const Unit = require('./unit');
const Helper = require('../helper');

class Soldier extends Unit {
    constructor(squad, id) {
        super(100, 100);
        this.id = squad + ' -> Soldier: ' + id;
        this.experience = 0;
    }

    addExperience() {
        this.experience++;
    }

    attack() {
        return 0.5 + (1 + this.health / 100) * Helper.random(50 + this.experience, 100) / 100;
    }

    damage() {
        let damage = 0.05 + this.experience / 100;
        this.health = this.health - damage;
        return damage;
    }

    isActive() {
        return this.health > 0;
    }
}

module.exports = Soldier;