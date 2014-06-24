define(["TaskModel", "ListModel", "Controller", "util", "underscore", "jquery"], function(TaskModel, ListModel, Controller, util, _, $) {

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

		routeSetup: function() {
			
			this.view.textarea.html("");
			var routeObj = this.super.routeSetup();

			if(routeObj.task){
				this.task = routeObj.task;
				var oldVal = this.task.content;
				this.view.textarea.val(oldVal);
			}

		},
		

		saveNote: function(e) {
			var val = this.$(e.target).val();
			this.task.content = val;
			this.task.save();
		}

		
	});

	return NoteController;
});