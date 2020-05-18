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

// java 8 callbacks support
const _callbackNames = ['receiveLoadedGame']
for (let i = 0; _callbackNames.length; i++) {
	let name = _callbackNames[i]
	Object.defineProperty(window,name+'_argument',{
	    set: function(val){
	        window[name](val)
	    },
	    configurable: true
	});
}