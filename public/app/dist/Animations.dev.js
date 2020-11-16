"use strict";

/**
 * 
 * animation_FadeIn
 * 
 * Ejemplo de animación. Todas las animaciones tienen siempre 3 pasos: 
 *       a. Seleccionamos los elementos a animar
 *       b. Hemos visto que anime se comporta mejor con CSS declarado en el atributo style del HTML
 *          Por lo tanto, si queremos hacer alguna animación, podemos iniciar los valores con anime.set
 *       c. Animamos, con un timeline mejor, para poder concatenar animaciones...
 *       d. Si queremos meter alguna función después de animar podemos meter el callback complete o usar promesas...
 * 
 * 
 */
var animation_FadeIn = function animation_FadeIn() {
  // Selecciona elementos a animar
  var splash = GAME_UI.pages.splash;
  var title = splash.querySelector('h1'); // Necesitas meter algo de CSS antes de la animación??

  anime.set(splash, {
    visibility: 'visible',
    opacity: 0
  });
  anime.set(title, {
    opacity: 0,
    translateY: 50
  }); // Anima!

  animation_layout = anime.timeline({
    duration: 500,
    easing: 'easeInOutSine'
  });
  animation_layout.add({
    targets: [splash],
    opacity: 1
  }).add({
    targets: [title],
    opacity: 1,
    translateY: 0
  }, '-=200');
};
/**
 * El resto de animaciones las construyes tú. 
 * Recuerda que puedes guardar las animaciones del layout
 * en la variable global animation
 */


var animation_SplashToMenu = function animation_SplashToMenu() {
  // Selecciona elementos a animar
  var from = GAME_UI.pages.splash;
  var to = GAME_UI.pages.swiperContainer; // Necesitas meter algo de CSS antes de la animación??

  anime.set(to, {
    visibility: 'visible',
    translateY: '100%',
    opacity: 0
  }); // Anima!

  animation_layout = anime.timeline({
    duration: 750,
    easing: 'easeInOutSine'
  });
  animation_layout.add({
    targets: [from],
    translateY: '-100%',
    opacity: 0
  }).add({
    targets: [to],
    translateY: 0,
    opacity: 1
  }, '-=750');
};
/**
 * Animacion del menu al juego
 */


var animation_MenuToGame = function animation_MenuToGame(destino) {
  // Selecciona elementos a animar
  var sale = document.querySelector('#swiper_page');
  var entra = document.querySelector(destino); // Necesitas meter algo de CSS antes de la animación??

  anime.set(entra, {
    visibility: 'visible',
    translateY: '-100%',
    opacity: 0
  }); // Anima!

  animation_layout = anime.timeline({
    duration: 500,
    easing: 'easeInOutSine'
  });
  animation_layout.add({
    targets: [sale],
    translateY: '100%',
    opacity: 0
  }).add({
    targets: [entra],
    translateY: 0,
    opacity: 1
  }, '-=500');
};
/**
 * 
 * Ejemplo de un popup, como vemos, es lo mismo....
 */


var animation_PopupPause = function animation_PopupPause() {
  var popup = GAME_UI.modalWindows.pause;
  anime.set(popup, {
    translateY: '20%',
    opacity: 0,
    visibility: 'visible'
  });
  animation_layout = anime.timeline({
    duration: 300,
    easing: 'easeOutQuad'
  });
  animation_layout.add({
    targets: popup,
    translateY: '0%',
    opacity: 1
  });
};

var animation_PopupContinuar = function animation_PopupContinuar(getTo) {
  var popup = GAME_UI.modalWindows.pause;
  animation_layout = anime.timeline({
    duration: 300,
    easing: 'easeOutQuad'
  });
  animation_layout.add({
    targets: popup,
    translateY: '-20%',
    opacity: 0
  });
};

var animation_ConfirmIn = function animation_ConfirmIn(getTo) {
  var popup = document.querySelector('#modal_confirm');
  anime.set(popup, {
    translateY: '-20%',
    opacity: 0,
    visibility: 'visible'
  });
  animation_layout = anime.timeline({
    duration: 300,
    easing: 'easeOutQuad'
  });
  animation_layout.add({
    targets: popup,
    translateY: '0%',
    opacity: 1
  });
};

var animation_ConfirmOut = function animation_ConfirmOut(getTo) {
  var popup = document.querySelector('#modal_confirm');
  anime.set(popup, {
    translateY: '20%',
    opacity: 0,
    visibility: 'visible'
  });
  animation_layout = anime.timeline({
    duration: 300,
    easing: 'easeOutQuad'
  });
  animation_layout.add({
    targets: popup,
    translateY: '0%',
    opacity: 1
  });
};

var animation_GameOut = function animation_GameOut(getTo) {
  var sale = document.querySelector('#main_page');
  var entra = document.querySelector('#swiper_page'); // Necesitas meter algo de CSS antes de la animación??

  anime.set(entra, {
    visibility: 'visible',
    translateY: '100%',
    opacity: 0
  }); // Anima!

  animation_layout = anime.timeline({
    duration: 500,
    easing: 'easeInOutSine'
  });
  animation_layout.add({
    targets: [sale],
    translateY: '-100%',
    opacity: 0
  }).add({
    targets: [entra],
    translateY: 0,
    opacity: 1
  }, '-=500');
  animation_layout.finished.then(function () {
    anime.set(sale, {
      visibility: 'hidden'
    });
    game.ended = true;
    document.querySelector('.game').innerHTML = '';
  });
};
/**
 * Anima el contenido del selecctor css 
 * @param {*} cssSelector 
 */


var animaText = function animaText(cssSelector) {
  var textWrapper = document.querySelector(cssSelector);
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  anime.timeline({
    loop: true
  }).add({
    targets: cssSelector + ' .letter',
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: function delay(el, i) {
      return 150 * (i + 1);
    }
  }).add({
    targets: cssSelector,
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
};

var svgRotate = function svgRotate(sccSelector) {
  var elemento = document.querySelector(sccSelector);
  anime.timeline({
    loop: true
  }).add({
    targets: sccSelector,
    rotate: [0, 360],
    easing: 'linear',
    duration: 3000
  });
};