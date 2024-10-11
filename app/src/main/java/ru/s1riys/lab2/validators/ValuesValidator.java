package ru.s1riys.lab2.validators;

import java.math.BigDecimal;
import java.util.List;

import ru.s1riys.lab2.exceptions.ValidationException;

public class ValuesValidator {
    private final Float x;
    private final BigDecimal y;
    private final Float r;

    public ValuesValidator(Float x, Float y, Float r) {
        this.x = x;
        this.y = new BigDecimal(y);
        this.r = r;
    }

    private final List<Float> ALLOWED_X_VALUES = List.of(-2f, -1.5f, -1f, -0.5f, 0f, 0.5f, 1f, 1.5f, 2f);
    private final List<Float> ALLOWED_R_VALUES = List.of(1f, 2f, 3f, 4f, 5f);

    private Boolean checkX() {
        return ALLOWED_X_VALUES.contains(this.x);
    }

    private Boolean checkY() {
        Boolean geNegative3 = new BigDecimal("-3").compareTo(this.y) <= 0;
        Boolean lePositive5 = this.y.compareTo(new BigDecimal("5")) <= 0;
        return geNegative3 && lePositive5;
    }

    private Boolean checkR() {
        return ALLOWED_R_VALUES.contains(this.r);
    }

    public void check() throws ValidationException {
        Boolean parametersAreValid = checkX() && checkY() && checkR();
        if (!parametersAreValid)
            throw new ValidationException("Invalid parameters");
    }
}