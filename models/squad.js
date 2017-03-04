const Config = require('../config');
const Soldier = require('./soldier');

class Squad {
    constructor(id) {
        this.units = [];
        //TODO strategy
        this.id = "Squad:" + id;
        this.selectedStrategy = Config.attackStrategy;

        this.init();
    }

    init() {
        for (let i = 0; i < Config.numberOfUnitsPerSquad; i++) {
            this.units.push(new Soldier());
        }
    }

    isActive() {
        let active = false;
        for (let unit of this.units) {
            if (unit.health > 0) active = true;
        }

        return active;
    }

    attack() {
        //TODO
        let activeUnitsLength = 0;
        let attackSum = 0;
        for (let unit of this.units) {
            if (unit.isActive()) {
                if (unit instanceof Soldier) {
                    attackSum += unit.attack();
                } else {
                    attackSum += unit.attack();
                }
                activeUnitsLength++
            }
        }

        return attackSum / (activeUnitsLength > 0 ? activeUnitsLength : 1);
    }

    damage(damage) {
        //TODO
        for (let unit of this.units) {
            if (unit.isActive()) {
                unit.health = unit.health - damage;
                if (unit.health < 0) unit.health = 0;
            }
        }
    }

    addExperience() {
        for (let unit of this.units) {
            unit.addExperience();
        }
    }
}

module.exports = Squad;