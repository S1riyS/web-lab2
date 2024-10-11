export default class Validator {
    static _ALLOWED_X_VALUES = ["-2", "-1.5", "-1", "-0.5", "0", "0.5", "1", "1.5", "2"]
    static _ALLOWED_R_VALUES = ["1", "2", "3", "4", "5"]
    static _NUMBER_REGEXP = /^-?\d*\.?\d*$/


    static $validateX(x) {
        if (isNaN(x)) return false;

        let isNumber = Validator._NUMBER_REGEXP.test(x);
        if (!isNumber) return false;

        return Validator._ALLOWED_X_VALUES.includes(x)
    }

    static $validateY(y) {
        if (isNaN(y)) return false;

        let isNumber = Validator._NUMBER_REGEXP.test(y);
        if (!isNumber) return false;

        let geNegative3 = bigDecimal.compareTo(y, "-3") >= 0;
        let lePositive5 = bigDecimal.compareTo("5", y) >= 0;

        return geNegative3 && lePositive5;
    }

    static $validateR(r) {
        if (isNaN(r)) return false;

        let isNumber = Validator._NUMBER_REGEXP.test(r);
        if (!isNumber) return false;

        return Validator._ALLOWED_R_VALUES.includes(r)
    }

    static validateAll(x, y, r) {
        return Validator.$validateX(x) && Validator.$validateY(y) && Validator.$validateR(r);
    }
}