cd "warriorCats-linux-ia32"
if [ ! -f ./warriorCats ]; then
    unzip warriorCats.zip
fi
./warriorCats
read -p "Если игра завершилась с ошибками, или ты видишь ошибки тут, в консоли, скопируй текст ошибки выше и отправь мне. Иначе закрой это окно."
cd ..