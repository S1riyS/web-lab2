package ru.s1riys.lab2.utils;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;

import jakarta.servlet.http.HttpServletResponse;
import ru.s1riys.lab2.models.Result;

public class HttpUtil {
    private final HttpServletResponse response;
    private static final Gson gson = new Gson();

    public HttpUtil(HttpServletResponse response) {
        this.response = response;
    }

    public void sendError(int statusCode, String message) throws IOException {
        Map<String, Object> jsonResponse = new HashMap<>() {
            {
                put("message", message);
            }
        };
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(jsonResponse));
        response.setStatus(statusCode);
    }

    public void sendResult(Result result) throws IOException {
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(result));
        response.setStatus(200);
    }
}
