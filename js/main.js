var opacityTimer = setInterval(function() {
    var r = Math.random();
    if (r >= 0.90) {
        $('.dataWrapper').css('opacity', r);
    }
}, 300);

function contains(s) {
    var args = Array.prototype.slice.call(arguments, 1);
    var found = false;
    
    $(args).each(function() {
        if (String(s).toLowerCase().indexOf(String(this).toLowerCase()) >= 0) {
            console.log('Found ' + this + ' in ' + s + ', skipping...');
            found = true;
            return false; //break
        }
    });
    
    return found;
}

function getRandom() {
    //Aquire game list
    $.getJSON("gameData.json", function(json) {
        $('.gameName').css('animation-play-state', 'paused');
        
        var s = $(json.applist.apps.app).size();
        var r = Math.round(s * Math.random());
        var g = $(json.applist.apps.app)[r].name;
        
        while(contains(g, "_", "ValveTestApp", "trailer", "video", "pack", "demo", "additional content", "dlc", "beta", "add-on", "mod", "sdk", "soundtrack", "teaser", "server", "preorder", "pre-order", "bundle", "announcement", "content", "gameplay", "editor", "strategy guide", "bonus kit", "ost", "tutorial", "amd", "web designer", "addon", "season pass", "cinematic", "intro", "press review", "online", "maya", "blender", "upgrade", "toolkit", "osx", "announcer", "digital art book", "pc gamer", "rpg maker", "magic 2014", "dev diary", "dota 2", "bonus", "official guide", "creator", " - ")) {
            r = Math.round(s * Math.random());
            g = $(json.applist.apps.app)[r].name;
        }
        
        $('.gameName').css('animation-name', 'gameShowUp');
        $('.gameName').css('animation-play-state', 'initial');
        
        $('.gameName').html(g);
        $('.gameName').attr('href', 'http://store.steampowered.com/app/' + $(json.applist.apps.app)[r].appid);
    });
}

$(window).load(function() {
    $('.button').click(function() {
        getRandom();
    });
    
    $('.dataWrapper').removeAttr('style');
    $('.dataWrapper').css('animation', 'showUp 500ms');
});

$(document).ready(function() {

    $('.gameName').bind("webkitAnimationEnd", function() {
        $(this).css('animation-name', 'none');
    });
    
    $('.gameName').bind("animationend", function() {
        $(this).css('animation-name', 'none');
    });
    
});
