const numberOfArmies = 10;
const attackStrategy = 'random';
const numberOfSquadsPerArmy = 2;
const numberOfUnitsPerSquad = 5;
const strategies = ['random', 'weakest', 'strongest'];

class Config {

    static get numberOfArmies() {
        if (numberOfArmies < 2) throw Error("Invalid number of armies!");
        return numberOfArmies;
    }

    static get attackStrategy() {
        if (strategies.indexOf(attackStrategy) == -1) throw Error("Invalid strategy selected!");
        return attackStrategy;
    }

    static get numberOfSquadsPerArmy() {
        if (numberOfSquadsPerArmy < 2) throw Error("Invalid number of squads per army!");
        return numberOfSquadsPerArmy;
    }

    static get numberOfUnitsPerSquad() {
        if (numberOfUnitsPerSquad < 5 || numberOfUnitsPerSquad > 10) throw Error("Invalid number of units per squad!");
        return numberOfUnitsPerSquad;
    }
}

module.exports = Config;