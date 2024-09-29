// -------------------- VARIABLES --------------------
const form = document.querySelector('#form');

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
        }

        this.expensesList = [...this.expensesList, Obj];
    }

    restar(list) {
        list.forEach(item => {
            return this.remainder -= item.cantidad;
        })
    }
}


class UI {

    showBudget(cost) {
        const presupuestoText = document.querySelector('#presupuestoText');
        const restanteText = document.querySelector('#restanteText');
    
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

    showList (list) {
        list.forEach(item => {
            const {cantidad, gasto} = item;
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${gasto}</span>
                <span>${cantidad}</span>
            `;

            const listContainer = document.querySelector('#listContainer');

            listContainer.appendChild(listItem);
        })
    }

    showRemain(result) {
        document.querySelector('#restanteText').textContent = result;
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

    // muestra lista en el html
    interface.showList(list);

    // Cálcula restante
    data.restar(list);
    interface.showRemain(data.remainder);

}