/**
 * Class representing a helper.
 */
class Helper {

    /* This method generate random number between two numbers (inclusive). */
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = Helper;