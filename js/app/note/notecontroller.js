define(["TaskModel", "Controller", "util", "underscore", "jquery"], function(TaskModel, Controller, util, _, $) {

	var NoteController = util.extend(Controller, {

		constructor: function(el, template) {
			this.super.constructor.apply(this, arguments);
		},

		events: {
			"keyup textarea": "saveNote",
		},

		elements: {
			textarea: ".note",
		},
		
		/*********************

			Route handling
		**********************/

		routeSetup: function() {

			this.view.textarea.val("");
			this.disbableViewState();

			var urlObjects = this.super.getUrlObject();

			if (urlObjects.list) {
				this.list = urlObjects.list;
			}

			if (urlObjects.task) {
				this.activeViewState();
				this.taskId = urlObjects.task.id;
				this.setNoteContent();
			}

		},

		

		/*************************

			States
		*************************/

		disbableViewState: function() {
			this.view.textarea.attr("disabled", "disabled");
			this.view.textarea.addClass("disabled");
		},

		activeViewState: function() {
			this.view.textarea.removeAttr("disabled");
			this.view.textarea.removeClass("disabled");
		},

		/****************************

			Model manuplation methods
		*****************************/

		saveNote: function(e) {
			var task = this.list.findTaskById(this.taskId);
			var val = this.$(e.target).val();
			task.content = val;
			task.save();
		},

		/***************************

			DOM manuplation methods
		*****************************/

		setNoteContent: function() {
			var task = this.list.findTaskById(this.taskId);
			var oldVal = task.content;
			this.view.textarea.val(oldVal);
		}

		


	});

	return NoteController;
});
