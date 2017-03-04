const Config = require('../config');
const Squad = require('./squad');

class Army {
    constructor(id) {
        this.squads = [];
        this.active = true;
        this.id = "Army: " + id;

        this.init();
    }
    init() {
        for(let i = 0; i < Config.numberOfSquadsPerArmy; i++) {
            this.squads.push(new Squad(i));
        }
    }

    attack(army) {
        let inactiveSquads = 0;
        for(let squad1 of this.squads) {
            this.applyStrategy(army.squads);
            // console.log(army.squads);
            // console.log(army.id, squad1.id);
            if (squad1.isActive()) {
                for(let squad2 of army.squads) {
                    if (squad2.isActive()) {
                        let squad1Attack = squad1.attack();
                        let squad2Attack = squad2.attack();

                        if (squad1Attack > squad2Attack) {
                            squad2.damage();
                            squad1.addExperience();
                        }
                    }
                }
            } else {
                inactiveSquads++;
            }
        }
        if (inactiveSquads == this.squads.length) this.active = false;
    }

    applyStrategy(squads) {
        switch (Config.attackStrategy) {
            case 'weakest':
                squads.sort((a, b) => {
                    return  a.totalEnergy - b.totalEnergy;
                });
                break;
            case 'strongest':
                squads.sort((a, b) => {
                    return  b.totalEnergy - a.totalEnergy;
                });
                break;
            case 'random':
                let currentIndex = squads.length, temporaryValue, randomIndex;
                while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = squads[currentIndex];
                    squads[currentIndex] = squads[randomIndex];
                    squads[randomIndex] = temporaryValue;
                }
                break;
            default:
                break;
        }
    }

    isActive() {
        return this.active;
    }

    printUnitsHealth() {
        for (let squad of this.squads) {
            for (let unit of squad.units) {
                console.log(this.id, squad.id, 'Health: ' + unit.health);
            }
        }
    }
}

module.exports = Army;