package ru.s1riys.lab2.servlets;

import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.lang.management.RuntimeMXBean;
import java.util.Date;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import ru.s1riys.Config;
import ru.s1riys.lab2.models.Result;
import ru.s1riys.lab2.models.ResultsListBean;

@WebServlet(name = "AreaCheck", urlPatterns = "/check-area")
public class AreaCheckServlet extends HttpServlet {
    private final long startTime = System.currentTimeMillis();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Float x = Float.parseFloat(request.getParameter("x"));
        Float y = Float.parseFloat(request.getParameter("y"));
        Float r = Float.parseFloat(request.getParameter("r"));

        // Result
        Result result = new Result(x, y, r, System.currentTimeMillis() - startTime);

        // Save to bean
        HttpSession session = request.getSession();
        ResultsListBean resultsListBean = (ResultsListBean) session.getAttribute(Config.RESULT_LIST_BEAN_NAME);
        if (resultsListBean == null) {
            resultsListBean = new ResultsListBean();
            session.setAttribute(Config.RESULT_LIST_BEAN_NAME, resultsListBean);
        }
        resultsListBean.addResult(result);

        // Forward to result.jsp
        request.setAttribute("result", result);
        request.getRequestDispatcher("/result.jsp").forward(request, response);
    }
}
