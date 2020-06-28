module.exports = {
	hurricane_camp: {
		text: ((game.actor.race == 'hurricane') ? 'home' : 'foreign')+"_camp_root",
		img: "hurricane_camp_"+game.getSeason()+".jpg",
		doAndGetArgs: function() {
			return [
				_(game.actor.race + '_race')
			]
		},
		//timer: 120,
		//sound: 'sound'
		options: [
			{
				text: "o_go_sleep_home_camp",
				goto: "standard_camp_activities.sleep_home_select_hours",
				isVisible: function() {return (game.actor.race == 'hurricane')},
				isAbled: function() {return true},
				//disabledReason: 'dis_foreign_camp',
				//group: "og_idle",
				//auto: true,
				action: function() {}
			},
			{
				text: "o_go_eat_home_camp",
				goto: "standard_camp_activities.eat_home_select_food",
				isVisible: function() {return (game.actor.race == 'hurricane')},
				isAbled: function() {return true},
				action: function() {}
			},
			{
				text: "o_leave_camp",
				goto: "mapChoice",
				isVisible: function() {return true},
				isAbled: function() {return true},
				action: function() {}
			},
		]
	}
}