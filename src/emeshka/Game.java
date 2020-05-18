package emeshka;

import java.io.*;
import java.util.Properties;

public class Game {
    public Properties props = null;
    private String path = "";

    public void save() throws IOException {
        OutputStream os = new FileOutputStream(path);     //Output file
        props.store(os, "Cats-Warriors saved game file.");
    }

    public static Game load(String path) throws IOException {
        InputStream is = new FileInputStream(path);
        Game g = new Game();
        g.props.load(is);
        g.path = path;
        return g;
    }

    public Game() {
        props.setProperty("difficulty", "difficulty_level_1");
        props.setProperty("era", "old");
        props.setProperty("race", "mist");
        props.setProperty("season", "summer");
    }

    public Game(String difficulty, String era, String race, String season) {
        props.setProperty("difficulty", difficulty);
        props.setProperty("era", era);
        props.setProperty("race", race);
        props.setProperty("season", season);
    }
}
