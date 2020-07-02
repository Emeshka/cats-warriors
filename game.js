exports.checkOptionTargetActivity = true
const namesDB = require(path.join(__dirname, 'namesDB.js'));

// аллели
var geneDominant = function(options, a1, a2) {
	if (!a2) return a1;
	return (options.indexOf(a1) >= options.indexOf(a2)) ? a1 : a2
}
var geneMix = function(options, a1, a2) {
	if (!a2) return a1;
	return (a1 == a2) ? a1 : ((options.indexOf(a1) < options.indexOf(a2)) ? a1+a2 : a2+a1)
}
var geneAverage = function(options, a1, a2) {
	if (!a2) return a1;
	return options[Math.floor((options.indexOf(a1) + options.indexOf(a2))/2)]
}
var allels = {
	white: {
		options: ['0', 'W'],
		combine: geneDominant
	},
	mainColor: {
		options: ['o', 'r'],
		combine: geneMix
	},
	tabby: {
		options: ['a', 'Ta', 'Tb'],
		combine: function(options, a1, a2, otherGenes) {
			if (otherGenes.get('mainColor') == 'r') {
				if (a1 == 'a') a1 = 'Ta'
				if (a2 == 'a') a2 = 'Ta'
			}
			return geneDominant(options, a1, a2)
		}
	},
	dilute: {
		options: ['DD', 'd'],
		combine: geneDominant
	},
	browning: {
		options: ['b0', 'bl', 'b'],
		combine: function(options, a1, a2, otherGenes) {
			if (otherGenes.get('mainColor') == 'r') return 'b'
			return geneDominant(options, a1, a2)
		}
	},
	spots: {
		options: ['s', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
		combine: geneAverage
	},
	eyesShade: {
		options: ['darkblue', 'blue', 'green', 'greenyellow', 'yellow', 'amber'],
		combine: function(options, a1, a2, otherGenes) {
			let index1 = options.indexOf(a1)
			let index2 = options.indexOf(a2)
			if (otherGenes.get('white') == 'W') {
				return ((index1 + index2)/2 > (options.length - 1)/2) ? 'blue' : 'darkblue'
			} else return geneAverage(options, a1, a2)
		}
	},
	fur: {
		options: ['shortfur', 'averagefur', 'longfur'],
		combine: geneAverage
	},
	height: {
		options: ['short', 'averageheight', 'long'],
		combine: geneAverage
	}
}

var game = null
var gameTimeouts = {}
var sublocationTimeouts = {}

// УБРАТЬ экспорт когда не надо
//exports.getGame = function() {return game}

function generateName(exterior) {
	return 'temp name'
}

// создание персонажа (ГГ или НПС)
function createCharacter(params) {
	let ch = {}
    ch._health = 1 // здоровье (потом разбить на составляющие)
    ch._actionPower = 1 // максимальная сила, с которой можно выполнить действие (усталость мышц)
    ch._muscularity = 0 // накачанность мышц (достигается тренировками)
    ch._satiety = 1 // сытость
    ch._water = 1 // потребность в воде
    ch._freshness = 1 // выспанность, бодрость (потребность во сне)

    ch._gender = params.gender
    ch._race = params.race
    ch.birthDate = params.birthDate
    ch._status = params.status

    // внешний вид
	let rand = function(array) {
		return array[Math.floor(array.length * Math.random())]
	}
    ch.exterior = {}
    for (let gene in allels) {
    	let opts = allels[gene].options
    	if (gene == 'mainColor' && ch.gender == 'male') ch.exterior[gene] = [rand(opts)]
    	else if (gene == 'spots') {
			let randS = function(array) {
				if (Math.random() < 1/3) return array[0];
				return array[1 + Math.floor((array.length-1) * Math.random())]
			}
    		ch.exterior[gene] = [randS(opts), randS(opts)]
    	}
    	else ch.exterior[gene] = [rand(opts), rand(opts)]
    }
	let faceVariants = {shortfur:1, averagefur:2, longfur:2}
	let arr = ch.exterior.fur
	let chFur = allels.fur.combine(allels.fur.options, arr[0], arr[1], ch.exterior)
	let chFaceVariants = faceVariants[chFur]
	ch.exterior.face = (chFaceVariants >= 2) ? 1+Math.floor(Math.random()*chFaceVariants) : ''

    bindCharacterMethods(ch)
    ch._name = generateName(ch.exterior)
    return ch
}

function bindCharacterMethods(ch) {
	ch.getAge = function() {
		return getAge(ch.birthDate, game.date)
	}
	ch.prettyPrintAge = function() {
		return prettyPrintAge(ch.getAge())
	}
	ch.exterior.get = function(geneName) {
		let arr = ch.exterior[geneName]
		return allels[geneName].combine(allels[geneName].options, arr[0], arr[1], ch.exterior)
	}
	ch.exterior.getModel = function() {
		let model = 'models/colors/'
		let eyes = 'models/eyes/'
		let spots = 'models/spots/'

		let bodyShape = ''
		bodyShape += ch.exterior.get('fur') + ch.exterior.face + '-'
		bodyShape += ch.exterior.get('height') + '-'

		if (ch.muscularity < 0.33) bodyShape += 'skinny-'
		else if (ch.muscularity < 0.75) bodyShape += 'normal-'
		else bodyShape += 'athlete-'

		let age = ch.getAge()
		if (age < 0.4) bodyShape += 'newborn'
		else if (age < 4) bodyShape += 'kitten'
		else if (age < 12*12) bodyShape += 'adult'
		else bodyShape += 'old'

		let w = ch.exterior.get('white')
		if (w == 'W') {
			model += w
		} else {
			model += ch.exterior.get('mainColor') + '-'
			model += ch.exterior.get('browning') + '-'
			model += ch.exterior.get('dilute') + '-'
			model += ch.exterior.get('tabby') + '-'
		}
		model += bodyShape
		model += '.png'

		eyes += ch.exterior.get('eyesShade') + '-'
		eyes += bodyShape
		eyes += '.png'

		let s = ch.exterior.get('spots')
		if (s == 's') {
			spots = ''
		} else {
			spots += s + '-'
			spots += bodyShape
			spots += '.png'
		}
		return {
			model: model,
			spots: spots,
			eyes: eyes
		}
	}
}

exports.startNewGame = function(params) {
    // базовые свойства игры
    game = {}
    game.savedTimestamp = null
    game.savedActivityBg = null
    game.difficulty_level = params.difficulty.charAt(params.difficulty.length-1) * 1
    game.map = params.era

    // текущая дата и день рождения
    let birthDate = 0;
    if (params.era == 'old') {
    	birthDate = new Date(1990, -1, 1).getTime()
    } else {
    	birthDate = new Date(2020, -1, 1).getTime()
    }
    let season = 91.5*24*60*60*1000
    let randomShift = Math.floor(Math.random() * season)
    if (params.season == 'winter') {
    	birthDate = new Date(birthDate + randomShift)
    } else if (params.season == 'spring') {
    	birthDate = new Date(birthDate + randomShift + season)
    } else if (params.season == 'summer') {
    	birthDate = new Date(birthDate + randomShift + 2*season)
    } else {
    	birthDate = new Date(birthDate + randomShift + 3*season)
    }
    game._date = birthDate
    game.printAtmoDate = function() {
    	return printAtmoDate(game._date)
    }
    game.textAtmoDate = function() {
    	return textAtmoDate(game._date)
    }
    game.getSeason = function() {
    	let s = ''
    	switch (game._date.getMonth()) {
    		case 11: case 0: case 1: s = 'winter'; break;
    		case 2: case 3: case 4: s = 'spring'; break;
    		case 5: case 6: case 7: s = 'summer'; break;
    		case 8: case 9: case 10: s = 'autumn'; break;
    	}
    	return s
    }
    // персонаж
    game.actor = createCharacter({
    	race: params.race,
    	gender: params.gender,
    	birthDate: birthDate,
    	age: 0,
    	status: 'kit'
    })

    game._activity = "map"+game.map+"."+game.actor._race+"_camp"
    game._sublocation = game.actor._race + "_camp"
	game.setSublocationTimeout = function(func, timeout) {
		var t = null;
		var modFunc = function() {
			func();
			delete sublocationTimeouts[t];
		};
		t = setTimeout(modFunc, timeout);
	    sublocationTimeouts[t] = [func, new Date().getTime() + timeout];
	}
	game.setTimeout = function(func, timeout) {
		var t = null;
		var modFunc = function() {
			func();
			delete gameTimeouts[t];
		};
		t = setTimeout(modFunc, timeout);
	    gameTimeouts[t] = [func, new Date().getTime() + timeout];
	}

    log(game)
    buildInterface()
}

exports.loadGame = function(gameObj) {
    //
}

exports.stringifyCurrentGame = function() {
	game.savedTimestamp = new Date().getTime()
	game.date = game.date.getTime()
	game.actor.birthDate = game.actor.birthDate.getTime()
	let str = JSON.stringify(game)
	game.savedTimestamp = new Date(game.savedTimestamp)
	game.date = new Date(game.date)
	game.actor.birthDate = new Date(game.actor.birthDate)
	return str
}

///////////////////////////////////////////////////////////////////////////////////

function buildInterface() {
	var con = document.body
	var interface = document.createElement('div')
	interface.className = 'effect_layer'

	var textView = document.createElement('div')
	textView.className = 'text_view game_view_block'
	textView.innerHTML = 'блок текста'
	var optView = document.createElement('div')
	optView.className = 'opt_view game_view_block'
	optView.innerHTML = 'опции'
	var imgView = document.createElement('div')
	imgView.className = 'img_view game_view_block'
	var testImg = document.createElement('img')

	var info = document.createElement('div')
	info.className = 'info_block game_view_block'
	var dateBlock = document.createElement('div')
	let atmoDate = game.printAtmoDate()
	atmoDate.className = 'date_block'
	dateBlock.appendChild(atmoDate)
	info.appendChild(dateBlock)
	var sublocBlock = document.createElement('div')
	sublocBlock.className = 'subloc_block'
	sublocBlock.innerHTML = _("loc_"+game._sublocation)
	info.appendChild(sublocBlock)

	var raceBlock = document.createElement('div')
	raceBlock.className = 'race_block'
	raceBlock.innerHTML = _(game.actor._race+"_race")
	info.appendChild(raceBlock)

	try {
		var sublocations = require(path.join(__dirname, 'activities/map'+game.map+'.js'));
		sublocations.define(game)
	} catch (e) {
		textView = _('error_require_activity_pack').format('activities/map'+game.map+'.js')
		return;
	}
	var sublocList = []
	var onLocationEnters = {}
	for (let key in sublocations.activities) {
		sublocList.push(key)
		onLocationEnters[key] = sublocations.activities[key]().onLocationEnter
	}
	//log(sublocList)
	var openMap = document.createElement('input')
	openMap.type = 'button'
	openMap.value = _('open_map')
	var openMapFunction = function(arg) {
		var voile = document.createElement('div')
		voile.className = 'voile effect_layer'
		con.appendChild(voile)
		var map = document.createElement('div')
		map.className = 'map effect_layer'
		if (arg instanceof Event) {
	        let backBtn = document.createElement('div')
	        backBtn.className = 'tbook_back_btn'
	        backBtn.onclick = function() {
	            map.remove();
	            voile.remove();
	        }
	        map.appendChild(backBtn)
	    }
        let ol = document.createElement('ol')
        for (let i = 0; i<sublocList.length; i++) {
        	let li = document.createElement('li')
        	li.innerHTML = _("loc_"+sublocList[i])
        	if (game.sublocation == sublocList[i]) li.className = 'temp_map_subloc_selected'
        	else {
        		li.onclick = function() {
        			game.sublocation = sublocList[i]
        			game.activity = "map"+game.map+"."+sublocList[i]
		            map.remove();
		            voile.remove();
        		}
        	}
        	ol.appendChild(li)
        }
        map.appendChild(ol)
		con.appendChild(map)
	}
	openMap.onclick = openMapFunction
	info.appendChild(openMap)

	Object.defineProperty(game, 'date', {
		get() {
			return game._date;
		},
		set(value) {
			game._date = value
			dateBlock.innerHTML = ''
			let atmoDate = game.printAtmoDate()
			atmoDate.className = 'date_block'
			dateBlock.appendChild(atmoDate)
		}
	});
	game.skip = function(minutes) {
		game.date = new Date(game.date.getTime() + minutes*60*1000)
	}
	Object.defineProperty(game, 'activity', {
		get() {
			return game._activity;
		},
		set(value) {
        	//log('set activity')
			game._activity = value
			loadActivity()
		}
	});
	Object.defineProperty(game, 'sublocation', {
		get() {
			return game._sublocation;
		},
		set(value) {
			if (game._sublocation != value) {
				if (sublocList.indexOf(value) < 0) {
					textView = _('error_sublocation_absent').format(value, game.map)
					return;
				}
				for (let t in sublocationTimeouts) {
					clearTimeout(t);
					delete sublocationTimeouts[t];
				}
				sublocationTimeouts = {}
				sound.clearSublocationSpecific()
				game._sublocation = value
				onLocationEnters[value]()
				sublocBlock.innerHTML = _("loc_"+value)
			}
		}
	});

	Object.defineProperty(game.actor, 'race', {
		get() {
			return game.actor._race;
		},
		set(value) {
			game.actor._race = value
			raceBlock.innerHTML = _(value+"_race")
		}
	});

	function loadActivity() {
		let moduleActivity = game.activity.split('.')
		let modSrc = 'activities/'+moduleActivity[0]+'.js'
		try {
			var mod = require(path.join(__dirname, modSrc));
		} catch (e) {
			textView = _('error_require_activity_pack').format(modSrc)
			return;
		}
		mod.define(game)
		var act = mod.activities[moduleActivity[1]]
		if (!act) {
			textView = _('error_activity_absent').format(modSrc, moduleActivity[1])
			return;
		}
		act = act()

		let args = act.doAndGetArgs()
		let text = _(act.text.format.apply(act.text, args))
		textView.innerHTML = text.format.apply(text, args)

		optView.innerHTML = ''
		let options = []
		let optionsByGroup = {}
		if (act.options) {
			options = act.options.filter(o => o.isVisible())
			for (let i = 0; i<options.length; i++) {
				let o = options[i]
				if (o.group) {
					if (!optionsByGroup[o.group]) optionsByGroup[o.group] = [];
					optionsByGroup[o.group].push(o);
				} else {
					optionsByGroup[o.text] = o;
				}
			}
		}
		if (options.length > 0) {
			let keys = Object.keys(optionsByGroup)
			keys.sort(function(o1, o2) {
				return Math.random()>0.5 ? 1 : -1
			})
			function optFromObject(obj) {
				let opt = document.createElement('div')
				let oText = _(obj.text.format.apply(obj.text, args))
				oText = oText.format.apply(oText, args)
				opt.innerHTML = '- ' + oText
				opt.className = 'activity_option'
				if (obj.gotoSublocation && sublocList.indexOf(obj.gotoSublocation) < 0) {
					opt.className += ' option_error'
					opt.innerHTML += _('o_invalid_target_sublocation').format(obj.gotoSublocation, game.map)
				}
				if (obj.goto && !obj.goto.startsWith('@') && exports.checkOptionTargetActivity) {
					let tempModuleActivity = obj.goto.split('.')
					let tempModSrc = 'activities/'+tempModuleActivity[0]+'.js'
					try {
						var tempMod = require(path.join(__dirname, tempModSrc));
					} catch (e) {
						opt.className += ' option_error'
						opt.innerHTML += _('o_invalid_target_activity_pack').format(tempModSrc)
						return opt
					}
					tempMod.define(game)
					var tempAct = tempMod.activities[tempModuleActivity[1]]
					if (!tempAct) {
						opt.className += ' option_error'
						opt.innerHTML += _('o_invalid_target_activity').format(tempModSrc)
						return opt
					}
				}
				if (!('isAbled' in obj) || obj.isAbled()) {
					opt.onclick = function() {
						if (obj.action) obj.action()
						if (obj.goto.startsWith('@')) {
							if (obj.goto == '@mapChoice') {
								textView.innerHTML = ''
								optView.innerHTML = ''
								openMap.onclick();
							}
						} else game.activity = obj.goto;
						if (obj.gotoSublocation) game.sublocation = obj.gotoSublocation;
						else game.sublocation = game.sublocation
					}
				} else {
					if (obj.disabledReason) {
						let disReason = _(obj.disabledReason.format.apply(obj.disabledReason, args))
						disReason = disReason.format.apply(disReason, args)
						let spanReason = document.createElement('span')
						spanReason.className = 'option_disabled_reason'
						spanReason.innerHTML = disReason
						opt.appendChild(spanReason)
					}
				}
				if ('isAbled' in obj && !obj.disabledReason) {
					let entire = obj.isAbled.toString();
					let funcBody = entire.slice(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
					let spanReasonF = document.createElement('span')
					spanReasonF.className = 'option_disabled_reason'
					spanReasonF.innerHTML = funcBody
					opt.appendChild(spanReasonF)
					let spanReason = document.createElement('span')
					spanReason.className = 'option_error'
					spanReason.innerHTML = _('o_absent_disabled_reason').format(obj.text)
					opt.appendChild(spanReason)
				}
				return opt
			}
			for (let i = 0; i<keys.length; i++) {
				let key = keys[i]
				let obj = optionsByGroup[key]
				if (obj instanceof Array) {
					let optionGroup = document.createElement('div')
					optionGroup.className = 'option_group'
					let oGroupText = _(key.format.apply(key, args))
					oGroupText = oGroupText.format.apply(oGroupText, args)
					optionGroup.innerHTML = oGroupText
					for (let j = 0; j<obj.length; j++) {
						let opt = optFromObject(obj[j])
						opt.className += ' option_in_group'
						optionGroup.appendChild(opt)
					}
					optView.appendChild(optionGroup)
				} else {
					let opt = optFromObject(obj)
					optView.appendChild(opt)
				}
			}
		} else {
			var noAvailableOption = document.createElement('div')
			noAvailableOption.className = 'option_error activity_option'
			noAvailableOption.innerHTML = _('o_no_available_option').format(act.id)
			optView.appendChild(noAvailableOption)
		}
		var src = "activities_bg/" + act.img.format.apply(act.img, args)
		testImg.onload = function() {
			if (imgView.children.length > 0) {
				for (let i = 0; i<imgView.children.length; i++) {
					imgView.children[i].remove()
				}
			}
			imgView.style.backgroundImage = "url('"+src+"')"
		}
		testImg.onerror = function() {
			let imgLoadErrorIcon = document.createElement('div')
			imgLoadErrorIcon.className = 'img_load_error_icon'
			let imgLoadErrorAdvice = document.createElement('div')
			imgLoadErrorAdvice.className = 'img_load_error_advice'
			let imgLoadErrorAdviceHeader = document.createElement('h3')
			imgLoadErrorAdviceHeader.innerHTML = _('img_load_error_advice_header')
			let imgLoadErrorAdviceText = document.createElement('div')
			imgLoadErrorAdviceText.innerHTML = _('img_load_error_advice_text').format(src)
			imgLoadErrorAdvice.appendChild(imgLoadErrorAdviceHeader)
			imgLoadErrorAdvice.appendChild(imgLoadErrorAdviceText)
			imgView.style.backgroundImage = ""
			imgView.appendChild(imgLoadErrorIcon)
			imgView.appendChild(imgLoadErrorAdvice)
		}
		testImg.src = src
	}
	onLocationEnters[game.sublocation]()
	loadActivity()

	interface.appendChild(textView)
	interface.appendChild(optView)
	interface.appendChild(imgView)
	interface.appendChild(info)
	con.appendChild(interface)

	var interfaceOpened = true
	var resumeGameTimeouts = []
	var resumeSublocationTimeouts = []
	document.addEventListener('keyup', function(event) {
		if (event.code == 'Escape' && !event.ctrlKey && !event.metaKey && !event.shitfKey && !event.altKey) {
			if (interfaceOpened) {
				interface.style.display = 'none';
				sound.pauseAll();
				for (let t in gameTimeouts) {
					clearTimeout(t);
					let elem = [gameTimeouts[t][0], gameTimeouts[t][0] - new Date().getTime()];
					resumeGameTimeouts.push(elem);
					delete gameTimeouts[t];
				}
				for (let t in sublocationTimeouts) {
					clearTimeout(t);
					let elem = [sublocationTimeouts[t][0], sublocationTimeouts[t][1] - new Date().getTime()];
					resumeSublocationTimeouts.push(elem);
					delete sublocationTimeouts[t];
				}
				//log('resumeGameTimeouts:', resumeGameTimeouts)
				//log('resumeSubTimeouts:', resumeSublocationTimeouts)
				mainMenu();
				interfaceOpened = false
			} else {
				removeMainMenu();
				if (removeTbook) removeTbook();
                sound.clearSingleInstance('main_menu_loop', 2);
				sound.resumeAll();
        		con.style.backgroundImage = "url('textures/trilobite.jpg')";
				interface.style.display = 'block';
				for (let i = 0; i<resumeGameTimeouts.length; i++) {
					let t = null
					var func = resumeGameTimeouts[i][0]
					let remTime = resumeGameTimeouts[i][1]
					t = setTimeout(function() {
						func();
						delete gameTimeouts[t];
					}, remTime)
	    			gameTimeouts[t] = [func, new Date().getTime() + remTime];
				}
				for (let i = 0; i<resumeSublocationTimeouts.length; i++) {
					let t = null
					var func = resumeSublocationTimeouts[i][0]
					let remTime = resumeSublocationTimeouts[i][1]
					t = setTimeout(function() {
						//log(typeof func, func)
						func();
						delete sublocationTimeouts[t];
					}, remTime)
	    			sublocationTimeouts[t] = [func, new Date().getTime() + remTime];
				}
				resumeGameTimeouts = []
				resumeSublocationTimeouts = []
				interfaceOpened = true
			}
		}
	});
}