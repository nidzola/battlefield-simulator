const Config = require('../config');
const Squad = require('./squad');
const Helper = require('../helper');

class Army {
    constructor(id) {
        this.squads = [];
        this.active = true;
        this.id = "Army: " + id;

        this.init();
    }

    init() {
        for (let i = 0; i < Config.numberOfSquadsPerArmy; i++) {
            this.squads.push(new Squad(i));
        }
    }

    attack(army) {
        let indexes = this.applyStrategy(army.squads);

        let squad1 = this.squads[indexes.squad1Index];
        let squad2 = army.squads[indexes.squad2Index];
        let squad1Attack = squad1.attack();
        let squad2Attack = squad2.attack();

        if (squad1Attack > squad2Attack) {
            squad2.damage();
            squad1.addExperience();
        }

        let inactiveSquads = 0;
        for (let squad of army.squads) {
            if (!squad.isActive()) inactiveSquads++;
        }
        if (inactiveSquads == army.squads.length) this.active = false;
    }

    applyStrategy(squads) {
        let squad1Index = 0;
        let squad2Index = 0;

        if (Config.attackStrategy == 'weakest' || Config.attackStrategy == 'strongest') {
            squad1Index = this.sortBy(this.squads);
            squad2Index = this.sortBy(squads);
        } else {
            squad1Index = Helper.random(0, this.squads.length - 1);
            squad2Index = Helper.random(0, squads.length - 1);
        }

        return {
            squad1Index: squad1Index,
            squad2Index: squad2Index
        };
    }

    sortBy(squads) {
        let index = 0;
        squads.sort((a, b) => {
            return (Config.attackStrategy == 'weakest') ? a.totalEnergy - b.totalEnergy : b.totalEnergy - a.totalEnergy;
        });
        for (let i = 0; i < squads.length; i++) {
            if (squads[i].isActive()) {
                index = i;
                break;
            }
        }

        return index;
    }

    isActive() {
        return this.active;
    }
}

module.exports = Army;