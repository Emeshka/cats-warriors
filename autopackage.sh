rm -r "warriorCats-win32-ia32"
electron-packager . warriorCats --platform=win32 --arch=ia32 --ignore="(autopackage.sh|console_launcher.sh|console_launcher.bat|мусорка|zip.exe|unzip.exe)"
cd "warriorCats-win32-ia32"
../zip.exe "warriorCats.zip" "warriorCats.exe"
rm "warriorCats.exe"
cd ..
rm -r "warriorCats-linux-ia32"
electron-packager . warriorCats --platform=linux --arch=ia32 --ignore="(autopackage.sh|console_launcher.sh|console_launcher.bat|мусорка|zip.exe|unzip.exe)"
cd "warriorCats-linux-ia32"
../zip.exe "warriorCats.zip" "warriorCats"
rm "warriorCats"
cd ..