const $ = require("jquery");

export default class UIManager {

    constructor(selector) {
        //clases de CSS que definen estados de componente
        this.uiStateClasses = "empty loading error partial ideal"
        //seleccionamos el elemento de jquery en el constructor
        this.element = $(selector);
    }
    
    setEmpty() {
        $(this.element).removeClass(this.uiStateClasses).addClass("empty");
    }

    setLoading() {
        $(this.element).removeClass(this.uiStateClasses).addClass("loading");
    }

    setError() {
        $(this.element).removeClass(this.uiStateClasses).addClass("error");
    }

    setPartial() {
        $(this.element).removeClass(this.uiStateClasses).addClass("partial");
    }

    setIdeal() {
        $(this.element).removeClass(this.uiStateClasses).addClass("ideal");
    }
}