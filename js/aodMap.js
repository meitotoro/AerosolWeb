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
                    var sites_aod=data.sites_aod;
                    var filename=data.filename;
                    var img_html='<img id="imgAOD" src="http://192.168.1.127:9000/map/'+filename+'" alt="aod_image">';
                    
                    $("#aeroMaps img").remove();
                    $("#aeroMaps").append(img_html);
                })

            }

        }

    })
})
