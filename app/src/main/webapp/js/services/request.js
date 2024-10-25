import Validator from "../validator.js";

export default class RequestService {
    constructor() {
        this.checkResponseObservers = []
        this.historyUpdateResponseObservers = []
        this.lastRequestTime = null
    }

    check(data) {
        const isDataValid = Validator.validateAll(data.x, data.y, data.r);
        if (!isDataValid) {
            swal("Ошибка", "Вы ввели некорректные параметры", "error")
            return;
        }

        const thisClass = this;
        $.ajax({
            url: "./controller?" + $.param(data),
            type: "GET",
            success: function (data) {
                thisClass.checkResponseObservers.forEach(observer => observer.onCheckResponse(data))
            },

            error: function (xhr) {
                swal(
                    `Ошибка ${xhr.status}`,
                    `Во время выполнения запроса произошла ошибка\n(${xhr.responseJSON.message})`,
                    "error"
                )
            }
        });
    }

    updateHistory() {
        const thisClass = this;

        $.ajax({
            url: "/app/history",
            type: "GET",
            beforeSend: function (request) {
                thisClass.$setHeader(request, "If-Modified-Since", this.lastRequestTime);
            }.bind(this),
            statusCode: {
                304: function () {
                    swal(
                        "История",
                        "История в актуальном состоянии",
                        "info"
                    )
                }
            },
            success: function (data) {
                if (data) {
                    thisClass.historyUpdateResponseObservers.forEach(observer => observer.onHistoryUpdateResponse(data))
                }
            }
        })
        this.lastRequestTime = new Date().toUTCString();
    }

    addCheckResposeObserver(observer) {
        this.checkResponseObservers.push(observer)
    }

    addHistoryUpdateResponseObserver(observer) {
        this.historyUpdateResponseObservers.push(observer)
    }

    $setHeader(request, key, value) {
        if (value !== null) {
            request.setRequestHeader(key, value);
        }
    }
}