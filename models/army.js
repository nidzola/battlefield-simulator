const Config = require('../config');
const Squad = require('./squad');

class Army {
    constructor() {
        this.squads = [];
        //TODO strategy
        this.selectedStrategy = Config.attackStrategy;
        this.init();
    }
    init() {
        for(let i = 0; i < Config.numberOfSquadsPerArmy; i++) {
            this.squads.push(new Squad());
        }
    }
}

module.exports = Army;