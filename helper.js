class Helper {
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static recharge(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }
}

module.exports = Helper;