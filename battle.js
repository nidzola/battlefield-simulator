let Config = require('./config');
let Army = require('./models/army');

class Battle {
    constructor() {
        this.armies = [];
        this.init();
    }

    init() {
        for (let i = 0; i < Config.numberOfArmies; i++) {
            this.armies.push(new Army(i));
        }
    }

    fight() {
        for (let i = 0; i < this.armies.length; i++) {
            let army = this.armies[i];
            // army.printUnitsHealth();
            if (army.isActive()) {
                for (let j = 0; j < this.armies.length; j++) {
                    if (i != j) {
                        army.attack(this.armies[j]);
                    }
                }
            } else {
                this.armies.splice(i, 1);
            }
        }
        if (this.armies.length > 1) {
            this.fight();
        } else {
            console.log('Winner:', this.armies[0].id);
        }

        //
        // console.log('Winner:', this.armies[0].squads[0].units);
        // console.log('Winner final state:');
        // console.log(this.armies[0].printUnitsHealth());
    }
}

let battle = new Battle();
battle.fight();