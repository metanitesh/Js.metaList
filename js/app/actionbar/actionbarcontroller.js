define(["ListModel", "Controller", "util"], function(ListModel, Controller, util) {
	
	"use strict";

	var ActionbarController = util.extend(Controller, {
		
		constructor: function() {
			this.super.constructor.apply(this, arguments);
		},

		events: {
			"click save": "save"
		},

		elements: {
			"save": ".save",
			"frame": ".save-frame"
		},

		addAnimation: function() {
			this.view.frame.fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
		},

		save: function() {
			ListModel.saveLocal(ListModel.localDb);
			this.addAnimation();
		}


	});

	return ActionbarController;
});