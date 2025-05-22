const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button[data-value]');
const equalBtn = document.getElementById('equal');
const clearBtn = document.getElementById('clear');

buttons.forEach(btn => { 
    btn.addEventListener('click', () => {
        appendValue(btn.getAttribute('data-value'));
    });
});

equalBtn.addEventListener('click', calculateResult);
clearBtn.addEventListener('click', clearDisplay);

function appendValue(val) {
    const operators = ['+', '-', '*', '/'];
    const lastChar = display.value.slice(-1);

    if (val === '.') {
        const parts = display.value.split(/[\+\-\*\/]/);
        if (parts[parts.length - 1].includes('.')) return;
    }

    if (operators.includes(val)) {
        if (display.value === '' || operators.includes(lastChar)) return;
    }

    display.value += val;
}

function clearDisplay() {
    display.value = '';
}

function calculateResult() {
    try {
        let expr = display.value;
        if (!/^[0-9+\-*/.]+$/.test(expr)) {
            display.value = 'Error';
            return;
        }
        let result = Function('"use strict";return (' + expr + ')')();
        if (result === Infinity || result === -Infinity) {
            display.value = 'Error';
        } else {
            display.value = result;
        }
    } catch {
        display.value = 'Error';
    }
}