class Unit {

    constructor(health, recharge) {
        if (health > 100 || health < 0) throw Error("Invalid unit health value!");
        if (recharge > 2000 || recharge < 100) throw Error("Invalid unit recharge value!");
        this.health = health;
        this.recharge = recharge;
    }

    print() {
        console.log('Health is :' + this.health);
        console.log('Recharge is :' + this.recharge);
    }

    isActive() {
        return this.health > 0;
    }
}

module.exports = Unit;