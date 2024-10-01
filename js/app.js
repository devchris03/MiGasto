// -------------------- VARIABLES --------------------
const form = document.querySelector('#form');
const listContainer = document.querySelector('#listContainer');

// -------------------- EVENTOS --------------------
document.addEventListener('DOMContentLoaded', getBudget);
form.addEventListener('submit', expenses)

// -------------------- CLASSES --------------------
class Data {
    constructor(cost) {
        this.budget = Number(cost);
        this.remainder = Number(cost);
        this.expensesList = [];
    }

    getdata(expense, quantity) {
        this.expense = expense;
        this.quantity = Number(quantity);

        const Obj = {
            gasto: this.expense,
            cantidad: this.quantity,
            id: Date.now(),
        }

        this.expensesList = [...this.expensesList, Obj];
    }

    restar(list) {
        this.remainder = this.budget;
        list.forEach(item => {
            this.remainder -= item.cantidad
        })
    }
}


class UI {
    constructor() {
        this.presupuestoText = document.querySelector('#presupuestoText');
        this.restanteText = document.querySelector('#restanteText')
    }

    showBudget(cost) {
        restanteText.textContent = cost.remainder; 
        presupuestoText.textContent = cost.budget; 
    }

    showAlert(type, text) {
        this.type = type;
        this.text  = text;

        const alert = document.createElement('p');
        alert.textContent = this.text;
        alert.classList.add('message');

        if(this.type === 'error') {
            alert.classList.add('error');
        } else {
            alert.classList.add('sucess');
        }

        const container = document.querySelector('.container');
        
        // verifica y elimina alerta existente
        const exist = container.querySelector('.message');
        if(exist) {
            exist.remove()
        }
        
        // inserta alerta
        container.insertBefore(alert, form);

        setTimeout(() => {
            alert.remove();
        }, 3000)
    }


    cleanList() {
        while(listContainer.firstChild) {
            listContainer.removeChild(listContainer.firstChild)
        } 
    }

    showList (list) {
        list.forEach(item => {
            const {cantidad, gasto, id} = item;
            const listItem = document.createElement('li');
            listItem.classList.add('item')
            listItem.innerHTML = `
                <span>${gasto}</span>
                <span>$ ${cantidad}</span>
                <button class="deleteItem" id="${id}" aria-label="Elimina gasto">
                    <img src="./image/icon-delete.png" alt="icono de tacho" width="24">
                </button>
            `;

            const listContainer = document.querySelector('#listContainer');

            listContainer.appendChild(listItem);
        })
    }

    showRemain(result) {
        restanteText.textContent = result;
    }

    showWarning (data) {
        if(data.remainder < ( (data.budget * 25) / 100)) {
            restanteText.parentElement.classList.add('red');
        } else if (data.remainder < ( (data.budget * 50) / 100)) {
            restanteText.parentElement.classList.add('orange');
        }

        if(data.remainder <= 0) {

            // crea mensaje de advertencia
            const warning = document.createElement('p');
            warning.textContent = 'El presupuesto se ha agotado.';
            warning.classList.add('error');

            document.querySelector('.container').insertBefore(warning, form);
            
            
            setTimeout(() => {
                warning.remove()
            }, 3000)
            
            
            document.querySelector('#submit').disabled = true;
            
        } else {
            document.querySelector('#submit').disabled = false;
        }
        
    }

}

// -------------------- ASIGNAR --------------------
let data;
const interface = new UI();
// -------------------- FUNCIONES --------------------

// obtiene presupuesto
function getBudget() {
    const cost = prompt('¿Cúal es tu presupuesto?');

    if(cost === '' || isNaN(cost) || cost === null || cost <= 0) {
        window.location.reload();
    }

    data = new Data(cost);

    // mostrar presupuesto y restante
    interface.showBudget(data);
}


function expenses(event) {
    event.preventDefault();

    const campExpenses = form.querySelector('#gasto');
    const campQuantity = form.querySelector('#cantidad');

    // muestra alerta en caso de error o éxito
    if(campExpenses.value === '' || campQuantity.value === '') {
        interface.showAlert('error', 'Ambos campos son obligatorios.');
        return;
    } else if (campQuantity.value <= 0) {
        interface.showAlert('error', 'Cantidad inválida, verifique e intente de nuevo por favor.');
        return;
    } else {
        interface.showAlert('sucess', 'Gasto agregado a la lista.');
    }

    //envia datos del formulario
    data.getdata(campExpenses.value, campQuantity.value);

    // reinicia el formulario
    form.reset();

    const list = data.expensesList;

    //limpia lista 
    interface.cleanList(); 

    // muestra lista en el html
    interface.showList(list);

    // Cálcula restante
    data.restar(list);
    interface.showRemain(data.remainder);

    //advierte cantidad restante 
    interface.showWarning(data);
}