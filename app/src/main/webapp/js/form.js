import Validator from "./validator.js";

export default class FormService {
    static handleSubmit(event) {
        let form = $("form");
        let valid = form[0].checkValidity();
        if (valid) event.preventDefault();
        else return;

        // Validating data
        if (!this.validateAll()) {
            swal("Ошибка", "Вы ввели некорректные параметры", "error")
            return;
        }

        // Sending request to server
        let data = this.getFormData();
        window.location.replace("./controller?" + $.param(data));
    }

    static getX() {
        return $("select[name='x-select']").val();
    }

    static getY() {
        return $("input[name='y-input']").val();
    }

    static getR() {
        return $("input[name='r-input']:checked").val();
    }

    static validateAll() {
        return Validator.validateAll(this.getX(), this.getY(), this.getR())
    }

    static getFormData() {
        return {
            x: this.getX(),
            y: this.getY(),
            r: this.getR(),
        };
    }
}

