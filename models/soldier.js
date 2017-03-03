const Unit = require('./unit');
const Helper = require('../helper');

class Soldier extends Unit {
    constructor(experience) {
        if (experience > 50 || experience < 0) throw Error("Invalid experience value!");
        super(100, 100);
        this.active = true;
        this.experience = experience || 0;
    }

    addExperience() {
        this.experience++;
    }

    attack() {
        //TODO
        return 0.5 + (1 + this.health / 100) * Helper.random(50 + this.experience, 100) / 100;
    }

    damage() {
        //TODO
        return 0.05 + this.experience / 100;
    }

    isActive() {
        return this.active;
    }
}

module.exports = Soldier;