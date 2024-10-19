package ru.s1riys.lab2.validators;

import java.math.BigDecimal;
import java.util.List;

import ru.s1riys.lab2.exceptions.ValidationException;

public class ValuesValidator {
    private BigDecimal x;
    private BigDecimal y;
    private Float r;

    private final List<Float> ALLOWED_R_VALUES = List.of(1f, 2f, 3f, 4f, 5f);

    private Boolean checkX() {
        Boolean geNegative2 = new BigDecimal("-2").compareTo(this.x) <= 0;
        Boolean lePositive2 = this.x.compareTo(new BigDecimal("2")) <= 0;
        return geNegative2 && lePositive2;
    }

    private Boolean checkY() {
        Boolean geNegative3 = new BigDecimal("-3").compareTo(this.y) <= 0;
        Boolean lePositive5 = this.y.compareTo(new BigDecimal("5")) <= 0;
        return geNegative3 && lePositive5;
    }

    private Boolean checkR() {
        return ALLOWED_R_VALUES.contains(this.r);
    }

    public void check(Float x, Float y, Float r) throws ValidationException {
        this.x = new BigDecimal(x);
        this.y = new BigDecimal(y);
        this.r = r;

        Boolean parametersAreValid = checkX() && checkY() && checkR();
        if (!parametersAreValid)
            throw new ValidationException("Invalid parameters");
    }
}