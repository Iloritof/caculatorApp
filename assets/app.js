function initCalc() {
    let btnCount = 0;
    const calcContainer = document.createElement('div');
    calcContainer.classList.add('calc');

    const calcDisplay = document.createElement('div');
    calcDisplay.classList.add('calc__display');
    calcContainer.appendChild(calcDisplay);

        const displayContent = document.createElement('div');
        displayContent.classList.add('display__bottom');
        calcDisplay.appendChild(displayContent);

        const displayOperator = document.createElement('div');
        displayOperator.classList.add('calc__operator');
        displayContent.appendChild(displayOperator);

        const displayInput = document.createElement('input');
        displayInput.classList.add('display__input');
        displayInput.setAttribute('type', 'number');
        displayContent.appendChild(displayInput);

    const calcInput = document.createElement('div');
    calcInput.classList.add('calc__input');
    calcContainer.appendChild(calcInput);

    function buttonCreator(/*parent,*/classNames, text, child) {
        let button = document.createElement('div');
        button.classList.add('btn');
        if (classNames) {
            classNames.forEach(e => {
                button.classList.add(e);
            });
        }
        if (text) {
            button.textContent = text;
        }
        
        // parent.appendChild(button);
        
        if (child) {
            icon = document.createElement('img');
            icon.setAttribute('src', child[2]);
            icon.classList.add(child[1]);
            icon.setAttribute('alt', child[0]);
            button.appendChild(icon);
        }
        calcInput.appendChild(button);
        btnCount++;
    }

    buttonCreator(['btn--special', 'btn--history'], undefined, ['history', 'svg--1', './assets/history.svg']);
    buttonCreator(['btn--special', 'btn--clear'], 'AC', undefined);
    buttonCreator(['btn--special', 'btn--backspace'], undefined, ['backspace', 'svg', './assets/backspace.svg'])
    buttonCreator(['btn--special', 'btn--operator', 'btn--equal'], '=', undefined);
    buttonCreator(undefined, '7', undefined)
    buttonCreator(undefined, '8', undefined)
    buttonCreator(undefined, '9', undefined)
    buttonCreator(['btn--special', 'btn--operator'], '+', undefined);
    buttonCreator(undefined, '4', undefined)
    buttonCreator(undefined, '5', undefined)
    buttonCreator(undefined, '6', undefined)
    buttonCreator(['btn--special', 'btn--operator'], '-', undefined);
    buttonCreator(undefined, '1', undefined)
    buttonCreator(undefined, '2', undefined)
    buttonCreator(undefined, '3', undefined)
    buttonCreator(['btn--special', 'btn--operator'], '×', undefined);
    buttonCreator(undefined, '.', undefined)
    buttonCreator(undefined, '0', undefined)
    buttonCreator(['btn--special', 'btn--operator'], '%', undefined);
    buttonCreator(['btn--special', 'btn--operator'], '/', undefined);

    document.querySelector('.wrapper').appendChild(calcContainer);
}

initCalc();

const button = '.btn';
const operatorButtons = '.btn--special';
const inputField = document.querySelector('.display__input');
const calc = document.querySelector('.calc');
const displayOperator = document.querySelector('.calc__operator');

let inputNumbers = []; //used as input in the function for the calculation.
let operator = ''; // is used to save the sign for calculation
let isNegative = false; //is used to initiate a negative number in the calc
let clearScreen = false; // is used to clear the screen for another input after an operator has been pressed.
let isDecimal = false; //is used to initiate a decimal number in the calc
let newOperation = false; //used to create a new operation or calculation after the last one(when enter is used)

// Event Listeners and condition for activation
calc.addEventListener('click', e => {

    // If any button on the calc is click
    if (e.target.matches(button)) {

        // to limit the instruction for numerals only
        if (!e.target.matches('.btn--special')) {

            // to clear the screen for the second input after the first value.
            if (clearScreen) {
                inputField.value = '';
                clearScreen = false;
            }

            // to initiate a decimal number.
            if (e.target.textContent === '.') {
                inputField.value = inputField.value + '.0';
                isDecimal = true; // to ensure that the 0 behind the '.' is remove
            }

            if (e.target.textContent != '.') {

                // to enable input of number
                if (isDecimal === false) {
                    inputField.value = parseFloat(`${inputField.value}${e.target.textContent}`);
                }

                // to remove the 0 behind the '.', if created
                if (isDecimal) {
                    inputField.value = inputField.value.replace(/.$/, e.target.textContent)
                    isDecimal = false;
                }
            }
        }
    }

    if (e.target.matches('.btn--operator')) {
        if (inputField.value === '') {
            if (e.target.textContent === '-') {
                isNegative = true;
            }
        }
        if (inputField.value !== '') {
            if (isNegative === false) {
                inputNumbers.push(inputField.value);
            }
            if (isNegative === true) {
                inputNumbers.push(- inputField.value);
                isNegative = false;
            }
        }
        
        displayOperator.textContent = e.target.textContent;
        if (!e.target.matches('.btn--equal')) {
           operator = e.target.textContent;
        }
        clearScreen = true;
        // 
        if (inputNumbers.length === 2) {
            inputField.value = calcOperation(operator, inputNumbers);
            inputNumbers = [];
            
            if (e.target.matches('.btn--equal')) {
                clearScreen = false;
                newOperation = true;
            }
        }
        // }
    }

    if (e.target.matches('.btn--percent')) {
        inputField.value = (inputField.value / 100);
    };

    //(AC - button) Used for reseting the calculator to the initial state
    if (e.target.matches('.btn--clear')) {
        inputNumbers = [];
        operator = '';
        isNegative = false;
        clearScreen = false;
        isDecimal = false;
        newOperation = false
        inputField.value = '';
        displayOperator.textContent = '';
    }
})

calc.addEventListener('click', e => {

    if (e.key === '+') {
        if (inputField.value === '') {
            if (e.target.textContent === '-') {
                isNegative = true;
            }
        }
        if (inputField.value !== '') {
            if (isNegative === false) {
                inputNumbers.push(inputField.value);
            }
            if (isNegative === true) {
                inputNumbers.push(- inputField.value);
                isNegative = false;
            }
        }
        
        displayOperator.textContent = e.target.textContent;
        if (!e.target.matches('.btn--equal')) {
           operator = e.target.textContent;
        }
        clearScreen = true;
        // 
        if (inputNumbers.length === 2) {
            inputField.value = calcOperation(operator, inputNumbers);
            inputNumbers = [];
            
            if (e.target.matches('.btn--equal')) {
                clearScreen = false;
                newOperation = true;
            }
        }
        // }
    }
});


// Simple function to execute the calculation
function calcOperation(operator, numbers) {
    var result;

    if (operator === '+') {
        result = parseFloat(numbers[0]) + parseFloat(numbers[1]);
    }

    if (operator === '-') {
        result = parseFloat(numbers[0]) - parseFloat(numbers[1]);
    }

    if (operator === '×') {
        result = parseFloat(numbers[0]) * parseFloat(numbers[1]);
    }

    if (operator === '/') {
        result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
    }

    if (operator === '%') {
        result = parseFloat(numbers) / 100
    }

    return result;
}

// buttons.forEach(button => {
//     button.addEventListener('click', () => {
//         inputField.value = parseInt(`${inputField.value}${button.textContent}`);
//     })
// });

// operatorButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         console.log('dd')
//     })
// });

