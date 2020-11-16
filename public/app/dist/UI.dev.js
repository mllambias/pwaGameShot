"use strict";

/**
 * JS for UI components
 */

/**
 * Global vars
 */
var toggles;
var swipeSection;
var swiper;
/**
 * @function initToggles
 * 
 * Inicializa los Toggles en la aplicación
 * Toggle son los switchers
 */

var initToggles = function initToggles() {
  toggles.forEach(function (t) {
    t.addEventListener('click', function () {
      t.classList.toggle('on');
    });
  });
};
/**
 * @function initSwiper
 * 
 * Inicializa SwiperJS con las configuraciones necesarias
 * La navegación entre las página settings, menu, leaderboard es con Swiper
 */


var initSwiper = function initSwiper() {
  swiper = new Swiper(swipeSection, {
    initialSlide: 1,
    spaceBetween: 100
  });
};
/**
 * @function initUI
 * 
 * Inicializa todo lo que tenga que ver con UI
 * La ejecuto en main.js
 */


var initUI = function initUI() {
  // toggles
  toggles = GAME_UI.app.querySelectorAll('.toggle');
  initToggles(); // swiperJS

  swipeSection = '.swiper_section';
  initSwiper();
};