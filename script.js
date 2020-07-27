//some general functions for the calculator
const add = (a, b) => +a + +b;
const substract = (a, b) => +a - +b;
const multiply = (a, b) => +a * +b;
const divide = (a, b) => +a / +b;

const operate = (a, b, operator) => {
    let answer;
    if(b != undefined){
        answer = 
        operator == '+' ? add(a, b) :
        operator == '-' ? substract(a, b) :
        operator == 'x' ? multiply(a, b) :
        operator == '/' ? divide(a, b) : 
        "ERROR";
        return (Math.round(answer*100000))/100000;
    } else{
        return a == undefined ? 'ERROR' : a;
    }
    
}
let equation = {
    firstNum: undefined,
    secondNum: undefined,
    operator: undefined,
}
const display = document.getElementById('display-content');

//digit and operator buttons.
let digitBtns = [...document.querySelectorAll('.digit-btn')];
let operatorBtns = [...document.querySelectorAll('.operator-btn')];

digitBtns.forEach((item) => {
    item.addEventListener('click', (e) => {
        setDisplayContent(e.target.textContent, false, false);
    });
});
operatorBtns.forEach((item) => {
    item.addEventListener('click', (e) => {
        setDisplayContent(' ' + e.target.textContent + ' ', false, true)
    })
})

//event when the AC (clear) btn is clicked
document.getElementById('clear-btn').addEventListener('click', (e) => {
    setDisplayContent('', true);
    equation.firstNum = undefined;
    equation.secondNum = undefined;
    equation.operator = undefined;
});

//event when the equels btn is clicked
document.getElementById('equels-btn').addEventListener('click', (e) => {
    let result = operate(equation.firstNum, equation.secondNum, equation.operator);
    setDisplayContent(result, true);
});
document.getElementById('backspace-btn').addEventListener('click', (e) => {
    setDisplayContent('', false, false, true);
});

//function that changes the content of the display.
const setDisplayContent = (string, clear = false, operator = false, backspace = false) => {
    let operation = (display.innerHTML+string).split(' ');

    if(clear || display.innerHTML == 'ERROR' || display.innerHTML == 'Infinity' || display.innerHTML == 'NaN'){
        display.innerHTML = '';
    }

    //if the user clicks on backspace.
    if(backspace){
        let displayArray = display.innerHTML.split('');

        //if the last character is an operator (" + ")
        if(displayArray[displayArray.length -1] == " "){
            //remove the operator and whitespaces and set the operator to undefined.
            displayArray.splice(displayArray.length -3, 3);
            display.innerHTML = displayArray.join('');
            equation.operator = undefined;
            return;
        } else {
            //else remove only the last character.
            displayArray.splice(displayArray.length -1, 1);
            display.innerHTML = displayArray.join('');

            //if the display doenst include operators, change the first number.
            if(!includesOperators(display.innerHTML)){
                equation.firstNum = display.innerHTML;
                equation.secondNum = undefined;
            //else, change the second number. 
            } else {
                //make sure that the last number exists, otherwise set it to undefined.
                !(displayArray[displayArray.length -1] == " ") ? equation.secondNum = display.innerHTM.split(' ')[2] : equation.secondNum = undefined;
            }
            return;
            }
    }
    
    
    if(operator){
        if(includesOperators(display.innerHTML)){
            return;
        }
        equation.operator = string.trim();
    } else {
        if(!includesOperators(display.innerHTML)){
            if(includesDecimal(equation.firstNum) && string == '.'){
                return;
            }
            equation.firstNum = (display.innerHTML+string);
        } else {
            if(includesDecimal(equation.secondNum) && string == '.'){
                return;
            }
            equation.secondNum = operation[operation.length -1];
        }
    }
    console.log(equation);
    display.innerHTML += string;
}

const includesOperators = (string) => {
    if(string.includes(' / ') || string.includes(' x ') || string.includes(' - ') || string.includes(' + ')){
        return true;
    } else {
        return false;
    }
}
const includesDecimal = (string) => {
    if(string == undefined) return;
    if(string.includes('.')){
        return true;
    }else{
        return false;
    }
}