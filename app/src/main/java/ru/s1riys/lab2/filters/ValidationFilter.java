package ru.s1riys.lab2.filters;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import com.google.gson.Gson;

import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletResponse;
import ru.s1riys.lab2.exceptions.MissingParametersException;
import ru.s1riys.lab2.exceptions.ValidationException;
import ru.s1riys.lab2.validators.ConsistencyValidator;
import ru.s1riys.lab2.validators.ValuesValidator;

@WebFilter(servletNames = { "AreaCheck" })
public class ValidationFilter extends HttpFilter {
    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        try {
            System.out.println("ValidationFilter");
            // Validation
            final List<String> REQUIRED_PARAMS = List.of("x", "y", "r");
            for (String param : REQUIRED_PARAMS) {
                ConsistencyValidator.checkExists(
                        () -> request.getParameter(param) != null,
                        () -> !request.getParameter(param).isEmpty(),
                        param);
            }

            Float x = ConsistencyValidator.toFloat(request.getParameter("x"), "x");
            Float y = ConsistencyValidator.toFloat(request.getParameter("y"), "y");
            Float r = ConsistencyValidator.toFloat(request.getParameter("r"), "r");

            ValuesValidator valuesValidator = new ValuesValidator(x, y, r);
            valuesValidator.check();

            chain.doFilter(request, response);

        } catch (ValidationException e) {
            sendError(response, e.getMessage(), 400);
        } catch (MissingParametersException e) {
            sendError(response, e.getMessage(), 400);
        }
    }

    private void sendError(HttpServletResponse response, String message, int statusCode) throws IOException {
        Gson gson = new Gson();
        Map<String, Object> jsonResponse = new HashMap<>() {
            {
                put("message", message);
            }
        };
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(jsonResponse));
        response.setStatus(statusCode);
    }
}