var game = null

exports.define = function(g) {
	game = g
}

exports.activities = {
	hurricane_camp: function() {return {
		id: 'hurricane_camp',
		text: ((game.actor.race == 'hurricane') ? 'home' : 'foreign')+"_camp_root",
		img: "hurricane_camp_"+game.getSeason()+".jpg",
		onLocationEnter: function() {
			let audioList = ['mega_duty_propaganda_1', 'mega_duty_propaganda_2', 'mega_duty_propaganda_3',
				'mega_duty_propaganda_4', 'mega_duty_propaganda_5', 'megafon_music_duty']
			var audio = sound.play(audioList[Math.floor(Math.random()*audioList.length)], true, {sublocSpec: true})
			function recursive(au) {
				au.addEventListener('ended', function() {
					game.setSublocationTimeout(function() {
						recursive(sound.play(audioList[Math.floor(Math.random()*audioList.length)], true,
							{sublocSpec: true}))
					}, 5000)
				})
			}
			recursive(audio)
			if (game.actor.race != 'hurricane') {
				sound.play('duty_warning1', false, {sublocSpec: true})
			}
		},
		doAndGetArgs: function() {
			//setTempActorProperty('propname')
			return [
				_('loc_'+this.id)
			]
		},
		timer: (game.actor.race != 'hurricane') ? 300 : null,
		//showActorParams: ['satiety', 'actionPower', 'muscularity']
		options: [
			{
				text: "o_go_sleep_home_camp",
				goto: "standard_camp_activities.sleep_home_select_hours",
				isVisible: function() {return (game.actor.race == 'hurricane')},
				//gotoSublocation: "",
				//disabledReason: 'dis_foreign_camp',
				group: "og_camp_idle",
				//auto: true,
			},
			{
				text: "o_go_eat_home_camp",
				goto: "standard_camp_activities.eat_home_select_food",
				isVisible: function() {return (game.actor.race == 'hurricane')},
				group: "og_camp_idle"
			},
			{
				text: "o_leave_camp",
				goto: "@mapChoice",
				isVisible: function() {return true}
			},
		]
	}},
	forest_camp: function() {return {
		id: 'forest_camp',
		text: ((game.actor.race == 'forest') ? 'home' : 'foreign')+"_camp_root",
		img: "forest_camp_"+game.getSeason()+".jpg",
		onLocationEnter: function() {
			let audioList = ['army_propaganda_1', 'army_propaganda_2', 'army_propaganda_3', 'army_propaganda_4',
				'army_propaganda_5', 'army_propaganda_6', 'army_propaganda_7', 'army_propaganda_8',
				'megafon_music_bar']
			var audio = sound.play(audioList[Math.floor(Math.random()*audioList.length)], true, {sublocSpec: true})
			function recursive(au) {
				au.addEventListener('ended', function() {
					game.setSublocationTimeout(function() {
						recursive(sound.play(audioList[Math.floor(Math.random()*audioList.length)], true,
							{sublocSpec: true}))
					}, 5000)
				})
			}
			recursive(audio)
			if (game.actor.race != 'forest') {
				sound.play('duty_guards_stop_1', false, {sublocSpec: true})
			}
		},
		doAndGetArgs: function() {
			//setTempActorProperty('propname')
			return [
				_('loc_'+this.id)
			]
		},
		timer: (game.actor.race != 'forest') ? 300 : null,
		//showActorParams: ['satiety', 'actionPower', 'muscularity']
		options: [
			{
				text: "o_go_sleep_home_camp",
				goto: "standard_camp_activities.sleep_home_select_hours",
				isVisible: function() {return (game.actor.race == 'forest')},
				//auto: true,
				group: "og_camp_idle"
			},
			{
				text: "o_go_eat_home_camp",
				goto: "standard_camp_activities.eat_home_select_food",
				isVisible: function() {return (game.actor.race == 'forest')},
				group: "og_camp_idle"
			},
			{
				text: "o_leave_camp",
				goto: "@mapChoice",
				isVisible: function() {return true}
			},
		]
	}},
	swamp_camp: function() {return {
		id: 'swamp_camp',
		text: ((game.actor.race == 'swamp') ? 'home' : 'foreign')+"_camp_root",
		img: "swamp_camp_"+game.getSeason()+".jpg",
		onLocationEnter: function() {
			let audioList = ['comandir_megafon_1', 'comandir_megafon_2', 'comandir_megafon_6', 'comandir_megafon_7', 
				'comandir_megafon_9', 'comandir_megafon_10', 'comandir_megafon_11', 'comandir_megafon_13', 
				'comandir_megafon_17', 'megafon_music_dying_world']
			var audio = sound.play(audioList[Math.floor(Math.random()*audioList.length)], true, {sublocSpec: true})
			function recursive(au) {
				au.addEventListener('ended', function() {
					game.setSublocationTimeout(function() {
						recursive(sound.play(audioList[Math.floor(Math.random()*audioList.length)], true,
							{sublocSpec: true}))
					}, 5000)
				})
			}
			recursive(audio)
			if (game.actor.race != 'swamp') {
				sound.play('bridge_soldier', false, {sublocSpec: true})
			}
		},
		doAndGetArgs: function() {
			//setTempActorProperty('propname')
			return [
				_('loc_'+this.id)
			]
		},
		timer: (game.actor.race != 'swamp') ? 300 : null,
		//showActorParams: ['satiety', 'actionPower', 'muscularity']
		options: [
			{
				text: "o_go_sleep_home_camp",
				goto: "standard_camp_activities.sleep_home_select_hours",
				isVisible: function() {return (game.actor.race == 'swamp')},
				//auto: true,
				group: "og_camp_idle"
			},
			{
				text: "o_go_eat_home_camp",
				goto: "standard_camp_activities.eat_home_select_food",
				isVisible: function() {return (game.actor.race == 'swamp')},
				group: "og_camp_idle"
			},
			{
				text: "o_leave_camp",
				goto: "@mapChoice",
				isVisible: function() {return true}
			},
		]
	}},
	mist_camp: function() {return {
		id: 'mist_camp',
		text: ((game.actor.race == 'mist') ? 'home' : 'foreign')+"_camp_root",
		img: "mist_camp_"+game.getSeason()+".jpg",
		onLocationEnter: function() {
			let audioList = ['freedom_propaganda_1', 'freedom_propaganda_2', 'freedom_propaganda_3', 
				'freedom_propaganda_4', 'freedom_propaganda_5', 'megafon_music_bandits']
			var audio = sound.play(audioList[Math.floor(Math.random()*audioList.length)], true, {sublocSpec: true})
			function recursive(au) {
				au.addEventListener('ended', function() {
					game.setSublocationTimeout(function() {
						recursive(sound.play(audioList[Math.floor(Math.random()*audioList.length)], true,
							{sublocSpec: true}))
					}, 5000)
				})
			}
			recursive(audio)
			if (game.actor.race != 'mist') {
				sound.play('bandit_on_actor_1', false, {sublocSpec: true})
			}
		},
		doAndGetArgs: function() {
			//setTempActorProperty('propname')
			return [
				_('loc_'+this.id)
			]
		},
		timer: (game.actor.race != 'mist') ? 300 : null,
		//showActorParams: ['satiety', 'actionPower', 'muscularity']
		options: [
			{
				text: "o_go_sleep_home_camp",
				goto: "standard_camp_activities.sleep_home_select_hours",
				isVisible: function() {return (game.actor.race == 'mist')},
				//auto: true,
				group: "og_camp_idle"
			},
			{
				text: "o_go_eat_home_camp",
				goto: "standard_camp_activities.eat_home_select_food",
				isVisible: function() {return (game.actor.race == 'mist')},
				group: "og_camp_idle"
			},
			{
				text: "o_leave_camp",
				goto: "@mapChoice",
				isVisible: function() {return true}
			},
		]
	}},
}