"use strict";
let userData = {
    age: 40,
    ageRetirement: 60,
    ageGraphEnd: 80,
    income: 80000,
    taxRate: 26,
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
function removeNonNumeric(inputString) {
    let modifiedStr = inputString.replace(/[^0-9.]/g, '');
    if (modifiedStr == "")
        modifiedStr = "0";
    //console.log(value);
    return modifiedStr;
}
// ---- HTML FORM input control starts here (app logic follows after) ----
// DURATION Age Data inputs
const ageInput = document.getElementById('age-input');
userData.age = parseInt(ageInput.value);
ageInput.addEventListener('input', () => userData.age = parseInt(ageInput.value));
const retirementAgeInput = document.getElementById('retirement-age-input');
userData.ageRetirement = parseInt(retirementAgeInput.value);
retirementAgeInput.addEventListener('input', () => userData.ageRetirement = parseInt(retirementAgeInput.value));
const graphEndAgeInput = document.getElementById('graph-end-age-input');
userData.ageGraphEnd = parseInt(graphEndAgeInput.value);
graphEndAgeInput.addEventListener('input', () => userData.ageGraphEnd = parseInt(graphEndAgeInput.value));
// INCOME & EXPENSES
const incomeInput = document.getElementById('income-input');
userData.income = parseInt(removeNonNumeric(incomeInput.value));
incomeInput.addEventListener('input', () => {
    userData.income = parseInt(removeNonNumeric(incomeInput.value));
    incomeInput.value = (userData.income).toLocaleString();
});
const taxRateInput = document.getElementById('tax-rate-input');
const taxRateSliderOutput = document.getElementById('tax-rate-output');
userData.taxRate = parseFloat(taxRateInput.value);
taxRateInput.addEventListener('input', () => {
    userData.taxRate = parseFloat(taxRateInput.value);
    taxRateSliderOutput.value = `${taxRateInput.value}%`;
});
const monthlyExpensesInput = document.getElementById('monthly-expenses-input');
userData.monthlyExpenses = parseInt(removeNonNumeric(monthlyExpensesInput.value));
monthlyExpensesInput.addEventListener('input', () => {
    userData.monthlyExpenses = parseInt(removeNonNumeric(monthlyExpensesInput.value));
    monthlyExpensesInput.value = userData.monthlyExpenses.toLocaleString();
});
const annualExpensesInput = document.getElementById('annual-expenses-input');
userData.annualExpenses = parseInt(removeNonNumeric(annualExpensesInput.value));
annualExpensesInput.addEventListener('input', () => {
    userData.annualExpenses = parseInt(removeNonNumeric(annualExpensesInput.value));
    annualExpensesInput.value = userData.annualExpenses.toLocaleString();
});
const netIncomeOutput = document.getElementById("net-income");
const entireForm = document.getElementById("input-form");
entireForm.addEventListener("input", () => {
    let netIncome = (userData.income * (1 - userData.taxRate * 0.01)) - (userData.annualExpenses + (userData.monthlyExpenses * 12));
    netIncomeOutput.value = ` $ ${netIncome.toLocaleString()}`;
    (netIncome < 0) ? netIncomeOutput.style.color = "red" : netIncomeOutput.style.color = "black";
});
// ASSETS
const cashInput = document.getElementById('cash-input');
userData.cash = parseInt(removeNonNumeric(cashInput.value));
cashInput.addEventListener('input', () => {
    userData.cash = parseInt(removeNonNumeric(cashInput.value));
    cashInput.value = userData.cash.toLocaleString();
});
const savingsInput = document.getElementById('savings-input');
userData.savings = parseInt(removeNonNumeric(savingsInput.value));
savingsInput.addEventListener('input', () => {
    userData.savings = parseInt(removeNonNumeric(savingsInput.value));
    savingsInput.value = userData.savings.toLocaleString();
});
const savingsRateInput = document.getElementById('savings-rate-input');
const savingsRateSliderOutput = document.getElementById('savings-rate-output');
userData.savingsRate = parseFloat(savingsRateInput.value);
savingsRateInput.addEventListener('input', () => {
    userData.savingsRate = parseFloat(savingsRateInput.value);
    savingsRateSliderOutput.value = `${savingsRateInput.value}%`;
});
const investmentsInput = document.getElementById('investments-input');
userData.investments = parseInt(removeNonNumeric(investmentsInput.value));
investmentsInput.addEventListener('input', () => {
    userData.investments = parseInt(removeNonNumeric(investmentsInput.value));
    investmentsInput.value = userData.investments.toLocaleString();
});
const investmentsRateInput = document.getElementById('investments-rate-input');
const investmentsRateSliderOutput = document.getElementById('investments-rate-output');
userData.investmentsRate = parseFloat(investmentsRateInput.value);
investmentsRateInput.addEventListener('input', () => {
    userData.investmentsRate = parseFloat(investmentsRateInput.value);
    investmentsRateSliderOutput.value = `${investmentsRateInput.value}%`;
});
// controls the asset mix display
const cashPercent = document.getElementById("cash-percent");
const savingsPercent = document.getElementById("savings-percent");
const investmentPercent = document.getElementById("investment-percent");
entireForm.addEventListener("input", () => {
    setAssetMix();
    cashPercent.value = `${round(1, userData.assetMix.cash * 100)}%`;
    savingsPercent.value = `${round(1, userData.assetMix.savings * 100)}%`;
    investmentPercent.value = `${round(1, userData.assetMix.investments * 100)}%`;
});
// RETIREMENT SPENDING
const withdrawalRateInput = document.getElementById("withdrawal-rate-input");
userData.withdrawalRate = parseFloat(withdrawalRateInput.value);
withdrawalRateInput.addEventListener("input", () => userData.withdrawalRate = parseFloat(withdrawalRateInput.value));
const withdrawalRateRateOutput = document.getElementById('withdrawal-rate-output');
withdrawalRateInput.addEventListener("input", () => withdrawalRateRateOutput.value = `${withdrawalRateInput.value}%`);
// FORM SUBMIT buttons
// controls behavior of clicking Calculate button
const calculateButton = document.getElementById('calculate');
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
function round(N, inputNumber) {
    return Math.round((inputNumber + Number.EPSILON) * (Math.pow(10, N))) / (Math.pow(10, N));
}
/**
 * Sets the asset mix (cash / savings / investments) in userData.assetMix
 */
function setAssetMix() {
    let total = userData.cash + userData.savings + userData.investments;
    if (total > 0) {
        userData.assetMix = {
            cash: userData.cash / total,
            savings: userData.savings / total,
            investments: userData.investments / total,
        };
    }
    else
        userData.assetMix = { cash: 0, savings: 0, investments: 0 };
}
let financialData = {
    ages: [],
    cash: [],
    savings: [],
    investments: [],
    totals: [],
    fireThreshold: [],
};
/**
 * Calculates and sets the values for future year asset totals
 * that will be used to create the Chart graphic
 */
function setValues() {
    setAssetMix();
    const fireThreshold = round(2, (userData.annualExpenses + userData.monthlyExpenses * 12) / (userData.withdrawalRate * .01));
    // this sets the initial year values in each array
    financialData = {
        ages: [userData.age],
        cash: [userData.cash],
        savings: [userData.savings],
        investments: [userData.investments],
        totals: [userData.cash + userData.savings + userData.investments],
        fireThreshold: [fireThreshold]
    };
    // this sets every subsequent year values (after the initial year) in the arrays
    for (let age = userData.age + 1, i = 1; age <= userData.ageGraphEnd; age++, i++) {
        let takeHomePay;
        if (age <= userData.ageRetirement) {
            takeHomePay = userData.income * (1 - userData.taxRate * 0.01); // aka after-tax income
        }
        else {
            takeHomePay = 0;
        }
        // netIncome aka income after expenses - will be negative after retirement
        const netIncome = takeHomePay - (userData.annualExpenses + (userData.monthlyExpenses * 12));
        const newTotal = round(2, financialData.cash[i - 1] * (1) +
            financialData.savings[i - 1] * (1 + userData.savingsRate * .01) +
            financialData.investments[i - 1] * (1 + userData.investmentsRate * .01) +
            netIncome);
        const newCash = round(2, (newTotal * userData.assetMix.cash));
        const newSavings = round(2, (newTotal * userData.assetMix.savings));
        const newInvestments = round(2, (newTotal * userData.assetMix.investments));
        financialData.ages.push(age);
        financialData.cash.push(newCash);
        financialData.savings.push(newSavings);
        financialData.investments.push(newInvestments);
        financialData.totals.push(newTotal);
        financialData.fireThreshold.push(fireThreshold);
    }
    console.log(financialData);
}
// set the initial values for financialData 
setValues();
/**
 * refresh the values and chart upon pressing Calculate button
 */
function refreshData() {
    setValues();
    chartGraphic.data.labels = financialData.ages;
    chartGraphic.data.datasets[0].data = financialData.cash;
    chartGraphic.data.datasets[1].data = financialData.savings;
    chartGraphic.data.datasets[2].data = financialData.investments;
    chartGraphic.data.datasets[3].data = financialData.totals;
    chartGraphic.data.datasets[4].data = financialData.fireThreshold;
    chartGraphic.update();
}
const ctx = document.getElementById('myChart');
if (!ctx)
    throw new Error("Chart element not found");
const footer = (tooltipItems) => {
    if (tooltipItems[3].raw) {
        console.log(tooltipItems[3].raw);
        let totalAnnualExpenses = userData.annualExpenses + (userData.monthlyExpenses * 12);
        if ((tooltipItems[3].raw * (userData.withdrawalRate * 0.01)) > totalAnnualExpenses)
            return 'FIRED';
        else
            return 'not FIRED';
    }
    else {
        return 'Error';
    }
};
const chartGraphic = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: financialData.ages,
        datasets: [
            {
                label: 'Cash',
                data: financialData.cash,
                stack: 'Stack 1'
            },
            {
                label: 'Savings',
                data: financialData.savings,
                stack: 'Stack 1'
            },
            {
                label: 'Investments',
                data: financialData.investments,
                stack: 'Stack 1'
            },
            {
                label: 'Total Assets',
                data: financialData.totals,
                stack: 'Stack 2',
                type: "line"
            },
            {
                label: 'Fire Threshold',
                data: financialData.fireThreshold,
                type: "line",
                // borderDash: [5,3],
                pointStyle: false,
                borderWidth: 1,
            }
        ]
    },
    options: {
        scales: {
            x: { stacked: true },
            y: {
                stacked: true,
                beginAtZero: true,
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
        plugins: {
            tooltip: {
                callbacks: {
                    footer: footer,
                }
            }
        }
    }
});
