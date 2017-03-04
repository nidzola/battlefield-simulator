const Config = require('../config');
const Squad = require('./squad');

class Army {
    constructor() {
        this.squads = [];
        this.active = true;
        this.init();
    }
    init() {
        for(let i = 0; i < Config.numberOfSquadsPerArmy; i++) {
            this.squads.push(new Squad());
        }
    }

    attack(army) {
        let inactiveSquads = 0;
        for(let squad1 of this.squads) {
            if (squad1.isActive()) {
                for(let squad2 of army.squads) {
                    if (squad2.isActive()) {
                        let squad1Attack = squad1.attack();
                        let squad2Attack = squad2.attack();

                        if (squad1Attack > squad1Attack) {
                            squad2.damage(squad1Attack);
                        } else {
                            squad1.damage(squad2Attack);
                        }
                    }
                }
            } else {
                inactiveSquads++;
            }
        }
        if (inactiveSquads == this.squads.length) this.active = false;
    }

    isActive() {
        return this.active;
    }
}

module.exports = Army;