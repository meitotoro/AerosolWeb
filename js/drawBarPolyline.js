$(function () {
    var lon = "";
    var lat = "";
    var starTime = "";
    var endTime = "";
    // 选择站点方式的radio绑定click事件，
    // 对应下方是显示名称还是经纬度输入
    var radioName = $("#radioName");
    var radioCoordinate = $("#radioCoordinate");
    radioName.click(function () {
        $("#siteNameInput").show();
        $("#siteCoorInput").hide();
    });
    radioCoordinate.click(function () {
        $("#siteNameInput").hide();
        $("#siteCoorInput").show();
    });
    // 站点名称输入框的button事件，将选择的站点名称显示在input输入框里

    var dropdownSite = $("#sites-dropdown>a");
    var inputSite = $("#input-site");
    var siteName = "";

    dropdownSite.click(function () {
        siteName = $(this).text();
        lon = findSiteCoor(siteName)[0];
        lat = findSiteCoor(siteName)[1];
        inputSite.val(siteName);

    })
    //画图事件，柱状图or折线图
    var barBtn = $("#bar-btn");
    var bar = $("#bar")[0];
    var line = $("#line");
    var inputLon = $("#inputLon");
    var inputLat = $("#inputLat");



    barBtn.click(function () {
        //站点经纬度输入框，在确定按钮点击事件中赋值经纬度信息
        if (radioCoordinate.checked) {
            lon = inputLon.text();
            lat = inputLat.text();
        }
        starTime = $("#startTime").val();
        endTime = $("#endTime").val();
        //发送http请求
        var path = "http://192.168.1.127:9000/aod";
        var responseData = "";
        var year = new Array();
        var AOD = new Array();
        jQuery.get(path, {
            lon: lon,
            lat: lat,
            start_time: starTime,
            end_time: endTime
        }, function (data, textStatus) {
            responseData = data.data;
            var yearData = new Array();
            var monthData = new Array();
            var aodData = new Array();
            for (var i = 0; i < responseData.length; i++) {
                yearData[i] = responseData[i].year;
                monthData[i] = responseData[i].month;
                aodData[i] = responseData[i].aod;
            }
            //统计年月aod数据，将月平均aod变成年平均aod
            var yearAOD = yearAverage(yearData, monthData, aodData);
            year = yearAOD[0];
            AOD = yearAOD[1];
            if (bar.checked) {
                $("#bar-chart").show();
                plotBar(year, AOD);
                $("#line-chart").hide();
            } else {
                $("#line-chart").show();
                drawPolyline(yearData, monthData, aodData);
                $("#bar-chart").hide();
            }
        }, "json");

        /* var path="http://192.168.1.127:9000/aod?lon="+lon+"&lat="+lat+"&start_time="+starTime+"&end_time="+endTime;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            var response=xhttp.responseText;
            window.alert(xhttp.responseText);
            if (this.readyState == 4 && this.status == 200) {
               // Typical action to be performed when the document is ready:
               window.alert(xhttp.responseText);
            }
        };        
        xhttp.open("GET", path, true);
        xhttp.send(); */


    });

})
//基于后台返回的年月aod数据，求年平均aod值
function yearAverage(year, month, aod) {
    var yearAve = new Array();
    var aodAve = new Array();
    var temp_aod = aod[0];
    var temp_year = year[0];
    var count = 1;
    year.push(9999);
    aod.push(0.0)

    for (var i = 1; i < year.length; i++) {
        if (year[i] == temp_year) {
            temp_aod = temp_aod + aod[i];
            count = count + 1;

        } else {
            temp_aod = temp_aod / count;
            yearAve.push(temp_year);
            aodAve.push(temp_aod);
            temp_aod = aod[i];
            temp_year = year[i];
            count = 1;
        }

    }
    var yearAOD = new Array(yearAve, aodAve);
    //需要删除加上的那两个值
    year.pop();
    aod.pop();
    return yearAOD;
}
//根据站点名称，找到对应的经纬度
function findSiteCoor(siteName) {
    for (var i = 0; i < sites.length; i++) {
        if (sites[i].name == siteName) {
            var newCoor = new Array(sites[i].lon, sites[i].lat);
            return newCoor;
        } else {
            continue;
        }
    }
}
//画柱状图
function plotBar(year, AOD) {
    var canvas = $("#bar-chart")[0];
    if (!canvas) {
        alert('Error: Cannot find the canvas element!');
        return;
    }
    if (!canvas.getContext) {
        alert('Error: Canvas context does not exist!');
        return;
    }


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

function drawPolyline(year, month, AOD) {
    var canvas = $("#line-chart")[0];
    if (!canvas) {
        alert('Error: Cannot find the canvas element!');
        return;
    }
    if (!canvas.getContext) {
        alert('Error: Canvas context does not exist!');
        return;
    }
    var data = new Array();
    var date = new Array();
    for (var i = 0; i < year.length; i++) {
        var tempDate = new Date(year[i], month[i], 1)
        date.push(tempDate);
        var tempData = new Array();
        tempData.push(tempDate);
        tempData.push(AOD[i]);
        data.push(tempData);
    }
    var xAxis_label = new Array();
    for (var i = 0; i < year.length; i++) {
        var templabel = year[i].toString();
        var tempMonth = month[i].toString();
        templabel = templabel.concat("-", tempMonth);
        xAxis_label.push(templabel);
    }
    var start = date[0].getTime();
    var end = date[date.length - 1].getTime();
    var step = (end - start) / 5;
    window.myLine = new Chart(canvas, {
        type: "line",
        data: {
            labels: xAxis_label,
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
    /* Flotr.draw(canvas, data
        , {
            colors: ["#3e95cd", "00A8F0"],
            title: "气溶胶光学厚度年际变化",
            xaxis: {
                noTicks: 4,
                mode: 'time',
                timeFomat: "%y/%m"
            }

        }
    );
    console.log("过来"); */
}