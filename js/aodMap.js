$(function () {
    var year_list = $("#years-dropdown a");
    var month_list = $("#months-dropdown a");
    var input_month = $("input-month").val();
    var wait = $(".wait");
    wait.hide();
    month_list.click(function () {
        var input_month = $("#input-month").val();
        if (input_month != "请选择月份") {
            var input_year = $("#input-year").val();
            var year = parseInt(input_year.substring(0, 4));
            var input_month = $(this).text();
            var month = parseInt(input_month.slice(0, -1));
            if (typeof (year) == "number") {
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
                    var china_img_html = '<img id="imgAOD" src="' + path_map + "/" + filename[0] + '" alt="aod_image">';
                    var jingjinji_img_html = '<img id="jingjinjiAOD" src="' + path_map + "/" + filename[1] + '" alt="aod_image">';
                    var changsanjiao_img_html = '<img id="changsanjiaoAOD" src="' + path_map + "/" + filename[2] + '" alt="aod_image">';
                    var zhusanjiao_img_html = '<img id="zhusanjiaoAOD" src="' + path_map + "/" + filename[3] + '" alt="aod_image">';
                    //画图
                    $(".AODMaps div img").remove();
                    $("#chinaMaps").append(china_img_html);
                    $("#jingjinjiMap").append(jingjinji_img_html);
                    $("#changsanjiaoMap").append(changsanjiao_img_html);
                    $("#zhusanjiaoMap").append(zhusanjiao_img_html);
                    $(".AODMaps div img").show();
                    //填充表格

                    var aod = new Array();
                    for (var i = 0; i < sites_aod.aod.length; i++) {
                        aod.push(parseFloat(sites_aod.aod[i]).toFixed(2))
                    }
                    $("#aodTable table tbody").html("");
                    for (var i = 0; i < sites.length; i++) {
                        var lon = Math.round(locate[i][0]).toString();
                        var lat = Math.round(locate[i][1]).toString();
                        var locate_Html = lon + "°E," + lat + "°N";
                        var index = i + 1;
                        var b = index % 2;
                        var html = "";
                        var percentage=parseInt(aod[i]/1.5*100)+"%";
                        var backgroundColor="";
                        var percent=aod[i]/1.5;
                        if(percent<0.2){
                            backgroundColor="#6600ff";
                        }
                        else if(percent>=0.2&&percent<0.4){
                            backgroundColor="#33ccff";
                        }else if(percent>=0.4&&percent<0.6){
                            backgroundColor="#57f08a";
                        }
                        else if(percent>=0.6&&percent<0.8){
                            backgroundColor="#f79628";
                        }else{
                            backgroundColor="#f74a28";
                        }
                        var linearColor="";
                        if (b == 0) {
                            //设置偶数行的背景色
                            html = "<tr bgcolor='#bed1f2'><td>" + index + "</td><td>" + sites[i] + "</td><td>" + locate_Html + "</td><td>" + aod[i] + "</td></tr>";
                            linearColor="linear-gradient(to right,"+backgroundColor+" "+percentage+",#bed1f2 "+percentage+", #bed1f2 100%";
                        }
                        else if (b == 1) {
                            html = "<tr bgcolor='#f0f0f0'><td>" + index + "</td><td>" + sites[i] + "</td><td>" + locate_Html +  "</td><td>"+ aod[i] + "</td></tr>";
                            linearColor="linear-gradient(to right,"+backgroundColor+" "+percentage+",#f0f0f0 "+percentage+",#f0f0f0 100%";
                        }
                        $("#aodTable table tbody").append(html);
                        
                        $("#aodTable table tbody tr:last-child td:last-child").css({"background-repeat":"no-repeat",
                        "background":linearColor});
                    }
                    //设置表格的padding
                    $("#aodTable table tbody tr td:last-child").css({ "padding": "5px 10px 5px 10px", "color": "#4d4d4d"});
                    $("#aodTable table tbody tr:last-child td:first-child").css({"border-bottom-left-radius":"10px"});
                    $("#aodTable table tbody tr:last-child td:last-child").css({"border-bottom-right-radius":"10px"});

                }

                var oReq = new XMLHttpRequest();
                oReq.addEventListener("load", reqListener);
                var url = path_map + "?year=" + year + "&month=" + month;
                oReq.open("GET", url);
                oReq.send();
                wait.show();
                $("#aodTable table tbody").html("");
                $(".AODMaps div img").hide();
            }

            /*   if (typeof (year) == "number") {
                 jQuery.get()(path_map, {
                     year: year,
                     month: month
                 }, function (data, textStatus) {
                     var sites_aod = data.aod;
                     var filename = data.filename;
                     var img_html = '<img id="imgAOD" src=' + path_map + filename + '" alt="aod_image">';
                     //画图
                     $("#aeroMaps img").remove();
                     $("#aeroMaps").append(img_html);
                     //填充表格
                     var sites = sites_aod.sites;
                     var aod = new Array();
                     for (var i = 0; i < sites_aod.aod.length; i++) {
                         aod.push(parseFloat(sites_aod.aod[i]).toFixed(2))
                     }
                     $("#aodTable table tbody").html("");
                     for (var i = 0; i < sites.length; i++) {
                         var index = i + 1;
                         var html = "<tr><th scope='row'>" + index + "</th><td>" + sites[i] + "</td><td>" + aod[i] + "</td></tr>";
                         $("#aodTable table tbody").append(html);
 
                     }
 
                 })
 
             } */

        }

    })
})
