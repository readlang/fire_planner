let userData = {}

// Duration Age Data
const ageInput = document.getElementById('age-input');
userData.age = parseInt(ageInput.value);
ageInput.addEventListener('input', () => userData.age = parseInt(ageInput.value));

const retirementAgeInput = document.getElementById('retirement-age-input');
userData.ageRetirement = parseInt(retirementAgeInput.value);
retirementAgeInput.addEventListener('input', () => userData.ageRetirement = parseInt(retirementAgeInput.value));

const graphEndAgeInput = document.getElementById('graph-end-age-input');
userData.ageGraphEnd = parseInt(graphEndAgeInput.value);
graphEndAgeInput.addEventListener('input', () => userData.ageGraphEnd = parseInt(graphEndAgeInput.value));

// Income & Expenses
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

// Assets
const cashInput = document.getElementById('cash-input');
userData.cash = parseInt(cashInput.value);
cashInput.addEventListener('input', () => userData.cash = parseInt(cashInput.value));

const savingsInput = document.getElementById('savings-input');
userData.savings = parseInt(savingsInput.value);
savingsInput.addEventListener('input', () => userData.savings = parseInt(savingsInput.value));

const savingsRateInput = document.getElementById('savings-rate-input');
userData.savingsRate = parseFloat(savingsRateInput.value);
savingsRateInput.addEventListener('input', () => userData.savingsRate = parseFloat(savingsRateInput.value));

const investmentsInput = document.getElementById('investments-input');
userData.investments = parseInt(investmentsInput.value);
investmentsInput.addEventListener('input', () => userData.investments = parseInt(investmentsInput.value));

const investmentsRateInput = document.getElementById('investments-rate-input');
userData.investmentsRate = parseFloat(investmentsRateInput.value);
investmentsRateInput.addEventListener('input', () => userData.investmentsRate = parseFloat(investmentsRateInput.value));

// controls the asset mix display
const cashPercent = document.getElementById("cash-percent");
const savingsPercent = document.getElementById("savings-percent");
const investmentPercent = document.getElementById("investment-percent");

document.getElementById("input-form").addEventListener("click", () => {
    setMix()
    cashPercent.value = `${roundOne(userData.assetMix.cash * 100)}%`
    savingsPercent.value = `${roundOne(userData.assetMix.savings * 100)}%`
    investmentPercent.value = `${roundOne(userData.assetMix.investments * 100)}%`
})

// Retirement Spending
const withdrawalRateInput = document.getElementById("withdrawal-rate-input");
userData.withdrawalRate = parseFloat(withdrawalRateInput.value);
withdrawalRateInput.addEventListener("input", ()=> userData.withdrawalRate = parseFloat(withdrawalRateInput.value));

const withdrawalRateRateOutput = document.getElementById('withdrawal-rate-output');
withdrawalRateInput.addEventListener("input", () => withdrawalRateRateOutput.value = `${withdrawalRateInput.value}%`);

// Shows and outputs the tax range slider value in the output field
const taxRateSliderOutput = document.getElementById('tax-rate-output');
taxRateInput.addEventListener('input', () => taxRateSliderOutput.value = `${taxRateInput.value}%`);

// Shows and outputs the savings range slider value in the output field
const savingsRateSliderOutput = document.getElementById('savings-rate-output');
savingsRateInput.addEventListener('input', () => savingsRateSliderOutput.value = `${savingsRateInput.value}%` );

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



console.log(userData)