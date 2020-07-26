//some general functions for the calculator
const add = (a, b) => a+b;
const substract = (a, b) => a-b;
const multiply = (a, b) => a*b;
const divide = (a, b) => a/b;

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
})

//event when the equels btn is clicked
document.getElementById('equels-btn').addEventListener('click', (e) => {
    let result = operate(equation.firstNum, equation.secondNum, equation.operator);
    setDisplayContent(result, true);
})

//function that changes the content of the display.
const setDisplayContent = (string, clear = false, operator = false) => {
    const display = document.getElementById('display-content');
    if(clear || display.innerHTML == 'ERROR' || display.innerHTML == 'Infinity' || display.innerHTML == 'NaN'){
        display.innerHTML = '';
    }
    
    if(operator){
        if(includesOperators(display.innerHTML)){
            return;
        }
        equation.operator = string.trim();
    } else {
        if(!includesOperators(display.innerHTML)){
            equation.firstNum = +(display.innerHTML+string);
        } else {
            let operation = (display.innerHTML+string).split(' ');
            equation.secondNum = +operation[operation.length -1];
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