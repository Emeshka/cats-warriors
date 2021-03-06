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
	save: 'Сохранить',
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
	save_game:'Сохранить игру',
	save_game_header: 'Сохранение',
	create_save_placeholder: 'Введите имя нового сохранения...',
	confirm_overwrite_save: 'Вы уверены, что хотите перезаписать файл?',
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
	standard_time_format:'{1}:{2}',
	standard_date_format:'{2} {1}',
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
	error_save_game:'Ошибка сохранения по пути {1}. Проверьте, что в папке с игрой в подпапке saves у вашего'
		+' пользователя есть права на запись.',
	error_empty_save_name:'Вы не ввели имя сохранения.',
	error_forbidden_char_save_name:'Нельзя использовать символ {1} в имени сохранения.',
	character_null:'null',
	character_n:'переноса строки',
	character_t:'табуляции',
	character_r:'переноса каретки',
	success_save_game:'Игра сохранена.',
	saves_folder_is_empty:'Сохраненных игр нет. Начните новую игру!',
	loading:'Загрузка...',
	tbook:'Записки Путешественника',
	help:'Справка',
	img_load_error_advice_header:'Картинки нет...\nПомогите нам исправить эту ошибку!',
	img_load_error_advice_text:'Путь: {1}\nСделайте скриншот полного экрана с этим сообщением и '
		+'воспользуйтесь инструкциями в меню "Справка" в статье "Как сообщить об ошибке?",'
		+' чтобы оповестить нас об ошибке.\nВы можете спокойно продолжать играть, ошибка не критичная :)',
	error_require_activity_pack:'Не удалось загрузить пак активити {1}.\nСделайте скриншот полного экрана с этим'
		+' сообщением и воспользуйтесь инструкциями в меню "Справка" в статье "Как сообщить об ошибке?",'
		+' чтобы оповестить нас об ошибке.',
	error_activity_absent:'В паке {1} отсутствует целевая активити {2}.\nСделайте скриншот полного экрана с этим'
		+' сообщением и воспользуйтесь инструкциями в меню "Справка" в статье "Как сообщить об ошибке?",'
		+' чтобы оповестить нас об ошибке.',
	error_sublocation_absent:'Локация {1} в эре {2} не существует.\nСделайте скриншот полного экрана с этим'
		+' сообщением и воспользуйтесь инструкциями в меню "Справка" в статье "Как сообщить об ошибке?",'
		+' чтобы оповестить нас об ошибке.',
	open_map:'Открыть карту',
	warning_escape_mm_choose_destination:'Вы не можете выйти в главное меню,'
		+'\nне выбрав место назначения!',

	/* ------------- Подлокации старой карты --------------- */
	l1_jagged_peak:'Зубчатый пик',
	l2_silent_mountain:'Тихая гора',
	l3_western_lands_behind_the_railway:'Западное зажелезнодорожье',
	l4_desolate_twolegs_camp:'Заброшенный лагерь Двуногих',
	l5_descent_to_the_dark_river:'Спуск к Тёмной реке',
	l6_scenic_plateau:'Живописное плато',
	l7_eastern_lands_behind_the_railway:'Восточное зажелезнодорожье',
	l8_hares_meadow:'Заячья поляна',
	l9_nameless_lake:'Безымянное озеро',
	l10_path_to_the_tundra:'Путь в тундру',
	l11_the_first_grove:'Первая роща',
	l12_twisted_wood:'Скрученный лес',
	l13_rusty_crevice:'Ржавая щель',
	l14_rocky_plain:'Каменистая равнина',
	l15_cliffs:'Утёсы',
	l16_hurricane_camp:'Лагерь Вихревого Племени',
	l17_precipice:'Обрыв',
	l18_breach:'Разлом',
	l19_thorny_thickets:'Колючие заросли',
	l20_rolling_wasteland:'Покатая пустошь',
	l21_western_hollows_bank:'Западный берег Лощины',
	l22_eastern_low_pines:'Восточные низкие сосны',
	l23_western_low_pines:'Западные низкие сосны',
	l24_alpine_meadow:'Альпийский луг',
	l25_yellow_hills:'Желтые сопки',
	l26_round_boulders:'Круглые валуны',
	l27_abandoned_camp:'Старый лагерь',
	l28_central_heather_plateau:'Центральное вересковое плато',
	l29_giant_pipes:'Гигантские трубы',
	l30_wetlands:'Заболоченная местность',
	l31_spring:'Родник',
	l32_hilly_climb:'Холмистый подъём',
	l33_red_meadow:'Красная поляна',
	l34_swamp_camp:'Лагерь Болотного племени',
	l35_rain_islands:'Дождевые островки',
	l36_deceitful_isles:'Обманчивые островки',
	l37_ratcatchers_house:'Дом Крысолова',
	l38_swale:'Топь',
	l39_sink:'Сток',
	l40_sunken_monster:'Потопленный монстр',
	l41_bone_bog:'Костяная трясина',
	l42_thick_reeds:'Густые камыши',
	l43_lake_edge_from_the_swamp_side:'Край озера со стороны болот',
	l44_everdead_trees:'Вечнозастывшие деревья',
	l45_lower_ravines:'Нижние овраги',
	l46_moss_bumps:'Моховые кочки',
	l47_upper_ravines:'Верхние овраги',
	l48_lake_edge_from_the_red_forest_side:'Край озера со стороны Рыжего Леса',
	l49_ginger_groves:'Рыжие рощи',
	l50_thunder_tree:'Грозовое дерево',
	l51_light_grove:'Светлая Роща',
	l52_red_forest_reach:'Предел Рыжего Леса',
	l53_rockfall:'Камнепад',
	l54_big_cedar:'Большой Кедр',
	l55_layered_hillock:'Слоистые горки',
	l56_sharp_rocks:'Острые скалы',
	l57_verdurous_stones:'Заросшие камни',
	l58_forest_camp:'Лагерь Лесного племени',
	l59_smooth_rocks:'Гладкие скалы',
	l60_twolegs_monsters_camp:'Лагерь чудовищ Двуногих',
	l61_building_materials_dump:'Брошенные стройматериалы',
	l62_undergrowth:'Подлесок',
	l63_bandit_camp:'База бандитов',
	l64_cedarwood:'Кедровник',
	l65_windbreak:'Бурелом',
	l66_foot_of_bald_mountain:'Подножье Лысой горы',
	l67_bald_mountain:'Лысая гора',
	l68_training_pit:'Яма для тренировок',
	l69_mist_camp:'Лагерь Туманного племени',
	l70_blurred_trail:'Затуманенная тропа',
	l71_clear_trail:'Ясная тропа',//l72 удален
	l73_path_to_the_abyss:'Путь в бездну',
	l74_upper_dark_thicket:'Верхняя Тёмная чаща',
	l75_gloomy_hill:'Мрачный холм',
	l76_sinister_view:'Мрачный вид',
	l77_misty_slope:'Туманный склон',
	l78_the_ashes_and_its_surroundings:'Пепелище и его окрестности',
	l79_lower_dark_thicket:'Нижняя Тёмная чаща',
	l80_blackberry_shrubs:'Заросли ежевики',
	l81_eastern_hollows_bank:'Восточный берег Лощины',
	l82_dark_hollow:'Тёмная Лощина',
	l83_mouth_of_dark_river:'Устье Тёмной реки',
	/* ----------------------------------------------------- */

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
		+'Пример слишком широкой картинки, автоматически вмещающейся в страницу.\n<img src="textures/trilobite.jpg">'
		+'\nДля успешного окончания курса необходимо дать не'
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
	o_no_available_option: 'Нет доступной опции для выбора в активити {1}. Сделайте скриншот полного экрана с этим '
		+'сообщением и воспользуйтесь инструкциями в меню "Справка" в статье "Как сообщить об ошибке?",'
		+' чтобы оповестить нас об ошибке.',
	o_invalid_target_sublocation: ' - целевая локация {1} в эре {2} не существует. Сделайте скриншот полного экрана'
		+' с этим сообщением и воспользуйтесь инструкциями в меню "Справка" в статье "Как сообщить об ошибке?",'
		+' чтобы оповестить нас об ошибке.',
	o_invalid_target_activity_pack: ' - не удалось открыть пак активити {1}. Сделайте скриншот полного экрана'
		+' с этим сообщением и воспользуйтесь инструкциями в меню "Справка" в статье "Как сообщить об ошибке?",'
		+' чтобы оповестить нас об ошибке.',
	o_invalid_target_activity: ' - в паке {1} отсутствует активити {2}. Сделайте скриншот полного экрана'
		+' с этим сообщением и воспользуйтесь инструкциями в меню "Справка" в статье "Как сообщить об ошибке?",'
		+' чтобы оповестить нас об ошибке.',
	o_absent_disabled_reason: ' - отсутствует причина недоступности опции {1}. Сделайте скриншот полного экрана'
		+' с этим сообщением и воспользуйтесь инструкциями в меню "Справка" в статье "Как сообщить об ошибке?",'
		+' чтобы оповестить нас об ошибке.',
	og_camp_idle:'бездельничать...',
	o_go_sleep_home_camp: 'идти поспать пару часиков',
	o_go_eat_home_camp: 'пойти перекусить',
	o_leave_camp: 'покинуть лагерь',
	o_sleep_6_hour_home_camp: 'поспать 6 часов',
	o_sleep_1_month_home_camp: 'впасть в спячку на 1 месяц',
	o_cancel_sleep_home_camp: 'передумал, вернусь лучше на главную поляну',
	o_choose_food_home_camp: 'съесть мышь',
	o_cancel_eat_home_camp: 'расхотелось есть',
	/* ------------------------------------------------------------ */
	/* --------------- Текст на активити -------------------------- */
	home_camp_root: 'Вы в своем лагере. Что будете делать?',
	foreign_camp_root: 'Вы в {1}. Все уставились на вас. Раздается недовольный голос:\n'
		+' — Что вам здесь нужно?',
	home_camp_go_sleep: 'Сколько поспать?',
	home_camp_select_food: 'Что будете есть?(имитация, реально куча дичи еще не реализована)',
	/* ------------------------------------------------------------ */
}
