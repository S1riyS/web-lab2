import RequestService from "./services/request.js";
import HistoryService from "./services/history.js";
import GraphService from "./services/graph.js";
import FormService from "./services/form.js";

function onInit() {
    const requestService = new RequestService();
    requestService.updateHistory();

    const formService = new FormService("form", requestService);
    const graphService = new GraphService("graph", formService, requestService);
    const historyService = new HistoryService("history-table-body", "update-history-button", requestService);

    requestService.addCheckResposeObserver(historyService);
    requestService.addCheckResposeObserver(graphService);

    requestService.addHistoryUpdateResponseObserver(historyService);
    requestService.addHistoryUpdateResponseObserver(graphService);
}

onInit()