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
			"click deleteTask": "deleteTask",
			"click title": "showDetails"
		},

		customEvents: {
			"showTasks": "setupParentList",

		},

		elements: {
			addTask: ".add-task",
			taskGroup: ".task-group",
			taskRemaining: ".task-remaining",
			taskComplete: ".task-complete",
			checkTask: ".check-task",
			deleteTask: ".delete-task",
			title: ".task-title"
		},

		showDetails: function(e) {
			var id = this.$(e.target).closest('.task-item').data("id");
			var task = this.parentList.findTaskById(id);
			$(document).trigger('showDetails', task)
		},

		deleteTask: function(e) {
			var id = this.$(e.target).closest('.task-item').data("id");
			var task = this.parentList.findTaskById(id);
			task.destroy();
			this.renderAllTasks();

		},

		checkTask: function(e) {
			var id = this.$(e.target).closest('.task-item').data("id");
			var task = this.parentList.findTaskById(id);
			task.done = true;
			task.save();
			this.renderAllTasks();

		},

		setupParentList: function(e, parentList) {
			this.parentList = parentList;
			this.tasks = this.parentList.tasks;
			this.renderAllTasks();
		},

		addNewTask: function(e) {

			if (this._isEnterKey(e)) {
				var target = this.$(e.target);
				var title = $.trim(target.val());

				if (title) {
					var task = new TaskModel({
						title: title,
						parentList: this.parentList
					});

					task.save();
					target.val("");
					this.renderAllTasks();


				}

			}
		},

		renderAllTasks: function() {
			this.view.taskRemaining.html("");
			this.view.taskComplete.html("");

			for (taskId in this.tasks) {
				var task = this.tasks[taskId];
				this.renderTask(task);

			}

		},

		renderTask: function(task) {
			var html = _.template(this.template, task);

			if (task.done) {
				this.view.taskComplete.append(html);
			} else {
				this.view.taskRemaining.append(html);
			}
		}
	});

	return TasKController
})