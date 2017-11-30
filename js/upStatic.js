$(function(){
    $("#input-group-year").show();        
    $("#input-group-month").show();
    $("#input-group-season").hide(); 
    $("#radioMonth").click(function(){
        $("#input-group-year").show();
        $("#input-year").val("请选择年份");        
        $("#input-group-month").show();
        $("#input-month").val("请选择月份");
        $("#input-group-season").hide();        
    });
    $("#years-dropdown a").click(function(){
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
    })
})