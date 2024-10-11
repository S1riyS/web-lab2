import Graph from "./graph.js";
import FormService from "./form.js";

function onInit() {
    let graph = new Graph();
    graph.init();

    $("#submit").on("click", (event) => FormService.handleSubmit(event));
}

onInit()