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
exports.play = function(name, singleInstance, extra) {
    if (!extra) extra = {}
    var loop = extra.loop
    var fadein = extra.fadein
    var fadeout = extra.fadeout
    var sublocSpec = extra.sublocSpec
    function makeSound(s) {
        let elem = document.createElement("audio");
        elem.setAttribute("src", "sound/"+s+".mp3");
        elem.setAttribute("preload", "auto");
        elem.dataset.sublocationSpecific = sublocSpec ? '1' : ''
        return elem;
    }

    let instance = tagsByName[name];
    if (instance) {
        log('Refused to make sound "'+name+'": is already running as single-instance')
        return;
    }
    let tag = makeSound(name);
    exports.container.appendChild(tag);
    if (singleInstance) {
        //log('play: singleInstance=', singleInstance, ', tag=', tag)
        tagsByName[name] = tag;
    }

    if (loop) tag.loop = true;
    else {
        tag.addEventListener("ended", function(){
            this.remove();
            tagsByName[name] = null;
        });
    }

    var fadeOutPoint = tag.duration - fadeout
    if (!loop && fadeout > 0) {
        tag.addEventListener('timeupdate', function(){
            if (tag.currentTime >= fadeOutPoint) {
                tag.dataset.fadeOut = '1'
                var fadeOut = setInterval(function() {
                    if (tag && exports.container.contains(tag) && (tag.volume > 0.01)) {
                        if (!tag.paused) tag.volume -= 0.01;
                    } else {
                        tag.volume = 0.0
                        clearInterval(fadeOut);
                    }
                }, (fadeout*1000)/100);
            }
        })
    }

    if (fadein > 0) {
        tag.volume = 0.0;
        tag.addEventListener('playing', function() {
            var fadeIn = setInterval(function() {
                if (tag && exports.container.contains(tag) && (tag.volume < 0.99) && tag.dataset.fadeOut != '1') {
                    if (!tag.paused) tag.volume += 0.01;
                } else if (tag.dataset.fadeOut != '1') {
                    tag.volume = 1.0
                    clearInterval(fadeIn);
                } else clearInterval(fadeIn);
                //log('fadein')
            }, (fadein*1000)/100);
        })
    }
    tag.play();
    //log('play: tagsByName[name] =', tagsByName[name])
    return tag;
}
exports.getSingleInstance = function(name) {
    //log('getSingleInstance: tagsByName[name] =', tagsByName[name])
    return tagsByName[name]
}
exports.clearSingleInstance = function(name, fadeout) {
    let tag = tagsByName[name];
    //log('clearSingleInstance', name, tag)
    if (tag) {
        if (fadeout > 0) {
            tag.dataset.fadeOut = '1'
            var fadeOut = null
            var remove = function() {
                //log('remove')
                tag.volume = 0.0
                clearInterval(fadeOut);
                if (tag) {
                    tag.pause();
                    tag.currentTime = 0;
                    tag.remove();
                    tagsByName[name] = null;
                }
            }
            tag.addEventListener('pause', function() {
                clearInterval(fadeOut);
            })
            fadeOut = setInterval(function() {
                if (tag && exports.container.contains(tag) && (tag.volume > 0.01)) {
                    if (!tag.paused) tag.volume -= 0.01;
                    //log('fadeout')
                } else remove()
            }, (fadeout*1000)/100);
        } else {
            tag.pause();
            tag.currentTime = 0;
            tag.remove();
            tagsByName[name] = null;
        }
    }// else log('Tried to clear single-instance sound that doesn\'t exist: "'+name+'"');
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
            tag.dataset.fadeOut = '1'
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
    }// else log('Tried to pause single-instance sound that doesn\'t exist: "'+name+'"');
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
exports.clear = function(nameList) {
    let con = exports.container.children;
    let i = 0;
    while (i < con.length) {
        let name = con[i].src.split('/')
        name = name[name.length - 1]
        name = name.substring(0, name.length - 4)
        if (nameList.indexOf(name) >= 0) {
            tagsByName[name] = null;
            con[i].pause();
            con[i].remove();
        } else i++;
    }
}
exports.clearAll = function() {
    let con = exports.container.children;
    while (con.length > 0) {
        let name = con[0].src.split('/')
        name = name[name.length - 1]
        name = name.substring(0, name.length - 4)
        tagsByName[name] = null;
        con[0].pause();
        con[0].remove();
    }
}
exports.pauseAll = function() {
    let con = exports.container.children;
    for (let i = 0; i<con.length; i++) {
        if (con[i].dataset.fadeOut == '1') {
            //log('pauseAll: fadeout deletion', con[i])
            let name = con[i].src.split('/')
            name = name[name.length - 1]
            name = name.substring(0, name.length - 4)
            tagsByName[name] = null;
            con[i].pause();
            con[i].remove()
        } else con[i].pause();
    }
}
exports.resumeAll = function() {
    let con = exports.container.children;
    for (let i = 0; i<con.length; i++) {
        con[i].play();
    }
}
exports.clearSublocationSpecific = function() {
    //log('sound.clearSublocationSpecific():')
    let con = exports.container.children;
    //log(con)
    let i = 0;
    while (i < con.length) {
        let name = con[i].src.split('/')
        name = name[name.length - 1]
        name = name.substring(0, name.length - 4)
        //log(con[0])
        //log(name)
        //log(con[0].dataset.sublocationSpecific == '1')
        if (con[i].dataset.sublocationSpecific == '1') {
            tagsByName[name] = null;
            con[i].pause();
            con[i].remove();
        } else i++;
    }
}