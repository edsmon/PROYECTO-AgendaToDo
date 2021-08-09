//variables
const formulario = document.querySelector('#formulario');
const cosasAqui = document.querySelector('#cosas-aqui');
let cosas = [];

// listeners
eventListeners();

function eventListeners() {
    // agrega mensaje
    formulario.addEventListener('submit', agregarCosa);

    document.addEventListener('DOMContentLoaded', () => {
        cosas = JSON.parse(localStorage.getItem('cosas')) || [];

        crearHTML();
    });
}


// funciones
function agregarCosa(e) {
    e.preventDefault();

    // text area donde el usuario va a escribir
    const tweet = document.querySelector('#tweet').value;

    //validacion
    if (tweet === '') {
        mostrarError('Debes ingresar algo, no puede estar en blanco');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet //se puede colocar solo la palabra para agrupar llave y valor en este caso
    }

    cosas = [...cosas, tweetObj];

    // creando html
    crearHTML();

    // reiniciar formulario
    formulario.reset();
}


function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


function crearHTML() {

    limpiarHTML();

    if (cosas.length > 0) {
        cosas.forEach(tweet => {
            // boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = "X";
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }


            // crea elemento
            const li = document.createElement('li');

            // añade contenido
            li.innerText = tweet.tweet;
            // inserta en htlm
            li.appendChild(btnEliminar);
            cosasAqui.appendChild(li);
        });
    }

    sicronizarStorage();
}

// Almacenamiento de elementos en localStorage
function sicronizarStorage() {
    localStorage.setItem('cosas', JSON.stringify(cosas));
}

function borrarTweet(id) {
    cosas = cosas.filter(tweet => tweet.id !== id);

    crearHTML();
}

function limpiarHTML() {
    while (cosasAqui.firstChild) {
        cosasAqui.removeChild(cosasAqui.firstElementChild);
    }
}