//En este servicio no es necesario importar jQuery porque no se está utilizando
//const $ = require("jquery");
import UIManager from './UIManager';

//SongsListManager SOLO recorre las canciones y las pinta
export default class SongsListManager extends UIManager{

    constructor(elementSelector, songsService, pubSub) {
        super(elementSelector); //llamamos al constructor de la clase UIManager
        this.songsService = songsService;
        this.pubSub = pubSub;
    }
    //Cada método debería hacer solo una única cosa
    //init() sólo inicializa el componente
    init(song) {
        this.loadSongs();
        let self = this;
        this.element.on("click", ".song", function(){
            //this es el objeto nativo javascript
            let $this = $(this);
            let songId = $this.data("id");
            self.deleteSong(songId);
        });
        this.pubSub.subscribe("new-song", (topic, song) => {
            this.loadSongs();
        });
    }
    //loadSongs() solo carga las canciones
    loadSongs() {
        //SongService.list(songs => {},  error => {});
        /*Llamamos al método "list()" del objeto "songService" y le pasamos 2 funciones que gestionará 
        el objeto en caso de éxito o error de la llamada Ajax.*/
        this.songsService.list(
            songs => {
                //Comprobamos si hay canciones
                if (songs.length == 0) {
                    //Mostramos el estado vacío
                    this.setEmpty();
                } else {
                    //Componemos el html con todas las canciones
                    this.renderSongs(songs);
                    //Quitamos el mensaje de cargando y mostramos la lista de canciones
                    this.setIdeal();
                }
            },
            error => {
                //Mostramos el estado de error
                this.setError();
                //Hacemos log del error en la consola
                console.log("ERROR al cargar las canciones. :(", error);
            });

        this.songsService.getDetail(5);
    }

    //renderSongs() PINTA las canciones en el html
    renderSongs(songs) {
        let html = "";
        for (let song of songs) {
            html += this.renderSong(song)
        }
        //Metemos el HTML en el div que contiene las canciones
        this.setIdealHtml(html);
    }
    
    //renderiza una única canción
    renderSong(song) {
        let cover_url = song.cover_url;
        let srcset = "";
        //Al renderizarse las canciones, en aquellas que no tienen cover se utiliza por defecto la de "disk"
        if (cover_url == "") {
            cover_url = "img/disk-150px.png";
            srcset = ' srcset="img/disk-150px.png 150w, img/disk-250px.png 250w, img/disk-300px.png 300w"';
        }
        return `<article class="song" data-id="${song.id}">
                    <img src="${song.cover_url}" alt="${song.artist} - ${song.title}" class="cover"${srcset}>
                    <div class="artist">${song.artist}</div>
                    <div class="title">${song.title}</div>
                </article>`;
    }

    deleteSong(songId) {
        this.setLoading();
        this.songsService.delete(songId, success => {
            //Cuando la canción se borra recargamos la lista
            this.loadSongs();
        }), error => {
            this.setError();
        }
    }
}