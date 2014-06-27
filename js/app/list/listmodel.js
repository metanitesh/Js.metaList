define(["util", "Model", "TaskModel", "underscore"], function(util, Model, TaskModel, _) {

	ListModel = util.extend(Model, {

		constructor: function(attr) {
			if (!attr) throw ("Title is required to create new List");
			this.load(attr);
			if (!this.id) this.id = this.genrateId();
			if (!this.tasks) this.tasks = {};

		},

		save: function() {
			this.constructor.records[this.id] = this.clone();
		},

		destroy: function() {
			delete this.constructor.records[this.id];
		},


		addTask: function(attr) {
			
			var task = new TaskModel(attr);
			task.parentList = this;
			task.save();
		},

		findTaskById: function(id) {
			return this.tasks[id].clone();
		}
		
	});

	ListModel.static({

		records: {},

		localDb: "metalist",

		attributes: ["id", "title"],

		populate: function(listCollection) {
			for (var listId in listCollection) {
				var list = new this(listCollection[listId]);
				if (list.tasks) {

					for (var taskId in list.tasks) {
						list.addTask(list.tasks[taskId]);
					}
				}
				list.save();
			}

		},

		findById: function(id) {
			var record = this.records[id];
			if (!record) throw "No record found";
			return record.clone();

		},

		saveLocal: function(name) {
			result = {};

			for (var listId in ListModel.records) {

				result[listId] = ListModel.records[listId].getAttributes();
				var tasks = ListModel.records[listId].tasks;
				if (!_.isEmpty(tasks)) {
					result[listId].tasks = {};
					for (var taskId in tasks) {
						result[listId].tasks[taskId] = tasks[taskId].getAttributes();
					}
				}
			}

			localStorage[this.localDb] = JSON.stringify(result);
		},

		loadLocal: function() {
			var result = JSON.parse(localStorage[this.localDb]);
			ListModel.populate(result);
		}


	});


	return ListModel;
});
