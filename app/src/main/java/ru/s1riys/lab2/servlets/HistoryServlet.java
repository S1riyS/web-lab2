package ru.s1riys.lab2.servlets;

import java.io.IOException;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import ru.s1riys.lab2.Config;
import ru.s1riys.lab2.models.ResultsListBean;

@WebServlet(name = "History", urlPatterns = "/history")
public class HistoryServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Gson gson = new Gson();

        HttpSession session = request.getSession();
        ResultsListBean resultsListBean = (ResultsListBean) session.getAttribute(Config.RESULT_LIST_BEAN_NAME);

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(resultsListBean));
        response.setStatus(200);
    }
}
