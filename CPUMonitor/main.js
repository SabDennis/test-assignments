ymaps.ready(init);

// variables
const userName = document.querySelector('#name');
const userPhone = document.querySelector('#phone');
const userEmail = document.querySelector('#email');
const userComment = document.querySelector('#comment');
const result = document.querySelector('#result');
const form = document.querySelector('#form');
let deliveryLocation = false;

// form validation
form.addEventListener('submit', e => {
    let statusMessages = [];

    if (userName.value === '' || userName.value == null) {
        statusMessages.push('Не заполнено поле ФИО');
    };

    if (userPhone.value === '' || userPhone.value == null) {
        statusMessages.push('Введите номер телефона');
    } else if (isNaN(userPhone.value)) {
        statusMessages.push('Номер телефона должен содержать только числа');
    };

    if (userEmail.value.length > 0 && !userEmail.value.includes('@')) {
        statusMessages.push('Email должен содержать символ "@"');
    };

    if (userComment.value.length > 500) {
        statusMessages.push('Превышено максимальное количество символов (макс. 500)');
    };

    if (!deliveryLocation) {
        statusMessages.push('Выберите место доставки');
    };

    if (statusMessages.length > 0) {
        e.preventDefault();
        result.innerHTML = statusMessages.join(', ');
        result.style.color = 'red';
    } else {
        result.innerHTML = 'Заказ оформлен';
        result.style.color = 'green';
    };
});

// yandex map API
function init() {
    let myPlacemark;
    let myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 15
    }, {
        searchControlProvider: 'yandex#search'
    });

    myMap.events.add('click', e => {
        if (!myMap.balloon.isOpen()) {
            let coords = e.get('coords');
            if (myPlacemark) {
                myPlacemark.geometry.setCoordinates(coords);
            } else {
                myPlacemark = createPlacemark(coords);
                myMap.geoObjects.add(myPlacemark);
            }
            myMap.balloon.open(coords, {
                contentHeader: 'Вы выбрали место доставки!',
                contentBody: '<p>Координаты доставки: ' + [
                    coords[0].toPrecision(6),
                    coords[1].toPrecision(6)
                ].join(', ') + '</p>',
            });
            deliveryLocation = true;
        } else {
            myMap.balloon.close();
            deliveryLocation = false;
        }
    });

    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    };
};















