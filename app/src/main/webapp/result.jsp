<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="ru.s1riys.lab2.models.Result" %>
<%@ page import="java.util.List" %>

<!DOCTYPE html>
<html>

<head>
    <title>Result</title>
</head>

<body>
    <h2>Results:</h2>
    <% Result result=(Result) request.getAttribute("result"); %>
    <% if (result != null) { %>
        <table border="1">
            <tr>
                <th>x</th>
                <th>y</th>
                <th>r</th>
                <th>hit</th>
            </tr>
            <tr>
                <td>
                    <%= result.getX() %>
                </td>
                <td>
                    <%= result.getY() %>
                </td>
                <td>
                    <%= result.getR() %>
                </td>
                <td>
                    <%= result.isHit() ? "Yes" : "No" %>
                </td>
            </tr>
        </table>
    <% } else { %>
        <p>no result???</p>
    <% } %>

    <a href="/app/controller">Back</a>
</body>

</html>