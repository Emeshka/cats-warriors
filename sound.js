// Добавлять игровые звуки сюда по образцу (внимательно! запятая!):
//
//  имя_файла: 'имя_файла',
//
// Имя файла указывать без расширения. Называть файлы латинскими буквами, цифрами и символами нижнего подчеркивания.
var sounds = {
    button_onmouseover: 'button_onmouseover',
    button_onclick: 'button_onclick',
}



var audioContainer = null
var increment = 0;

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