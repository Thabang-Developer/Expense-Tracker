const sendTableContent = (data) => {
    const tblBody = document.getElementById('tbl-body');
    let html = '';
    let temp_html = '';

    data.forEach((el, i) => {
        temp_html += `
            <tr>
                <td>(${i + 1}).</td>
                <td>${el.item}</td>
                <td>R${el.amount}</td>
                <td><button class="edit-exp" onclick = "editItem('${i}')"><i class="fa-solid fa-pen"></i></button> <button class="del-exp" onclick = "deleteItem('${i}')"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `
    });
    

    html = temp_html;
    tblBody.innerHTML = html;
}

const handleNewExpense = (data) => {
    try {
        let expArr = [];
        expArr.push(data);
        
        const oldExp = JSON.parse(localStorage.getItem('Expenses'));
        if (!oldExp || oldExp.length === 0) {
            console.log('No data')
        }else {

            const obj = {
                item: oldExp[0].item,
                amount: oldExp[0].amount
            }

            expArr.push(obj);
        }

        localStorage.setItem('Expenses', JSON.stringify(expArr));
        swal('Success', 'Item successfully added.', 'success');
        setTimeout(() => {
            location.reload();
        }, 2000);

    } catch (error) {
        // swal('Error', error.message, 'error');
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const loadExpenseList = JSON.parse(localStorage.getItem('Expenses'));
        const tableCont = document.querySelector('.table-content');

        if (!loadExpenseList || loadExpenseList.length === 0) {
            tableCont.innerHTML = `
                <span>No expense item found, you can make one above.</span>
            `
            return;
        }
        
        sendTableContent(loadExpenseList);

    } catch (error) {
        // swal('Error', error.message, 'error');
        console.log(error.message);
    }
})

const addNewExpense = () => {
    const itemName = document.getElementById('exp-name');
    const itemAmt = document.getElementById('amount');

    if (!itemName.value || !itemAmt.value) {
        swal('Error', 'Please fill in all the inputs.', 'error');
    }

    const itemObj = {
        item: itemName.value,
        amount: itemAmt.value
    }

    handleNewExpense(itemObj);

    itemAmt.value = '';
    itemName.value = '';
}

const deleteItem= (id) => {
    let expenseList;
    if (localStorage.getItem('Expenses') === null) {
        expenseList = [];
    }else {
        expenseList = JSON.parse(localStorage.getItem('Expenses'));
    }

    expenseList.splice(id, 1);
    localStorage.setItem('Expenses', JSON.stringify(expenseList));
    swal('Success', 'Item successfully deleted.', 'success');
    setTimeout(() => {
        location.reload();
    }, 2000)
}

//  Delete all items: 

document.querySelector('.del-data').addEventListener('click', () => {
    localStorage.clear();
    setTimeout(() => {
        location.reload();
    })
})

const editItem = (id) => {
    let expenseList;
    if (localStorage.getItem('Expenses') === null) {
        expenseList = [];
    }else {
        expenseList = JSON.parse(localStorage.getItem('Expenses'));
    }

    document.getElementById('exp-name').value = expenseList[id].item;
    document.getElementById('amount').value = expenseList[id].amount;
    document.querySelector('.submit-expense').style.display = 'none';
    document.querySelector('.update-expense').style.display = 'block';

    // update button:
    document.querySelector('.update-expense').addEventListener('click', () => {
        const item = document.getElementById('exp-name');
        const amount = document.getElementById('amount');
        
        if (!item.value || !amount.value) {
            alert('Oops!!! something went wrong.');
            
            return false;
        }

        expenseList[id].item = item.value;
        expenseList[id].amount = amount.value;

        localStorage.setItem('Expenses', JSON.stringify(expenseList));
        item.value = '';
        amount.value = '';


         // swal('Success', 'Item successfully added.', 'success');
        setTimeout(() => {
            location.reload();
        });
    })
}