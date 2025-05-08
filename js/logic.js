
let financialData = {
    ages: [],
    savings: [],
    hysa: [],
    investments: [],
    totals: [],
};

function round(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100
}

function setValues() {
    
    financialData = {
        ages: [userData.age],
        savings: [userData.savings],
        hysa: [userData.hysa],
        investments: [userData.investments],
        totals: [userData.savings + userData.hysa + userData.investments]
    };

    for (let age = userData.age + 1, i=1; age <= userData.ageGraphEnd; age++, i++) {

        const netIncome = userData.income * (1 - (userData.taxRate * 0.01)) - (userData.annualExpenses + userData.monthlyExpenses * 12);
        const percentToInvest = 0.60;
        
        const newSavings = round(financialData.savings[i-1]);
        const newHysa = round(financialData.hysa[i-1] * (1 + userData.hysaRate * .01) + ((1 - percentToInvest) * netIncome));
        const newInvestments = round(financialData.investments[i-1] * (1 + userData.investmentsRate * .01) + (percentToInvest * netIncome));
        const newTotal = round(newSavings + newHysa + newInvestments);

        financialData.ages.push(age)
        financialData.savings.push(newSavings)
        financialData.hysa.push(newHysa)
        financialData.investments.push(newInvestments)
        financialData.totals.push(newTotal)
    }
    console.log(financialData);
}

// set the initial values for financialData
setValues();

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
