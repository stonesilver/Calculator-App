// Declaring variables
let numericBtn = document.querySelectorAll('[data-number]');
let operationBtn = document.querySelectorAll('[data-operation]');
let firstoperand = document.querySelector('[data-top]');
let secondoperand = document.querySelector('[data-buttom]');
let calculateBtn = document.querySelector('[data-calculate]');
let clearFisrtOperandText = document.querySelector(
   '[data-clear-secondoperand]'
);
let allClear = document.querySelector('[data-clear-all]');
let clear = document.querySelector('[data-backspace]');
let percentage = document.querySelector('[data-percentage]');
let squareroot = document.querySelector('[data-squareroot]');
let square = document.querySelector('[data-square]');
let oneDivideX = document.querySelector('[data-one-divide-x]');
let operationSelected = '';
let calculated = false;

// The solve Function to Handle the Calculation
const SOLVE = (operator) => {
   if (firstoperand.value == '' || secondoperand.value == '') return;
   let first = parseFloat(firstoperand.value);
   let second = parseFloat(secondoperand.value);
   switch (operationSelected) {
      case '+':
         secondoperand.value = first + second;
         break;
      case '-':
         secondoperand.value = first - second;
         break;
      case '÷':
         secondoperand.value = first / second;
         break;
      case '×':
         secondoperand.value = first * second;
         break;
      default:
         return;
   }
   firstoperand.value = '';
   calculated = true;
};

// Adding Event listeners that will fire Events
numericBtn.forEach((button) => {
   button.addEventListener('click', () => {
      // Checking for duplicate dot(.) in the secondoperand
      if (button.innerHTML == '.' && secondoperand.value.includes('.')) {
         return;
      }
      // Checking if a solve function has fired to clear the secondoperand
      if (calculated) {
         secondoperand.value = '';
         calculated = !calculated;
      }
      // Adding clicked button values to the secondoperand
      secondoperand.value += button.innerHTML;
      if (firstoperand.value !== '') {
         firstoperand.value += `${button.innerHTML}`;
      }
      // Popping out multiple zero as the first number on the secondoperand
      if (secondoperand.value.charAt() == '0' && secondoperand.value[1] >= 0) {
         secondoperand.value = secondoperand.value.slice(1);
      }
   });
});

operationBtn.forEach((button) => {
   button.addEventListener('click', () => {
      if (secondoperand.value == '' && firstoperand.value == '') return;
      if (firstoperand.value != '' && secondoperand.value != '') {
         operationSelected = operationSelected;
         SOLVE();
      }
      operationSelected = button.textContent;
      if (firstoperand.value !== '') {
         return (firstoperand.value =
            firstoperand.value.slice(0, -2) +
            `${operationSelected} `);
      }
      // if (calculated) {
      //    // calculated= !calculated
      //    return firstoperand.value += ` ${operationSelected} `;
      // }
      firstoperand.value = `${secondoperand.value}  ${operationSelected} `;
      secondoperand.value = '';
   });
});

clearFisrtOperandText.addEventListener(
   'click',
   () => (secondoperand.value = '')
);

allClear.addEventListener('click', () => {
   firstoperand.value = '';
   secondoperand.value = '';
});

clear.addEventListener('click', () => {
   secondoperand.value = secondoperand.value.toString().slice(0, -1);
   firstoperand.value = firstoperand.value.toString().slice(0, -1);
});

calculateBtn.addEventListener('click', SOLVE);

percentage.addEventListener('click', () => {
   secondoperand.value === ''
      ? ''
      : (secondoperand.value = secondoperand.value / 100)
      calculated = true;
});

squareroot.addEventListener('click', () => {
   secondoperand.value === ''
   ? ''
   : (secondoperand.value = Math.sqrt(secondoperand.value))
   calculated = true;
});

square.addEventListener('click', () => {
   secondoperand.value === ''
      ? ''
      : (secondoperand.value = Math.pow(secondoperand.value, 2))
      calculated = true;
});

oneDivideX.addEventListener('click', () => {
   secondoperand.value === ''
      ? ''
      : (secondoperand.value = 1 / secondoperand.value)
      calculated = true;
});
