// CONSTRUCTOR
class UI {

    mostrarCosto(valor) {
        const presupuesto = document.querySelector('#presupuestoText');
        const restante = document.querySelector('#restanteText');
        
        presupuesto.textContent = valor;
        restante.textContent = valor;
    }

    mostrarMensaje(type, message) {
        this.type = type;
        this.message = message;

        // agrega clase y mensaje al elemento creado
        const alert = document.createElement('p');
        alert.textContent = message;
        alert.classList.add('message');


        if(this.type == 'error') {
            alert.classList.add('error')
        } else {
            alert.classList.add('sucess')
        }


        const container = document.querySelector('.container:first-child');
        
        // verifica y elimina alerta existente
        const exist = document.querySelector('.message');
        if(exist) {
            exist.remove();
        }
        
        //agrega el mensaje al html 
        container.insertBefore(alert, form);
        
        setTimeout(() => {
            alert.remove();
        }, 3000)
    }
}

//ASIGNAR INSTANCIAS
const interface = new UI();

loadEvents()
function loadEvents() {
    const form = document.querySelector('#form');

    document.addEventListener('DOMContentLoaded', obtenerCosto);
    form.addEventListener('submit', validarFormulario);


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

    // valida campos del formulario
    function validarFormulario(event) {
        event.preventDefault();

        const gastos = form.querySelector('#gasto');
        const cantidad = form.querySelector('#cantidad');

        // muestra mensaje de error
        if(gastos.value.trim() === '' || cantidad.value === '') {
            interface.mostrarMensaje('error', 'Ambos datos son obligatorios');
            return;
        } else if (cantidad.value <= 0) {
            interface.mostrarMensaje('error', 'La cantidad ingresada no es válida, intente de nuevo por favor');
            return;
        }

        // muestra mensaje de éxito
        interface.mostrarMensaje('sucess', 'Gasto agregado a la lista.')
    }
}