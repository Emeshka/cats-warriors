package emeshka;

import emeshka.webengineapp.Application;
import emeshka.webengineapp.Bridge;
import javafx.application.Platform;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

public class Run {
    public static Application app = null;
    public static Bridge bridge = null;
    public static Game currentGame = null;

    private static void showSplashScreen() {
        InputStream splash = Run.class.getResourceAsStream("/splash.png");
        try {
            final BufferedImage image = ImageIO.read(splash);
            Window w = new Window(null) {
                @Override
                public void paint(Graphics g) {
                    g.drawImage(image, 0, 0, null);
                }
            };
            w.setBounds(w.getGraphicsConfiguration().getBounds());
            w.setBackground(new Color(0, true));
            GraphicsEnvironment env = GraphicsEnvironment.getLocalGraphicsEnvironment();
            Rectangle dim = env.getMaximumWindowBounds();
            w.setLocation(dim.width/2-image.getWidth()/2, dim.height/2-image.getHeight()/2);
            w.setVisible(true);
            w.setAlwaysOnTop(true);
            for (int i = 0; i<60; i++) {
                if (app != null && app.getPageLoaded()) {
                    w.setVisible(false); //you can't see me!
                    w.dispose();
                    break;
                } else {
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {}
                }
            }
        } catch (IOException e) {
            System.out.println("ERROR: splash image failed to load");
        }
    }

    public static void main(String[] args) {
        Thread splash = new Thread(Run::showSplashScreen);
        splash.start();
        URL iconURL = Run.class.getResource("/icon.png");
        ImageIcon icon = new ImageIcon(iconURL);
        bridge = new WarriorsBridge();

        app = new Application("Квест по котам-воителям", "kv.html", 0, 0, bridge);
        app.setExitQuestionText("Вы действительно хотите выйти?");
        app.setModalDialogTitleText("Внимание!");
        app.run();
        app.center();
        Platform.runLater(() -> {
            app.getWv().setContextMenuEnabled(false);
            JFrame w = app.getWindow();
            w.setIconImage(icon.getImage());
            w.toFront();
        });
    }
}
