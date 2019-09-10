const table = document.querySelector('.table');
const statusMessage = document.querySelector('.status-message');
const firstInputVal = document.querySelector('#firstInputVal');
const secondInputVal = document.querySelector('#secondInputVal');
const refreshDataBtn = document.querySelector('#refreshDataBtn');

function getProductsData() {
    fetch('http://exercise.develop.maximaster.ru/service/products/')
        .then(response => {
            let data = response.json();
            return data;
        })
        .then(data => {
            displayData(data);
        })
        .catch(error => { console.error(error) });
};

function displayData(data) {
    // local variables for table
    let idNumber = 1,
        firstNum = parseInt(firstInputVal.value),
        secondNum = parseInt(secondInputVal.value);

    // if table is not empty delete all rows
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // and create table rows
    for (let i = 0; i < data.length; i++) {
        let position = 'beforeend',
            tableRow = `<tr>
                            <td>${idNumber++}</td>
                            <td>${data[i].name}</td>
                            <td>${data[i].quantity}</td>
                            <td>${data[i].price}</td>
                            <td>${data[i].quantity * data[i].price}</td>
                        </tr>`;

    // filter
        if (firstNum === 0 && secondNum === 0) {
            table.insertAdjacentHTML(position, tableRow);
        } else if (data[i].price > firstNum && data[i].price < secondNum) {
            table.insertAdjacentHTML(position, tableRow);
        }

        if (idNumber >= 14) { idNumber = 1; }
    };

    statusMessage.innerHTML = '';

    if (table.rows.length === 1) {
        statusMessage.innerHTML = 'Нет данных, попадающих под условие фильтра';
    }
};

refreshDataBtn.addEventListener('click', getProductsData);