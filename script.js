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
        // remove original 0 in display and replace
        // replace a result with current number
        if (
            display.innerHTML === "0" ||
            (resultDisplayed === true && oppNum === false)
        ) {
            display.innerHTML = "";
        }
        // add number to display
        // use oppNum to show last btn pressed was a number
        display.innerHTML += e.target.innerHTML;
        oppNum = false;
        resultDisplayed = false;
        check();
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
result.addEventListener("click", function() {
    var currentInput = display.innerHTML.replace(/×/g, "*").replace(/÷/g, "/");
    display.innerHTML = eval(currentInput);
    // apparently eval() has major security issues
    // TODO: create own similar function from scratch
    resultDisplayed = true;
    console.log(currentInput);
    check();
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
    resultDisplayed = false;
    check();
});

// TODO: fix bug with delete btn and oppNum switch
// if you delete "5" from "5+5" oppNum stays as false
// allowing double operators

// clear input when clear element is clicked
clear.addEventListener("click", function() {
    display.innerHTML = "0";
    resultDisplayed = false;
    check();
});

function check() {
    console.log(display.innerHTML);
    console.log(oppNum);
    console.log(resultDisplayed);
}
