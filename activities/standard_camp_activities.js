var game = null

exports.define = function(g) {
	game = g
}

exports.activities = {
	sleep_home_select_hours: function(){return{
		text: "home_camp_go_sleep",
		img: game.actor.race+"_camp_actor_sleepplace_"+game.getSeason()+".jpg",
		doAndGetArgs: function() {
			return []
		},
		options: [
			{
				text: "o_sleep_6_hour_home_camp",
				goto: "mapold."+game.actor.race+"_camp",
				isVisible: function() {return true},
				action: function() {
					game.actor.freshness = Math.min(1, game.actor.freshness+(1/2))
					game.skip(6*60)
				}
			},
			{
				text: "o_sleep_1_month_home_camp",
				goto: "mapold."+game.actor.race+"_camp",
				isVisible: function() {return true},
				action: function() {
					game.actor.freshness = Math.min(1, game.actor.freshness+(1/2))
					game.skip(30.5*24*60)
				}
			},
			{
				text: "o_cancel_sleep_home_camp",
				goto: "mapold."+game.actor.race+"_camp",
				isVisible: function() {return true},
				action: function() {
					game.skip(3)
				}
			},
		]
	}},
	eat_home_select_food: function(){return{
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
				action: function() {
					game.actor.satiety = Math.min(1, game.actor.satiety+(1/4))
					game.skip(10)
				}
			},
			{
				text: "o_cancel_eat_home_camp",
				goto: "mapold."+game.actor.race+"_camp",
				isVisible: function() {return true},
				action: function() {
					game.skip(3)
				}
			},
		]
	}},
}