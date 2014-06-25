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
			
			this.view.textarea.val("");
			this.view.textarea.attr("disabled", "disabled");
			this.view.textarea.addClass("disabled");

			var urlObjects = this.super.getUrlObject();
			
			if(urlObjects.list){
				this.list = urlObjects.list;
			}
			
			if(urlObjects.task){
				this.taskId = urlObjects.task.id;
				var task = this.list.findTaskById(this.taskId);
				var oldVal = task.content;
				this.view.textarea.val(oldVal);
			}

			if(urlObjects.list && urlObjects.task){
				this.view.textarea.removeAttr("disabled");
				this.view.textarea.removeClass("disabled");
			}
			// }else{
			// 	// this.view.hide();
			// }

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