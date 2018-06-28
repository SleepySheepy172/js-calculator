var display = document.getElementById("display"); // input/output button
var number = document.querySelectorAll(".num"); // number buttons
var operator = document.querySelectorAll(".operator"); // operator buttons
var result = document.getElementById("equals"); // equal button
var clear = document.getElementById("clear"); // clear button
var oppNum = false;
var resultDisplayed = false;

// loop through all buttons with class = num to add event listeners
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(e) {
        // remove original 0 in display
        if (display.innerHTML === "0") {
            display.innerHTML = "";
        }
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
            // add a check to see if numbers contain more than one decimal point
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

// clear input when clear element is clicked
clear.addEventListener("click", function() {
    display.innerHTML = "0";
});
