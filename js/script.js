let userData = {}

const ageInput = document.getElementById('age-input');
userData.age = parseInt(ageInput.value);
ageInput.addEventListener('input', () => userData.age = parseInt(ageInput.value));

const retirementAgeInput = document.getElementById('retirement-age-input');
userData.ageRetirement = parseInt(retirementAgeInput.value);
retirementAgeInput.addEventListener('input', () => userData.ageRetirement = parseInt(retirementAgeInput.value));

const graphEndAgeInput = document.getElementById('graph-end-age-input');
userData.ageGraphEnd = parseInt(graphEndAgeInput.value);
graphEndAgeInput.addEventListener('input', () => userData.ageGraphEnd = parseInt(graphEndAgeInput.value));

const incomeInput = document.getElementById('income-input');
userData.income = parseInt(incomeInput.value);
incomeInput.addEventListener('input', () => userData.income = parseInt(incomeInput.value));

const taxRateInput = document.getElementById('tax-rate-input');
userData.taxRate = parseFloat(taxRateInput.value);
taxRateInput.addEventListener('input', () => userData.taxRate = parseFloat(taxRateInput.value));

const monthlyExpensesInput = document.getElementById('monthly-expenses-input');
userData.monthlyExpenses = parseInt(monthlyExpensesInput.value);
monthlyExpensesInput.addEventListener('input', () => userData.monthlyExpenses = parseInt(monthlyExpensesInput.value));

const annualExpensesInput = document.getElementById('annual-expenses-input');
userData.annualExpenses = parseInt(annualExpensesInput.value);
annualExpensesInput.addEventListener('input', () => userData.annualExpenses = parseInt(annualExpensesInput.value));

const savingsInput = document.getElementById('savings-input');
userData.savings = parseInt(savingsInput.value);
savingsInput.addEventListener('input', () => userData.savings = parseInt(savingsInput.value));

const hysaInput = document.getElementById('hysa-input');
userData.hysa = parseInt(hysaInput.value);
hysaInput.addEventListener('input', () => userData.hysa = parseInt(hysaInput.value));

const hysaRateInput = document.getElementById('hysa-rate-input');
userData.hysaRate = parseFloat(hysaRateInput.value);
hysaRateInput.addEventListener('input', () => userData.hysaRate = parseFloat(hysaRateInput.value));

const investmentsInput = document.getElementById('investments-input');
userData.investments = parseInt(investmentsInput.value);
investmentsInput.addEventListener('input', () => userData.investments = parseInt(investmentsInput.value));

const investmentsRateInput = document.getElementById('investments-rate-input');
userData.investmentsRate = parseFloat(investmentsRateInput.value);
investmentsRateInput.addEventListener('input', () => userData.investmentsRate = parseFloat(investmentsRateInput.value));

// Shows and outputs the tax range slider value in the output field
const taxRateSliderOutput = document.getElementById('tax-rate-output');
taxRateInput.addEventListener('input', () => taxRateSliderOutput.value = `${taxRateInput.value}%`);

// Shows and outputs the hysa range slider value in the output field
const hysaRateSliderOutput = document.getElementById('hysa-rate-output');
hysaRateInput.addEventListener('input', () => hysaRateSliderOutput.value = `${hysaRateInput.value}%` );

// Shows and outputs the Investments rate range slider value in the output field
const investmentsRateSliderOutput = document.getElementById('investments-rate-output');
investmentsRateInput.addEventListener('input', () => investmentsRateSliderOutput.value = `${investmentsRateInput.value}%`);

// controls behavior of clicking Calculate button
const calculateButton = document.getElementById('calculate');
calculateButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(userData);
    refreshData();
});



