window.$ = window.jQuery = require("jquery"); //Hace jQuery accesible públicamente

import SongsService  from "./services/SongsService";
import UIManager from "./UIManager";

const songService = new SongsService("/songs/");
//Le pasamos el selector (".songs-list")
const songListUiManager = new UIManager(".songs-list");


//SongService.list(songs => {},  error => {});
/*Llamamos al método "list()" del objeto "songService" y 
le pasamos 2 funciones que gestionará el objeto en caso de éxito o error de la llamada Ajax.*/
songService.list(
    songs => {
        //Comprobamos si hay canciones
        if (songs.length == 0) {
            //Mostramos el estado vacío
            songListUiManager.setEmpty();
        } else {
            //Componemos el html con todas las canciones
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

            //Quitamos el mensaje de cargando y mostramos la lista de canciones
            songListUiManager.setIdeal();
        }
    },
    error => {
        //Mostramos el estado de error
        songListUiManager.setError();

        //Hacemos log del error en la consola
        console.log("ERROR al cargar las canciones. :(", error);
});

songService.getDetail(5);