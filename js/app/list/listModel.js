define(["util", "Model", "TaskModel"], function(util, Model, TaskModel) {

	ListModel = util.extend(Model, {
		constructor: function(attr) {

			if (!attr) throw ("at least required title attribute");

			this.load(attr);
			if (!this.id) this.id = this.genrateId();
			if (!this.tasks) this.tasks = {};



		},		

		save: function() {
			this.parent.records[this.id] = this.clone();
		},

		destroy: function() {
			delete this.parent.records[this.id];
		},

		
		addTask: function(attr) {

			var task = new TaskModel(attr);
			task.parentList = this;
			task.save();
		},

		findTaskById: function(id) {
			return this.tasks[id].clone();
		}
	})

	ListModel.extend({

		records: {},

		populate: function(lisCollection) {
			for (var i = 0, max = lisCollection.length; i < max; i++) {
				var list = new this(lisCollection[i]);

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
			if (!record) throw "no record found";
			return record.clone();

		}

	});

	ListModel.LocalStorage = {
		saveLocal: function(name) {
			var result = [];

			for (var i in ListModel.records) {
				var ListModelAttr = {
					id: ListModel.records[i].id,
					title: ListModel.records[i].title
				};

				var tasks = ListModel.records[i].tasks;
				if (!_.isEmpty(tasks)) {

					console.log("in");
					var obj = {};
					ListModelAttr.tasks = {};
					for (var j in tasks) {
						console.log(tasks[j])
						obj.id = tasks[j].id;
						obj.content = tasks[j].content;
						obj.comments = tasks[j].comments;
						obj.title = tasks[j].title;

						console.log(obj)
						ListModelAttr.tasks[obj.id] = obj;
						console.log(ListModelAttr);
					}

				}
				result.push(ListModelAttr);
			}
			localStorage[name] = JSON.stringify(result);
		},

		loadLocal: function(name) {
			var result = JSON.parse(localStorage[name]);
			ListModel.populate(result);
		}

	};

	
	return ListModel;
});