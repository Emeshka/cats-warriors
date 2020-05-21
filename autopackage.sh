electron-packager . warriorCats --platform=win32 --arch=ia32 --ignore="(icon.icns|autopackage.sh|console_launcher.sh|console_launcher.bat|мусорка)"
cp ./console_launcher.bat ./warriorCats-win32-ia32/console_launcher.bat
electron-packager . warriorCats --platform=linux --arch=ia32 --ignore="(icon.icns|autopackage.sh|console_launcher.sh|console_launcher.bat|мусорка)"
cp ./console_launcher.sh ./warriorCats-linux-ia32/console_launcher.sh