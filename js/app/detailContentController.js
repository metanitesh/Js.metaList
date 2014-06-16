define(["TaskModel", "ListModel", "Controller", "underscore", "jquery"], function(TaskModel, ListModel, Controller, _, $) {

	var DetailContentController = Controller.create();



	DetailContentController.include({


		init: function(el, template) {

			this.view = $(el);
			if (template) this.template = $(template).html();

			this.refreshElement();
			this.delegateEvent();
			this.delegateCustomEvent();
		},



		events: {

			"keyup textarea": "saveNote",
		
		},

		customEvents: {
			"showDetails": "detailSetup"
		},

		elements: {
			textarea: "textarea",
		
		},

		saveNote: function(e){
			var val = this.$(e.target).val();
			this.task.content = val;
			this.task.save();
		},

		detailSetup: function(e, task){
			console.log(task);
			this.task = task;	
			var oldVal = task.content;

			console.log(oldVal);


			this.view.textarea.val(oldVal);
			var val = this.view.textarea.val();
			
			task.content = val;
			task.save();
		}
	});

	return DetailContentController
})