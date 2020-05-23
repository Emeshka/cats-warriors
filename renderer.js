// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

log = console.log

const fs = window.require('fs');
const path = require('path')
const strings = require(path.join(__dirname, 'strings.js'));

function _(key) {
    return strings.s[key] ? strings.s[key] : key;
}

document.title = _('app_name')

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

/* ------------------------------------------------------------------------------- */

var loadedGame = null

function startNewGame(params) {
    //
}

/* ------------------------------------------------------------------------------- */

function createButton(text, onclick, width, height) {
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

function createSpacer() {
    var div = document.createElement('div')
    div.style.display = 'inline-block'
    div.style.verticalAlign = 'middle'
    div.style.height = '100%'
    return div
}

function showLoadingGame() {
    let con = document.body;
    con.style.backgroundImage = "url('textures/main_view_bg.jpg')"
    let loading = document.createElement('div')
    loading.innerHTML = _('loading')
    loading.className = 'main_view_block'
    loading.style.position = 'absolute';
    loading.style.bottom = '10px';
    loading.style.left = '10px';
    loading.style.width = 'calc(100vw - 40px)'
    con.appendChild(loading)
}

function mainMenu() {
    var con = document.body;
    con.style.backgroundImage = "url('textures/main_menu.png')"
    var mm = document.createElement('div');
    mm.id = "main_menu"
    mm.appendChild(createSpacer())

    function savedGameEntry() {
        let div = document.createElement('div')
        
        return div;
    }

    function headerWithHeight(text, height) {
        let header = document.createElement("span")
        header.innerHTML = text
        header.style.lineHeight = height+'px'
        header.style.fontSize = height*0.5 + 'px'
        header.style.fontWeight = 'bold'
        return header
    }

    var list = document.createElement('ul');
    list.className = "left_main_menu_panel"
    var newGameBlock = null, loadGameList = null, encycBlock = null, credits = null;
    var mainOptions = ['new_game', 'load', 'encyclopedy', 'credits', 'exit'];
    var onclicks = [
        function () {
            if (newGameBlock) return;
            if (loadGameList) {
                loadGameList.remove();
                loadGameList = null;
            }
            if (credits) {
                credits.remove();
                credits = null;
            }
            if (encycBlock) {
                encycBlock.remove();
                encycBlock = null;
            }

            newGameBlock = document.createElement('div')
            newGameBlock.className = "main_view_block right_main_menu_panel"
            let headerHeight = 50;
            let buttonStartHeight = 30;
            var newGameParams = document.createElement('div')
            newGameParams.style.overflow = 'auto'
            newGameParams.style.maxHeight = 'calc(100vh - 60px - '+headerHeight+'px - '+buttonStartHeight+'px)';
            newGameParams.style.margin = '10px 0px'
            var difComment = document.createElement('p')
            difComment.innerHTML = _('difficulty_level_1_descr')
            var difficulty = document.createElement('select')
            difficulty.onchange = function() {
                difComment.innerHTML = _(this.value+'_descr')
            }
            let opts = ['difficulty_level_1', 'difficulty_level_2', 'difficulty_level_3', 'difficulty_level_4']
            for (let i = 0; i < opts.length; i++) {
                let o = opts[i]
                var option = document.createElement('option')
                option.value = o
                option.innerHTML = _(o)
                if (o == 'difficulty_level_1') {
                    option.setAttribute('selected', 'selected')
                }
                difficulty.appendChild(option)
            }
            newGameParams.appendChild(difficulty)
            newGameParams.appendChild(difComment)

            let eras = ['old', 'new']
            var selectedEra = ''
            var eraComment = document.createElement('p')
            eraComment.innerHTML = _('era_choice')
            for (let i = 0; i<eras.length; i++) {
                let e = eras[i]
                var era = document.createElement('input')
                era.setAttribute('type', 'radio')
                era.setAttribute('name', 'era')
                era.value = e
                if (i == 0) era.checked = true
                var eraLabel = document.createElement('label')
                eraLabel.appendChild(era)
                eraLabel.innerHTML += _(e+'_era')
                eraLabel.onclick = function() {
                    if (selectedEra != e) {
                        selectedEra = e
                        eraComment.innerHTML = _(e+'_era_descr')
                    }
                }
                newGameParams.appendChild(eraLabel)
            }
            newGameParams.appendChild(eraComment)

            var table = document.createElement('table')
            table.id = 'race_choice'
            let cells = [
                ['swamp', 'wind'],
                ['forest', 'mist']
            ];
            var selectedRace = ''
            var raceName = document.createElement('h3')
            raceName.innerHTML = _('none')
            var raceComment = document.createElement('p')
            raceComment.innerHTML = _('race_choice')
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
                            raceName.innerHTML = _(race+'_race')
                            raceComment.innerHTML = _(race+'_race_descr')
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

            var seasonComment = document.createElement('p')
            seasonComment.innerHTML = _('summer_descr')
            var season = document.createElement('select')
            season.onchange = function() {
                seasonComment.innerHTML = _(this.value+'_descr')
            }
            opts = ['winter', 'spring', 'summer', 'autumn']
            for (let i = 0; i < opts.length; i++) {
                let o = opts[i]
                var option = document.createElement('option')
                option.value = o
                option.innerHTML = _(o)
                if (o == 'summer') {
                    option.setAttribute('selected', 'selected')
                }
                season.appendChild(option)
            }
            newGameParams.appendChild(season)
            newGameParams.appendChild(seasonComment)

            var newGameStart = document.createElement('div')
            newGameStart.style.borderBottom = '1px solid white';
            let header = headerWithHeight(_('start_new_game_header'), headerHeight)
            let button = createButton(_('start_new_game'), function() {
                let params = {
                    difficulty: difficulty.value,
                    era: selectedEra,
                    race: selectedRace,
                    season: season.value
                }
                if (params.difficulty && params.era && params.race && params.season) {
                    mm.remove()
                    showLoadingGame()
                    startNewGame(params)
                } else {
                    let warnings = _('warning_not_enough_data_new_game');
                    if (!params.difficulty) warnings += '\n' + _('warning_enter_difficulty');
                    if (!params.era) warnings += '\n' + _('warning_enter_era');
                    if (!params.race) warnings += '\n' + _('warning_enter_race');
                    if (!params.season) warnings += '\n' + _('warning_enter_season');
                    alert(warnings);
                }
            }, null, buttonStartHeight+'px')
            newGameStart.appendChild(header)
            newGameStart.appendChild(button)

            newGameBlock.appendChild(newGameStart)
            newGameBlock.appendChild(newGameParams)
            mm.appendChild(newGameBlock)
        },
        function () {
            if (loadGameList) return;
            if (newGameBlock) {
                newGameBlock.remove();
                newGameBlock = null;
            }
            if (credits) {
                credits.remove();
                credits = null;
            }
            if (encycBlock) {
                encycBlock.remove();
                encycBlock = null;
            }

            loadGameList = document.createElement('div')
            loadGameList.className = "right_main_menu_panel main_view_block"
            mm.appendChild(loadGameList)
        },
        function () {
            if (encycBlock) return;
            if (newGameBlock) {
                newGameBlock.remove();
                newGameBlock = null;
            }
            if (loadGameList) {
                loadGameList.remove();
                loadGameList = null;
            }
            if (credits) {
                credits.remove();
                credits = null;
            }

            encycBlock = document.createElement('div')
            encycBlock.className = "right_main_menu_panel main_view_block"
            mm.appendChild(encycBlock)
        },
        function () {
            if (credits) return;
            if (newGameBlock) {
                newGameBlock.remove();
                newGameBlock = null;
            }
            if (loadGameList) {
                loadGameList.remove();
                loadGameList = null;
            }
            if (encycBlock) {
                encycBlock.remove();
                encycBlock = null;
            }

            credits = document.createElement('div')
            credits.className = "right_main_menu_panel main_view_block"
            let header = headerWithHeight(_('credits_header'), 50)
            credits.appendChild(header)
            var text = document.createElement('p')
            fs.readFile(path.join(__dirname, 'CREDITS.txt'), 'utf8', function(err, contents) {
                if (err) text.innerHTML = err;
                else text.innerHTML = contents.replace(/\n/g, "<br>");
            });
            credits.appendChild(text)
            mm.appendChild(credits)
        },
        function () {
            let sure = confirm(_('sure_to_exit'))
            if (sure) {
                const remote = require('electron').remote
                let w = remote.getCurrentWindow()
                w.close()
            }
        }
    ];
    for (let i = 0; i<mainOptions.length; i++) {
        let li = document.createElement('li');
        li.appendChild(createButton(_(mainOptions[i]), onclicks[i]))
        list.appendChild(li)
    }
    mm.appendChild(list)
    con.appendChild(mm)
}

mainMenu();
log('init.')