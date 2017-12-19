$(function () {
    var year_list = $("#years-dropdown a");
    var month_list=$("#months-dropdown a");
    var input_month = $("months-dropdown").val();
    month_list.click(function () {
        var input_month=$("#input-month").val();
        if (input_month != "请选择月份") {
            var input_year = $("#input-year").val();
            var year = parseInt(input_year.substring(0, 4));
            var input_month=$(this).text();
            var month=parseInt(input_month.slice(0,-1));
            if (typeof (year) == "number") {
                jQuery.get(path_map, {
                    year:year,
                    month:month
                },function(data,textStatus){
                    var sites_aod=data.aod;
                    var filename=data.filename;
                    var img_html='<img id="imgAOD" src="http://192.168.1.127:9000/map/'+filename+'" alt="aod_image">';
                    //画图
                    $("#aeroMaps img").remove();
                    $("#aeroMaps").append(img_html);
                    //填充表格
                    var sites=sites_aod.sites;
                    var aod=new Array();
                    for(var i=0;i<sites_aod.aod.length;i++){
                        aod.push(parseFloat(sites_aod.aod[i]).toFixed(2))
                    }
                    $("#aodTable table tbody").html("");
                    for(var i=0;i<sites.length;i++){
                        var index=i+1;
                        var html="<tr><th scope='row'>"+index+"</th><td>"+sites[i]+"</td><td>"+aod[i]+"</td></tr>";
                        $("#aodTable table tbody").append(html);
                        
                    }
                   
                })

            }

        }

    })
})
