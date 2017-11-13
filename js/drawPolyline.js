$(function () {
    var canvas = $("#line-chart")[0];
    if (!canvas) {
        alert('Error: Cannot find the canvas element!');
        return;
    }
    if (!canvas.getContext) {
        alert('Error: Canvas context does not exist!');
        return;
    }
    var year = yearAODs.year;
    var AOD = yearAODs.AOD;
    window.myLine = new Chart(canvas, {
        type: "line",
        data: {
            labels: year,
            datasets: [{
                data: AOD,
                label: "China",
                borderColor: "#3e95cd",
                lineTension: 0,
                fill: false
            }]
        }, options: {
            title: {
                display: true,
                text: "气溶胶光学厚度年际变化"
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }
        }
    });

})