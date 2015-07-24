var opacityTimer = setInterval(function() {
    var r = Math.random();
    if (r >= 0.90) {
        $('.dataWrapper').css('opacity', r);
    }
}, 300);

function containsWord(w) {
    var args = Array.prototype.slice.call(arguments, 1);
    var found = false;
    //var fword = String(s);
    
    $(args).each(function() {
        var i = w.toLowerCase().indexOf(String(this).toLowerCase());
        if (i >= 0) {
            var s = this.length;
            var t = w.length;
            var c = w.charAt(i + s);
            if (c == '' || c == ' ' || c == '.' || !isLetter(c)) {
                console.log('Found ' + this + ' in ' + w + ', skipping...');
                found = true;
                return false; //break
            }
        }
    });
    
    return found;
}

function contains(w) {
    var args = Array.prototype.slice.call(arguments, 1);
    var found = false;
    
    $(args).each(function() {
        if (w.toLowerCase().indexOf(this.toLowerCase()) >= 0) {
            console.log('Found ' + this + ' in ' + w + ', skipping...');
            found = true;
            return false;
        }
    });
    
    return found;
}

function getRandomGame(json) {
    var s = $(json.applist.apps.app).size();
    var r = Math.round(s * Math.random());
    return $(json.applist.apps.app)[r];
}

function isLetter(c) {
    if (c === ' ') return false;
    if (c.toLowerCase() !== c.toUpperCase()) { //a tricky yet working method
        return true;
    }
    return false;
}

function getRandom() {
    //Aquire game list
    $.getJSON("gameData.json", function(json) {
        $('.gameName').css('animation-play-state', 'paused');
        
        var g = getRandomGame(json);
        
        while(containsWord(g.name, "-", "trailer", "video", "pack", "demo", "additional content", "dlc", "beta", "add-on", " mod", "sdk", "soundtrack", "teaser", "server", "preorder", "pre-order", "bundle", "announcement", "content", "gameplay", "editor", "strategy guide", "bonus kit", " ost", "tutorial", "amd", "web designer", "addon", "season pass", "cinematic", "intro", "press review", "online", "maya", "blender", "upgrade", "toolkit", "osx", "announcer", "digital art book", "pc gamer", "rpg maker", "magic 2014", "dev diary", "dota 2", "bonus", "official guide", "creator", "asus", "ebook") || contains(g.name, "_", "dlc", "steam machine")) {
            g = getRandomGame(json);
        }
        
        $('.gameName').css('animation-name', 'gameShowUp');
        $('.gameName').css('animation-play-state', 'initial');
        
        $('.gameName').html(g.name);
        $('.gameName').attr('href', 'http://store.steampowered.com/app/' + g.appid);
    });
}

$(window).load(function() {
    $('.button').click(function() {
        getRandom();
    });
    
    $('.dataWrapper').removeAttr('style');
    $('.dataWrapper').css('animation', 'showUp 500ms');
    
    //switch loading screen
    $('#loadingContainer').animate({opacity: 0}, 800, "easeOutCubic", function() {
        $(this).hide();
        $('#mainContainer').show();
        $('#mainContainer').animate({opacity: 1}, 1500, "easeOutCubic");
    });
});

$(document).ready(function() {

    $('.gameName').bind("webkitAnimationEnd", function() {
        $(this).css('animation-name', 'none');
    });
    
    $('.gameName').bind("animationend", function() {
        $(this).css('animation-name', 'none');
    });
    
});
