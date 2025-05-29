
interface UserData {
    age: number;
    ageRetirement: number;
    ageGraphEnd: number;
    income: number;
    taxRate: number;
    monthlyExpenses: number;
    annualExpenses: number;
    cash: number;
    savings: number;
    savingsRate: number;
    investments: number;
    investmentsRate: number;
    withdrawalRate: number;
    assetMix: {
        cash: number;
        savings: number;
        investments: number;
    }
}

let userData: UserData = {
    age: 40,
    ageRetirement: 60,
    ageGraphEnd: 80,
    income: 75000,
    taxRate: 28,
    monthlyExpenses: 4000,
    annualExpenses: 8000,
    cash: 10000,
    savings: 20000,
    savingsRate: 3.5,
    investments: 50000,
    investmentsRate: 7,
    withdrawalRate: 4,
    assetMix: {
        cash: 0.125,
        savings: 0.25,
        investments: 0.625
    }
};

/**
 * Function removes non-numeric chars from string input (numbers and decimal pts remain)
 * @param inputString the input string
 * @returns a number as a string type (if blank, a "0" will be returned)
 */
function removeNonNumeric(inputString: string): string {
  let modifiedStr =  inputString.replace(/[^0-9.]/g, '');
  if (modifiedStr == "") modifiedStr = "0";
  //console.log(value);
  return modifiedStr
}

// DURATION Age Data inputs
const ageInput = document.getElementById('age-input') as HTMLInputElement;
userData.age = parseInt(ageInput.value);
ageInput.addEventListener('input', () => userData.age = parseInt(ageInput.value));

const retirementAgeInput = document.getElementById('retirement-age-input') as HTMLInputElement;
userData.ageRetirement = parseInt(retirementAgeInput.value);
retirementAgeInput.addEventListener('input', () => userData.ageRetirement = parseInt(retirementAgeInput.value));

const graphEndAgeInput = document.getElementById('graph-end-age-input') as HTMLInputElement;
userData.ageGraphEnd = parseInt(graphEndAgeInput.value);
graphEndAgeInput.addEventListener('input', () => userData.ageGraphEnd = parseInt(graphEndAgeInput.value));

// INCOME & EXPENSES
const incomeInput = document.getElementById('income-input') as HTMLInputElement;
userData.income = parseInt(removeNonNumeric(incomeInput.value));
incomeInput.addEventListener('input', () => {
    userData.income = parseInt(removeNonNumeric(incomeInput.value));
    incomeInput.value = (userData.income).toLocaleString();
});

const taxRateInput = document.getElementById('tax-rate-input') as HTMLInputElement;
const taxRateSliderOutput = document.getElementById('tax-rate-output') as HTMLOutputElement;
userData.taxRate = parseFloat(taxRateInput.value);
taxRateInput.addEventListener('input', () => {
    userData.taxRate = parseFloat(taxRateInput.value)
    taxRateSliderOutput.value = `${taxRateInput.value}%`
});

const monthlyExpensesInput = document.getElementById('monthly-expenses-input') as HTMLInputElement;
userData.monthlyExpenses = parseInt(removeNonNumeric(monthlyExpensesInput.value));
monthlyExpensesInput.addEventListener('input', () => {
    userData.monthlyExpenses = parseInt(removeNonNumeric(monthlyExpensesInput.value));
    monthlyExpensesInput.value = userData.monthlyExpenses.toLocaleString();
});

const annualExpensesInput = document.getElementById('annual-expenses-input') as HTMLInputElement;
userData.annualExpenses = parseInt(removeNonNumeric(annualExpensesInput.value));
annualExpensesInput.addEventListener('input', () => {
    userData.annualExpenses = parseInt(removeNonNumeric(annualExpensesInput.value))
    annualExpensesInput.value = userData.annualExpenses.toLocaleString();
});

// ASSETS
const cashInput = document.getElementById('cash-input') as HTMLInputElement;
userData.cash = parseInt(removeNonNumeric(cashInput.value));
cashInput.addEventListener('input', () => {
    userData.cash = parseInt(removeNonNumeric(cashInput.value));
    cashInput.value = userData.cash.toLocaleString();
});

const savingsInput = document.getElementById('savings-input') as HTMLInputElement;
userData.savings = parseInt(removeNonNumeric(savingsInput.value));
savingsInput.addEventListener('input', () => {
    userData.savings = parseInt(removeNonNumeric(savingsInput.value));
    savingsInput.value = userData.savings.toLocaleString();
});

