const requestsStats = document.querySelector('.requestsStats');
const errorsPercent = document.querySelector('.errorsPercent');
let requestsCounter = 1;
let errorsCounter = 0;

// get CPU data from JSON 
function getCpuData () {
    fetch('http://exercise.develop.maximaster.ru/service/cpu/')
    .then(response => {
        let data = response.json();
        return data;
    })
    .then(data => {
        if (data === 0) { errorsCounter++; }
        addData(data);
    })
    .catch(error =>  console.error(error));

    // stats
    let percent = Math.floor(100 * errorsCounter / requestsCounter);
    requestsStats.innerHTML = requestsCounter++;
    errorsPercent.innerHTML = `${percent}%`;
};

// work with chart.js library
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'CPU usage %',
            backgroundColor: ['rgba(76, 209, 55, 0.2)'],
            borderColor: 'lightgreen',
            borderWidth: 1
        }],
    }, options: {
        title: {
            display: true,
            text: 'CPU Monitor'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                }
            }],
            xAxes: [{
                display: false,
            }],
        },
    },
});

// update myChart
function addData(data) {
    myChart.data.labels.push(data);
    myChart.data.datasets.forEach((dataset) => {
        if(data === 0) {
            dataset.data.push(dataset.data[dataset.data.length - 1]);
        } else {
            dataset.data.push(data);
        };
    });
    myChart.update();
};

setInterval(getCpuData, 5000);