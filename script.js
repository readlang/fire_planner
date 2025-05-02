console.log("Hello, world!");



// Shows and outputs the tax range slider value in the output field
const taxRateInputSlider = document.getElementById('tax-rate-input');
const taxRateSliderOutput = document.getElementById('tax-rate-output');
taxRateInputSlider.addEventListener('input', function() {
    taxRateSliderOutput.value = `${taxRateInputSlider.value}%`;
});

// Shows and outputs the hysa range slider value in the output field
const hysaRateInputSlider = document.getElementById('hysa-rate-input');
const hysaRateSliderOutput = document.getElementById('hysa-rate-output');
hysaRateInputSlider.addEventListener('input', function() {
    hysaRateSliderOutput.value = `${hysaRateInputSlider.value}%`;
});

// Shows and outputs the Investments rate range slider value in the output field
const investmentsRateInputSlider = document.getElementById('investments-rate-input');
const investmentsRateSliderOutput = document.getElementById('investments-rate-output');
investmentsRateInputSlider.addEventListener('input', function() {
    investmentsRateSliderOutput.value = `${investmentsRateInputSlider.value}%`;
});


// start of chart.js code
const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        }
    }
});