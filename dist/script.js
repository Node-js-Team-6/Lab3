$(document).ready(function () {

    // VARIABLES
    const calc = $('.calculator');
    const calcDisplay = calc.find('.calculator__display');
    const calcKeys = calc.find('.calculator__key');
    const calcButton = calc.find('.calculator__button');
    const calcClear = calc.find('.calculator__clear');
    const calcEqual = calc.find('.calculator__key--equal');
    const calcPower = calc.find('.calculator__power');
    const calcBackSpace = calc.find('.calculator__backspace');

    // INIT CALC KEYS
    calcKeys.each(function () {
        let current = $(this).attr('value');
        $(this).text(current);
    });

    // ADD NUMBERS TO INPUT
    calcButton.on('click', function () {
        calcDisplay.val( calcDisplay.val() + $(this).attr('value') );
    });

    // CLEAR INPUT
    calcClear.on('click', function () {
        calcDisplay.val('');
    });

    // SHOW RESULT
    calcEqual.on('click', function () {
        calcDisplay.val( eval( calcDisplay.val() ) );
    });

    // POWER BUTTON
    calcPower.on('click', function () {
        calcDisplay.val( Math.pow( calcDisplay.val(), 3 ) );
    });

    // BACKSPACE BUTTON
    calcBackSpace.on('click', function () {
        calcDisplay.val( calcDisplay.val().substring(0, calcDisplay.val().length-1) );
    });

});