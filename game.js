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
	interface.appendChild(textView)
	var optView = document.createElement('div')
	optView.className = 'opt_view game_view_block'
	optView.innerHTML = 'опции'
	interface.appendChild(optView)
	var imgView = document.createElement('div')
	imgView.className = 'img_view game_view_block'
	interface.appendChild(imgView)

	var info = document.createElement('div')
	info.className = 'info_block game_view_block'
	var dateBlock = document.createElement('div')
	Object.defineProperty(game, 'date', {
		get() {
			return game._date;
		},
		set(value) {
			game._date = value
			dateBlock.appendChild(game.printAtmoDate())
		}
	});
	game.skip = function(minutes) {
		game.date = new Date(game.date.getTime() + minutes*60*1000)
	}
	let atmoDate = game.printAtmoDate()
	atmoDate.className = 'date_block'
	dateBlock.appendChild(atmoDate)
	info.appendChild(dateBlock)
	interface.appendChild(info)

	con.appendChild(interface)
}