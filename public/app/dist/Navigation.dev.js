"use strict";

/**
 * Programmatic Navigation and Page Transitions
 * with SwiperJS and AnimeJS
 */

/**
 * Variables globales de navegación
 * En estas variables guardamos elementos DOM para trabajar con ellos
 */
var links;
var sections;
var modals;
/**
 * Variables globales de animación
 * Las animaciones las podemos guardar aquí: 
 * animaciones del layout, animaciones de componentes concretos, etc...
 * 
 * Si quieres crear una linea de animación nueva, puedes crear tus variables aquí
 */

var animation_layout;
/**
 * @function navigationErrHandler
 * @param {Error} err  
 * Trata errores que se den en la navegación
 */

var navigationErrHandler = function navigationErrHandler() {
  var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  if (err) {
    console.error("Ops! Something went wrong");
    console.error(err);
  }
};
/**
 * @function initNavigation
 * 
 * 
 * Inicializa la navegación SPA (Single Page Application)
 * Para ello: 
 * 
 * 1. Capturo el evento sobre los tags <a> y prevengo que naveguen
 * 2. Todas las <a> tienen un atributo en el HTML llamado navigation-type
 * 3. En función de este navigation-type navegamos de 3 maneras diferentes: 
 * 
 *    - a. swipe
 *         Navegamos con Swiper entre páginas y menú principal. 
 *         El controlador de esta navegación en swiperJS
 * 
 *    - b. animation
 *         Vamos al juego o volvemos del juego o entre splash page y 
 *         menu. Esta navegación la hacemos con animeJS. Haciendo que haya pantallas 
 *         que entren y salgan animando propiedades CSS.
 *         El tipo de animación lo metemos en otro atributo llamado "animation-type". 
 *         Mirar primer ejemplo
 * 
 *    - c. modal
 *         Abrimos popups y los cerramos. Con animeJS.
 *         El tipo de animación lo metemos en otro atributo llamado "animation-type". 
 *         Mirar primer ejemplo
 * 
 */


var initNavigationEvents = function initNavigationEvents() {
  links.forEach(function (link) {
    link.addEventListener('click', function (ev) {
      ev.preventDefault();
      var navigationType = link.getAttribute('navigation-type');
      var animationType = link.getAttribute('animation-type');
      var getTo = '#' + link.href.split('#').slice(-1);

      switch (navigationType) {
        case 'swipe':
          swipeTo(getTo);
          break;

        case 'animation':
          navigationTo(getTo, animationType);
          break;

        case 'modal':
          popUpToggle(getTo, animationType);
          break;

        default:
          navigationErrHandler();
      }
    });
  });
};
/**
 * @function swipeTo
 * @param {String} getTo 
 * 
 * Función que controla la navegación con swiper.
 * Mirar documentación de swiper en eventos. 
 * Mirar documentación del bloque correspondiente para hacer una navegación con swiper
 */


var swipeTo = function swipeTo() {
  var getTo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#menu_page';

  /**
   * Navegar con swipes
   */
  var sections = document.querySelectorAll('.swiper_item');
  var index = Array.from(sections).findIndex(function (section) {
    return "#" + section.id == getTo;
  });
  swiper.slideTo(index);

  if (!swiper) {
    navigationErrHandler("No has programado la funcionalidad de Swiper todav\xEDa!");
  } // clean up funcs


  GAME_UI.state.navigationStage = getTo;
};
/**
 * @function navigationTo
 * @param {String} getTo
 * @param {String} animationType
 * 
 * Función que controla la navegación general.
 * Esta función actualiza el state de la aplicación
 * Y lanza las animaciones que queramos en función del animationType.
 * 
 */


var navigationTo = function navigationTo(getTo, animationType) {
  switch (animationType) {
    /**
     * Entrada de la app
     */
    case 'fade_in':
      animation_FadeIn(getTo);
      animation_layout.finished.then(function () {
        // Fake splash
        setTimeout(function () {
          navigationTo('#swiper_page', 'splash_to_menu');
        }, 2000);
      });
      break;

    /**
     * Desde la pantalla splash al menu
     */

    case 'splash_to_menu':
      animation_SplashToMenu(getTo);
      animaText('#tituloJuego');
      svgRotate('#svgRect');
      svgRotate('#svgEstrella');
      svgRotate('#svgtriangulo');
      break;

    /**
    *  Desde la pantalla de menu al juego
    */

    case 'menu_to_game':
      animation_MenuToGame(getTo);
      animaText('#dyd');
      animation_layout.finished.then(function () {
        game = new Game();
        game.start();
      });
      break;

    case 'game_out':
      animation_GameOut(getTo);
      popUpToggle(getTo, "confirm_modal_out");
      break;

    /**
     * ErrHandler
     */

    default:
      navigationErrHandler("No has programado el animation-type=\"".concat(animationType, "\" todav\xEDa!"));
  } // clean up funcs


  GAME_UI.state.navigationStage = getTo;
};
/**
 * @function popUpToggle 
 * @param {String} getTo
 * @param {String} animationType
 * 
 * Función que controla la apertura y cierre de ventanas popup (salir del juego y confirmar).
 * Esta función actualiza el state de la aplicación
 * Y lanza las animaciones que queramos en función del animationType
 * 
 */


var popUpToggle = function popUpToggle(getTo, animationType) {
  switch (animationType) {
    /**
     * Lanzar popup de pausa en el juego
     */
    case 'pause_modal':
      animation_PopupPause(getTo);
      animation_layout.finished.then(function () {
        game.pauseOrResume();
      });
      break;

    case 'confirm_modal_out':
      animation_ConfirmOut(getTo);
      anime.set(document.querySelector('#modal_confirm'), {
        visibility: 'hidden'
      });

    case 'resume_modal':
      animation_PopupContinuar(getTo);
      animation_layout.finished.then(function () {
        anime.set(GAME_UI.modalWindows.pause, {
          visibility: 'hidden'
        });
        game.pauseOrResume();
      });
      break;

    case 'confirm_modal_in':
      animation_ConfirmIn(getTo);
      break;

    /**
     * ErrHandler
     */

    default:
      navigationErrHandler("No has programado el animation-type=\"".concat(animationType, "\" todav\xEDa!"));
  }

  GAME_UI.state.navigationStage = getTo;
};
/**
 * @function show/hideSpinner
 * 
 * Función para sacar un spinner (ruedita dando vueltas) para 
 * procesos asíncronos de fetching
 * 
 */


var showSpinner = function showSpinner() {
  GAME_UI.state.spinning = true;
  GAME_UI.modalWindows.spinner.classList.add('active');
};

var hideSpinner = function hideSpinner() {
  GAME_UI.state.spinning = false;
  GAME_UI.modalWindows.spinner.classList.remove('active');
};
/**
 * @function initNavigation
 * La ejecuto en main.js
 * 
*/


var initNavigation = function initNavigation() {
  links = GAME_UI.app.querySelectorAll('a[href^="#"]');
  sections = GAME_UI.app.querySelectorAll('section');
  modals = GAME_UI.app.querySelector('modal_window');
  initNavigationEvents();
};