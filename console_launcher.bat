@echo off
cd "warriorCats-win32-ia32"
if not exist "warriorCats.exe" (
	"../unzip.exe" "warriorCats.zip"
)
"./warriorCats.exe"
echo "�᫨ ��� �����訫��� � �訡����, ��� �� ������ �訡�� ���, � ���᮫�, ᪮���� ⥪�� �訡�� ��� � ��ࠢ� ���. ���� ���ன �� ����."
pause
cd ..