// == PSEUDOCÓDIGO == //
// El obj del form es permitir al usuario crear una cancion
// (SongService). Hacer petición AJAX para guardar la canción en el backend
// (UIManager). para gestionar los estados de la interfaz
// Acceso al formulario para poder leer los valores de los inputs
/* ======================================================================================================== */

// require() es de Node, no de EcmaScript6. Es de CommonJs. Es lo que introdujo Node para poder tener
// diferentes archivos js y poder utilizarlos uno dentro de otros.
const $ = require("jquery");

// El import es de EcmaScript6
// En el caso de jquery no lo importamos con import() porque jquery no tiene una sintaxis válida para poder hacer
// el import con la sintaxis de EcmaScript6
import UIManager from './UIManager';

//Con extends heredamos todos los atributos y métodos de UIManager
export default class SongsFormManager extends UIManager {

    constructor(elementSelector, songsService, pubSub) {
        //"super" ejecuta el constructor de la clase superior: UIManager
        //para traernos los atributos de UIManager: "uiStateClasses" y "element"
        //al que ademas añadimos un atributo nuevo "songsService"
        super(elementSelector);
        this.songsService = songsService;
        this.pubSub = pubSub;
    }

    init() {
        this.setupSubmitEventHandler();
    }

    setupSubmitEventHandler(){
        //element es el selector que recibe el evento, declarado en UIManager
        /*this.element.on("submit", function(){
            console.log("valor de this en función anónima", this);
            return false;
        })*/

        this.element.on("submit", () => {
            //OJO! this aqui hace referencia al obejto de la clase SongsFormManager al estar dentro de una arrow function
            //console.log("this en arrow function", this);
            this.validateAndSendData();
            return false; // = e.preventDefault() en funciones manejadoras de eventos, para evitar el envio por defecto del formulario
        })
    }

    validateAndSendData(){
        //Si this fuera el formulario, "this.isValid" daría error porque el formulario no tiene un método "isValid"
        if (this.isValid()){
            this.send();
        }
    }

    isValid() {
        const inputs = this.element.find("input");
        
        //bucle de EcmaScript6
        for (let input of inputs){
            if (input.checkValidity() == false) {
                //con "validationMessage" usamos la propia validación de HTML5
                const errorMessage = input.validationMessage;
                input.focus();
                this.setErrorHtml(); //UIManager
                this.setError(); //UIManager
                return false;
            }
        }
        this.setIdeal();
        return true;
    }

    send() {
        //this.element = [form.song-form.ideal...]
        //OJO! this.element no es el formulario en si sino un objeto jQuery, un jQuery wrapper
        //console.log(this.element);
        this.setLoading();

        const song = {
            artist: this.element.find("#artist").val(),
            title: this.element.find("#title").val(),
            cover_url: this.element.find("#cover_url").val()
        }

        this.songsService.save(song, success => {
            //TO DO: Recargar el formulario de canciones sin recargar la página
            //Si hubieramos inyectado como dependencia el SonsListManager podriamos acceder a su metodo "loadSongs"
            //this.songListManager.loadSongs();
            //Pero lo vamos a hacer mte el patrón PUB/SUB, emitiendo un evento.
            this.pubSub.publish("new-song", song); //publicamos el evento que informa de la creación de una canción
            this.resetForm();
            this.setIdeal();
        }, error => {
            this.setErrorHtml("Se ha producido un error al guardar la canción en el servidor");
            this.setError();
        });
    }

    resetForm(){
        this.element[0].reset(); //vacia los campos del formulario
    }

    disableFormControls() {
        this.element.find("input, button").attr("disabled", true);
    }

    enableFormControls() {
        this.element.find("input, button").attr("disabled", false);
    }
    setLoading() {
        //Para REDEFINIR los métodos de la clase padre (UIManager) dentro de SongsService.
        //Heredamos con super el método de la clase padre y además le añadimos uno nuevo
        super.setLoading();
        this.disableFormControls();
    }
    setError() {
        super.setError();
        this.enableFormControls();
    }
    setIdeal(){
        super.setIdeal();
        this.enableFormControls();
    }
}