const savingsRateInput = document.getElementById('savings-rate-input') as HTMLInputElement;
const savingsRateSliderOutput = document.getElementById('savings-rate-output') as HTMLOutputElement;
userData.savingsRate = parseFloat(savingsRateInput.value);
savingsRateInput.addEventListener('input', () => {
    userData.savingsRate = parseFloat(savingsRateInput.value)
    savingsRateSliderOutput.value = `${savingsRateInput.value}%` 
});

const investmentsInput = document.getElementById('investments-input') as HTMLInputElement;
userData.investments = parseInt(removeNonNumeric(investmentsInput.value));
investmentsInput.addEventListener('input', () => {
    userData.investments = parseInt(removeNonNumeric(investmentsInput.value));
    investmentsInput.value = userData.investments.toLocaleString();
});

const investmentsRateInput = document.getElementById('investments-rate-input') as HTMLInputElement;
const investmentsRateSliderOutput = document.getElementById('investments-rate-output') as HTMLOutputElement;
userData.investmentsRate = parseFloat(investmentsRateInput.value);
investmentsRateInput.addEventListener('input', () => {
    userData.investmentsRate = parseFloat(investmentsRateInput.value)
    investmentsRateSliderOutput.value = `${investmentsRateInput.value}%`
});

// controls the asset mix display
const cashPercent = document.getElementById("cash-percent") as HTMLOutputElement;
const savingsPercent = document.getElementById("savings-percent") as HTMLOutputElement;
const investmentPercent = document.getElementById("investment-percent") as HTMLOutputElement;

const entireForm = document.getElementById("input-form") as HTMLInputElement;
entireForm.addEventListener("input", () => {
    setAssetMix()
    cashPercent.value = `${round(1, userData.assetMix.cash * 100)}%`
    savingsPercent.value = `${round(1, userData.assetMix.savings * 100)}%`
    investmentPercent.value = `${round(1, userData.assetMix.investments * 100)}%`
})

// RETIREMENT SPENDING
const withdrawalRateInput = document.getElementById("withdrawal-rate-input") as HTMLInputElement;
userData.withdrawalRate = parseFloat(withdrawalRateInput.value);
withdrawalRateInput.addEventListener("input", ()=> userData.withdrawalRate = parseFloat(withdrawalRateInput.value));
const withdrawalRateRateOutput = document.getElementById('withdrawal-rate-output') as HTMLOutputElement;
withdrawalRateInput.addEventListener("input", () => withdrawalRateRateOutput.value = `${withdrawalRateInput.value}%`);

// FORM SUBMIT buttons
// controls behavior of clicking Calculate button
const calculateButton = document.getElementById('calculate') as HTMLButtonElement;
calculateButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(userData);
    refreshData();
});

// ---- Logic of app starts here (above relates to html form inputs) ----

/**
 * Rounds a number to N decimal places
 * @param N - number of decimal places
 * @param inputNumber - the number to round
 * @returns a number rounded to N decimal places
 */
function round(N: number, inputNumber: number): number {
    return Math.round((inputNumber + Number.EPSILON) * (10 ** N)) / (10 ** N)
}

/**
 * Sets the asset mix (cash / savings / investments) in userData.assetMix
 */
function setAssetMix(): void {
    let total = userData.cash + userData.savings + userData.investments;
    if (total > 0) {
        userData.assetMix = {
            cash: userData.cash / total,
            savings: userData.savings / total,
            investments: userData.investments / total,
        }
    } else userData.assetMix = {cash: 0, savings: 0, investments: 0}
}

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

/**
 * Calculates and sets the values for future year asset totals
 * that will be used to create the Chart graphic
 */
function setValues() {
    setAssetMix();
    // this sets the initial year values in each array
    financialData = {
        ages: [userData.age],
        cash: [userData.cash],
        savings: [userData.savings],
        investments: [userData.investments],
        totals: [userData.cash + userData.savings + userData.investments]
    };

    for (let age: number = userData.age + 1, i = 1; age <= userData.ageGraphEnd; age++, i++) {

        const netIncome = (userData.income * (1 - userData.taxRate * 0.01)) - (userData.annualExpenses + (userData.monthlyExpenses * 12));


        
        // This is a placeholder value
        const percentToInvest = 0.60;
        
        const newCash = round(2, financialData.cash[i-1]);
        const newSavings = round(2, financialData.savings[i-1] * (1 + userData.savingsRate * .01) + ((1 - percentToInvest) * netIncome));
        const newInvestments = round(2, financialData.investments[i-1] * (1 + userData.investmentsRate * .01) + (percentToInvest * netIncome));
        const newTotal = round(2, newCash + newSavings + newInvestments);

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

/**
 * to refresh the values and chart on Calculate button press
 */
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
