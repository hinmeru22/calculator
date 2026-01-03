const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operator-btn");
const decimalButton = document.querySelector(".decimal");

let firstOperand = "";
let secondOperand = "";
let operator = null;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by zero";
  }
  return a / b;
}

decimalButton.addEventListener("click", () => {
  if (operator === null) {
    if (firstOperand.includes(".")) return;
    firstOperand = firstOperand === "" ? "0." : firstOperand + ".";
    display.value = firstOperand;
  } else {
    if (secondOperand.includes(".")) return;
    secondOperand = secondOperand === "" ? "0." : secondOperand + ".";
    display.value = `${firstOperand} ${operator} ${secondOperand}`;
  }
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    display.classList.remove("error");

    if (operator === null) {
      firstOperand += button.textContent;
      display.value = firstOperand;
    } else {
      secondOperand += button.textContent;
      display.value = `${firstOperand} ${operator} ${secondOperand}`;
    }
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (operator !== null && secondOperand !== "") {
      firstOperand = operate(operator, firstOperand, secondOperand);
      display.value = firstOperand;
      operator = null;
      secondOperand = "";
    }

    operator = button.textContent;
    display.value = `${firstOperand} ${operator}`;
  });
});

function operate(op, a, b) {
  a = Number(a);
  b = Number(b);

  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function operateEquals() {
  if (operator && secondOperand) {
    const result = operate(operator, firstOperand, secondOperand);

    if (result === "Cannot divide by zero") {
      display.value = "Cannot divide by zero";
      display.classList.add("error");

      firstOperand = "";
      secondOperand = "";
      operator = null;
      return;
    }
    display.classList.remove("error");
    firstOperand = result;
    display.value = firstOperand;
    operator = null;
    secondOperand = "";
  }
}

function backspace() {
  if (secondOperand) {
    secondOperand = secondOperand.slice(0, -1);
  } else if (operator) {
    operator = null;
  } else {
    firstOperand = firstOperand.slice(0, -1);
  }
  display.value = `${firstOperand} ${operator ?? ""} ${secondOperand}`;
}

function clearDisplay() {
  display.value = "";
  display.classList.remove("error");

  firstOperand = "";
  secondOperand = "";
  operator = null;
}
