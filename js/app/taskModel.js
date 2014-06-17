define(["Model", "ListModel"], function(Model, ListModel) {

	window.Task = Model.create();

	Task.include({

		init: function(attrs) {
			this.load(attrs);
			if (!this.id) this.id = this.genrateId();
			if (!this.comments) this.comments = [];
			if (!this.content) this.content = "";
			if (!this.done) this.done = false;
		},

		load: function(attrs) {
			$.extend(this, attrs);
		},

		genrateId: function() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			}).toUpperCase();
		},

		save: function() {
			if(!this.parentList) throw "unkown parent list";
			this.parentList.tasks[this.id] = this.clone();
		},

		clone: function() {
			return $.extend({}, this);
		},

		destroy: function() {
			delete this.parentList.tasks[this.id];
		},

		addComment: function(comment) {
			this.comments.push(comment);
		},

		addContent: function(content) {
			this.content = content;
		}

	});

	return Task;

});