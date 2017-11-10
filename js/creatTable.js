
$(function(){
    var sites=siteAODs.site;
    var AODs=siteAODs.AOD;
    if(sites.length==AODs.length){
        for(var i=0;i<sites.length;i++){
            var html="<tr><th scope='row'>"+i+"</th><td>"+sites[i]+"</td><td>"+AODs[i]+"</td></tr>";
            $("#aodTable table tbody").append(html);
            
        }
    }
})