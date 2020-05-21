rm -r "warriorCats-win32-ia32"
electron-packager . warriorCats --platform=win32 --arch=ia32 --ignore="(icon.icns|autopackage.sh|console_launcher.sh|console_launcher.bat|мусорка)"
cd "warriorCats-win32-ia32"
../zip.exe "warriorCats.zip" "warriorCats.exe"
cd ..
rm -r "warriorCats-linux-ia32"
electron-packager . warriorCats --platform=linux --arch=ia32 --ignore="(icon.icns|autopackage.sh|console_launcher.sh|console_launcher.bat|мусорка)"
cd "warriorCats-linux-ia32"
../zip.exe "warriorCats.zip" "warriorCats.exe"
cd ..