import FormService from "./form.js";
import { HistoryManager } from "./history.js";

const D = 125;
const W = 400;
const H = 400;

export default class Graph {
    constructor() {
        this.canvas = document.getElementById("graph");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.addEventListener("click", (event) => this.clickHandler(event))
    }

    init() {
        this.drawGraph();
        this.drawPointsFromHistory();
    }

    drawGraph() {
        let centerX = W / 2;
        let centerY = H / 2;

        this.canvas.width = W;
        this.canvas.height = H;
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "#8E94F2";

        // circle
        this.ctx.arc(centerX, centerY, D, 0, -Math.PI / 2, true);
        this.ctx.fill();

        // triangle
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(centerX, centerY - D - 1);
        this.ctx.lineTo(centerX + D + 1, centerY);
        this.ctx.closePath();
        this.ctx.fill();

        // rectangle
        this.ctx.rect(centerX, centerY, D, D);
        this.ctx.fill();

        // triangle
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(centerX, centerY + D);
        this.ctx.lineTo(centerX - D, centerY);
        this.ctx.closePath();
        this.ctx.fill();

        // axis
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, 0);
        this.ctx.lineTo(centerX, H);
        this.ctx.moveTo(0, centerY);
        this.ctx.lineTo(W, centerY);
        this.ctx.stroke();

        // R-pointers
        this.ctx.beginPath();

        this.ctx.moveTo(centerX + D, centerY - 5);
        this.ctx.lineTo(centerX + D, centerY + 5);
        this.ctx.moveTo(centerX + D / 2, centerY - 5);
        this.ctx.lineTo(centerX + D / 2, centerY + 5);

        this.ctx.moveTo(centerX - D, centerY - 5);
        this.ctx.lineTo(centerX - D, centerY + 5);
        this.ctx.moveTo(centerX - D / 2, centerY - 5);
        this.ctx.lineTo(centerX - D / 2, centerY + 5);

        this.ctx.moveTo(centerX - 5, centerY - D);
        this.ctx.lineTo(centerX + 5, centerY - D);
        this.ctx.moveTo(centerX - 5, centerY - D / 2);
        this.ctx.lineTo(centerX + 5, centerY - D / 2);

        this.ctx.moveTo(centerX - 5, centerY + D);
        this.ctx.lineTo(centerX + 5, centerY + D);
        this.ctx.moveTo(centerX - 5, centerY + D / 2);
        this.ctx.lineTo(centerX + 5, centerY + D / 2);

        this.ctx.stroke();

        // labels
        this.ctx.font = "14px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("X", W - 10, centerY - 5);
        this.ctx.fillText("Y", centerX + 5, 10);

        this.ctx.fillText("R", centerX + D - 5, centerY - 10);
        this.ctx.fillText("R/2", centerX + D / 2 - 5, centerY - 10);
        this.ctx.fillText("R", centerX - D - 5, centerY - 10);
        this.ctx.fillText("R/2", centerX - D / 2 - 5, centerY - 10);

        this.ctx.fillText("R", centerX + 5, centerY - D + 5);
        this.ctx.fillText("R/2", centerX + 5, centerY - D / 2 + 5);
        this.ctx.fillText("R", centerX + 5, centerY + D + 5);
        this.ctx.fillText("R/2", centerX + 5, centerY + D / 2 + 5);
    }
    drawPointsFromHistory() {
        let thisClass = this;
        $.ajax({
            url: "/app/history",
            type: "GET",
            success: function (data) {
                if (data) {
                    let color;

                    let results = data.records;
                    for (let i = 0; i < results.length; i++) {
                        let result = results[i];

                        if (result.isHit) color = "green"
                        else color = "red";

                        thisClass.drawPoint(result.x, result.y, result.r, color);
                    }
                }
            }
        })
    }
    drawPoint(x, y, r, color) {
        let absoluteX = x / r * D + W / 2;
        let absoluteY = -y / r * D + H / 2;

        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(absoluteX, absoluteY, 2, 0, 2 * Math.PI, false);
        this.ctx.closePath();
        this.ctx.fill();
    }

    clickHandler(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left - W / 2;
        const y = -(event.clientY - rect.top - H / 2);
        console.log(x, y)


        let r = FormService.getR();
        if (r == null || r == undefined) {
            swal("Ошибка", "Не указан параметр R", "error")
            return;
        }


        const scaledX = (x / D) * r;
        const scaledY = (y / D) * r;
        console.log(scaledX, scaledY, r)


        let data = {
            x: scaledX,
            y: scaledY,
            r: r
        };
        let thisClass = this;
        $.ajax({
            url: "./controller?" + $.param(data),
            type: "GET",
            success: function (data) {
                HistoryManager.addRecord(data.x, data.y, data.r, data.isHit, data.createdAt, data.scriptTime);

                let color;
                if (data.isHit) color = "green"
                else color = "red";
                thisClass.drawPoint(scaledX, scaledY, r, color);
            },
            error: function (xhr, status, error) {
                swal(
                    `Ошибка ${xhr.status}`,
                    `Во время выполнения запроса произошла ошибка\n(${xhr.responseJSON.message})`,
                    "error"
                )
            }
        });
    }
}