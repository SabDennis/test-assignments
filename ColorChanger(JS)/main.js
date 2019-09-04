const square = document.querySelector('.square');
const inputWidth = document.querySelector('.inputWidth');
const inputHeight = document.querySelector('.inputHeight');
const colorChangeBtn = document.querySelector('.colorChangeBtn');
const hexNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

function getRandomColor() {
    let hexColor = '#';
    for (let i = 0; i < 6; i++) {
        let random = Math.floor(Math.random() * hexNumbers.length);
        hexColor += hexNumbers[random];
    };
    square.style.backgroundColor = hexColor;
};

function changeWidth() {
    let widthValue = inputWidth.value;
    square.style.width = widthValue + 'px';
};

function changeHeight() {
    let heightValue = inputHeight.value;
    square.style.height = heightValue + 'px';
};

colorChangeBtn.addEventListener('click', getRandomColor);
inputWidth.addEventListener('input', changeWidth);
inputHeight.addEventListener('input', changeHeight);