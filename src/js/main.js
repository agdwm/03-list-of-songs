window.$ = window.jQuery = require("jquery"); //Hace jQuery accesible públicamente

import SongsService from "./services/SongsService";
import UIManager from "./services/UIManager";
import SongsListManager from "./services/SongsListManager";

const songsService = new SongsService("/songs/");
const songsListUIManager = new UIManager(".songs-list");

//PATRON DE INYECCIÓN DE DEPENDENCIAS
const songsListManager = new SongsListManager(songsService, songsListUIManager);
songsListManager.init();