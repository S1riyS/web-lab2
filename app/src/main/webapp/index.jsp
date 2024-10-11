<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="ru.s1riys.lab2.models.Result" %>
<%@ page import="ru.s1riys.lab2.models.ResultsListBean" %>

<!DOCTYPE html>
<html lang="ru-RU">

<head>
    <meta charset="UTF-8">
    <title>Лабораторная работа №1</title>

    <!--  JS  -->
    <script src="js/libs/jquery-3.7.1.min.js"></script>
    <script src="js/libs/sweetalert.min.js"></script>
    <script src="js/libs/js-big-decimal.min.js"></script>

    <!--  CSS  -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="css/index.css">
</head>

<body>
<nav class="navbar navbar-light bg-light w-100">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img src="media/logo.png" alt="" width="24" height="24" class="d-inline-block align-text-top">
            Лабораторная работа №1
        </a>
        <div class="d-flex align-items-center justify-content-center">
            Анкудинов Кирилл Константинович, P3218
            <a href="https://github.com/S1riyS/web-lab-1" target="_blank" rel="noopener noreferrer">
                <button type="button" id="github-button" class="btn btn-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-github" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                    </svg>
                </button>
            </a>

        </div>
    </div>
</nav>
<div class="container">
    <main class="main row">
        <div class="col-5">
            <div class="image-box box d-flex align-items-center justify-content-center">
                <canvas id="graph" width="400" height="400"></canvas>
            </div>

            <div class="params-box box">
                <div class="col-md-12">
                    <form class="row g-3">
                        <div class="col-md-6">
                            <label for="x-select" class="form-label">Координата X</label>
                            <select class="form-select" id="x-select" name="x-select" required>
                                <option value="-2">-2</option>
                                <option value="-1.5">-1.5</option>
                                <option value="-1">-1</option>
                                <option value="-0.5">-0.5</option>
                                <option value="0">0</option>
                                <option value="0.5">0.5</option>
                                <option value="1">1</option>
                                <option value="1.5">1.5</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="y-input" class="form-label">Координата Y</label>
                            <input type="number" step="0.1" min="-3" max="5" class="form-control" 
                            id="y-input" name="y-input" 
                            placeholder="Число от -3 до 5" required>
                        </div>
                        <div class="col-md-6">
                            <label for="r-input" class="form-label">Радиус R</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="r-input"
                                    id="r1" value="1" required>
                                <label class="form-check-label" for="r1">1</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="r-input"
                                    id="r2" value="2" required>
                                <label class="form-check-label" for="r2">2</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="r-input"
                                    id="r3" value="3" required>
                                <label class="form-check-label" for="r3">3</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="r-input"
                                    id="r4" value="4" required>
                                <label class="form-check-label" for="r4">4</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="r-input"
                                    id="r5" value="5" required>
                                <label class="form-check-label" for="r5">5</label>
                            </div>
                        </div>
                        <button id="submit" class="btn btn-primary" type="submit">Проверить</button>
                    </form>
                </div>
            </div>
        </div>
        
        <% ResultsListBean bean = (ResultsListBean) request.getSession().getAttribute("resultListBean"); %>

        <div class="col-7">
            <div class="history-box box table-scroll">
                <table class="table table-striped table-hover table-bordered table-sm">
                    <thead>
                    <tr>
                        <th scope="col">X</th>
                        <th scope="col">Y</th>
                        <th scope="col">R</th>
                        <th scope="col">Результат</th>
                        <th scope="col">Дата и время</th>
                        <th scope="col">Время работы скрипта</th>
                    </tr>
                    </thead>
                    <tbody id="history-table-body">
                        <% if (bean != null && !bean.getResults().isEmpty()) { %>
                            <% for (Result result : bean.getResults()) { %>
                                <tr>
                                    <td><%= result.getX() %></td>
                                    <td><%= result.getY() %></td>
                                    <td><%= result.getR() %></td>
                                    <% if (result.isHit()) { %>
                                        <td class="hit">Попадание</td>
                                     <% } else { %>
                                        <td class="miss">Промах</td>
                                     <% } %>
                                    <td><%= result.getCreatedAt() %></td>
                                    <td><%= result.getScriptTime() %></td>
                                </tr>
                            <% } %>
                        <% } %>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</div>
    <script type="module" src="js/main.js"></script>

</body>
