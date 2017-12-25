$(function(){
    /* $("#input-group-year").show();        
    $("#input-group-month").show();
    $("#input-group-season").hide();  */
    $(".satellite .dropdown-menu a").click(function(){
        var value=$(this).text();
        $("#chooseSate").val(value);

    });
    $(".area .dropdown-menu a").click(function(){
        var value=$(this).text();
        $("#chooseArea").val(value);

    });
    $(".statis .dropdown-menu a").click(function(){
        var value=$(this).text();
        $("#chooseStatis").val(value);
        var index=$(".statis .input-group-btn .dropdown-menu a").index(this);
        if(index==0){
            //选择月平均统计，季平均统计框隐藏
            $(".season").hide();
            $(".year").show();
            $(".month").show();
            $("#input-year").val("请选择年份");
            $("#input-month").val("请选择月份");
            
        }else if(index==1){
            //选择年份统计，季平均统计框隐藏
            $(".month").hide();
            $(".year").hide();
            $(".season").show();
            $(".input-season").val("请选择季节");
            
        }else{
            $(".month").hide();
            $(".season").hide();
            $(".year").show();
            $(".input-year").val("请选择年份");
        }

    });
    $(".year .dropdown-menu a").click(function(){
        var value=$(this).text();
        $("#input-year").val(value);

    });
    $(".month .dropdown-menu a").click(function(){
        var value=$(this).text();
        $("#input-month").val(value);

    });
    $(".season .dropdown-menu a").click(function(){
        var value=$(this).text();
        $("#input-season").val(value);

    });
     $(".statis .dropdown-menu a").click(function(){
        
        $("#input-group-year").show();
        $("#input-year").val("请选择年份");        
        $("#input-group-month").show();
        $("#input-month").val("请选择月份");
        $("#input-group-season").hide();        
    });
    /*$("#years-dropdown a").click(function(){
        var value=$(this).text();
        $("#input-year").val(value);
    });
    $("#months-dropdown a").click(function(){
        var value=$(this).text();
        $("#input-month").val(value);
    });
    $("#season-dropdown a").click(function(){
        var value=$(this).text();
        $("#input-season").val(value);
    });
    $("#radioSeason").click(function(){
        $("#input-group-season").show(); 
        $("#input-season").val("请选择季节");       
        $("#input-group-year").hide();
        $("#input-group-month").hide();
    });
    $("#radioyear").click(function(){
        $("#input-group-year").show();
        $("#input-year").val("请选择年份"); 
        $("#input-group-month").hide();
        $("#input-group-season").hide(); 
    }) */
})