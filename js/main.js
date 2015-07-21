var opacityTimer = setInterval(function() {
    var r = Math.random();
    if (r >= 0.80) {
        $('.dataWrapper').css('opacity', r);
    }
}, 100);

function getRandom() {
    //Aquire game list
    $.ajax({ 
        type: "GET",
        contentType: "application/json",
        dataType: "jsonp",
        crossDomain: true,
        url: "http://api.steampowered.com/ISteamApps/GetAppList/v0001/"}).done(function(data) {
        var responce = data;
    });
}

$(document).ready(function() {
    $('.button').click(function() {
        getRandom();
    });
});