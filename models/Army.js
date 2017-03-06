const Config = require('../config');
const Squad = require('./Squad');

class Army {
    constructor(id) {
        this.id = id;
        this.squads = [];
        for (let i = 0; i < Config.numberOfSquadsPerArmy; i++) {
            this.squads.push(new Squad());
        }
    }

    attack(enemyArmies) {
        let enemySquads = [];
        for(let i = 0; i < enemyArmies.length; i++) {
            if(enemyArmies[i].isActive()) enemySquads = enemySquads.concat(enemyArmies[i].getActiveSquads());
        }

        let activeSquads = this.getActiveSquads();
        for(let i = 0; i < activeSquads.length; i++) {
            activeSquads[i].attack(enemySquads);
        }
    }

    getActiveSquads() {
        return this.squads.filter(a => a.isActive());
    }

    isActive() {
        return !!this.squads.find(u => u.isActive());
    }
}

module.exports = Army;