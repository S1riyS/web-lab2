package ru.s1riys.lab2.filters;

import java.io.IOException;

import jakarta.servlet.DispatcherType;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import ru.s1riys.lab2.Config;

@WebFilter(servletNames = { "HistoryServlet" }, dispatcherTypes = { DispatcherType.REQUEST })

public class HistoryModificationFilter extends HttpFilter {
    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // Getting If-Modified-Since header
        long ifModifiedSince = request.getDateHeader("If-Modified-Since");

        // Getting last update time from servlet context
        ServletContext ctx = getServletContext();
        Object lastUpdateTime = ctx.getAttribute(Config.LAST_RESULTS_UPDATE_TIME);

        if (ifModifiedSince < 0) {
            chain.doFilter(request, response);
            return;
        }

        if (lastUpdateTime == null || (ifModifiedSince > 0 && ifModifiedSince > (long) lastUpdateTime)) {
            response.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
        } else {
            chain.doFilter(request, response);
        }
    }
}
