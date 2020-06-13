::[Bat To Exe Converter]
::
::YAwzoRdxOk+EWAjk
::fBw5plQjdCuDJAi78E0zPRZRQhCRAGi7EqZR/+np/eOIsF4h5D6Omz46amo/wFDJWpXYfJUi2CsUkcgDbA==
::YAwzuBVtJxjWCl3EqQJgSA==
::ZR4luwNxJguZRRnk
::Yhs/ulQjdF+5
::cxAkpRVqdFKZSDk=
::cBs/ulQjdF+5
::ZR41oxFsdFKZSDk=
::eBoioBt6dFKZSDk=
::cRo6pxp7LAbNWATEpCI=
::egkzugNsPRvcWATEpCI=
::dAsiuh18IRvcCxnZtBJQ
::cRYluBh/LU+EWAnk
::YxY4rhs+aU+IeA==
::cxY6rQJ7JhzQF1fEqQJQ
::ZQ05rAF9IBncCkqN+0xwdVs0
::ZQ05rAF9IAHYFVzEqQIHKQlGRQuQfEi7EqZc3O3j+6qmplsYWvYqaoq7
::eg0/rx1wNQPfEVWB+kM9LVsJDGQ=
::fBEirQZwNQPfEVWB+kM9LVsJDDODLnmzCadcy+nv/Kqzp1UJFMM7borVzqGcJYA=
::cRolqwZ3JBvQF1fEqQIHKQlGRQuQfEi7EqZc3O3j+6qmplsYWvYqaoq7
::dhA7uBVwLU+EWDk=
::YQ03rBFzNR3SWATElA==
::dhAmsQZ3MwfNWATElA==
::ZQ0/vhVqMQ3MEVWAtB9wSA==
::Zg8zqx1/OA3MEVWAtB9wSA==
::dhA7pRFwIByZRRnk
::Zh4grVQjdCuDJAi78E0zPRZRQhCRAGi7EqZR/+np/eOIsF4hV+0xa4DX34uCIfUd6U3hZ9gozn86
::YB416Ek+ZG8=
::
::
::978f952a14a936cc963da21a135fa983
@echo off
chcp 65001
cd "warriorCats-win32-ia32"
if exist "warriorCats.exe" (
	del "warriorCats.exe"
)
"../unzip.exe" "warriorCats.zip"
"./warriorCats.exe"
echo "Если игра завершилась с ошибками, или ты видишь ошибки тут, в консоли, скопируй текст ошибки выше и отправь мне. Иначе закрой это окно."
pause
cd ..