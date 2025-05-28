// TS Experimental File

// -script-

let userData = {
    "age": 41,
    "ageRetirement": 60,
    "ageGraphEnd": 50,
    "income": 75000,
    "taxRate": 28,
    "monthlyExpenses": 4000,
    "annualExpenses": 8000,
    "cash": 10000,
    "savings": 20000,
    "savingsRate": 3.5,
    "investments": 50000,
    "investmentsRate": 7,
    "withdrawalRate": 4,
    "assetMix": {
        "cash": 0.125,
        "savings": 0.25,
        "investments": 0.625
    }
};



// Duration Age Data
const ageInput = document.getElementById('age-input') as HTMLInputElement;
userData.age = parseInt(ageInput.value);
ageInput.addEventListener('input', () => userData.age = parseInt(ageInput.value));

const retirementAgeInput = document.getElementById('retirement-age-input') as HTMLInputElement;
userData.ageRetirement = parseInt(retirementAgeInput.value);
retirementAgeInput.addEventListener('input', () => userData.ageRetirement = parseInt(retirementAgeInput.value));

const graphEndAgeInput = document.getElementById('graph-end-age-input') as HTMLInputElement;
userData.ageGraphEnd = parseInt(graphEndAgeInput.value);
graphEndAgeInput.addEventListener('input', () => userData.ageGraphEnd = parseInt(graphEndAgeInput.value));

// Income & Expenses
const incomeInput = document.getElementById('income-input') as HTMLInputElement;
userData.income = parseInt(incomeInput.value);
incomeInput.addEventListener('input', () => userData.income = parseInt(incomeInput.value));





const taxRateInput = document.getElementById('tax-rate-input') as HTMLInputElement;
userData.taxRate = parseFloat(taxRateInput.value);
taxRateInput.addEventListener('input', () => userData.taxRate = parseFloat(taxRateInput.value));

const monthlyExpensesInput = document.getElementById('monthly-expenses-input') as HTMLInputElement;
userData.monthlyExpenses = parseInt(monthlyExpensesInput.value);
monthlyExpensesInput.addEventListener('input', () => userData.monthlyExpenses = parseInt(monthlyExpensesInput.value));

const annualExpensesInput = document.getElementById('annual-expenses-input') as HTMLInputElement;
userData.annualExpenses = parseInt(annualExpensesInput.value);
annualExpensesInput.addEventListener('input', () => userData.annualExpenses = parseInt(annualExpensesInput.value));

// Assets
const cashInput = document.getElementById('cash-input') as HTMLInputElement;
userData.cash = parseInt(cashInput.value);
cashInput.addEventListener('input', () => userData.cash = parseInt(cashInput.value));

const savingsInput = document.getElementById('savings-input') as HTMLInputElement;
userData.savings = parseInt(savingsInput.value);
savingsInput.addEventListener('input', () => userData.savings = parseInt(savingsInput.value));

const savingsRateInput = document.getElementById('savings-rate-input') as HTMLInputElement;
userData.savingsRate = parseFloat(savingsRateInput.value);
savingsRateInput.addEventListener('input', () => userData.savingsRate = parseFloat(savingsRateInput.value));

const investmentsInput = document.getElementById('investments-input') as HTMLInputElement;
userData.investments = parseInt(investmentsInput.value);
investmentsInput.addEventListener('input', () => userData.investments = parseInt(investmentsInput.value));

const investmentsRateInput = document.getElementById('investments-rate-input') as HTMLInputElement;
userData.investmentsRate = parseFloat(investmentsRateInput.value);
investmentsRateInput.addEventListener('input', () => userData.investmentsRate = parseFloat(investmentsRateInput.value));

// controls the asset mix display
const cashPercent = document.getElementById("cash-percent") as HTMLOutputElement;
const savingsPercent = document.getElementById("savings-percent") as HTMLOutputElement;
const investmentPercent = document.getElementById("investment-percent") as HTMLOutputElement;

const entireForm = document.getElementById("input-form") as HTMLInputElement;
entireForm.addEventListener("click", () => {
    setMix()
    cashPercent.value = `${roundOne(userData.assetMix.cash * 100)}%`
    savingsPercent.value = `${roundOne(userData.assetMix.savings * 100)}%`
    investmentPercent.value = `${roundOne(userData.assetMix.investments * 100)}%`
})

