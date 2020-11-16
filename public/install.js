'use strict';

let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);

// El evento beforeinstallprompt lanzará la función saveBeforeInstallPromptEvent
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

// Esta función guarda la pregunta de instalación en la variable global y muestra el botón

function saveBeforeInstallPromptEvent(evt) {
  deferredInstallPrompt = evt;
  installButton.removeAttribute('hidden');
}

// Cuando el usuario pulsa el boton

function installPWA(evt) {
// Muestra la pregunta de instalación almacenada en la variable global.
  deferredInstallPrompt.prompt();
// ocultamos el boton para que no se pulse dos veces
  evt.srcElement.setAttribute('hidden', true);
  // muestra en la consola la respuesta del usuario a la pregunta
  deferredInstallPrompt.userChoice
      .then((choice) => {
        if (choice.outcome === 'accepted') {
          console.log('El usuario ha aceptado', choice);
        } else {
          console.log('El usuario ha rechazado ', choice);
        }
        deferredInstallPrompt = null;
      });
}

// capturamos el evento appinstalled y lanzamos logAppInstalled
window.addEventListener('appinstalled', logAppInstalled);

// Escribe en la consola indicando que ya ha sido instalada

function logAppInstalled(evt) {

  console.log('Su aplicación fue instalada', evt);

}
