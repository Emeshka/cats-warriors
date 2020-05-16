package emeshka;

import emeshka.webengineapp.Application;
import emeshka.webengineapp.Bridge;
import javafx.application.Platform;

import javax.swing.*;
import java.net.URL;

public class Run {
    public static Application app = null;
    public static Bridge bridge = null;
    public static Game currentGame = null;

    public static void main(String[] args) {
        bridge = new WarriorsBridge();
        app = new Application("Квест по котам-воителям", "kv.html", 0, 0, bridge);
        app.setExitQuestionText("Вы действительно хотите выйти?");
        app.setModalDialogTitleText("Внимание!");
        app.run();
        app.center();
        Platform.runLater(() -> {
            app.getWv().setContextMenuEnabled(false);
            URL iconURL = Run.class.getResource("/icon.png");
            // iconURL is null when not found
            ImageIcon icon = new ImageIcon(iconURL);
            app.getWindow().setIconImage(icon.getImage());
        });
    }
}
