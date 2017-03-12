const Unit = require('./Unit');
const Soldier = require('./Soldier');
const Helper = require('../helper');

/**
 * Class representing a vehicle.
 * @constructor
 */
class Vehicle extends Unit {
    /* Create a vehicle.
     * @param {number} squadId - Identifier of army squad.
     * @param {number} id - Identifier of vehicle.
     */
    constructor(squadId, id) {
        super(Helper.random(1000, 2000));
        this.id = squadId + ' Vehicle ' + id;
        let operatorsCount = Helper.random(1, 3);
        this.operators = [];
        for (let i = 0; i < operatorsCount; i++) {
            this.operators.push(new Soldier(this.id, i));
        }
    }

    /* Getter method for vehicle health, depending by its operators. */
    getHealth() {
        let opsTotalHealth = this.operators.reduce((acc, o) => (acc + o.getHealth()), 0);
        let tmpH = this.health + opsTotalHealth / this.operators.length;
        return tmpH < 0 ? 0 : tmpH;
    }

    /* This method checks if vehicle is still active depending by its operators. */
    isActive() {
        if (this.health <= 0) return false;
        let aliveOp = this.operators.find(o => o.getHealth() > 0);
        return !!aliveOp;
    }

    /* This method calculate attack chance by formula. */
    getAttackChance() {
        return 0.5 * (1 + this.getHealth() / 100) * this.gavg();
    }

    /* This method provide attack ability for vehicle, if his attack is successful and damage the enemy.
     * @param {Object} enemyUnit - Soldier or Vehicle object.
     * */
    attack(enemyUnit) {
        return new Promise((resolve) => {
            enemyUnit.takeDamage(this.getDamageAmount());
            setTimeout(() => {
                resolve();
            }, this.recharge);
        });
    }

    /* This method returns damage that soldier can provide. */
    getDamageAmount() {
        return 0.1 + this.operators.reduce((acc, o) => (acc + o.experience), 0);
    }

    /* This method decreases soldier energy. */
    takeDamage(dmg) {
        this.health -= (dmg * 0.6);
        this.operators[Helper.random(0, this.operators.length - 1)].takeDamage(dmg * 0.2);
        for (let i = 0; i < this.operators.length; i++) {
            this.operators[i].takeDamage(dmg * 0.1);
        }
        this.operators = this.operators.filter(a => a.isActive());
    }

    /* This method​ is the geometric average of the attack success of all the vehicle operators. */
    gavg() {
        let productOfAttack = this.operators.reduce((acc, o) => (acc * o.getAttackChance()), 1);
        return Math.pow(productOfAttack, 1 / this.operators.length);
    }
}

module.exports = Vehicle;