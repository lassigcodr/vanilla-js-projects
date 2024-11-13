const equationEl = document.querySelector('.display-operation');
const resultEl = document.querySelector('.display-result');
const buttons = document.querySelector('.buttons');

// Function to set theme based on selection
function setTheme(theme) {
    document.documentElement.className = theme; // Apply theme to <html> element
    localStorage.setItem('theme', theme); // Save to localStorage
}
  
// Event listener for theme selection
document.querySelectorAll('input[name="theme"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
        setTheme(event.target.id); // Pass the ID of the selected radio button (theme)
    });
});

// Load the saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.getElementById(savedTheme).checked = true; // Check the saved theme radio button
        setTheme(savedTheme); // Apply the saved theme
    }
});
  


const calculate = function(equation) {
    try {
        const operators = /[+\-*/]/;
        let cleanEquation = equation.replace('x', '*');
        let index = cleanEquation.match(operators).index;
        switch(cleanEquation.at(-1)) {
            case '+':
            case '-':
            case '*':
            case '/':
                cleanEquation = cleanEquation.slice(0, -1);
                break;
        }
        const res = eval(cleanEquation);
        if(cleanEquation[index + 1]) return res.toLocaleString();
    } catch(err) {
        return;
    }
}

buttons.addEventListener('click', (e) => {
    const number = e.target.closest('.btn-num');
    const sign = e.target.closest('.btn-sign');
    const del = e.target.closest('#delete');
    const reset = e.target.closest('#clear-all');
    const equalTo = e.target.closest('#equal-to');
    
    switch(e.target) {
        case number:
            equationEl.textContent += number.dataset.num;
            resultEl.textContent = calculate(equationEl.textContent);
            break
        case sign:
            switch(equationEl.textContent.at(-1)) {
                case '+':
                case '-':
                case 'x':
                case '/':
                    equationEl.textContent = equationEl.textContent.slice(0, -1);
            }
            equationEl.textContent += sign.textContent;
            resultEl.textContent = calculate(equationEl.textContent);
            break
        case del:
            equationEl.textContent = equationEl.textContent.slice(0, -1);
            resultEl.textContent = calculate(equationEl.textContent);
            break
        case reset:
            equationEl.textContent = '';
            resultEl.textContent = '';
            break
        case equalTo:
            equationEl.textContent = calculate(equationEl.textContent);
            resultEl.textContent = '';
            break
        default:
            return;
    }
})
