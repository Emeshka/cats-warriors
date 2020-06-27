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

window.sound = require(path.join(__dirname, 'sound.js'))
const game = require(path.join(__dirname, 'game.js'))

function quit() {
    const remote = require('electron').remote
    let w = remote.getCurrentWindow()
    w.close()
}

/* ------------------------------------------------------------------------------- */

// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number*1-1] != 'undefined' ? args[number*1-1] : match;
        });
    };
}

function printDate(date) {
    let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july',
        'august', 'september', 'october', 'november', 'december']
    let nth = _('nth_of_' + months[date.getMonth()]).format(date.getDate());
    let time = _('standard_time_format').format(
        date.getHours() < 10 ? '0'+date.getHours() : date.getHours(), 
        date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes(), 
        date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds())
    return _('standard_date_format').format(date.getFullYear(), nth, time);
}

function textAtmoDate(date) {
    switch (date.getMonth()) {
        case 0: var s2 = 'winter'; var phase = ''; break;
        case 1: var s2 = 'winter'; var phase = 'later_season'; break;
        case 2: var s2 = 'spring'; var phase = 'early_season'; break;
        case 3: var s2 = 'spring'; var phase = ''; break;
        case 4: var s2 = 'spring'; var phase = 'later_season'; break;
        case 5: var s2 = 'summer'; var phase = 'early_season'; break;
        case 6: var s2 = 'summer'; var phase = ''; break;
        case 7: var s2 = 'summer'; var phase = 'later_season'; break;
        case 8: var s2 = 'autumn'; var phase = 'early_season'; break;
        case 9: var s2 = 'autumn'; var phase = ''; break;
        case 10: var s2 = 'autumn'; var phase = 'later_season'; break;
        case 11: var s2 = 'winter'; var phase = 'early_season'; break;
    }
    if (date.getHours() < 4 || date.getHours() > 22) {
        var daytime = 'night'
    } else if (date.getHours() >= 4 && date.getHours() < 10) {
        var daytime = 'morning'
    } else if (date.getHours() >= 10 && date.getHours() < 16) {
        var daytime = 'day'
    } else {
        var daytime = 'evening'
    }
    return _('atmo_date_format').format(_(phase), _(s2), _(daytime));
}

function printAtmoDate(date) {
    switch (date.getMonth()) {
        case 0: var s = 'winter'; var s2 = 'winter'; var s3 = 'winter'; var phase = ''; break;
        case 1: var s = 'winter'; var s2 = 'winter'; var s3 = 'spring'; var phase = 'later_season'; break;
        case 2: var s = 'winter'; var s2 = 'spring'; var s3 = 'spring'; var phase = 'early_season'; break;
        case 3: var s = 'spring'; var s2 = 'spring'; var s3 = 'spring'; var phase = ''; break;
        case 4: var s = 'spring'; var s2 = 'spring'; var s3 = 'summer'; var phase = 'later_season'; break;
        case 5: var s = 'spring'; var s2 = 'summer'; var s3 = 'summer'; var phase = 'early_season'; break;
        case 6: var s = 'summer'; var s2 = 'summer'; var s3 = 'summer'; var phase = ''; break;
        case 7: var s = 'summer'; var s2 = 'summer'; var s3 = 'autumn'; var phase = 'later_season'; break;
        case 8: var s = 'summer'; var s2 = 'autumn'; var s3 = 'autumn'; var phase = 'early_season'; break;
        case 9: var s = 'autumn'; var s2 = 'autumn'; var s3 = 'autumn'; var phase = ''; break;
        case 10: var s = 'autumn'; var s2 = 'autumn'; var s3 = 'winter'; var phase = 'later_season'; break;
        case 11: var s = 'autumn'; var s2 = 'winter'; var s3 = 'winter'; var phase = 'early_season'; break;
    }
    if (date.getHours() < 4 || date.getHours() > 22) {
        var daytime = 'night'
    } else if (date.getHours() >= 4 && date.getHours() < 10) {
        var daytime = 'morning'
    } else if (date.getHours() >= 10 && date.getHours() < 16) {
        var daytime = 'day'
    } else {
        var daytime = 'evening'
    }
    let atmoDateTime = document.createElement('div')
    let atmoDate1 = document.createElement('img')
    atmoDate1.className = 'atmo_date_time_img'
    atmoDate1.src = 'textures/'+s+'.png'
    let atmoDate2 = document.createElement('img')
    atmoDate2.className = 'atmo_date_time_img'
    atmoDate2.src = 'textures/'+s2+'.png'
    let atmoDate3 = document.createElement('img')
    atmoDate3.className = 'atmo_date_time_img'
    atmoDate3.src = 'textures/'+s3+'.png'
    let atmoTime = document.createElement('img')
    atmoTime.className = 'atmo_date_time_img'
    atmoTime.src = 'textures/'+daytime+'.png'
    atmoDateTime.title = _('atmo_date_format').format(_(phase), _(s2), _(daytime));
    atmoDateTime.appendChild(atmoTime)
    atmoDateTime.innerHTML += ' - '
    atmoDateTime.appendChild(atmoDate1)
    atmoDateTime.appendChild(atmoDate2)
    atmoDateTime.appendChild(atmoDate3)
    return atmoDateTime;
}

