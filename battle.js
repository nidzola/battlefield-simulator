let Config = require('./config');
let Army = require('./models/Army');

class Battle {
    constructor() {
        this.armies = [];
        for (let i = 0; i < Config.numberOfArmies; i++) {
            this.armies.push(new Army(i));
        }
    }

    fight() {
        console.log('Battle started...');
        while(this.armies.length > 1) {
            for(let i = 0; i < this.armies.length; i++) {
                this.armies[i].attack(this.armies.filter(a => a != this.armies[i]));
            }
            this.armies = this.armies.filter(a => a.isActive());
        }
        console.log('Winner Army: ', this.armies[0].id);
    }
}

for (let i = 0; i < Config.totalBattles; i++) {
    let battle = new Battle();
    battle.fight();
}

process.exit();