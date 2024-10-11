package ru.s1riys.lab2.servlets;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/controller")
public class ControllerServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        final List<String> REQUIRED_PARAMS = List.of("x", "y", "r");

        // If one of required params is null, forward to index.jsp
        for (String param : REQUIRED_PARAMS) {
            if (request.getParameter(param) == null) {
                RequestDispatcher indexJSPDispatcher = request.getRequestDispatcher("index.jsp");
                indexJSPDispatcher.forward(request, response);
            }
        }

        // If all required params are not null, forward to CheckAreaServlet
        RequestDispatcher areaCheckServletDispatcher = request.getRequestDispatcher("/check-area");
        areaCheckServletDispatcher.forward(request, response);
    }
}
