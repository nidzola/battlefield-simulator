const Config = require('../config');
const Helper = require('../helper');
const Soldier = require('./Soldier');
const Vehicle = require('./Vehicle');

/**
 * Class representing a squad.
 * @constructor
 */
class Squad {
    /* Create a squad.
     * @param {number} armyId - Identifier of army.
     * @param {number} id - Identifier of squad.
     */
    constructor(armyId, id) {
        this.id = armyId + ' Squad ' + id;
        this.units = [];
        for (let i = 0; i < Config.getNumberOfUnitsPerSquad(); i++) {
            let addVehicle = Helper.random(0, 1);
            this.units.push(addVehicle ? new Vehicle(this.id, i) : new Soldier(this.id, i));
        }
        let strategyIndex = Helper.random(0, 2);
        this.attackStrategy = Config.strategies[strategyIndex];
    }

    /* This method checks if squad is still active depending by its units. */
    isActive() {
        return this.units.length > 0;
    }


    /* This method calculate attack chance by formula. */
    getAttackChance() {
        let productOfAttack = this.units.reduce((acc, u) => (acc * u.getAttackChance()), 1);
        return Math.pow(productOfAttack, 1 / this.units.length);
    }

    /* This method provide attack ability for squad, choosing what of all squads to attack by chosen strategy.
     * @param {array} targets - All squads of all armies.
     * */
    attack(targets) {
        return new Promise((resolve) => {
            let activeTargets = targets.filter(target => target.isActive());
            if (!this.isActive()) {
                console.log(this.id + ' is dead');
                resolve();
            } else if (activeTargets.length == 0) {
                console.log(this.id + ' has no enemies to attack');
                resolve();
            } else {
                activeTargets = activeTargets.sort((a, b) => (a.getTotalHealth() - b.getTotalHealth()));
                let target;
                if (this.attackStrategy == 'random') {
                    target = activeTargets[Helper.random(0, activeTargets.length - 1)];
                }
                if (this.attackStrategy == 'weakest') {
                    target = activeTargets[0];
                }
                if (this.attackStrategy == 'strongest') {
                    target = activeTargets[activeTargets.length - 1];
                }
                if (this.getAttackChance() > target.getAttackChance()) {
                    let promises = [];
                    for (let i = 0; i < this.units.length; i++) {
                        promises.push(this.units[i].attack(target));
                    }

                    Promise.all(promises).then(() => {
                        this.attack(activeTargets).then(() => {
                            resolve();
                        });
                    });
                } else {
                    this.attack(activeTargets).then(() => {
                        resolve();
                    });
                }
            }
        });
    }

    /* Getter method for squad health, depending by its units. */
    getTotalHealth() {
        let tmpH = this.units.reduce((acc, u) => (acc + u.getHealth()), 0);
        return tmpH < 0 ? 0 : tmpH;
    }

    /* This method decreases units energy. */
    takeDamage(dmg) {
        for (let i = 0; i < this.units.length; i++) {
            this.units[i].takeDamage(dmg / this.units.length);
        }
        this.units = this.units.filter(a => a.isActive());
    }
}

module.exports = Squad;