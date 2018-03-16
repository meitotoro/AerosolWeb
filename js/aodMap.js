$(function () {
    var wait = $(".wait");
    wait.hide();
    $(".season").hide();
    var statis = $(".statis .dropdown-menu a");
    var dp = $("#dp");
    dp.datetimepicker({
        locale: 'zh-CN',
        format: 'YYYY年MMMM',
        viewMode: 'months'
    });
    var satellite = $(".satellite .dropdown-menu a");
    var input_satellite;
    var area = $(".area .dropdown-menu a");
    area.click(function(){
        dp.data("DateTimePicker").date(null);
    })
    satellite.click(function () {
        input_satellite = $("#chooseSate").val().toLowerCase();
        if (input_satellite == "选择卫星") {
            alert("请选择卫星");
            return;
        }
        switch (input_satellite) {
            case "modis":
                dp.data("DateTimePicker").minDate('2002-11');
                dp.data("DateTimePicker").maxDate('2011-07');
                dp.data("DateTimePicker").date(null);
                break;
            case "avhrr":
                dp.data("DateTimePicker").minDate('1990-01');
                dp.data("DateTimePicker").maxDate('2010-12');
                dp.data("DateTimePicker").date(null);
                break;
            case "fy3-a":
                dp.data("DateTimePicker").minDate('2009-01');
                dp.data("DateTimePicker").maxDate('2011-12');
                dp.data("DateTimePicker").date(null);
                break;
        }
    });
    statis.click(function () {
        var statis_val = $("#chooseStatis").val();
        switch (statis_val) {
            case "月平均":
                dp.data('DateTimePicker').viewMode("months");
                dp.data('DateTimePicker').format("YYYY年MMMM");
                dp.data("DateTimePicker").date(null);
                dp.show();
                break;
            case "年平均":
                dp.data('DateTimePicker').viewMode("years");
                dp.data('DateTimePicker').format("YYYY年");
                dp.data("DateTimePicker").date(null);
                dp.show();
                break;
            case "季节平均":
                dp.hide();
                $(".season").show();
        }
        dp.on("dp.change", function (e) {
            var input_area = $("#input-area").val();
            if (input_area == "选择区域") {
                alert("请选择区域");
                return;

            }
            var area = "";
            switch (input_area) {
                case "全国":
                    area = "china";
                    break;
                case "京津冀":
                    area = "jingjinji";
                    break;
                case "长三角":
                    area = "changsanjiao";
                    break;
                case "珠三角":
                    area = "zhusanjiao";
                    break;
            }
            var date = new Date(e.date);
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            function reqListener() {
                wait.hide();
                var data = this.responseText;
                data = jQuery.parseJSON(data);
                var sites_aod = data.aod;
                var sites = sites_aod.sites;
                var locate = sites_aod.locate;
                if (sites_aod == "") {
                    var alertStr = "数据库中没有" + year + "年" + input_month + "的数据!";
                    alert(alertStr);
                    return;
                }
                var filename = data.filename;
                var img_html = '<img id="' + area + 'AOD" src="' + path_map + "/" + filename + '" alt="aod_image">';
                //画图
                $(".AODMaps div img").remove();
                switch (input_area) {
                    case "全国":
                        $("#chinaMaps").append(img_html);
                        break;
                    case "京津冀":
                        $("#jingjinjiMap").append(img_html);
                        break;
                    case "珠三角":
                        $("#zhusanjiaoMap").append(img_html);
                        break;
                    case "长三角":
                        $("#changsanjiaoMap").append(img_html);
                        break;
                }
                $(".AODMaps div img").show();
                //填充表格

                var aod = new Array();
                for (var i = 0; i < sites_aod.aod.length; i++) {
                    aod.push(parseFloat(sites_aod.aod[i]).toFixed(2))
                }
                $("#aodTable table tbody").html("");
                for (var i = 0; i < sites.length; i++) {
                    var lon = locate[i][0].toFixed(1).toString();
                    var lat = locate[i][1].toFixed(1).toString();
                    var locate_Html = lon + "°E," + lat + "°N";
                    var index = i + 1;
                    var b = index % 2;
                    var html = "";
                    var percentage = parseInt(aod[i] / 1.5 * 100) + "%";
                    var backgroundColor = "";
                    var percent = aod[i] / 1.5;
                    if (percent < 0.2) {
                        backgroundColor = "#6600ff";
                    }
                    else if (percent >= 0.2 && percent < 0.4) {
                        backgroundColor = "#33ccff";
                    } else if (percent >= 0.4 && percent < 0.6) {
                        backgroundColor = "#57f08a";
                    }
                    else if (percent >= 0.6 && percent < 0.8) {
                        backgroundColor = "#f79628";
                    } else {
                        backgroundColor = "#f74a28";
                    }
                    var linearColor = "";
                    if (b == 0) {
                        //设置偶数行的背景色
                        html = "<tr bgcolor='#bed1f2'><td>" + index + "</td><td>" + sites[i] + "</td><td>" + locate_Html + "</td><td>" + aod[i] + "</td></tr>";
                        linearColor = "linear-gradient(to right," + backgroundColor + " " + percentage + ",#bed1f2 " + percentage + ", #bed1f2 100%";
                    }
                    else if (b == 1) {
                        html = "<tr bgcolor='#f0f0f0'><td>" + index + "</td><td>" + sites[i] + "</td><td>" + locate_Html + "</td><td>" + aod[i] + "</td></tr>";
                        linearColor = "linear-gradient(to right," + backgroundColor + " " + percentage + ",#f0f0f0 " + percentage + ",#f0f0f0 100%";
                    }
                    $("#aodTable table tbody").append(html);

                    $("#aodTable table tbody tr:last-child td:last-child").css({
                        "background-repeat": "no-repeat",
                        "background": linearColor
                    });
                }
                //设置表格的padding
                $("#aodTable table tbody tr td:last-child").css({ "padding": "5px 10px 5px 10px", "color": "#4d4d4d" });
                $("#aodTable table tbody tr:last-child td:first-child").css({ "border-bottom-left-radius": "10px" });
                $("#aodTable table tbody tr:last-child td:last-child").css({ "border-bottom-right-radius": "10px" });

            }

            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", reqListener);
            var url = path_map + "?year=" + year + "&month=" + month + "&area=" + area + "&satellite=" + input_satellite;
            oReq.open("GET", url);
            oReq.send();
            wait.show();
            $("#aodTable table tbody").html("");
            $(".AODMaps div img").hide();
        });
    });

})
