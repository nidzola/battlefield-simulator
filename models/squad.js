const Config = require('../config');
const Helper = require('../helper');
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
            let addVehicle = Helper.random(0, 1);
            if (addVehicle) {
                let numberOfSoldiers = Helper.random(1, 3);
                let vehicleSoldiers = [];
                for (let i = 0; i < numberOfSoldiers; i++) {
                    vehicleSoldiers.push(new Soldier(this.id, i));
                }
                this.units.push(new Vehicle(vehicleSoldiers));
            } else {
                this.units.push(new Soldier(this.id, i));
            }
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
            if (unit.health > 0) {
                active = true;
                break;
            }
        }

        return active;
    }

    attack() {
        let attackProduct = 1;
        for (let unit of this.units) {
            attackProduct *= unit.attack();
        }
        return Math.pow(attackProduct, 1/this.units.length)
    }

    damage() {
        let damageAccumulation = 0;
        for (let unit of this.units) {
            damageAccumulation += unit.damage();
        }
        this.totalEnergy = this.totalEnergy - damageAccumulation;
    }

    addExperience() {
        for (let unit of this.units) {
            unit.addExperience();
        }
    }
}

module.exports = Squad;