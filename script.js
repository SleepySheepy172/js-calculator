var display = document.getElementById("display"); // input/output button
var number = document.querySelectorAll(".num"); // number buttons
var operator = document.querySelectorAll(".operator"); // operator buttons
var result = document.getElementById("equals"); // equal button
var clear = document.getElementById("clear"); // clear button
var del = document.getElementById("delete"); // delete button
var oppNum = false;
var resultDisplayed = false;

// loop through all buttons with class = num to add event listeners
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(e) {
        // remove original 0 in display
        if (display.innerHTML === "0") {
            display.innerHTML = "";
        }
        // add number to display
        // use oppNum to show last btn pressed was a number
        display.innerHTML += e.target.innerHTML;
        oppNum = false;
    });
}

// loop through all buttons with class = operator to add event listeners
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function(e) {
        // do nothing unless a number is pressed first
        if (display.innerHTML === "0") {
            console.log("Please input a number first");
        }
        // if last btn pressed was an operator, replace it
        else if (oppNum) {
            display.innerHTML =
                display.innerHTML.slice(0, -1) + e.target.innerHTML;
            oppNum = true;
            // check if number contains a decimal point before adding one
        } else if (e.target.innerHTML === ".") {
            var inputString = display.innerHTML.split(/(\+|\-|×|÷)/);
            if (/(\d*[.]\d*)/.test(inputString[inputString.length - 1])) {
                console.log("only one decimal point per number allowed");
            } else {
                display.innerHTML += e.target.innerHTML;
                oppNum = true;
            }
            // add operator to display
            // log that an operator was pressed last
        } else {
            display.innerHTML += e.target.innerHTML;
            oppNum = true;
        }
    });
}

// add event listener for "equal" button
equals.addEventListener("click", function() {
    var currentInput = display.innerHTML;
    check(currentInput);
});

// Add event listener to delete last character entered
del.addEventListener("click", function() {
    if (display.innerHTML === "0") {
        // do nothing
    } else if (display.innerHTML.length <= 1) {
        display.innerHTML = display.innerHTML.slice(0, -1);
        display.innerHTML = "0";
    } else {
        display.innerHTML = display.innerHTML.slice(0, -1);
    }
});

// clear input when clear element is clicked
clear.addEventListener("click", function() {
    display.innerHTML = "0";
});
