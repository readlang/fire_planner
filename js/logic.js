
let ud = {
    "age": 41,
    "ageRetirement": 60,
    "ageGraphEnd": 50,
    "income": 75000,
    "taxRate": 28,
    "monthlyExpenses": 4000,
    "annualExpenses": 8000,
    "savings": 10000,
    "hysa": 20000,
    "hysaRate": 3.5,
    "investments": 50000,
    "investmentsRate": 7
}



let ageYears;
let financialTotals;

function setValues() {
    ageYears = [];
    financialTotals = [];
        
    for (let i = userData.age; i <= userData.ageGraphEnd; i++) {
        ageYears.push(i);
    }
    // console.log(ageYears);

    const startingTotal = userData.savings + userData.hysa + userData.investments;
    financialTotals.push(startingTotal);

    for (let i = userData.age; i < userData.ageGraphEnd; i++) {
        financialTotals.push(
            financialTotals[financialTotals.length - 1] 
            + userData.income * (1 - userData.taxRate * .01) 
            - (userData.annualExpenses + userData.monthlyExpenses * 12) 
        )
    }
    console.log(financialTotals);
}

function refreshData() {
    setValues();
    chartGraphic.data.labels = ageYears;
    chartGraphic.data.datasets[0].data = financialTotals;
    chartGraphic.update();
    console.log(chartGraphic);
}
    

setValues();


// Chartjs graphic
const ctx = document.getElementById('myChart');
const chartGraphic = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ageYears,
        datasets: [
            {
                label: 'Total Assets',
                data: financialTotals,
                borderWidth: 1
            },
            // {
            //     label: 'second dataset',
            //     data: [2, 3, 5, 12, 19, 3],
            //     borderWidth: 2
            // }
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
