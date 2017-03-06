const Config = require('../config');
const Helper = require('../helper');
const Soldier = require('./Soldier');
const Vehicle = require('./Vehicle');

class Squad {
    constructor() {
        this.units = [];
        for (let i = 0; i < Config.numberOfUnitsPerSquad; i++) {
            let addVehicle = Helper.random(0, 1);
            this.units.push(addVehicle ? new Vehicle() : new Soldier());
        }
    }

    isActive() {
        return this.units.length > 0;
    }

    getAttackChance() {
        let productOfAttack = this.units.reduce((acc, u) => (acc * u.getAttackChance()), 1);
        return Math.pow(productOfAttack, 1 / this.units.length);
    }

    attack(targets) {
        targets = targets.sort((a, b) => (a.getTotalHealth() - b.getTotalHealth()));
        let target;
        if (Config.attackStrategy == 'random') {
            target = targets[Helper.random(0, targets.length - 1)];
        }
        if (Config.attackStrategy == 'weakest') {
            target = targets[0];
        }
        if (Config.attackStrategy == 'strongest') {
            target = targets[targets.length - 1];
        }
        if (this.getAttackChance() > target.getAttackChance()) {
            for (let i = 0; i < this.units.length; i++) {
                this.units[i].attack(target);
            }
        }
    }

    getTotalHealth() {
        let tmpH = this.units.reduce((acc, u) => (acc + u.getHealth()), 0);
        return tmpH < 0 ? 0 : tmpH;
    }

    takeDamage(dmg) {
        for (let i = 0; i < this.units.length; i++) {
            this.units[i].takeDamage(dmg / this.units.length);
        }
        this.units = this.units.filter(a => a.isActive());
    }
}

module.exports = Squad;