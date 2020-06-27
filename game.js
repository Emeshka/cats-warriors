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
    ch.health = 1 // здоровье (потом разбить на составляющие)
    ch.actionPower = 1 // максимальная сила, с которой можно выполнить действие (усталость мышц)
    ch.muscularity = 0 // накачанность мышц (достигается тренировками)
    ch.satiety = 1 // сытость
    ch.water = 1 // потребность в воде
    ch.freshness = 1 // выспанность, бодрость (потребность во сне)

    ch.gender = params.gender
    ch.race = params.race
    ch.birthDate = params.birthDate
    ch.status = params.status

    // внешний вид
	//shortfur-averageheight-athlete
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

    bindCharacterMethods(ch)
    ch.name = generateName(ch.exterior)
    return ch
}

function bindCharacterMethods(ch) {
	ch.getAge = function() {
		getAge(ch.birthDate, game.date)
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
		//+длина шерсти, лицо
		bodyShape += ch.exterior.get('height') + '-'

		if (ch.muscularity < 0.33) bodyShape += 'тощий-'
		else if (ch.muscularity < 0.75) bodyShape += 'норм-'
		else bodyShape += 'athlete-'

		let age = ch.getAge()
		if (age < 0.4) bodyShape += 'слепойкотенок'
		else if (age < 4) bodyShape += '3месячный'
		else if (age < 12*12) bodyShape += 'adult'
		else bodyShape += 'старый'

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
    game.sublocation = params.race + "_camp"
    game.activity = "start_0"

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
    game.date = birthDate
    // персонаж
    game.actor = createCharacter({
    	race: params.race,
    	gender: params.gender,
    	birthDate: birthDate,
    	age: 0,
    	status: 'kit'
    })

    log(game)
}

exports.loadGame = function(gameObj) {
    //
}

exports.stringifyCurrentGame = function() {
	return JSON.stringify(game)
}