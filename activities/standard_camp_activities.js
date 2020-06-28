module.exports = {
	sleep_home_select_hours: {
		text: "home_camp_go_sleep",
		img: game.actor.race+"_camp_actor_sleepplace_"+game.getSeason()+".jpg",
		doAndGetArgs: function() {
			return []
		},
		options: [
			{
				text: "o_sleep_1_hour_home_camp",
				goto: "mapold."+game.actor.race+"_camp",
				isVisible: function() {return true},
				isAbled: function() {return true},
				action: function() {
					game.actor.freshness = Math.min(1, game.actor.freshness+(1/8))
					game.skip(5)
				}
			},
			{
				text: "o_cancel_sleep_home_camp",
				goto: "mapold."+game.actor.race+"_camp",
				isVisible: function() {return true},
				isAbled: function() {return true},
				action: function() {}
			},
		]
	},
	eat_home_select_food: {
		text: "home_camp_select_food",
		img: game.actor.race+"_camp_eatplace_"+game.getSeason()+".jpg",
		doAndGetArgs: function() {
			log(this)
			return []
		},
		options: [
			{
				text: "o_choose_food_home_camp",
				goto: "mapold."+game.actor.race+"_camp",
				isVisible: function() {return true},
				isAbled: function() {return true},
				action: function() {
					game.actor.satiety = Math.min(1, game.actor.satiety+(1/4))
					game.skip(5)
				}
			},
			{
				text: "o_cancel_eat_home_camp",
				goto: "mapold."+game.actor.race+"_camp",
				isVisible: function() {return true},
				isAbled: function() {return true},
				action: function() {}
			},
		]
	},
}