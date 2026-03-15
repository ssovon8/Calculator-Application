let form = document.querySelector("form");
let display = document.querySelector("#display");
let buttons = document.querySelector(".buttons");

// Safe calculation function
function safeCalculate(expression) {
  try {
    if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
      throw new Error("Invalid Charecters");
    }

    let result = Function("return " + expression)();
    if (!Number.isInteger(result)) {
      result = result.toFixed(2);
    }
    return result;
  } catch (error) {
    return "Error";
  }
}

// Handling function for mouse click event
function handleInput(input) {
  if (input === "=") {
    display.value = safeCalculate(display.value);
  } else if (input === "AC") {
    display.value = "";
  } else if (input === "C") {
    display.value = display.value.slice(0, -1);
  } else {
    display.value += input;
  }
  display.focus();
}

// input validation
display.addEventListener("input", () => {
  display.value = display.value.replace(/[^0-9+\-*/%.() ]/g, "");
});

// mouse click
buttons.addEventListener("click", (evt) => {
  if (evt.target.tagName === "INPUT") {
    handleInput(evt.target.value);
  }
});

// // keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    display.value = safeCalculate(display.value);
  } else if (e.key === "Escape") {
    display.value = "";
  }
  display.focus();
});
