// Добавлять строки текста, использующиеся в игре, сюда по образцу (внимательно! запятая!):
//
//  имя_строки: 'строка',
//
// имя_строки должно состоять из маленьких латинских букв, цифр и нижнего подчеркивания. Цифра не должна быть первой.
// строка может состоять из любых символов.
// Если необходимо включить в строку символ одинарной кавычки/апостроф (символ '), то следует писать \'
// Перенос строки следует заменить на \n
exports.s = {
	app_name: 'Квест по котам-воителям',
	new_game: 'Новая игра',
	load: 'Загрузить',
	travelersbookstart: 'Записи Путешественника',
	exit: 'Выход',
	none: '---',
	male:'кот',
	female:'кошка',
	male_comment:'Коты как правило слегка сильнее физически, но менее ловкие и талантливые охотники.',
	female_comment:'Кошки быстрые и проворные, но в физической силе немного уступают котам.',
	difficulty_level: 'Выберите уровень сложности.',
	difficulty_level_1: 'Лёгкая игра',
	difficulty_level_2: 'Нормальная игра',
	difficulty_level_3: 'Усложнённая игра',
	difficulty_level_4: 'Тяжёлая игра',
	difficulty_level_1_descr: 'Иногда ваш выбор, который обычно приводит к смерти в тех или иных событиях '
		+'будет сходить вам с рук. Случайные удачные/неудачные события будут в соотношении 70/30. Квесты будут легче.',
	difficulty_level_2_descr: 'Вам ничего не сходит с рук, думайте о последствиях прежде чем делать.'
		+' Случайные удачные/неудачные события будут в соотношении 50/50. Квесты будут такими, какими они задумывались.',
	difficulty_level_3_descr: 'Вам ничего не сходит с рук, думайте о последствиях прежде чем делать.'
		+' Случайные удачные/неудачные события будут в соотношении 35/65. Квесты будут сложнее.',
	difficulty_level_4_descr: 'Вам ничего не сходит с рук, думайте о последствиях прежде чем делать.'
		+' Случайные удачные/неудачные события будут в соотношении 10/90. Квесты будут очень сложными.',
	era_choice: 'Выберите эпоху, в которую будете жить.',
	old_era:'Старый свет',
	new_era:'Новый свет',
	old_era_descr:'Старый свет является территорией, на которой впервые образовались четыре известных нам племени'
		+' - Болотное племя, Вихревое племя, Лесное племя, Туманное племя. После двух Великих Эпидемий'
		+' случилось массовое переселение на территорию Гор, поэтому свой бывший дом племенные коты стали'
		+' называть Старым светом. Те, кто остались жить на данной территории или погибли, или приобрели иммунитет'
		+' от данной болезни, имеющей название «Болотная лихорадка»',
	new_era_descr:'Новый свет, также территория Гор - это местность находится на северо-западе, далее железной дороги'
		+' - «дороги Гигантский Гусениц». Это именно та территория, на которую переселились племена, опасаясь новых'
		+' вспышек заразы. Из-за отсутствия пригодной для жизни местности Болотное племя не смогло прижиться на данной'
		+' территории и перекочевало обратно в Старый свет.',
	race_choice:'Выберите своё племя.',
	swamp_race:'Болотное племя',
	hurricane_race:'Вихревое племя',
	forest_race:'Лесное племя',
	mist_race:'Туманное племя',
	swamp_race_descr:'Болотное племя - одно из четырёх племен(Лесное, Вихревое, Туманное, Болотное).'
		+' Привычная среда обитания непосредственно на болотах. Основной пищей котов являются лягушки,'
		+' водяные крысы, рыбы, стрекозы и иногда птицы водоёмов. Представители данного племени могут'
		+' отличиться способностью плавать и обладанием более устойчивого иммунитета к болезням.',
	hurricane_race_descr:'Вихревое племя - одно из четырёх племен(Лесное, Вихревое, Туманное, Болотное).'
		+' Привычная среда обитания - вересковые пустоши, каменистые плато, скалистые местности. Основной пищей'
		+' являются зайцы, птицы и мелкие грызуны. Представители данного племени могут отличиться стройным телом с'
		+' развитой мускулатурой, способны быстро бегать, высоко и далеко прыгать.',
	forest_race_descr:'Лесное племя - одно из четырёх племен(Лесное, Вихревое, Туманное, Болотное). Привычная среда'
		+' обитания непосредственно лиственные леса и рощи, но названо было в честь основателя, а не местности.'
		+' Основной пищей являются мелкие грызуны, птицы, землеройки. Представители данного племени могут отличиться'
		+' способностью ловко лазить по деревьям, высоко и далеко прыгать. ',
	mist_race_descr:'Туманное племя - одно из четырёх племен(Лесное, Вихревое, Туманное, Болотное). Привычная среда'
		+' обитания - хвойный лес. Основной пищей являются мелкие грызуны, птицы. Представители данного племени могут'
		+' отличиться способностью видеть ночью, как днём.',
	summer:'Пора Бодрствования Деревьев',
	winter:'Пора Сна Деревьев',
	autumn:'Пора Засыпания Деревьев',
	spring:'Пора Пробуждения Деревьев',
	early_season:'ранняя',
	later_season:'поздняя',
	night:'ночь',
	morning:'утро',
	day:'день',
	evening:'вечер',
	autumn_descr:'Осенью дичи становится меньше с каждым днем. Если вы родились в пору Засыпания Деревьев, ваше'
		+' детство выпадет на голодные зимние дни, и вам не позавидуешь.',
	summer_descr:'Лето - богатое дичью, сытое время года, один из лучших сезонов для того, чтобы появиться на свет.'
		+' Однако вы станете учеником к концу осени, когда добыть еду станет совсем не просто.',
	spring_descr:'Весенние котята самые счастливые - их детство и ученичество выпадает на самое легкое и '
		+' беззаботное время года.',
	winter_descr:'Зима - ужасно трудное время для воителей, но котенком вам будет пережить его легче, чем взрослым.',
	start_new_game: 'Начать новую игру',
	credits:'Авторы и благодарности',
	credits_header:'Авторы и благодарности',
	start_new_game_header:'Выберите параметры игры',
	sure_to_exit:'Вы уверены, что хотите выйти из игры?',
	load_game_header:'Загрузка сохранения',
	nth_of_january:'{1} января',
	nth_of_february:'{1} февраля',
	nth_of_march:'{1} марта',
	nth_of_april:'{1} апреля',
	nth_of_may:'{1} мая',
	nth_of_june:'{1} июня',
	nth_of_july:'{1} июля',
	nth_of_august:'{1} августа',
	nth_of_september:'{1} сентября',
	nth_of_october:'{1} октября',
	nth_of_november:'{1} ноября',
	nth_of_december:'{1} декабря',
	january:'январь',
	february:'февраль',
	march:'март',
	april:'апрель',
	may:'май',
	june:'июнь',
	july:'июль',
	august:'август',
	september:'сентябрь',
	october:'октябрь',
	november:'ноябрь',
	december:'декабрь',
	standard_time_format:'{1}:{2}:{3}',
	standard_date_format:'{3} {2} {1}',
	atmo_date_format:'{1} {2}, {3}',
	age_n_months:'{1} месяцев',
	age_n_years_m_months:'{1} лет {2} месяцев',
	delete_saved_game:'Удалить сохранение',
	load_saved_game:'Загрузить сохранение',
	saved_game_actor_block_title:'{1} : {2} : {3}',
	saved_game_name_block_title:'{1} : {2}',
	warning_not_enough_data_new_game:'Вы выбрали не все параметры!',
	warning_enter_gender:'Необходимо выбрать пол главного героя.',
	warning_enter_difficulty:'Необходимо выбрать сложность игры.',
	warning_enter_era:'Необходимо выбрать эпоху, в которую вы будете жить.',
	warning_enter_race:'Необходимо выбрать ваше племя.',
	warning_enter_season:'Необходимо выбрать, в какое время года вы родитесь.',
	sure_to_delete_saved_game:'Вы уверены, что хотите удалить сохраненную игру?',
	error_read_saved_game:'Этот файл сохранения необратимо поврежден. Удалите его.',
	error_delete_saved_game:'Ошибка! Не удалось удалить файл сохранения!'
		+'\nПроверьте, что в папке с игрой в подпапке saves у вашего пользователя'
		+' есть права на запись.',
	error_read_credits:'Ошибка! Не удалось прочитать содержимое файла авторов и благодарностей!'
		+'\nПроверьте, что в папке с игрой файл credits.txt существует, и что у вашего пользователя'
		+' есть права на его чтение.',
	error_create_saves_directory:'Ошибка! Не удалось создать папку сохранений!'
		+'\nПроверьте, что в папке с игрой у вашего пользователя'
		+' есть права на запись.\nИгра будет закрыта.',
	error_scan_saves_directory:'Ошибка! Не удалось прочитать содержимое папки звуков!\nПроверьте, что '
		+'в папке с игрой подпапка sound существует, и что у вашего пользователя есть права на ее чтение.'
		+' Если проблема не исчезла:\n1. Скопируйте куда-нибудь файлы сохранений из этой папки'
		+'\n2. Удалите подпапку saves'
		+'\n3. Перезапустите игру. Папка должна быть создана заново.'
		+'\n4. Верните файлы сохранений на место в подпапку saves.'
		+'Если не помогло:\n'
		+'\n1. Скопируйте куда-нибудь файлы сохранений из этой папки'
		+'\n2. Переустановите игру'
		+'\n3. Запустите игру. Папка должна быть создана заново.'
		+'\n4. Верните файлы сохранений на место в подпапку saves.'
		+'\nИгра будет закрыта.',
	error_scan_sounds:'Ошибка! Не удалось прочитать содержимое папки звуков!\nПроверьте, что '
		+'в папке с игрой подпапка sound существует, и что у вашего пользователя есть права на ее чтение.'
		+' Если проблема не исчезла: \n1. Скопируйте куда-нибудь подпапку saves с вашими сохранениями'
		+'\n2. Переустановите игру'
		+'\n3. Верните подпапку saves на место (с заменой, если потребуется).\nИгра будет закрыта.',
	error_load_saved_game_io:'Ошибка чтения при загрузке сохранения! ({1})'
		+'\nПроверьте, что в папке с игрой в подпапке сохранений файл {2} существует, и что у вашего пользователя'
		+' есть права на его чтение.',
	error_load_saved_game_corrupted:'Невозможно прочитать сохраненную игру из файла {1}:'
		+'\nфайл имеет неправильный формат. Восстановление невозможно, удалите этот файл.',
	saves_folder_is_empty:'Сохраненных игр нет. Начните новую игру!',
	loading:'Загрузка...',
	tbook:'Записки Путешественника',
	help:'Справка',
	img_load_error_advice_header:'Картинки нет...\nПомогите нам исправить эту ошибку!',
	img_load_error_advice_text:'Сделайте скриншот полного экрана с этим сообщением и '
		+'воспользуйтесь инструкциями в меню "Справка" в статье "Как сообщить об ошибке?",'
		+' чтобы оповестить нас об ошибке.\nВы можете спокойно продолжать играть, ошибка не критичная :)\n{1',
	open_map:'Открыть карту',

	/* ------------- Записи в Записках Путешественника ------------ */
	about_tbook_pda_article:'Об этом курсе\nНедавно просмотрено: 71 979\nВ течение жизни мы постоянно'
		+' взаимодействуем с другими людьми. Маленькие дети, пытаясь добиться того, чтобы родители купили '
		+'понравившуюся конфетку, часто шантажируют родителей своими слезами. Принимая решение заплакать, '
		+'ребенок рискует — он не знает, как поведут себя папа с мамой. В чуть более взрослом возрасте '
		+'абитуриенты, выбирающие вуз, принимают сложное решение о том, в какие университеты подать документы.'
		+' Ошибка может стоить дорого: при неправильной стратегии можно оказаться в слабом университете или '
		+'вообще остаться без заветного студенческого билета. <endpage>'
		+'<img src="textures/example_article_picture.png">Окончив вуз, юноши и девушки начинают искать '
		+'работу. Перед интервью с работодателем они штудируют статьи в интернете о том, что можно и чего '
		+'нельзя говорить на интервью, — они пытаются найти наилучшую стратегию своего поведения, исходя из'
		+' ожиданий компании, в которую они устраиваются. Все эти ситуации объединяет то, что решения, которые'
		+' принимают одни люди, оказывают влияние на других людей. Такие взаимодействия называются '
		+'стратегическими. Именно их изучает теория игр.<endpage>Чтобы проанализировать ту или иную реальную '
		+'жизненную ситуацию стратегического взаимодействия и найти оптимальный вариант поведения в ней, '
		+'необходимо сделать две вещи. Во-первых, необходимо формально записать ситуацию на языке теории игр,'
		+' то есть создать модель (игру). Во-вторых, после того как модель (игра) составлена, ее необходимо'
		+' решить. Этому мы будем учиться в течение курса. Мы разберем основные виды игр (одновременные и'
		+' последовательные, с совершенной и несовершенной.\n\nПример гифки с измененным размером,'
		+' поворотом на 57 градусов по часовой стрелке и абсолютным позиционированием на странице книги.'
		+' Значение left, right, top, bottom означает отступ от соответствующих краев контейнера.'
		+' Они работают, только если также есть position:absolute;'
		+' Если позиционирование не задано вовсе (как в первом примере), то картинка встраивается в текст'
		+' в том месте, где она в коде. \nНапример - <img src="textures/autumn.png" style="width:20%;">'
		+'<img src="textures/arrow_tbook_folder_opened.png" style="width:20%;"> - эти картинки прямо внутри текста.'
		+' Если хочешь указать высоту, ширину, left, right, top или bottom указывать всегда в процентах.'
		+' Проценты считаются от ширины страницы книги.'
		+'<img src="textures/ant.gif" style="transform: rotate(57deg); width: 10%; position: absolute; top: 4%; right: 12%;">'
		+'<endpage> информацией, коалиционные и некоалиционные), '
		+'приведем способы их решения и обсудим их на многочисленных примерах.\n\nКурс будет интересен '
		+'желающим разобраться в том, как конкурируют друг с другом несколько компаний и можно ли '
		+'гарантированно выиграть в шашки, есть ли смысл угрожать на переговорах и с кем стоит объединяться'
		+' в коалиции в парламенте.'
		+'<endpage>FAQ\n\nВ: Требуется ли предварительная подготовка для прохождения курса?'
		+'\nО: Курс является базовым, поэтому он не требует специальной подготовки. Для его успешного освоения'
		+' достаточно уверенных знаний курса математики в объеме школьной программы. В одном-двух примерах могут'
		+' пригодиться знания начал математического анализа (дифференцирование функций одной переменной, '
		+'необходимое условие экстремума) и знания начал теории вероятностей (понятие математического ожидания'
		+' случайной величины).<endpage>В: Что требуется для успешного окончания курса?\nО: Итоговая оценка за курс'
		+' складывается из результатов 10 оцениваемых тестов. '
		+'Пример слишком широкой картинки, автоматически вмещающейся в страницу.\n<img src="textures/trilobite.jpg">\n'
		+'Для успешного окончания курса необходимо дать не'
		+' менее 80 % правильных ответов на каждый из этих тестов.\n\nПоявились технические трудности? '
		+'Обращайтесь на адрес: coursera@hse.ru',
	/* ------------------------------------------------------------ */

	/* -------------------- Локации ------------------------------- */
	loc_hurricane_camp: 'лагерь Вихревого племени',
	loc_swamp_camp: 'лагерь Болотного племени',
	loc_forest_camp: 'лагерь Лесного племени',
	loc_mist_camp: 'лагерь Туманного племени',
	/* ------------------------------------------------------------ */
	/* --------------------- Опции -------------------------------- */
	o_go_sleep_home_camp: 'идти поспать пару часиков',
	o_go_eat_home_camp: 'пойти перекусить',
	o_leave_camp: 'покинуть лагерь',
	o_sleep_6_hour_home_camp: 'поспать 6 часов',
	o_cancel_sleep_home_camp: 'передумал, вернусь лучше на главную поляну',
	o_choose_food_home_camp: 'съесть мышь',
	o_cancel_eat_home_camp: 'расхотелось есть',
	/* ------------------------------------------------------------ */
	/* --------------- Текст на активити -------------------------- */
	home_camp_root: 'Вы в своем лагере. Что будете делать?',
	foreign_camp_root: 'Вы в {1}. Все уставились на вас. Раздается недовольный голос:\n'
		+' - Что вам здесь нужно?',
	home_camp_go_sleep: 'Сколько поспать?',
	home_camp_select_food: 'Что будете есть?(имитация, реально куча дичи еще не реализована)',
	/* ------------------------------------------------------------ */
}
