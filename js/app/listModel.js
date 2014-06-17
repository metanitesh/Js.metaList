define(["Model", "TaskModel"], function(Model, TaskModel) {

	window.ListModel = Model.create();

	ListModel.extend({

		records: {},

		populate: function(lisCollection) {
			for (var i = 0, max = lisCollection.length; i < max; i++) {
				var list = new this(lisCollection[i]);

				if(list.tasks){
					
					for(var taskId in list.tasks){
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


	ListModel.include({

		init: function(attr) {

			if (!attr) throw ("at least required title attribute");

			this.load(attr);
			if (!this.id) this.id = this.genrateId();
			if (!this.tasks) this.tasks = {};


		},

		load: function(attr) {
			$.extend( this, attr);
		},


		genrateId: function() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			}).toUpperCase();
		},

		save: function() {
			this.parent.records[this.id] = this.clone();
		},

		destroy: function() {
			delete this.parent.records[this.id];
		},

		clone: function() {
			return $.extend( {}, this);
		},

		addTask: function(attr) {

			var task = new TaskModel(attr);
			task.parentList = this;
			task.save();
		},

		findTaskById: function(id){
			return this.tasks[id].clone();
		}

	});

	return ListModel;
});