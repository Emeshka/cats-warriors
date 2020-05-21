@echo off
cd "warriorCats-win32-ia32"
if not exist "warriorCats.exe" (
	"../unzip.exe" "warriorCats.zip"
)
"./warriorCats.exe"
echo "Если игра завершилась с ошибками, или ты видишь ошибки тут, в консоли, скопируй текст ошибки выше и отправь мне. Иначе закрой это окно."
pause
cd ..