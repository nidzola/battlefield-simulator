const Config = require('../config');
const Soldier = require('./soldier');

class Squad {
    constructor() {
        this.units = [];
        this.active = true;
        //TODO strategy
        this.selectedStrategy = Config.attackStrategy;

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

    attack() {
        //TODO
        let attackSum = 0;
        let inactiveUnits = 0;
        for (let unit of this.units) {
            if (unit.isActive()) {
                if (unit instanceof Soldier) {
                    attackSum += unit.attack();
                } else {
                    attackSum += unit.attack();
                }
            } else {
                inactiveUnits++;
            }
        }

        if (inactiveUnits == this.units.length) this.active = false;

        return attackSum / this.units.length;
    }

    damage(damage) {
        //TODO
        for (let unit of this.units) {
            unit.health = unit.health - damage;
            if (unit.health <= 0) unit.active = false;
        }
    }
}

module.exports = Squad;