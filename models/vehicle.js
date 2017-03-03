const Unit = require('./unit');

class Vehicle extends Unit {
    constructor(soldiers) {
        if (soldiers.length < 1 || soldiers.length > 3) throw new Error("Invalid vehicle operators number");
        this.soldiers = soldiers;
        this.active = true;
        super(this.buildEnergy(), 2000);
    }

    attack() {
        return 0.5 + (1 + this.health / 100) * this.gavg(this.getSoldiersExperience());
    }

    damage() {
        return 0.5 + (this.getSoldiersExperience() / 100);
    }

    gavg(attack_success) {
        return attack_success / this.soldiers.length;
    }

    isActive() {
        return this.active;
    }

    private buildEnergy() {
        let totalSoldierHealth = this.getTotalSoldierHealth();
        return (totalSoldierHealth / this.soldiers.length) + this.health;
    }

    private getTotalSoldierHealth() {
        let totalSoldierHealth = 0;
        for (let soldier of this.soldiers) {
            totalSoldierHealth += soldier.health;
        }
        return totalSoldierHealth;
    }

    private getSoldiersExperience() {
        let totalSoldiersExperience = 0;
        for (let soldier of this.soldiers) {
            totalSoldiersExperience += soldier.experience;
        }
        return totalSoldiersExperience;
    }
}

module.exports = Vehicle;