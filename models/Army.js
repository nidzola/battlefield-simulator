const Config = require('../config');
const Squad = require('./Squad');

/**
 * Class representing a army.
 * @constructor
 */
class Army {
    /* Create a point.
    * @param {number} id - Identifier of army.
    */
    constructor(id) {
        this.id = "Army " + id;
        this.squads = [];
        for (let i = 0; i < Config.getNumberOfSquadsPerArmy(); i++) {
            this.squads.push(new Squad(this.id, i));
        }
    }

    /* Army starting attack, all army squads are starting to attack other enemy army squads.
    * @param {array} enemyArmies - Array of all enemy armies.
    */
    attack(enemyArmies) {
        return new Promise((resolve, reject) => {
            let enemySquads = [];
            for(let i = 0; i < enemyArmies.length; i++) {
                enemySquads = enemySquads.concat(enemyArmies[i].squads);
            }

            let promises = [];
            for(let i = 0; i < this.squads.length; i++) {
                let squad = this.squads[i];
                console.log(squad.id + ' is staring attacks');
                promises.push(squad.attack(enemySquads));
            }

            Promise.all(promises).then(() => {
                resolve();
            });
        });
    }

    /* This method checks if army is still active depending by its squads. */
    isActive() {
        return !!this.squads.find(u => u.isActive());
    }
}

module.exports = Army;