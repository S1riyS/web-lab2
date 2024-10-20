export default class Validator {
    static _ALLOWED_R_VALUES = ["1", "2", "3", "4", "5"]
    static _NUMBER_REGEXP = /^-?\d*\.?\d*$/


    static $validateX(x) {
        if (isNaN(x)) return false;

        let isNumber = Validator._NUMBER_REGEXP.test(x);
        if (!isNumber) return false;

        let geNegative2 = bigDecimal.compareTo(x, "-2") >= 0;
        let lePositive2 = bigDecimal.compareTo("2", x) >= 0;

        return geNegative2 && lePositive2;
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