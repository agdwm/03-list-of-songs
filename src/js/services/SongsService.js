/*No haría falta hacer un require de jquery en este archivo ya que se está importando en el main.js.
De hecho Browserify solo va a importar jquery 1 vez
Pero de este modo sabemos lo que significa "$" */
const $ = require("jquery");

export default class SongsService {
    
    constructor(url){
        this.url = url;
    }

    // Obtener listado de canciones GET
    //list recibe 2 parametros (2 funciones callback): songs() y error()
    list(successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            success: successCallback,
            error: errorCallback
        });
    }

    // Crear o actualizar una canción
    //¿Cómo diferenciamos si queremos actualizar o crear un recurso?
    //Por el ID
    save(song, successCallback, errorCallback) {
        //Cuando actualizamos un recurso SI pasamos el ID porque el ID del recurso ya existe.
        if (song.id){
            this.update(song, successCallback, errorCallback);
        //Cuando creamos un nuevo recurso NO pasamos el ID porque no existe aún y lo gestiona automáticamente el servidor.
        } else {
            this.create(song, successCallback, errorCallback);
        }
    }

    // Crear una canción. Le pasamo
    create(song, successCallback, errorCallback) {
        $.ajax({
            //al crear un recurso NO pasamos Id xq eso lo gestiona el servidor automáticamente
            url: this.url,
            method: 'post',
            //Pasamos los datos del recurso en JSON
            data: song,
            success: successCallback,
            error: errorCallback
        });
    }

    // Obtener el detalle de una canción GET + id song
    getDetail(songId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${songId}`,
            success: successCallback,
            error: errorCallback
        });
    }

    // Actualizar una canción
    update(song, successCallback, errorCallback) {
        $.ajax({
            //al actualizar un recurso pasamos el ID
            url: `${this.url}${song.id}`,
            method: 'put',
            //Pasamos los datos del recurso en JSON
            data: song,
            success: successCallback,
            error: errorCallback
        });
    }

    // Eliminar una canción (songsService.delete(4, response => {}, error => {}))
    delete(songId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${songId}`,// "/songs/id"
            //si no especificamos "method", en ajax x defecto es "get"
            method: 'delete',
            success: successCallback,
            error: errorCallback
        });    
    }
}