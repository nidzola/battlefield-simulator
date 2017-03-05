class Unit {

    constructor(health, recharge) {
        if (health > 100 || health < 0) throw Error("Invalid unit health value!");
        if (recharge > 2000 || recharge < 100) throw Error("Invalid unit recharge value!");
        this.health = health;
        //TODO recharge
        this.recharge = recharge;
    }
}

module.exports = Unit;