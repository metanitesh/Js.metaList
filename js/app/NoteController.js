define(["TaskModel", "ListModel", "Controller", "underscore", "jquery"], function(TaskModel, ListModel, Controller, _, $) {

	var NoteController = Controller.create();



	NoteController.include({


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
			textarea: ".note",
		
		},

		saveNote: function(e){
			var val = this.$(e.target).val();
			this.task.content = val;
			this.task.save();
		},

		detailSetup: function(e, task){

			this.task = task;	
			var oldVal = task.content;
			this.view.textarea.val(oldVal);
			
		}
	});

	return NoteController
})