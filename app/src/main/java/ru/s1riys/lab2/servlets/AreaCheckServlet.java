package ru.s1riys.lab2.servlets;

import java.io.IOException;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import ru.s1riys.lab2.Config;
import ru.s1riys.lab2.models.Result;
import ru.s1riys.lab2.models.ResultsListBean;
import ru.s1riys.lab2.utils.HttpUtil;

@WebServlet(name = "AreaCheck", urlPatterns = "/check-area")
public class AreaCheckServlet extends HttpServlet {
    private final long startTime = System.currentTimeMillis();
    private HttpUtil httpUtil;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        httpUtil = new HttpUtil(response);
        processRequest(request, response);
    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Object isForwarded = request.getAttribute(Config.IS_FORWARDED_ATTRIBUTE);
        // System.out.println(isForwarded);
        // if (isForwarded == null || !(boolean) isForwarded) {
        // httpUtil.sendError(404, "Page not found");
        // }

        Object originalRequestURI = request.getAttribute(RequestDispatcher.FORWARD_REQUEST_URI);
        System.out.println(originalRequestURI);
        if (originalRequestURI == null) {
            httpUtil.sendError(404, "Page not found");
            return;
        }

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

        httpUtil.sendResult(result);

        // Forward to result.jsp
        // request.setAttribute("result", result);
        // request.getRequestDispatcher("/result.jsp").forward(request, response);
    }
}
