define(["ListModel", "Controller", "util"], function(ListModel, Controller, util) {
	
	var ActionbarController = util.extend(Controller, {
	constructor: function(){
			this.super.constructor.apply(this, arguments);
			$(".list_menu").click(function(){
				$("#sidebar").hide();
				$("#main-content").hide();
				$("#detail").hide();

				$("#sidebar").fadeIn();

			});
			$(".task_menu").click(function(){
				$("#sidebar").hide();
				$("#main-content").hide();
				$("#detail").hide();

				$("#main-content").fadeIn();

			});$(".detail_menu").click(function(){
				$("#sidebar").hide();
				$("#main-content").hide();
				$("#detail").hide();

				$("#detail").fadeIn();

			});
		},

		events: {
			"click save": "save"
		},

		elements: {
			"save" : ".save",
			"frame": ".save-frame"
		},

		addAnimation: function(){
			this.view.frame.fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
		},
		
		save: function(){
			ListModel.saveLocal(ListModel.localDb);
			this.addAnimation();
		}


	});

	return ActionbarController;
});
