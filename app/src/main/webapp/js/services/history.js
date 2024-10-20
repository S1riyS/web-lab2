export default class HistoryService {
    constructor(tableId, updateHistoryButtonId, requestService) {
        this.requestService = requestService

        this.table = $("#" + tableId);

        this.updateHistoryButton = $("#" + updateHistoryButtonId);
        this.updateHistoryButton.on("click", () => this.requestService.updateHistory());
    }

    $wrapInTdTag(data, class_ = null) {
        if (class_ === null) return "<td>" + data + "</td>"
        return `<td class="${class_}">` + data + "</td>"
    }

    $wrapInTrTag(data) {
        return "<tr>" + data + "</tr>"
    }

    $processResult(result) {
        return result ? 'Попадание' : 'Промах';
    }

    $buildItem(x, y, r, result, currentTime, scriptTime) {
        return {
            "x": x,
            "y": y,
            "r": r,
            "result": result,
            "currentTime": currentTime,
            "scriptTime": scriptTime,
        }
    }

    $renderItem(item) {
        let processedResult = this.$processResult(item.result);
        let resultClass = item.result ? 'hit' : 'miss';

        return this.$wrapInTrTag(
            this.$wrapInTdTag(item.x) +
            this.$wrapInTdTag(item.y) +
            this.$wrapInTdTag(item.r) +
            this.$wrapInTdTag(processedResult, resultClass) +
            this.$wrapInTdTag(item.currentTime) +
            this.$wrapInTdTag(item.scriptTime)
        )
    }

    $addRecordToTable(x, y, r, result, currentTime, scriptTime) {
        let item = this.$buildItem(x, y, r, result, currentTime, scriptTime);
        let newRow = this.$renderItem(item);

        this.table.prepend(newRow);
    }


    addRecord(x, y, r, result, currentTime, scriptTime) {
        this.$addRecordToTable(x, y, r, result, currentTime, scriptTime);
    }

    onCheckResponse(data) {
        this.addRecord(data.x, data.y, data.r, data.isHit, data.createdAt, data.scriptTime);
    }

    onHistoryUpdateResponse(data) {
        this.table.empty();
        for (let i = 0; i < data.records.length; i++) {
            this.addRecord(data.records[i].x, data.records[i].y, data.records[i].r, data.records[i].isHit, data.records[i].createdAt, data.records[i].scriptTime);
        }
    }
}