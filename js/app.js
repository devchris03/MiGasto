// CONSTRUCTOR
class UI {

    mostrarCosto(valor) {
        const presupuesto = document.querySelector('#presupuestoText');
        const restante = document.querySelector('#restanteText');
        
        presupuesto.textContent = valor;
        restante.textContent = valor;
    }
}

//ASIGNAR INSTANCIAS

const interface = new UI();

loadEvents()
function loadEvents() {

    document.addEventListener('DOMContentLoaded', obtenerCosto);

    // obtiene el presupuesto inicial
    function obtenerCosto() {
        const valor = prompt('¿Cúal es tu presupuesto?');

        // vuelve a preguntar si en caso el valor no es el esperado
        if(valor === '' || isNaN(valor) || valor === null || valor <= 0) {
            window.location.reload();
        }

        // agrega valor al html
        interface.mostrarCosto(valor);
    }

}