// Retirement Spending
const withdrawalRateInput = document.getElementById("withdrawal-rate-input") as HTMLInputElement;
userData.withdrawalRate = parseFloat(withdrawalRateInput.value);
withdrawalRateInput.addEventListener("input", ()=> userData.withdrawalRate = parseFloat(withdrawalRateInput.value));

const withdrawalRateRateOutput = document.getElementById('withdrawal-rate-output') as HTMLOutputElement;
withdrawalRateInput.addEventListener("input", () => withdrawalRateRateOutput.value = `${withdrawalRateInput.value}%`);

// Shows and outputs the tax range slider value in the output field
const taxRateSliderOutput = document.getElementById('tax-rate-output') as HTMLOutputElement;
taxRateInput.addEventListener('input', () => taxRateSliderOutput.value = `${taxRateInput.value}%`);

// Shows and outputs the savings range slider value in the output field
const savingsRateSliderOutput = document.getElementById('savings-rate-output') as HTMLOutputElement;
savingsRateInput.addEventListener('input', () => savingsRateSliderOutput.value = `${savingsRateInput.value}%` );

// Shows and outputs the Investments rate range slider value in the output field
const investmentsRateSliderOutput = document.getElementById('investments-rate-output') as HTMLOutputElement;
investmentsRateInput.addEventListener('input', () => investmentsRateSliderOutput.value = `${investmentsRateInput.value}%`);

// controls behavior of clicking Calculate button
const calculateButton = document.getElementById('calculate') as HTMLButtonElement;
calculateButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(userData);
    refreshData();
});



console.log(userData)

// - logic.js -

interface FinancialData {
    ages: number[];
    cash: number[];
    savings: number[];
    investments: number[];
    totals: number[];
}

let financialData: FinancialData = {
    ages: [],
    cash: [],
    savings: [],
    investments: [],
    totals: [],
};

function roundTwo(number: number): number {
    return Math.round((number + Number.EPSILON) * 100) / 100
}

function roundOne(number: number): number {
    return Math.round((number + Number.EPSILON) * 10) / 10
}


function setMix() {
    let total = userData.cash + userData.savings + userData.investments;
    if (total > 0) {
        userData.assetMix = {
            cash: userData.cash / total,
            savings: userData.savings / total,
            investments: userData.investments / total,
        }
    } else userData.assetMix = {cash: 0, savings: 0, investments: 0}
}

function setValues() {
    financialData = {
        ages: [userData.age],
        cash: [userData.cash],
        savings: [userData.savings],
        investments: [userData.investments],
        totals: [userData.cash + userData.savings + userData.investments]
    };

    for (let age: number = userData.age + 1, i=1; age <= userData.ageGraphEnd; age++, i++) {

        const netIncome = userData.income * (1 - (userData.taxRate * 0.01)) - (userData.annualExpenses + userData.monthlyExpenses * 12);
        // This is a placeholder value
        const percentToInvest = 0.60;
        
        const newCash = roundTwo(financialData.cash[i-1]);
        const newSavings = roundTwo(financialData.savings[i-1] * (1 + userData.savingsRate * .01) + ((1 - percentToInvest) * netIncome));
        const newInvestments = roundTwo(financialData.investments[i-1] * (1 + userData.investmentsRate * .01) + (percentToInvest * netIncome));
        const newTotal = roundTwo(newCash + newSavings + newInvestments);

        financialData.ages.push(age)
        financialData.cash.push(newCash)
        financialData.savings.push(newSavings)
        financialData.investments.push(newInvestments)
        financialData.totals.push(newTotal)
    }
    console.log(financialData);
}

// set the initial values for financialData
setValues();
setMix();

// to refresh the values and chart on Calculate button press
function refreshData() {
    setValues();
    chartGraphic.data.labels = financialData.ages;
    chartGraphic.data.datasets[0].data = financialData.totals;
    chartGraphic.update();
}

// Chartjs graphic
declare const Chart: any;

const ctx = document.getElementById('myChart') as HTMLCanvasElement;
if (!ctx) throw new Error("Chart element not found");

const chartGraphic = new Chart(ctx, {
    type: 'line',
    data: {
        labels: financialData.ages,
        datasets: [
            {
                label: 'Total Assets',
                data: financialData.totals,
                borderWidth: 1
            },
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
