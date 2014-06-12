define(["Model", "TaskModel"], function(Model, TaskModel) {

	var ListModel = Model.create();

	ListModel.extend({

		records: {},

		populate: function(records) {
			for (var i = 0, max = records.length; i < max; i++) {
				var record = new this(records[i]);
				record.create();
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
			$.extend(true, this, attr);
			return this;
		},


		genrateId: function() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			}).toUpperCase();
		},

		create: function() {
			this.parent.records[this.id] = this.clone();
		},

		update: function() {
			this.parent.records[this.id] = this.clone();
		},


		save: function() {
			if (this.parent.records[this.id]) {
				this.update();
			} else {
				this.create();
			}
		},

		destroy: function() {
			delete this.parent.records[this.id];
		},

		clone: function() {
			return $.extend(true, {}, this);
		},

		addTask: function(attr) {

			var task = new TaskModel(attr);
			task.parent = this;
			task.create();
		},

		findTaskById: function(id){
			return this.tasks[id].clone();
		}

	});

	return ListModel;
});