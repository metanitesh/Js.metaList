define(["Model"], function(Model) {

	window.Task = Model.create();

	Task.include({

		init: function(attrs) {
			this.load(attrs);
			if (!this.id) this.id = this.genrateId();
			if (!this.comments) this.comments = [];
			if (!this.done) this.done = false;
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

		save: function() {
			this.parent.tasks[this.id] = this.clone();
			this.parent.save();
		},

		clone: function() {
			return $.extend(true, {}, this);
		},

		distroy: function() {
			delete this.parent.tasks[this.id];
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