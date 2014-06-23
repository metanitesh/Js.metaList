define(["TaskModel", "ListModel", "Controller", "util", "underscore", "jquery"], function(TaskModel, ListModel, Controller, util, _, $) {

	var NoteController = util.extend(Controller, {


		constructor: function(el, template) {

			this.view = $(el);
			if (template) this.template = $(template).html();

			this.refreshElement();
			this.delegateEvent();
			this.delegateCustomEvent();
			$(window).on("hashchange", $.proxy(function(){
				ids = location.hash.slice(1).split("/");
				this.listId = ids[0];
				this.taskId = ids[1];
				console.log(ids);
				if(this.taskId){
					this.detailSetup();

				}
			}, this));
		},



		events: {

			"keyup textarea": "saveNote",
		
		},

		customEvents: {
			// "showDetails": "detailSetup"
		},

		elements: {
			textarea: ".note",
		
		},

		saveNote: function(e){
			var val = this.$(e.target).val();
			this.task.content = val;
			this.task.save();
		},

		detailSetup: function(){

			var list = ListModel.findById(this.listId);
			var task = list.findTaskById(this.taskId);
			
			this.task = task;
			var oldVal = task.content;
			this.view.textarea.val(oldVal);
			
		}
	});

	return NoteController
})