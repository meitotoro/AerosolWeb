$(function(){
    $("#yearStatic").click(function(){
        $("#tablist").show();
        $("#years").show();
        $("#seasons").hide();        
    });
    $("#seasonStatic").click(function(){
        $("#tablist").show();        
        $("#seasons").show();
        $("#years").hide();
    })
})