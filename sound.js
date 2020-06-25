exports.container = document.createElement("div")
document.body.appendChild(exports.container)
exports.ready = false
var tagsByName = {}
fs.readdir(path.join(__dirname, 'sound'), function(err, files) {
    if (err) {
        console.log('Unable to scan directory: ' + err);
        alert(_('error_scan_sounds'))
        quit()
    } 
    files.forEach(function(file) {
        let fileName = file.substring(0, file.length - 4)
        tagsByName[fileName] = null
    });
    exports.container.dispatchEvent(new Event('soundsystemready'))
    exports.ready = true
});
exports.play = function(name, singleInstance, loop, fadein, fadeoutOnEnd) {
    function makeSound(s) {
        let elem = document.createElement("audio");
        elem.setAttribute("src", "sound/"+s+".mp3");
        elem.setAttribute("preload", "auto");
        return elem;
    }

    let instance = tagsByName[name];
    if (instance) {
        log('Refused to make sound "'+name+'": is already running as single-instance')
        return;
    }
    let tag = makeSound(name);
    exports.container.appendChild(tag);
    if (singleInstance) tagsByName[name] = tag;

    if (loop) tag.loop = true;
    else tag.setAttribute("onended", "this.remove();");

    var fadeOutPoint = tag.duration - fadeoutOnEnd
    if (!loop && fadeoutOnEnd > 0) {
        tag.addEventListener('timeupdate', function(){
            if (tag.currentTime >= fadeOutPoint)
            var fadeOut = setInterval(function() {
                if (tag && exports.container.contains(tag) && (tag.volume > 0.01)) {
                    if (!tag.paused) tag.volume -= 0.01;
                } else {
                    tag.volume = 0.0
                    clearInterval(fadeOut);
                }
            }, (fadeoutOnEnd*1000)/100);
        }, )
    }

    if (fadein > 0) {
        tag.volume = 0.0;
        tag.addEventListener('playing', function() {
            var fadeIn = setInterval(function() {
                if (tag && exports.container.contains(tag) && (tag.volume < 0.99)) {
                    if (!tag.paused) tag.volume += 0.01;
                } else {
                    tag.volume = 1.0
                    clearInterval(fadeIn);
                }
            }, (fadein*1000)/100);
        })
    }
    tag.play();
}
exports.clearSingleInstance = function(name, fadeout) {
    let tag = tagsByName[name];
    if (tag) {
        if (fadeout > 0) {
            var fadeOut = setInterval(function() {
                if (tag && exports.container.contains(tag) && (tag.volume > 0.01)) {
                    if (!tag.paused) tag.volume -= 0.01;
                } else {
                    tag.volume = 0.0
                    clearInterval(fadeOut);
                    if (tag) {
                        tag.pause();
                        tag.currentTime = 0;
                        tag.remove();
                    }
                }
            }, (fadeout*1000)/100);
        } else {
            tag.pause();
            tag.currentTime = 0;
            tag.remove();
            tagsByName[name] = null;
        }
    } else log('Tried to clear single-instance sound that doesn\'t exist: "'+name+'"');
}
exports.setLoopSingleInstance = function(name, loop) {
    let tag = tagsByName[name];
    if (tag) tag.loop = !!loop;
    else log('Tried to set loop of single-instance sound that doesn\'t exist: "'+name+'"');
}
exports.pauseSingleInstance = function(name, fadeout) {
    let tag = tagsByName[name];
    if (tag) {
        if (fadeout > 0) {
            var fadeOut = setInterval(function() {
                if (tag && exports.container.contains(tag) && (tag.volume > 0.01)) {
                    if (!tag.paused) tag.volume -= 0.01;
                } else {
                    tag.volume = 0.0
                    clearInterval(fadeOut);
                    if (tag) tag.pause();
                }
            }, (fadeout*1000)/100);
        } else tag.pause();
    } else log('Tried to pause single-instance sound that doesn\'t exist: "'+name+'"');
}
exports.resumeSingleInstance = function(name, fadein) {
    let tag = tagsByName[name];
    if (tag) {
        if (fadein > 0) {
            tag.volume = 0.0;
            tag.addEventListener('playing', function() {
                var fadeIn = setInterval(function() {
                    if (tag && exports.container.contains(tag) && (tag.volume < 0.99)) {
                        if (!tag.paused) tag.volume += 0.01;
                    } else {
                        tag.volume = 1.0
                        clearInterval(fadeIn);
                    }
                }, (fadein*1000)/100);
            })
            tag.play();
        } else tag.play();
    } else log('Tried to resume single-instance sound that doesn\'t exist: "'+name+'"');
}
exports.clearAll = function() {
    let con = exports.container.children;
    for (let i = 0; i<con.length; i++) {
        con[i].pause();
        con[i].remove();
    }
}
exports.pauseAll = function() {
    let con = exports.container.children;
    for (let i = 0; i<con.length; i++) {
        con[i].pause();
    }
}
exports.resumeAll = function() {
    let con = exports.container.children;
    for (let i = 0; i<con.length; i++) {
        con[i].play();
    }
}