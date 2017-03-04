let Config = require('./config');
let Army = require('./models/army');

class Battle {
    constructor() {
        this.armies = [];
        this.init();
    }

    init() {
        for(let i = 0; i < Config.numberOfArmies; i++) {
            this.armies.push(new Army());
        }
    }

    begin() {
        while (this.armies.length > 1) {
            for(let i = 0; i < this.armies.length; i++) {
                let army = this.armies[i];
                if (army.isActive()) {
                    for (let j = 0; j < this.armies.length; j++) {
                        if (i != j) {
                            army.attack(this.armies[j]);
                        }
                    }
                } else {
                    this.armies = this.armies.splice(i, 1);
                }
            }
        }

        console.log('Winner:', this.armies[0].squads[0].units);
    }
}

let battle = new Battle();
battle.init();
battle.begin();