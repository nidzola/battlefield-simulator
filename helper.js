class Helper {
    static random(min, max) {
        return Math.floor(Math.random() * max) + min
    }
}

module.exports = Helper;