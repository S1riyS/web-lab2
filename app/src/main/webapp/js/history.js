export class HistoryManager {
    static #wrapInTdTag(data, class_ = null) {
        if (class_ === null) return "<td>" + data + "</td>"
        return `<td class="${class_}">` + data + "</td>"
    }

    static #wrapInTrTag(data) {
        return "<tr>" + data + "</tr>"
    }

    static #processResult(result) {
        return result ? 'Попадание' : 'Промах';
    }

    static #buildItem(x, y, r, result, currentTime, scriptTime) {
        return {
            "x": x,
            "y": y,
            "r": r,
            "result": result,
            "currentTime": currentTime,
            "scriptTime": scriptTime,
        }
    }

    static #renderItem(item) {
        let processedResult = HistoryManager.#processResult(item.result);
        let resultClass = item.result ? 'hit' : 'miss';

        return HistoryManager.#wrapInTrTag(
            HistoryManager.#wrapInTdTag(item.x) +
            HistoryManager.#wrapInTdTag(item.y) +
            HistoryManager.#wrapInTdTag(item.r) +
            HistoryManager.#wrapInTdTag(processedResult, resultClass) +
            HistoryManager.#wrapInTdTag(item.currentTime) +
            HistoryManager.#wrapInTdTag(item.scriptTime)
        )
    }

    static #addRecordToTable(x, y, r, result, currentTime, scriptTime) {
        let tableBody = $('#history-table-body');

        let item = HistoryManager.#buildItem(x, y, r, result, currentTime, scriptTime);
        let newRow = HistoryManager.#renderItem(item);

        tableBody.prepend(newRow);
    }


    static addRecord(x, y, r, result, currentTime, scriptTime) {
        HistoryManager.#addRecordToTable(x, y, r, result, currentTime, scriptTime);
    }

}