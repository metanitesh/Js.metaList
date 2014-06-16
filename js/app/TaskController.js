define(["TaskModel", "ListModel", "Controller", "underscore", "jquery"], function(TaskModel, ListModel, Controller, _, $) {

	var TasKController = Controller.create();



	TasKController.include({


		init: function(el, template) {

			this.view = $(el);
			if (template) this.template = $(template).html();

			this.refreshElement();
			this.delegateEvent();
			this.delegateCustomEvent();
		},



		events: {

			"keypress addTask": "addNewTask",
			"click checkTask": "checkTask",
			"click deleteTask": "deleteTask"
			// "taskItemCreated": "renderAllTasks"
		},

		customEvents: {
			"showTasks": "setupList",

		},

		elements: {
			addTask: ".add-task",
			taskGroup: ".task-group",
			taskRemaining: ".task-remaining",
			taskComplete: ".task-complete",
			checkTask:".check-task",
			deleteTask: ".delete-task"
		},

		checkTask: function(e){
			var id = this.$(e.target).closest('.task-item').data("id");
			var task = this.tasks[id];
			task.done = true;
			task.save();
			
		},

		destroy: function(){
			var id = this.$(e.target).closest('.task-item').data("id");
			var task = this.tasks[id];
		},

		setupList: function(e, list){
			// console.log(window)
			this.parent = list;
			this.tasks = this.parent.tasks;
			this.renderAllTasks();
		},

		addNewTask: function(e) {
			
			if (this._isEnterKey(e)) {
				var target = this.$(e.target);
				var title = $.trim(target.val());
				if (title) {
					var task = new TaskModel({
						title : title,
						parent: this.parent
					});

					task.save();
					target.val("");

				}

			}
		},

		renderAllTasks: function(){
			for(taskId in this.tasks){
				var task = this.tasks[taskId];
				var html = this.renderTask(task);

				if(task.done){
					this.view.taskComplete.append(html);
				}else{
					this.view.taskRemaining.append(html);
				}
			}
			
		},

		renderTask: function(task){
			return _.template(this.template, task);
		}, 
		// _listUpdateState: function(target){

		// 	target.closest('.list').find(".input-wrapper").removeClass('hidden');
		// 	target.closest('.list').find(".title").addClass('hidden');
		// },

		// _listDisplayState: function(target, model){
		// 	target.find(".input-wrapper").addClass('hidden');
		// 	target.closest('.list').find(".title").html(model.title).removeClass('hidden');
		// },


		// addNewListItem: function(e) {
		// 	if (this._isEnterKey(e)) {
		// 		var target = $(e.target);
		// 		var title = $.trim(target.val());
		// 		if (title) {
		// 			var listItem = new ListModel({
		// 				title: title
		// 			});
		// 			listItem.save();

		// 			target.val("");
		// 			this.view.trigger("listItemCreated", listItem);
		// 		}

		// 	}

		// },

		// setUpdateView: function(e) {
		// 	var target = this.$(e.target);
		// 	this._listUpdateState(target);				

		// },

		// updateListItem: function(e) {

		// 	if (this._isEnterKey(e)) {

		// 		var newTitle = $.trim($(e.target).val());
		// 		var id = $(e.target).closest('.list').attr("data-id");
		// 		var model = ListModel.findById(id);


		// 		if (newTitle) {
		// 			model.title = newTitle;
		// 			model.save();
		// 			$(this.view).trigger("listItemUpdate", model);

		// 		}

		// 	}
		// },


		// deleteListItem: function(e) {
		// 	var id = this.$(e.target).closest('.list').attr("data-id");
		// 	var model = ListModel.findById(id)
		// 	model.destroy();
		// 	this.view.trigger("ListItemDestroyed", id);
		// },

		// renderModel: function(e, model) {
		// 	var html = _.template(this.template, model);
		// 	this.view.listContainer.append(html);
		// },

		// removeModel: function(e, id) {
		// 	var element = this.view.find("[data-id=" + id + "]");
		// 	element.remove();
		// },

		// updateModel: function(e, model) {
		// 	var target = this.view.find("[data-id=" + model.id + "]");
		// 	this._listDisplayState(target, model)

		// },

		// renderALL: function() {
		// 	this.view.listContainer.empty();
		// 	for (id in ListModel.records) {
		// 		this.renderModel(null, ListModel.records[i]);
		// 	};


		// }

	});

	return TasKController
})