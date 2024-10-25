const D = 125;
const W = 400;
const H = 400;

export default class GraphService {
    constructor(graphId, formService, requestService) {
        this.canvas = document.getElementById(graphId);
        this.canvas.addEventListener("click", (event) => this.$clickHandler(event))
        this.ctx = this.canvas.getContext("2d");

        this.labelsLayerCanvas = this.createLayer(this.canvas);
        this.labelsLayerCtx = this.labelsLayerCanvas.getContext("2d");

        console.log(this.labelsLayerCtx)

        this.formService = formService
        this.requestService = requestService

        this.init();
    }

    init() {
        this.drawGraph();
        this.drawLables(null);
    }

    createLayer(mainCanvas) {
        let layer = document.createElement('canvas');
        layer.width = mainCanvas.width;
        layer.height = mainCanvas.height;
        return layer;
    }

    drawLayer(layerContext) {
        this.ctx.drawImage(layerContext.canvas, 0, 0);
    }

    clearLayer(layerContext) {
        layerContext.clearRect(0, 0, 400, 400);
        console.log("cleared")
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
    }

    drawLables(value) {

        let centerX = W / 2;
        let centerY = H / 2;

        let R;
        let RHalf;
        if (value === null) {
            R = "R";
            RHalf = "R/2";
        } else {
            R = value;
            RHalf = value / 2;
        }

        // labels
        this.labelsLayerCtx.font = "14px Arial";
        this.labelsLayerCtx.fillStyle = "black";
        this.labelsLayerCtx.fillText("X", W - 10, centerY - 5);
        this.labelsLayerCtx.fillText("Y", centerX + 5, 10);

        this.labelsLayerCtx.fillText(R, centerX + D - 5, centerY - 10);
        this.labelsLayerCtx.fillText(RHalf, centerX + D / 2 - 5, centerY - 10);
        this.labelsLayerCtx.fillText(R, centerX - D - 5, centerY - 10);
        this.labelsLayerCtx.fillText(RHalf, centerX - D / 2 - 5, centerY - 10);

        this.labelsLayerCtx.fillText(R, centerX + 5, centerY - D + 5);
        this.labelsLayerCtx.fillText(RHalf, centerX + 5, centerY - D / 2 + 5);
        this.labelsLayerCtx.fillText(R, centerX + 5, centerY + D + 5);
        this.labelsLayerCtx.fillText(RHalf, centerX + 5, centerY + D / 2 + 5);

        this.drawLayer(this.labelsLayerCtx);
    }

    drawPoint(x, y, r, isHit) {
        let absoluteX = x / r * D + W / 2;
        let absoluteY = -y / r * D + H / 2;

        let color;
        if (isHit) color = "green"
        else color = "red";

        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(absoluteX, absoluteY, 2, 0, 2 * Math.PI, false);
        this.ctx.closePath();
        this.ctx.fill();
    }

    $clickHandler(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left - W / 2;
        const y = -(event.clientY - rect.top - H / 2);

        const r = this.formService.getR();
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

        this.requestService.check(data);
    }

    onCheckResponse(data) {
        this.drawPoint(data.x, data.y, data.r, data.isHit);
    }

    onHistoryUpdateResponse(data) {
        const records = data.records;
        for (let i = 0; i < records.length; i++) {
            const current_record = records[i];
            console.log(current_record)
            this.drawPoint(current_record.x, current_record.y, current_record.r, current_record.isHit);
        }
    }

    onRadiusChange(r) {
        // this.drawLables(r);
    }
}