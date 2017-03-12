/**
 * Class representing a unit.
 * @constructor
 */
class Unit {
    /* Create a unit.
     * @param {number} recharge - Recharge time of unit.
     */
    constructor(recharge) {
        this.health = 100;
        this.recharge = recharge;
    }
}

module.exports = Unit;