var opacityTimer = setInterval(function() {
    var r = Math.random();
    if (r >= 0.90) {
        $('.dataWrapper').css('opacity', r);
    }
}, 300);

function contains(s, c) {
    if (s.toLowerCase().indexOf(c) >= 0) {
        return true;
    } 
    return false;
}

function getRandom() {
    //Aquire game list
    $.getJSON("gameData.json", function(json) {
        $('.gameName').css('animation-play-state', 'paused');
        
        var s = $(json.applist.apps.app).size();
        var r = Math.round(s * Math.random());
        var g = $(json.applist.apps.app)[r].name;
        
        while(contains(g, "trailer") || contains(g, "pack") || contains(g, "demo") || contains(g, "additional content") || contains(g, "dlc") || contains(g, "beta") || contains(g, "add-on") || contains(g, "mod") || contains(g, "sdk") || contains(g, "soundtrack")) {
            r = Math.round(s * Math.random());
            g = $(json.applist.apps.app)[r].name;
        }
        
        $('.gameName').css('animation-name', 'gameShowUp');
        $('.gameName').css('animation-play-state', 'initial');
        
        $('.gameName').html(g);
        $('.gameName').attr('href', 'http://store.steampowered.com/app/' + $(json.applist.apps.app)[r].appid);
    });
}

$(document).ready(function() {
    $('.button').click(function() {
        getRandom();
    });
    
    $('.gameName').bind("webkitAnimationEnd", function() {
        $(this).css('animation-name', 'none');
    });
    
    $('.dataWrapper').css('animation', 'showUp 500ms');
});