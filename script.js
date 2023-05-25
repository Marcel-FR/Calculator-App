let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseFloat(buffer.replace(",", ".")));
      previousOperator = null;
      buffer = runningTotal.toString().replace(".", ",");
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      if (previousOperator !== null) {
        flushOperation(parseFloat(buffer.replace(",", ".")));
        previousOperator = symbol;
        buffer = runningTotal.toString().replace(".", ",");
        runningTotal = 0;
      } else {
        previousOperator = symbol;
        runningTotal = parseFloat(buffer.replace(",", "."));
        buffer = "0";
      }
      break;
    case ",":
      handleComma();
      break;
  }
}

function handleComma() {
  if (buffer.includes(",")) {
    return;
  }

  buffer += ",";
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }

  const floatBuffer = parseFloat(buffer.replace(",", "."));

  if (runningTotal === 0) {
    runningTotal = floatBuffer;
  } else {
    flushOperation(floatBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  const floatBuffer = parseFloat(buffer.replace(",", "."));

  if (previousOperator === "+") {
    runningTotal += floatBuffer;
  } else if (previousOperator === "−") {
    runningTotal -= floatBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= floatBuffer;
  } else if (previousOperator === "÷") {
    runningTotal /= floatBuffer;
  }

  buffer = runningTotal.toString().replace(".", ",");
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
  
  screen.innerText = buffer.replace(".", ",");
}

function init() {
  document.querySelector(".calc-buttons").addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });
}

init();