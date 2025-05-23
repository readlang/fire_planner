
let financialData = {
    ages: [],
    cash: [],
    savings: [],
    investments: [],
    totals: [],
};

function roundTwo(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100
}

function roundOne(number) {
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

    for (let age = userData.age + 1, i=1; age <= userData.ageGraphEnd; age++, i++) {

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
const ctx = document.getElementById('myChart');
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
