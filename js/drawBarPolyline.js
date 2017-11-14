$(function () {
    // 选择站点方式的radio绑定click事件，
    // 对应下方是显示名称还是经纬度输入
    var radioName=$("#radioName");
    var radioCoordinate=$("#radioCoordinate");
    radioName.click(function(){
        $("#siteNameInput").show();
        $("#siteCoorInput").hide();
    });
    radioCoordinate.click(function(){
        $("#siteNameInput").hide();
        $("#siteCoorInput").show();
    });
// 站点名称输入框的button事件，将选择的站点名称显示在input输入框里
var dropdownSite=$("#sites-dropdown>a");
var inputSite=$("#input-site");
dropdownSite.click(function(){
    var text=$(this).text();
    inputSite.val(text);

})
//画图事件，柱状图or折线图
    var barBtn=$("#bar-btn");
    var bar = $("#bar")[0];
    var line = $("#line");
    barBtn.click(function () {
        if (bar.checked) {
            $("#bar-chart").show();
            plotBar();            
            $("#line-chart").hide();
        } else{
            $("#line-chart").show();
            drawPolyline();
            $("#bar-chart").hide();
        }

    });

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

function drawPolyline() {
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
}