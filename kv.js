//предикат - запущен ли gui на движке Java FX
function runsUnderJavaFx() {
	return window.navigator.userAgent.toLowerCase().indexOf('javafx') > -1;
}

//переопределение alert, чтобы в браузере не вылазили сообщения, предназначающиеся java
//переопределение console.log, чтобы
//1)если в коде используется эта функция, мы смогли увидеть вывод, когда запускаем страницу под JavaFX
//2)смогли увидеть, даже если не подключен мост(мало ли), поэтому через alert (у него есть слушатель всегда)
if (runsUnderJavaFx()) {
	console._log = console.log;
	console.log = function(s) {
		alert('java::log()'+s);
	}
} else {
	window._alert = window.alert;
	window.alert = function(s) {
		if (s.startsWith('java::')) console.warn(s);
		else _alert(s);
	}
}

var log = console.log
var audioContainer = null
var increment = 0;

var sounds = {
    button_onmouseover: "button_onmouseover"
}

function button(text, onclick, width, height) {
    var button = document.createElement("input")
    button.setAttribute('type', 'button')
    button.onclick = onclick;
    button.onmouseenter = function() {
        music("button_onmouseover")
    };
    button.value = text;
    if (width) button.style.width = width;
    if (height) button.style.height = height;
    return button;
}

function music(name) {
    function makeSound(s) {
        if (increment > 1000) increment = 0;
        var sound = document.createElement("audio");
        sound.setAttribute("id", s+"_"+increment);
        sound.setAttribute("src", "sound/"+s+".mp3");
        sound.setAttribute("onended", "this.remove();");
        increment++;
        return sound;
    }

    var id = sounds[name];
    var sound = document.getElementById(id);
    if (sound && sound.currentTime != 0.0 || !sound) {
        var newSound = makeSound(name);
        audioContainer.appendChild(newSound);
        newSound.play();
        sounds[name] = newSound.id;
    } else if (sound) {
        sound.play();
    }
}

function mainMenu() {
    var con = document.body;
    con.style.backgroundImage = "url('textures/main_menu.png')"
    var list = document.createElement('ul');
    list.id = "main_menu"
    var mainOptions = ['Новая игра', 'Загрузить', 'Выход'];
    var onclicks = [
        function () {},
        function () {},
        function () {}
    ];
    for (var i = 0; i<mainOptions.length; i++) {
        var li = document.createElement('li');
        li.appendChild(button(mainOptions[i], onclicks[i]))
        list.appendChild(li)
    }
    con.appendChild(list)
}

var initialize = function() {
	//событие onload не работает в javafx, поэтому надо извращаться
	window.htmlLoaded = true;
    audioContainer = document.getElementById("audio");
	//var init = JSON.parse(parameter)
    mainMenu();
	log('init')
};