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
        //Debug
        console.log(this.armies[0].squads[0].units[0]);
    }
}

let battle = new Battle();
battle.init();
