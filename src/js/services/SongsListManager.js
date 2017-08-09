const $ = require("jquery");

export default class SongsListManager {

    constructor(songsService, songsListUIManager) {
        this.songsService = songsService;
        this.songsListUIManager = songsListUIManager;
    }

    //El método init() es sólo para INICIALIZAR el componente
    init() {
        this.loadSongs();
    }

    loadSongs() {
        //SongService.list(songs => {},  error => {});
        /*Llamamos al método "list()" del objeto "songService" y le pasamos 2 funciones que gestionará el objeto en caso de éxito o error de la llamada Ajax.*/
        this.songsService.list(
            songs => {
                //Comprobamos si hay canciones
                if (songs.length == 0) {
                    //Mostramos el estado vacío
                    this.songsListUIManager.setEmpty();
                } else {
                    //Componemos el html con todas las canciones


                    //Quitamos el mensaje de cargando y mostramos la lista de canciones
                    this.songsListUIManager.setIdeal();
                }
            },
            error => {
                //Mostramos el estado de error
                this.songsListUIManager.setError();

                //Hacemos log del error en la consola
                console.log("ERROR al cargar las canciones. :(", error);
            });

        this.songsService.getDetail(5);
    }

    renderSongs(songs) {
        let html = "";
        for (let song of songs) {
            html +=
                `<article class="song">
                    <img src="${song.cover_url}" alt="${song.artist} - ${song.title}" class="cover">
                    <div class="artist">${song.artist}</div>
                    <div class="title">${song.title}</div>
                </article>`;
        }

        //Metemos el HTML en el div que contiene las canciones
        $(".songs-list .ui-status.ideal").html(html);
    }
}