package emeshka;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import emeshka.webengineapp.Application;
import emeshka.webengineapp.Bridge;

public class Run {
    public static Application app = null;
    public static Bridge bridge = null;

    public static void main(String[] args) {
        bridge = new WarriorsBridge();
        app = new Application("Квест по котам-воителям", "kv.html", 0, 0, bridge);
        app.setExitQuestionText("Вы действительно хотите выйти?");
        app.setModalDialogTitleText("Внимание!");
        app.run();
        app.center();
    }
}
