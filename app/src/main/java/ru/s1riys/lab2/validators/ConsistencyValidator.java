package ru.s1riys.lab2.validators;

import com.google.common.base.Supplier;

import ru.s1riys.lab2.exceptions.MissingParametersException;
import ru.s1riys.lab2.exceptions.ValidationException;

public class ConsistencyValidator {
    public static void checkExists(Supplier<Boolean> isPresentFn, Supplier<Boolean> isNotEmptyFn, String paramName)
            throws MissingParametersException {
        if (!isPresentFn.get()) {
            throw new MissingParametersException("Param %s must be specified".formatted(paramName));
        }
        if (!isNotEmptyFn.get()) {
            throw new MissingParametersException("Param %s must not be empty".formatted(paramName));
        }
    }

    public static int toInt(String value, String paramName) throws ValidationException {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            throw new ValidationException("Key %s is not an int: %s".formatted(paramName, value));
        }
    }

    public static float toFloat(String value, String paramName) throws ValidationException {
        try {
            return Float.parseFloat(value);
        } catch (NumberFormatException e) {
            throw new ValidationException("Key %s is not a float: %s".formatted(paramName, value));
        }
    }
}
