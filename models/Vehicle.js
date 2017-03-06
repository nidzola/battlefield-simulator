const Unit = require('./Unit');
const Soldier = require('./Soldier');
const Helper = require('../helper');

class Vehicle extends Unit {
    constructor() {
        super(Helper.random(1000, 2000));
        let operatorsCount = Helper.random(1, 3);
        this.operators = [];
        for (let i = 0; i < operatorsCount; i++) {
            this.operators.push(new Soldier());
        }
        // this.isRecharging = false;
    }

    getHealth() {
        let opsTotalHealth = this.operators.reduce((acc, o) => (acc + o.getHealth()), 0);
        let tmpH = this.health + opsTotalHealth / this.operators.length;
        return tmpH < 0 ? 0 : tmpH;
    }

    isActive() {
        if (this.health <= 0) return false;
        let aliveOp = this.operators.find(o => o.getHealth() > 0);
        return !!aliveOp;
    }

    getAttackChance() {
        return 0.5 * (1 + this.getHealth() / 100) * this.gavg();
    }

    attack(enemyUnit) {
        // if(!this.isRecharging) {
        enemyUnit.takeDamage(this.getDamageAmount());
        // this.isRecharging = true;
        // setTimeout(() => {
        // 	this.isRecharging = false;
        // }, this.recharge);
        // }
    }

    getDamageAmount() {
        return 0.1 + this.operators.reduce((acc, o) => (acc + o.experience), 0);
    }

    takeDamage(dmg) {
        this.health -= (dmg * 0.6);
        this.operators[Helper.random(0, this.operators.length - 1)].takeDamage(dmg * 0.2);
        for (let i = 0; i < this.operators.length; i++) {
            this.operators[i].takeDamage(dmg * 0.1);
        }
        this.operators = this.operators.filter(a => a.isActive());
    }

    gavg() {
        let productOfAttack = this.operators.reduce((acc, o) => (acc * o.getAttackChance()), 1);
        return Math.pow(productOfAttack, 1 / this.operators.length);
    }
}

module.exports = Vehicle;