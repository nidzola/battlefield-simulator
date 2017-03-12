const Unit = require('./Unit');
const Helper = require('../helper');

/**
 * Class representing a soldier.
 * @constructor
 */
class Soldier extends Unit {
    /* Create a soldier.
     * @param {number} squadId - Identifier of army squad.
     * @param {number} id - Identifier of soldier.
     */
    constructor(squadId, id) {
        super(Helper.random(100, 2000));
        this.id = squadId + ' Soldier ' + id;
        this.experience = 0;
    }

    /* This method add soldier experience if attack is successful. */
    addExperience() {
        if(this.experience < 50) this.experience++;
    }

    /* This method calculate attack chance by formula. */
    getAttackChance() {
        return 0.5 * (1 + this.getHealth() / 100) * Helper.random(50 + this.experience, 100) / 100;
    }

    /* This method provide attack ability for soldier, if his attack is successful and damage the enemy.
    * @param {Object} enemyUnit - Soldier or Vehicle object.
    * */
    attack(enemyUnit) {
        return new Promise((resolve, reject) => {
            enemyUnit.takeDamage(this.getDamageAmount());
            this.addExperience();
            setTimeout(() => {
                resolve();
            }, this.recharge);
        });
    }

    /* Getter method for soldier health. */
    getHealth() {
        return this.health < 0 ? 0 : this.health;
    }

    /* This method checks if soldier is still active depending by its health. */
    isActive() {
        return this.getHealth() > 0;
    }

    /* This method returns damage that soldier can provide. */
    getDamageAmount() {
        return 0.05 + this.experience / 100;
    }

    /* This method decreases soldier energy. */
    takeDamage(dmg) {
        this.health -= dmg;
        console.log(this.id + ' took damage, health left: ' + this.health);
    }
}

module.exports = Soldier;