let Config = require('./config');
let Army = require('./models/Army');

/**
 * Class representing a battle.
 * @constructor
 */
class Battle {

    /* Create a battle, and generate armies for battle. */
    constructor() {
        this.armies = [];
        for (let i = 0; i < Config.getNumberOfArmies(); i++) {
            this.armies.push(new Army(i));
        }
    }

    /* Battle main method, to start actual battle. */
    fight() {
        let promises = [];
        for (let i = 0; i < this.armies.length; i++) {
            let army = this.armies[i];
            console.log(army.id + ' is staring attacks');
            promises.push(army.attack(this.armies.filter(a => a != army)));
        }

        Promise.all(promises).then(() => {
            let winner = this.armies.find(a => a.isActive());
            console.log('Winner Army: ', winner.id);
            process.exit();
        });
    }
}

/**
 * Getting command line arguments.
 */
process.argv.forEach(function (val, index) {
    if (index > 1) {
        if (val.indexOf('=') != -1) {
            let param = val.split('=');

            if (param[0] == 'armies' && parseInt(param[1]) > 1) {
                Config.setNumberOfArmies(parseInt(param[1]));
            }

            if (param[0] == 'squads_per_army' && parseInt(param[1]) > 1) {
                Config.setNumberOfSquadsPerArmy(parseInt(param[1]));
            }

            if (param[0] == 'units_per_squad' && parseInt(param[1]) > 1) {
                Config.setNumberOfUnitsPerSquad(parseInt(param[1]));
            }
        }
    }
});

/* Creating battle object, and starting battle. */

console.log('Battle started...');
let battle = new Battle();
battle.fight();