const Config = require('../config');
const Soldier = require('./soldier');

class Squad {
    constructor() {
        this.units = [];
        this.active = true;
        this.init();
    }

    init() {
        for(let i = 0; i < Config.numberOfUnitsPerSquad; i++) {
            this.units.push(new Soldier());
        }
    }

    isActive() {
        return this.active;
    }

    attach() {
        //TODO
        let attackSum = 0;
        for (let unit of this.units) {
            if (unit instanceof Soldier) {
                attackSum += unit.experience;
            } else {
                attackSum += unit.getSoldiersExperience();
            }
        }

        return attackSum / this.units.length;
    }

    damage() {
        //TODO
        for (let unit of this.units) {
            unit.health--;
        }
    }
}

module.exports = Squad;