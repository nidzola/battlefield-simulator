const Unit = require('./unit');
const Helper = require('../helper');

class Soldier extends Unit {
    constructor(experience) {
        if (experience > 50 || experience < 0) throw Error("Invalid experience value!");
        super(100, 100);
        this.experience = experience || 0;
    }

    addExperience() {
        this.experience++;
    }

    attack() {
        return 0.5 + (1 + this.health / 100) * Helper.random(50 + this.experience, 100) / 100;
    }

    damage() {
        return 0.05 + this.experience / 100;
    }

    isActive() {
        return this.health > 0;
    }
}

module.exports = Soldier;