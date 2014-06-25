define(["TaskModel", "ListModel", "Controller", "util", "underscore", "jquery"], function(TaskModel, ListModel, Controller, util, _, $) {
	var TaskController = util.extend(Controller, {


		constructor: function(el, template) {

			this.super.constructor.apply(this, arguments);
		},



		events: {

			"keypress addTask": "addNewTask",
			"click checkTask": "checkTask",
			"click deleteTask": "deleteTask",
			"click taskItem": "updateHash"
		},


		elements: {
			addTask: ".add-task",
			taskItem: ".task-item",
			taskGroup: ".task-group",
			taskRemaining: ".task-remaining",
			taskComplete: ".task-complete",
			checkTask: ".check-task",
			deleteTask: ".delete-task",
			title: ".task-title"
		},

		
		/*********************

			route handling
		**********************/

		routeSetup: function(e) {

			var urlObjects = this.super.getUrlObject();

			this.view.addTask.removeAttr("disabled", "disabled");
			this.view.addTask.removeClass("disabled")

			if(urlObjects.list){
				this.parentList = urlObjects.list;
				this.tasks = this.parentList.tasks;
				this.renderAll();
			}
			
			if(urlObjects.task){
				this.activeState(urlObjects.task.id);
			}

			if(_.isEmpty(urlObjects)){
				this.view.addTask.attr("disabled", "disabled");
				this.view.addTask.addClass("disabled")
			}



			
		},

		updateHash: function(e) {
			var task = this._getTask(e);
			var list = this.parentList;

			this.setUrl(list, task);
			// var listId = location.hash.slice(2).split("/")[0];
			// location.hash = "#/" + listId + "/" + task.id

		},



		/*************************

			helper and states
		*************************/


		_getTask: function(e) {
			var id = this.$(e.target).closest('.task-item').data("id");
			var task = this.parentList.findTaskById(id);
			return task;
		},


		activeState: function(id) {
			this.view.find(".task-item").removeClass("task-item-selected")
			this.$("[data-id=" + id + "]").closest('.task-item').addClass('task-item-selected')
		},

		completeTaskState: function() {
			this.view.taskComplete.find("li").addClass('task-done')
			this.view.taskComplete.find(".icon-task-checkbox").addClass('icon-task-checked')
		},


		/***********************************************

				data manuplation methods  
		***********************************************/

		addNewTask: function(e) {

			if (this._isEnterKey(e)) {
				var element = this.$(e.target);
				var title = $.trim(element.val());

				if (title) {
					var task = new TaskModel({
						title: title,
						parentList: this.parentList
					});

					task.save();
					element.val("");
					this.renderAll();

					this.setUrl(this.parentList, task);
				}

			}
		},

		deleteTask: function(e) {
			var task = this._getTask(e);
			task.destroy();
			this.renderAll();

		},

		checkTask: function(e) {
			var task = this._getTask(e);
			task.done = true;
			task.save();
			this.renderAll();

		},

		/***********************************************

				DOM manuplation methods 
		***********************************************/

		renderAll: function() {
			this.view.taskRemaining.html("");
			this.view.taskComplete.html("");

			for (taskId in this.tasks) {
				var task = this.tasks[taskId];
				this.render(task);

			}

		},

		render: function(task) {
			var html = _.template(this.template, task);

			if (task.done) {
				this.view.taskComplete.append(html);
				this.completeTaskState();
			} else {
				this.view.taskRemaining.append(html);
			}
		}
	});


	return TaskController
})