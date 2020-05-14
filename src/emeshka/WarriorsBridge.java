package emeshka;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import emeshka.webengineapp.DefaultBridge;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

public class WarriorsBridge extends DefaultBridge {
    public void startNewGame(String params) {
        Gson gson = new Gson();
        Type type = new TypeToken<Map<String, String>>(){}.getType();
        Map<String, String> myMap = gson.fromJson(params, type);
        String difficulty = myMap.get("difficulty");
        String era = myMap.get("era");
        String race = myMap.get("race");
        String season = myMap.get("season");
        Game g = new Game(difficulty, era, race, season);
        Run.currentGame = g;
        String gj = gson.toJson(g);
        Run.app.execute("receiveLoadedGame('"+gj+"')");
    }

    public void load(String path) {
        try {
            Game g = Game.load(path);
            Run.currentGame = g;
            String gj = new Gson().toJson(g);
            Run.app.execute("receiveLoadedGame('"+gj+"')");
        } catch (IOException e) {
            Run.app.dialogs().alert(e, "При попытке загрузки игры из файла "+path);
        }
    }

    public void save() {
        try {
            Run.currentGame.save();
        } catch (IOException e) {
            Run.app.dialogs().alert(e, "При попытке сохранения");
        }
    }
}
