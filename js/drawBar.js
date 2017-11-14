$(function () {
    var bar = $("#bar");
    if (bar.checked) {
        plotBar();

    } else {
        return;
    }


})

function plotBar() {
    var canvas = $("#bar-chart")[0];
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
        type: "bar",
        data: {
            labels: year,
            datasets: [{
                data: AOD,
                label: "China",
                backgroundColor: "#3e95cd"
            }]
        },
        options: {
            legend: {
                display: true
            },
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

}