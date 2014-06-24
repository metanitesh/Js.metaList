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
			this.list = routeObj.list;
			
			if(routeObj.task){
				this.taskId = routeObj.task.id;
				var task = this.list.findTaskById(this.taskId);

				var oldVal = task.content;
				this.view.textarea.val(oldVal);
			}

		},
		

		saveNote: function(e) {
			var task = this.list.findTaskById(this.taskId)
			var val = this.$(e.target).val();
			task.content = val;
			task.save();
		}

		
	});

	return NoteController;
});