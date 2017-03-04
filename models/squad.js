const Config = require('../config');
const Soldier = require('./soldier');
const Vehicle = require('./vehicle');

class Squad {
    constructor(id) {
        this.units = [];
        this.id = "Squad:" + id;
        this.totalEnergy = 0;
        this.init();
    }

    init() {
        for (let i = 0; i < Config.numberOfUnitsPerSquad; i++) {
            this.units.push(new Soldier());
        }
        this.buildSquadTotalEnergy();
    }

    buildSquadTotalEnergy() {
        for (let unit of this.units) {
            this.totalEnergy += unit.health;
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
        let attackSum = 0;
        for (let unit of this.units) {
            if (unit instanceof Soldier) {
                attackSum += unit.attack();
            } else {
                attackSum += unit.attack();
            }
        }

        return attackSum / this.units.length;
    }

    damage() {
        let damageAccumulation = 0;
        for (let unit of this.units) {
            damageAccumulation += unit.damage();
        }

        for (let unit of this.units) {
            unit.health = unit.health - damageAccumulation;
            this.totalEnergy = this.totalEnergy - damageAccumulation;
            if (unit.health < 0) unit.health = 0;
        }
    }

    addExperience() {
        for (let unit of this.units) {
            unit.addExperience();
        }
    }
}

module.exports = Squad;