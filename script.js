// Declaring variables
let numericBtn = document.querySelectorAll('[data-number]');
let operationBtn = document.querySelectorAll('[data-operation]');
let firstoperand = document.querySelector('[data-top]');
let secondoperand = document.querySelector('[data-buttom]');
let calculateBtn = document.querySelector('[data-calculate]');
let clearSecondOperandText = document.querySelector(
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
const SOLVE = () => {
   if (firstoperand.value == '' || secondoperand.value == '') return;
   let first = parseFloat(firstoperand.value.replace(/,/g, ''));
   let second = parseFloat(secondoperand.value.replace(/,/g, ''));
   switch (operationSelected) {
      case '+':
         secondoperand.value = (first + second).toLocaleString();
         break;
      case '-':
         secondoperand.value = (first - second).toLocaleString();
         break;
      case '/':
         secondoperand.value = (first / second).toLocaleString();
         break;
      case '*':
         secondoperand.value = (first * second).toLocaleString();
         break;
      default:
         return;
   }
   firstoperand.value = '';
   calculated = true;
};

// Adding Event listeners that will fire button click Events
numericBtn.forEach((button) => {
   button.addEventListener('click', () => {
      if (secondoperand.value.replace(/,/g, '').length === 16) return;
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
      secondoperand.value = parseInt(
         secondoperand.value.replace(/,/g, '')
      ).toLocaleString();
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
            firstoperand.value.slice(0, -2) + `${operationSelected} `);
      }
      firstoperand.value = `${secondoperand.value}  ${operationSelected} `;
      secondoperand.value = '';
   });
});

clearSecondOperandText.addEventListener(
   'click',
   () => (secondoperand.value = '')
);

allClear.addEventListener('click', () => {
   firstoperand.value = '';
   secondoperand.value = '';
});

clear.addEventListener('click', () => {
   if (secondoperand.value == '') return;
   if (secondoperand.value.slice(-2).includes(',')) {
      firstoperand.value = firstoperand.value.toString().slice(0, -1);
      return (secondoperand.value = secondoperand.value.slice(0, -2));
   }
   secondoperand.value = secondoperand.value.toString().slice(0, -1);
   firstoperand.value != ''
      ? (firstoperand.value = firstoperand.value.toString().slice(0, -1))
      : '';
});

calculateBtn.addEventListener('click', SOLVE);

percentage.addEventListener('click', () => {
   secondoperand.value === ''
      ? ''
      : (secondoperand.value = secondoperand.value / 100);
   calculated = true;
   firstoperand.value = '';
});

squareroot.addEventListener('click', () => {
   secondoperand.value === ''
      ? ''
      : (secondoperand.value = Math.sqrt(secondoperand.value));
   calculated = true;
   firstoperand.value = '';
});

square.addEventListener('click', () => {
   secondoperand.value === ''
      ? ''
      : (secondoperand.value = Math.pow(secondoperand.value, 2));
   calculated = true;
   firstoperand.value = '';
});

oneDivideX.addEventListener('click', () => {
   secondoperand.value === ''
      ? ''
      : (secondoperand.value = 1 / secondoperand.value);
   calculated = true;
   firstoperand.value = '';
});

window.addEventListener('keydown', (event) => {
   const numRegex = /^[0-9.]*$/;
   const operatorRegex = /^[-+/*]*$/;
   const keydown = event.key;

   if (numRegex.test(keydown)) {
      (() => {
         if (secondoperand.value.replace(/,/g, '').length === 16) return;
         // Checking for duplicate dot(.) in the secondoperand
         if (keydown == '.' && secondoperand.value.includes('.')) {
            return;
         }
         // Checking if a solve function has fired to clear the secondoperand
         if (calculated) {
            secondoperand.value = '';
            calculated = !calculated;
         }
         // Adding clicked button values to the secondoperand
         secondoperand.value += keydown;
         secondoperand.value = parseInt(
            secondoperand.value.replace(/,/g, '')
         ).toLocaleString();
         // secondoperand.value.length > 0 ? secondoperand.value = parseInt(secondoperand.value.replace(/,/g, '')).toLocaleString() : ''
         if (firstoperand.value !== '') {
            firstoperand.value += `${keydown}`;
         }
         // Popping out multiple zero as the first number on the secondoperand
         if (
            secondoperand.value.charAt() == '0' &&
            secondoperand.value[1] >= 0
         ) {
            secondoperand.value = secondoperand.value.slice(1);
         }
      })();
   }

   if (operatorRegex.test(keydown)) {
      (() => {
         if (secondoperand.value == '' && firstoperand.value == '') return;
         if (firstoperand.value != '' && secondoperand.value != '') {
            operationSelected = operationSelected;
            SOLVE();
         }
         operationSelected = keydown;
         if (firstoperand.value !== '') {
            return (firstoperand.value =
               firstoperand.value.slice(0, -2) + `${operationSelected} `);
         }
         firstoperand.value = `${secondoperand.value}  ${operationSelected} `;
         secondoperand.value = '';
      })();
   }

   if (keydown === 'Enter') {
      SOLVE();
   }

   if (keydown === 'Backspace') {
      if (secondoperand.value == '') return;
      secondoperand.value = secondoperand.value.toString().slice(0, -1);
      firstoperand.value = firstoperand.value.toString().slice(0, -1);
   }

   if (keydown === 'Delete') {
      firstoperand.value = '';
      secondoperand.value = '';
   }
});
