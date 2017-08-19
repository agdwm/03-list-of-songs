window.$ = window.jQuery = require("jquery"); //Hace jQuery accesible públicamente

import SongsService from "./services/SongsService";
import UIManager from "./services/UIManager";
import SongsListManager from "./services/SongsListManager";
import SongsFormManager from "./services/SongsFormManager";

const songsService = new SongsService("/songs/");
const songsListUIManager = new UIManager(".songs-list");

//PATRON DE INYECCIÓN DE DEPENDENCIAS
//Al SongsListManager le inyectamos las clase "songsService" y "UIManager"
const songsListManager = new SongsListManager(songsService, songsListUIManager);
songsListManager.init();
//Al songsFormManager le inyectamos la clase "songsService"
const songsFormManager = new SongsFormManager(".song-form", songsService);
//Para tener tb acceso a SongsListManager desde SongsFormManager podríamos inyectárselo 
//mte inyección de dependencias y desde SonsListManager acceder a los métodos de songsListManager
//pero en lugar de usar patron de dependencias podemos crear un EVENTO PERSONALIZADO
//const songsFormManager = new SongsFormManager(".song-form", songsService, songsListManager);
songsFormManager.init();