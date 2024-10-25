export default class FormService {
    constructor(formId, requestService) {
        this.form = $("#" + formId);
        this.form.on("submit", (event) => this.$handleSubmit(event));
        this.requestService = requestService;

        this.radiusChangeObservers = []
        $("input[name='r-input']").on("change", () => this.$radiusChangeHandler());
    }

    $handleSubmit(event) {
        let form = $("form");
        let valid = form[0].checkValidity();
        if (valid) event.preventDefault();
        else return;

        // Sending request to server
        let data = this.getFormData();
        this.requestService.check(data)
    }

    getX() {
        return $("select[name='x-select']").val();
    }

    getY() {
        return $("input[name='y-input']").val();
    }

    getR() {
        return $("input[name='r-input']:checked").val();
    }

    getFormData() {
        return {
            x: this.getX(),
            y: this.getY(),
            r: this.getR(),
        };
    }

    $radiusChangeHandler(event) {
        let newR = this.getR();
        this.radiusChangeObservers.forEach((observer) => observer.onRadiusChange(newR));
    }

    addRadiusChangeObserver(observer) {
        this.radiusChangeObservers.push(observer)
    }
}