function prettyPrintAge(monthsAmount) {
    if (monthsAmount >= 12) {
        let yearsAmount = monthsAmount / 12
        monthsAmount = monthsAmount % 12
        str = _('age_n_years_m_months').format(Math.floor(yearsAmount), Math.floor(monthsAmount))
    } else {
        str = _('age_n_months').format(Math.floor(monthsAmount))
    }
    return str
}

var getAge = function(birthDate, currentDate) {
    return (currentDate.getTime() - birthDate.getTime()) / (1000*60*60*24*30)
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

// загрузочный экран
function loadingScreen() {
    let con = document.body;
    con.style.backgroundImage = "url('textures/trilobite.jpg')"
    let loading = document.createElement('div')
    loading.innerHTML = _('loading')
    loading.className = 'loading_screen game_view_block'
    con.appendChild(loading)
}

function removeLoadingScreen() {
    con.children[0].remove();
}

function mainMenu() {
    if (sound.ready) {
        if (!sound.tagsByName['main_menu_loop']) sound.play('main_menu_loop', true, true, 2)
    } else {
        sound.container.addEventListener('soundsystemready', function() {
            sound.play('main_menu_loop', true, true, 2)
            sound.container.removeEventListener('soundsystemready', arguments.callee);
        })
    }
    var con = document.body;
    con.style.backgroundImage = "url('textures/main_menu.jpg')"
    var effectLayer = document.createElement('div')
    effectLayer.className = 'effect_layer'
    effectLayer.style.opacity = '0.7'
    //effectLayer.style.backgroundImage = "url('effects/wind_dust.webp')"
    con.appendChild(effectLayer)
    var mm = document.createElement('div');
    mm.id = "main_menu"
    mm.appendChild(createSpacer())

    // функция, рекурсивно превращающая иерархически структурированный объект data в DOM Element в виде ПДА
    function createPdaElementFromData(data, type, preopened) {
        let div = document.createElement('div')
        let leftColumn = document.createElement('div')
        leftColumn.className = type+'_left_column'
        let rightColumn = document.createElement('div')
        rightColumn.className = type+'_right_column'
        var articleList = [];
        if (type == 'tbook') {
            var page1 = document.createElement('div')
            page1.className = 'tbook_page tbook_lpage'
            rightColumn.appendChild(page1)
            var page2 = document.createElement('div')
            page2.className = 'tbook_page tbook_rpage'
            rightColumn.appendChild(page2)
            var pageNum = 0;
            var currentArticle = '';
            var next = document.createElement('div')
            next.className = 'tbook_next'
            next.onclick = function() {
                pageNum += 2
                if (pageNum >= _(currentArticle+'_pda_article').split('<endpage>').length) {
                    let nextArticleIndex = articleList.indexOf(currentArticle)+1
                    if (nextArticleIndex >= articleList.length) {
                        pageNum -= 2
                        return;
                    }
                    currentArticle = articleList[nextArticleIndex]
                    pageNum = 0
                }
                getTbookArticle(currentArticle)
            }
            rightColumn.appendChild(next)
            var previous = document.createElement('div')
            previous.className = 'tbook_previous'
            previous.onclick = function() {
                pageNum -= 2
                if (pageNum < 0) {
                    let prevArticleIndex = articleList.indexOf(currentArticle)-1
                    if (prevArticleIndex < 0) {
                        pageNum += 2
                        return;
                    }
                    currentArticle = articleList[prevArticleIndex]
                    pageNum = _(currentArticle+'_pda_article').split('<endpage>').length - 1
                    pageNum = (pageNum % 2 == 0) ? pageNum : pageNum-1
                }
                getTbookArticle(currentArticle)
            }
            rightColumn.appendChild(previous)
        }

        function articleRecordLink(text) {
            let entry = document.createElement("div")
            entry.innerHTML = text;
            entry.className = type+'_left_column_entry'
            return entry;
        }

        function articleFolder(text) {
            let entry = document.createElement("div")
            entry.innerHTML = text;
            entry.className = type+'_left_column_entry '+type+'_left_column_entry_class'
            return entry;
        }

        var selectedEntry = null;
        function getPdaArticle(key) {
            rightColumn.innerHTML = _(key+'_pda_article').replace(/\n/g, "<br>")
        }
        function getTbookArticle(key) {
            let fullText = _(key+'_pda_article').replace(/\n/g, "<br>").split('<endpage>')
            page1.innerHTML = fullText[pageNum]
            page2.innerHTML = fullText[pageNum+1] ? fullText[pageNum+1] : ''
        }
        function parseLevel(data, leftColumnContainer) {
            for (let key in data) {
                let value = data[key]
                if (value == 1) {//простая статья в пда
                    let articleLink = articleRecordLink(_(key+'_pda_record'))
                    articleLink.onclick = function() {
                        if (type == 'pda') {
                            getPdaArticle(key)
                        } else {
                            currentArticle = key
                            pageNum = 0
                            getTbookArticle(key)
                        }
                        this.className = type+'_left_column_entry '+type+'_left_column_entry_selected';
                        if (selectedEntry && selectedEntry != this) selectedEntry.className = type+'_left_column_entry';
                        selectedEntry = this;
                    };
                    leftColumnContainer.appendChild(articleLink)
                    if (type == 'tbook') articleList.push(key)
                } else {//папка в пда
                    let articleFolderToggle = articleFolder(_(key+'_pda_folder'))
                    let invisContainer = document.createElement('div')
                    invisContainer.style.display = 'none';
                    invisContainer.className = type+'_left_column_class_childnodes_block';
                    parseLevel(value, invisContainer)
                    articleFolderToggle.onclick = function() {
                        if (invisContainer.style.display == 'none') {
                            invisContainer.style.display = 'block';
                            this.className += ' '+type+'_left_column_entry_class_opened'
                        } else {
                            invisContainer.style.display = 'none';
                            this.className = type+'_left_column_entry '+type+'_left_column_entry_class'
                        }
                    }
                    leftColumnContainer.appendChild(articleFolderToggle)
                    leftColumnContainer.appendChild(invisContainer)
                }
            }
        }
        parseLevel(data, leftColumn)
        if (preopened) {
            if (type == 'pda') {
                getPdaArticle(preopened)
            } else {
                getTbookArticle(preopened)
                currentArticle = preopened
            }
        }
        if (type == 'tbook') {
            div.appendChild(rightColumn);
            div.appendChild(leftColumn);
        } else {
            div.appendChild(leftColumn);
            div.appendChild(rightColumn);
        }
        return div;
    }

    var selectedSavedGame = null;
    function savedGameEntry(filename, game, entryOnclick) {
        let div = document.createElement('div')
        div.className = 'saved_game_entry'

        let leftColumn = document.createElement('div')
        leftColumn.className = 'saved_game_info_part'
        let rightColumn = document.createElement('div')
        rightColumn.className = 'saved_game_img_part'

        if (game) {
            let gameName = filename.substring(0, filename.length - 5);
            let nameBlock = document.createElement('div');
            nameBlock.className = 'saved_game_name';
            nameBlock.innerHTML = gameName;
            let savedTimestamp = document.createElement('div');
            savedTimestamp.className = 'saved_game_timestamp';
            savedTimestamp.innerHTML = printDate(new Date(game.savedTimestamp));
            nameBlock.appendChild(savedTimestamp)
            nameBlock.title = _('saved_game_name_block_title').format(gameName, savedTimestamp.innerHTML);

            let actorBlock = document.createElement('div');
            actorBlock.className = 'saved_game_actor';
            let gender = document.createElement('img');
            gender.className = 'saved_game_gender';
            gender.src = "textures/"+game.actor.gender+"_icon.png";
            let actorName = document.createElement('div');
            actorName.className = 'saved_game_actor_name';
            actorName.innerHTML = game.actor.name;
            let age = document.createElement('div');
            age.className = 'saved_game_age';
            age.innerHTML = prettyPrintAge(getAge(new Date(game.actor.birthDate), new Date(game.date)));
            let gameDate = document.createElement('div');
            gameDate.className = 'saved_game_date';
            gameDate.appendChild(printAtmoDate(new Date(game.date)));
            actorBlock.appendChild(gender)
            actorBlock.appendChild(actorName)
            actorBlock.appendChild(age)
            actorBlock.appendChild(gameDate)
            actorBlock.title = _('saved_game_actor_block_title')
                .format(game.actor.name, age.innerHTML, textAtmoDate(new Date(game.date)));

            leftColumn.appendChild(nameBlock)
            leftColumn.appendChild(actorBlock)

            rightColumn.style.backgroundImage = "url('"+game.savedActivityBg+"')";
        } else {
            let corruptedSave = document.createElement('div')
            corruptedSave.innerHTML = filename+'<br>'+_('error_read_saved_game');
            corruptedSave.style.verticalAlign = 'middle'
            corruptedSave.style.display = 'inline-block'
            leftColumn.appendChild(corruptedSave)
            leftColumn.appendChild(createSpacer())
            leftColumn.title = _('error_read_saved_game');
            rightColumn.style.backgroundImage = "url('textures/invalid_saved_game.gif')";
        }

        div.appendChild(leftColumn)
        div.appendChild(rightColumn)
        div.onclick = function() {
            this.className = 'saved_game_entry saved_game_entry_selected';
            if (selectedSavedGame && selectedSavedGame != this) selectedSavedGame.className = 'saved_game_entry';
            selectedSavedGame = this;
            entryOnclick()
        }
        return div;
    }

    function emptySavedEntry() {
        let div = document.createElement('div')
        div.className = 'saved_game_entry saved_game_entry_empty'
        div.innerHTML = _('saves_folder_is_empty')
        return div
    }

    function createSavedGameList(entryOnclick, invalidEntryOnclick) {
        let gameList = document.createElement('div')
        gameList.className = 'main_menu_block_under_header'
        gameList.style.maxHeight = 'calc(100vh - 60px - 50px - 30px)';
        let savesFolder = path.join(__dirname, 'saves')
        if (fs.existsSync(savesFolder)) {
            fs.readdir(savesFolder, {withFileTypes: true}, function(err, files) {
                if (err) {
                    console.log('Unable to scan directory: ' + err)
                    gameList.innerHTML = _('error_scan_saves_directory');
                    quit();
                }
                if (!files.length) {
                    gameList.appendChild(emptySavedEntry())
                } else {
                    files.forEach(function(file) {
                        if (!file.isDirectory() && file.name.endsWith(".json")) {
                            let filepath = savesFolder + "/" + file.name;
                            fs.readFile(filepath, 'utf-8', function(readFileErr, content) {
                                let entry = null, object = {}, validJson = true;
                                try {
                                    object = JSON.parse(content)
                                } catch (parseError) {
                                    console.log(parseError)
                                    validJson = false
                                }
                                let validGame = ('savedTimestamp' in object) && ('date' in object) 
                                    && ('actor' in object) && ('sublocation' in object) 
                                    && ('savedActivityBg' in object) && ('map' in object)
                                if (readFileErr || !validJson || !validGame) {
                                    console.log('Unable to read saved game: readFileErr=' + readFileErr
                                        + ', validJson=' + validJson + ', validGame=' + validGame)
                                    entry = savedGameEntry(file.name, null, invalidEntryOnclick)
                                    gameList.appendChild(entry)
                                } else {
                                    entry = savedGameEntry(file.name, object, entryOnclick)
                                }
                                entry.dataset.path = filepath;
                                gameList.appendChild(entry)
                            });
                        }
                    });
                }
            });
        } else {
            fs.mkdir(savesFolder, {}, (err) => {
                if (err) {
                    console.log('Unable to create directory: ' + err)
                    gameList.innerHTML = _('error_create_saves_directory');
                    quit()
                }
                else {
                    gameList.appendChild(emptySavedEntry())
                }
            });
        }
        return gameList
    }

    function createHeader(text) {
        let header = document.createElement("span")
        header.innerHTML = text
        header.className = 'main_menu_header'
        return header
    }

    var list = document.createElement('ul');
    list.className = "left_main_menu_panel"
    var newGameBlock = null, loadGameList = null, helpBlock = null, credits = null;
    var mainOptions = ['new_game', 'load', 'tbook', 'help', 'credits', 'exit'];
    var onclicks = [
        function () {
            if (newGameBlock) return;
            if (loadGameList) {
                loadGameList.remove();
                loadGameList = null;
                selectedSavedGame = null;
            }
            if (credits) {
                credits.remove();
                credits = null;
            }
            if (helpBlock) {
                helpBlock.remove();
                helpBlock = null;
            }

            newGameBlock = document.createElement('div')
            newGameBlock.className = "game_view_block right_main_menu_panel"
            let buttonStartHeight = 30;
            var newGameParams = document.createElement('div')
            newGameParams.className = 'main_menu_block_under_header'
            newGameParams.style.maxHeight = 'calc(100vh - 60px - 50px - '+buttonStartHeight+'px)';

            let genders = ['female', 'male']
            var selectedGender = 'male'
            var genderComment = document.createElement('p')
            genderComment.innerHTML = _('male_comment')
            for (let i = 0; i<genders.length; i++) {
                let e = genders[i]
                var gender = document.createElement('input')
                gender.setAttribute('type', 'radio')
                gender.setAttribute('name', 'gender')
                gender.value = e
                if (i == 1) gender.setAttribute('checked', 'checked')
                var genderLabel = document.createElement('label')
                genderLabel.appendChild(gender)
                genderLabel.innerHTML += _(e)
                genderLabel.onclick = function() {
                    if (selectedGender != e) {
                        selectedGender = e
                        genderComment.innerHTML = _(e+'_comment')
                    }
                }
                newGameParams.appendChild(genderLabel)
            }
            newGameParams.appendChild(genderComment)

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
                ['hurricane', 'mist'],
                ['swamp', 'forest']
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
            let header = createHeader(_('start_new_game_header'))
            let button = createButton(_('start_new_game'), function() {
                let params = {
                    gender: selectedGender,
                    difficulty: difficulty.value,
                    era: selectedEra,
                    race: selectedRace,
                    season: season.value
                }
                if (params.gender && params.difficulty && params.era && params.race && params.season) {
                    mm.remove()
                    loadingScreen()
                    game.startNewGame(params)
                } else {
                    let warnings = _('warning_not_enough_data_new_game');
                    if (!params.gender) warnings += '\n' + _('warning_enter_gender');
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
            mm.insertBefore(newGameBlock, mm.firstChild)
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
            if (helpBlock) {
                helpBlock.remove();
                helpBlock = null;
            }

            loadGameList = document.createElement('div')
            loadGameList.className = "right_main_menu_panel game_view_block"

            let header = createHeader(_('load_game_header'))
            header.style.display = 'block'
            let gameList = createSavedGameList(function() {
                deleteButton.removeAttribute('disabled')
                loadButton.removeAttribute('disabled')
            }, function() {
                deleteButton.removeAttribute('disabled')
                loadButton.setAttribute('disabled', 'disabled')
            })
            let deleteButton = createButton(_('delete_saved_game'), function() {
                let sure = confirm(_('sure_to_delete_saved_game'))
                if (sure) {
                    let filepath = selectedSavedGame.dataset.path;
                    fs.unlink(filepath, (err) => {
                        if (err) {
                            console.log('Unable to delete saved game: ' + err)
                            alert(_('error_delete_saved_game'))
                        } else {
                            selectedSavedGame.remove();
                            if (gameList.children.length == 0) gameList.appendChild(emptySavedEntry())
                            selectedSavedGame = null;
                            deleteButton.setAttribute('disabled', 'disabled')
                            loadButton.setAttribute('disabled', 'disabled')
                        }
                    });
                }
            }, '40%', '30px')
            deleteButton.setAttribute('disabled', 'disabled')
            let loadButton = createButton(_('load_saved_game'), function() {
                mm.remove()
                loadingScreen()
                let filepath = selectedSavedGame.dataset.path;
                fs.readFile(filepath, 'utf-8', function(readFileErr, content) {
                    let object = {}, validJson = true;
                    try {
                        object = JSON.parse(content)
                    } catch (parseError) {
                        console.log(parseError)
                        validJson = false
                    }
                    if (readFileErr || !validJson) {
                        if (readFileErr) {
                            alert(_('error_load_saved_game_io').format(readFileErr, filepath))
                            console.log(readFileErr)
                        } else if (!validJson) {
                            alert(_('error_load_saved_game_corrupted').format(filepath))
                        }
                        removeLoadingScreen();
                        mainMenu();
                    } else {
                        try {
                            game.loadGame()
                            sound.clearSingleInstance('main_menu_loop');
                        } catch (corrupted) {
                            alert(_('error_load_saved_game_corrupted').format(filepath))
                            removeLoadingScreen();
                            mainMenu();
                        }
                    }
                });
                selectedSavedGame = null;
            }, '40%', '30px')
            loadButton.setAttribute('disabled', 'disabled')
            let headerDiv = document.createElement('div')
            headerDiv.style.borderBottom = '1px solid white';
            headerDiv.appendChild(header)
            headerDiv.appendChild(deleteButton)
            headerDiv.appendChild(loadButton)
            loadGameList.appendChild(headerDiv)
            loadGameList.appendChild(gameList)
            mm.insertBefore(loadGameList, mm.firstChild)
        },
        function () {
            mm.remove()
            effectLayer.remove()

            var tbookBlock = document.createElement('div')
            tbookBlock.className = "tbook_view effect_layer"

            let articleStructure = {
                'about_tbook':1,
                'world': {'basic_warrior_cats_society':1, 'social_structure':1, 'eras':1,
                        'maps':1, 'groupings':1, 'enemies_and_dangers':1}
            };
            let pda = createPdaElementFromData(articleStructure, 'tbook', 'about_tbook')
            pda.className = 'tbook_book';
            pda.appendChild(createSpacer())
            tbookBlock.appendChild(pda)
            let backBtn = document.createElement('div')
            backBtn.className = 'tbook_back_btn'
            backBtn.onclick = function() {
                tbookBlock.remove();
                mainMenu();
            }
            tbookBlock.appendChild(backBtn)
            con.appendChild(tbookBlock)
        },
        function () {
            if (helpBlock) return;
            if (newGameBlock) {
                newGameBlock.remove();
                newGameBlock = null;
            }
            if (loadGameList) {
                loadGameList.remove();
                loadGameList = null;
                selectedSavedGame = null;
            }
            if (credits) {
                credits.remove();
                credits = null;
            }

            helpBlock = document.createElement('div')
            helpBlock.className = "right_main_menu_panel game_view_block"

            let header = createHeader(_('help_header'))
            let articleStructure = {
                'interface': {'main_menu_interface':1, 'game_interface':1},
                'gameplay': {'basic_gameplay':1, 'upgrading_character':1, 'quests':1,
                        'lifesigns':1, 'reputation':1, 'status':1, 'dialog_history':1, 'map':1}
            };
            let pda = createPdaElementFromData(articleStructure, 'pda')
            helpBlock.appendChild(header)
            helpBlock.appendChild(pda)
            mm.insertBefore(helpBlock, mm.firstChild)
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
                selectedSavedGame = null;
            }
            if (helpBlock) {
                helpBlock.remove();
                helpBlock = null;
            }

            credits = document.createElement('div')
            credits.className = "right_main_menu_panel game_view_block"
            let header = createHeader(_('credits_header'))
            credits.appendChild(header)
            var text = document.createElement('div')
            text.className = 'main_menu_block_under_header'
            text.style.maxHeight = 'calc(100vh - 60px - 50px)';
            fs.readFile(path.join(__dirname, 'CREDITS.txt'), 'utf8', function(err, contents) {
                if (err) {
                    console.log('Unable to read file:' + err)
                    text.innerHTML = _('error_read_credits');
                }
                else text.innerHTML = contents.replace(/\n/g, "<br>");
            });
            credits.appendChild(text)
            mm.insertBefore(credits, mm.firstChild)
        },
        function () {
            let sure = confirm(_('sure_to_exit'))
            if (sure) quit();
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