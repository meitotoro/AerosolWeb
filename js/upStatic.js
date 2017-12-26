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
            //选择季节统计，月平均统计框隐藏
            $(".month").hide();
            $(".year").show();
            $(".season").show();
            $(".input-season").val("请选择季节");
            $(".input-year").val("请选择年份");
            
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
    
})