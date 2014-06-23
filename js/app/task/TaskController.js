define(["TaskModel", "ListModel", "Controller", "util", "underscore", "jquery"], function(TaskModel, ListModel, Controller, util, _, $) {
	var TaskController = util.extend(Controller, {


		constructor: function(el, template) {

			this.view = $(el);
			if (template) this.template = $(template).html();

			this.refreshElement();
			this.delegateEvent();
			this.delegateCustomEvent();

			$(window).on("hashchange", $.proxy(function(e) {
				var id = location.hash.slice(1).split("/")[0];

				console.log(id);
				var parentList = ListModel.findById(id);
				this.parentList = parentList;
				this.setupParentList();

			}, this));
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
			this.view.find(".task-item").removeClass("task-item-selected")
			this.$(e.target).closest('.task-item').addClass('task-item-selected')
			var id = this.$(e.target).closest('.task-item').data("id");
			var task = this.parentList.findTaskById(id);
			// $(document).trigger('showDetails', task)
			location.hash = location.hash.split("/")[0] + "/" + task.id
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
			// this.parentList = parentList;
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
				this.view.taskComplete.find("li").addClass('task-done')
				this.view.taskComplete.find(".icon-task-checkbox").addClass('icon-task-checked')
			} else {
				this.view.taskRemaining.append(html);
			}
		}
	});


	return TaskController
})