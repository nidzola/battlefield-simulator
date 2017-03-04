const Unit = require('./unit');
const Helper = require('../helper');

class Vehicle extends Unit {
    constructor(soldiers) {
        if (soldiers.length < 1 || soldiers.length > 3) throw new Error("Invalid vehicle operators number");
        this.soldiers = soldiers;
        super(100, 2000);
        this.health = this.buildHealth()
    }

    attack() {
        return 0.5 + (1 + this.health / 100) * this.gavg(this.getSoldiersExperience());
    }

    damage() {
        let damage = 0.5 + (this.getSoldiersExperience() / 100);
        let vehicleDamage = damage * 60 / 100;
        let soldierDamage = damage * 20 / 100;
        let otherSoldierDamage = damage * 10 / 100;
        let randomSoldierIndex = Helper.random(0, this.soldiers.length - 1);

        this.health = this.health - vehicleDamage;
        if (this.health > 0) {
            let totalDeadSoldiers = 0;
            for (let i = 0; i < this.soldiers.length; i++) {
                if (i == randomSoldierIndex) {
                    this.soldiers[i].health = this.soldiers[i].health - soldierDamage;
                } else {
                    this.soldiers[i].health = this.soldiers[i].health - otherSoldierDamage;
                }

                if (this.soldiers[i].health <= 0)  {
                    totalDeadSoldiers++;
                }
            }

            if (totalDeadSoldiers == this.soldiers.length) {
                this.health = 0;
            }
        } else {
            for (let soldier of this.soldiers) {
                soldier.health = 0;
            }
        }
    }

    gavg(attack_success) {
        return attack_success / this.soldiers.length;
    }

    isActive() {
        return (this.getTotalSoldierHealth() > 0 && this.health > 0);
    }

    buildHealth() {
        let totalSoldierHealth = this.getTotalSoldierHealth();
        return (totalSoldierHealth / this.soldiers.length) + this.health;
    }

    getTotalSoldierHealth() {
        let totalSoldierHealth = 0;
        for (let soldier of this.soldiers) {
            totalSoldierHealth += soldier.health;
        }
        return totalSoldierHealth;
    }

    getSoldiersExperience() {
        let totalSoldiersExperience = 0;
        for (let soldier of this.soldiers) {
            totalSoldiersExperience += soldier.experience;
        }
        return totalSoldiersExperience;
    }
}

module.exports = Vehicle;