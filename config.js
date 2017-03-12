const strategies = ['random', 'weakest', 'strongest'];

let numberOfArmies = 2;
let numberOfSquadsPerArmy = 2;
let numberOfUnitsPerSquad = 5;

/**
 * Class representing a config.
 */
class Config {
    constructor() {}

    /* Setter for number of armies for battle. */
    static setNumberOfArmies(number) {
        if (number < 2) throw Error("Invalid number of armies!");
        numberOfArmies = number;
    }

    /* Getter of number of armies for battle. */
    static getNumberOfArmies() {
        return numberOfArmies;
    }

    /* Setter for number of squads per army. */
    static setNumberOfSquadsPerArmy(number) {
        if (number < 2) throw Error("Invalid number of squads per army!");
        numberOfSquadsPerArmy = number;
    }

    /* Getter for number of squads per army. */
    static getNumberOfSquadsPerArmy() {
        return numberOfSquadsPerArmy;
    }

    /* Setter for number of units per squad. */
    static setNumberOfUnitsPerSquad(number) {
        if (number < 5 || number > 10) throw Error("Invalid number of units per squad!");
        numberOfSquadsPerArmy = number;
    }

    /* Getter for number of units per squad. */
    static getNumberOfUnitsPerSquad() {
        return numberOfUnitsPerSquad;
    }

    /* Getter for array for strategies. */
    static get strategies() {
        return strategies;
    }
}

module.exports = Config;