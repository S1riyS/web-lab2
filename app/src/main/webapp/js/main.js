import RequestService from "./services/request.js";
import HistoryService from "./services/history.js";
import GraphService from "./services/graph.js";
import FormService from "./services/form.js";

function onInit() {
    const requestService = new RequestService();

    const formService = new FormService("form", requestService);
    const graphService = new GraphService("graph", formService, requestService);
    const historyService = new HistoryService("history-table-body", "update-history-button", requestService);

    // Adding observers for radius change
    formService.addRadiusChangeObserver(graphService);

    // Updating history
    requestService.updateHistory();
    // Adding observers for check response
    requestService.addCheckResposeObserver(historyService);
    requestService.addCheckResposeObserver(graphService);
    // Adding observers for history update
    requestService.addHistoryUpdateResponseObserver(historyService);
    requestService.addHistoryUpdateResponseObserver(graphService);
}

onInit()