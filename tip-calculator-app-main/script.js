let billEl = document.getElementById('bill')
let peopleEl = document.getElementById('people')
const tipBtns = document.querySelectorAll('input[name=tip-btn]')
let customTipEl = document.querySelector('[data-tip-custom]')
const resetBtn = document.querySelector('[data-reset]')
let tipAmountEl = document.querySelector('[data-tip-amount]')
let totalEl = document.querySelector('[data-tip-total]')
let tipPercentage = 0;


const init = () => {
    if (billEl.value === '') return
    billEl.value = ''
    peopleEl.value = ''
    customTipEl.value = ''
    tipAmountEl.innerText = `$0.00`
    totalEl.innerText = `$0.00`
    tipPercentage = 0;
    for (const btn of tipBtns) {
        if (btn.checked == true) btn.checked = false    
    }
}

const calculate = (billAmount, tipPercentage) => {
    const totalPeople = parseInt(peopleEl.value || "1");
    const tipAmount = (tipPercentage / 100) * billAmount;
    const tipAmountPerPerson = tipAmount / totalPeople;
    const total = billAmount + tipAmount; 
    const totalPerPerson = total / totalPeople
    tipAmountEl.innerText = `$${tipAmountPerPerson.toFixed(2)}`
    totalEl.innerText = `$${totalPerPerson.toFixed(2)}`
}

const getBill = () => {
    return parseFloat(billEl.value || "0");
}

billEl.addEventListener('input', (e) => {
    resetBtn.classList.add('active')
    calculate(getBill(), tipPercentage);
})

tipBtns.forEach(btn => {
    btn.addEventListener("change", (e) => {
        tipPercentage = parseInt(e.currentTarget.value);
        calculate(getBill(), tipPercentage)
    })
})

peopleEl.addEventListener('input', (e) => {
    resetBtn.classList.add('active')
    calculate(getBill(), tipPercentage);
})

customTipEl.addEventListener('input', (e) => {
    tipPercentage = parseInt(e.currentTarget.value || "0")
    calculate(getBill(), tipPercentage)
})

resetBtn.addEventListener('click', () => {
    init()
    if (!resetBtn.classList.contains('active')) return
    resetBtn.classList.toggle('active')
})