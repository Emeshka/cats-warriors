// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

log = console.log

const fs = window.require('fs');
const path = require('path')
const s = require(path.join(__dirname, 'strings.js'));
//log(s.s);

document.title = s.s['app_name']

const sound = {};
sound.ids = {}
fs.readdir(path.join(__dirname, 'sound'), function(err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function(file) {
        let fileName = file.substring(0, file.length - 4)
        sound.ids[fileName] = fileName
    });
});
sound.container = document.createElement("div")
document.body.appendChild(sound.container)
sound.increment = 0;
sound.play = function(name) {
    function makeSound(s) {
        if (sound.increment > 1000) sound.increment = 0;
        let elem = document.createElement("audio");
        elem.setAttribute("id", s+"_"+sound.increment);
        elem.setAttribute("src", "sound/"+s+".mp3");
        elem.setAttribute("preload", "auto");
        elem.setAttribute("onended", "this.remove();");
        sound.increment++;
        return elem;
    }

    let id = sound.ids[name];
    let previous = document.getElementById(id);
    if (previous && previous.currentTime != 0.0 || !previous) {
        let newSound = makeSound(name);
        sound.container.appendChild(newSound);
        newSound.play();
        sound.ids[name] = newSound.id;
    } else if (previous) {
        previous.play();
    }
}

var loadedGame = null

function button(text, onclick, width, height) {
    var button = document.createElement("input")
    button.setAttribute('type', 'button')
    button.onclick = onclick;
    button.onmouseenter = function() {
        sound.play("button_onmouseover")
    };
    button.value = text;
    if (width) button.style.width = width;
    if (height) button.style.height = height;
    return button;
}

function spacer() {
    var div = document.createElement('div')
    div.style.display = 'inline-block'
    div.style.verticalAlign = 'middle'
    div.style.height = '100%'
    return div
}

function receiveLoadedGame(jGame) {
    loadedGame = JSON.parse(jGame)
}

function mainMenu() {
    var con = document.body;
    con.style.backgroundImage = "url('textures/main_menu.png')"
    var mm = document.createElement('div');
    mm.id = "main_menu"
    mm.appendChild(spacer())

    function savedGameEntry() {
        let div = document.createElement('div')
        
        return div;
    }

    var list = document.createElement('ul');
    list.className = "left_main_menu_panel"
    var newGameParams = null, newGameStart = null, loadGameList = null;
    var mainOptions = ['new_game', 'load', 'exit'];
    var onclicks = [
        function () {
            if (newGameParams || newGameStart) return;
            if (loadGameList) loadGameList.remove();

            newGameParams = document.createElement('div')
            newGameParams.className = "right_main_menu_panel"
            var difComment = document.createElement('p')
            difComment.innerHTML = s.s['difficulty_level']
            var difficulty = document.createElement('select')
            difficulty.onchange = function() {
                difComment.innerHTML = s.s[this.value+'_descr']
            }
            var opts = ['none', 'difficulty_level_1', 'difficulty_level_2', 'difficulty_level_3', 'difficulty_level_4']
            for (let i = 0; i < opts.length; i++) {
                var o = opts[i]
                var option = document.createElement('option')
                option.value = o
                option.innerHTML = s.s[o]
                if (o == 'none') {
                    option.setAttribute('disabled', 'disabled')
                    option.setAttribute('selected', 'selected')
                }
                difficulty.appendChild(option)
            }
            newGameParams.appendChild(difficulty)
            newGameParams.appendChild(difComment)

            var eras = ['old', 'new']
            var selectedEra = ''
            var eraComment = document.createElement('p')
            eraComment.innerHTML = s.s['era_choice']
            for (let i = 0; i<eras.length; i++) {
                let e = eras[i]
                var era = document.createElement('input')
                era.setAttribute('type', 'radio')
                era.setAttribute('name', 'era')
                era.value = e
                if (i == 0) era.checked = true
                var eraLabel = document.createElement('label')
                eraLabel.appendChild(era)
                eraLabel.innerHTML += s.s[e+'_era']
                eraLabel.onclick = function() {
                    if (selectedEra != e) {
                        selectedEra = e
                        eraComment.innerHTML = s.s[e+'_era_descr']
                    }
                }
                newGameParams.appendChild(eraLabel)
            }
            newGameParams.appendChild(eraComment)

            var table = document.createElement('table')
            table.id = 'race_choice'
            var cells = [
                ['swamp', 'wind'],
                ['forest', 'mist']
            ];
            var selectedRace = ''
            var raceName = document.createElement('h3')
            raceName.innerHTML = s.s['none']
            var raceComment = document.createElement('p')
            raceComment.innerHTML = s.s['race_choice']
            for (let i = 0; i<cells.length; i++) {
                var tr = document.createElement('tr')
                for (let j = 0; j<cells[i].length; j++) {
                    let race = cells[i][j]
                    var td = document.createElement('td')
                    td.id = race+'_td'
                    td.className = 'unselected_image_option'
                    td.style.backgroundImage = "url('textures/"+race+"_race_icon.png')"
                    td.onclick = function() {
                        if (selectedRace != race) {
                            let oldRace = document.getElementById(selectedRace+'_td')
                            if (oldRace) oldRace.className = 'unselected_image_option'
                            selectedRace = race
                            raceName.innerHTML = s.s[race+'_race']
                            raceComment.innerHTML = s.s[race+'_race_descr']
                            this.className = 'selected_image_option unselected_image_option'
                        }
                    }
                    tr.appendChild(td)
                }
                table.appendChild(tr)
            }
            newGameParams.appendChild(table)
            newGameParams.appendChild(raceName)
            newGameParams.appendChild(raceComment)

            newGameStart = document.createElement('div')
            newGameStart.className = "right_main_menu_panel"
            newGameStart.id = 'new_game_start'
            newGameStart.innerHTML = s.s['start_new_game']
            newGameStart.onclick = function() {
                mm.remove()
                showLoadingGame()
                var params = {
                    difficulty: difficulty.value,
                    era: selectedEra,
                    race: selectedRace,
                    season: season.value
                }
                //java.startNewGame(JSON.stringify(params))
            }

            mm.appendChild(newGameParams)
            mm.appendChild(newGameStart)
        },
        function () {
            if (loadGameList) return;
            if (newGameParams || newGameStart) {
                newGameParams.remove();
                newGameStart.remove();
            }

            loadGameList = document.createElement('div')
            loadGameList.className = "right_main_menu_panel"
            /*var gamesJArray = java.loadGameList()
            var gamesArray = gamesJArray ? JSON.parse(gamesJArray) : "null"
            if (gamesArray) {
                for (var i = 0; i<gamesArray.length; i++) {
                    //
                }
            }*/
            mm.appendChild(loadGameList)
        },
        function () {/*java.exit()*/}
    ];
    for (let i = 0; i<mainOptions.length; i++) {
        var li = document.createElement('li');
        li.appendChild(button(s.s[mainOptions[i]], onclicks[i]))
        list.appendChild(li)
    }
    mm.appendChild(list)
    con.appendChild(mm)
}

mainMenu();
log('init.')