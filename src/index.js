import './main.scss';

let runningTotal = 0;
let buffer = "0";
let previousOperator;
let isResult = false;

const prikaz = document.querySelector(".interface");

const btnclick = (value) => {
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    prikaz.innerText = buffer;
    isResult = true;
}

const handleSymbol = (symbol) => {
    switch(symbol) {
        case 'C':
            buffer = '0'
            runningTotal = 0;
            isResult = false;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (!isResult){
                console.log("Break");
                break;
            }
            else if(buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
            handleMath(symbol);
            break;
        case '−':
            handleMath(symbol);
            break;
        case '×':
            handleMath(symbol);
            break;
        case '÷':
            handleMath(symbol);
            break;
    }
}

const handleMath = (symbol) => {
    if (buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

const flushOperation = (intBuffer) => {
    if (previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer;
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

const handleNumber = (numberString) => {
    if (buffer === "0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

const init= () => {
    document.querySelector('.calc-buttons').addEventListener("click", btnEvent);
}

const btnEvent = (e) => {
    const btnSymbol = e.target.innerText;
    btnclick(btnSymbol);
}

init()