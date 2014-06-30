define([ "util", "Model", "ListModel"], function(util, Model, ListModel) {
	
	"use strict";

	var TaskModel = util.extend(Model, {
		
		constructor: function(attr) {

			if (!attr) throw ("Title is required to create a new Task");
			this.load(attr);
			if (!this.id) this.id = this.genrateId();
			if (!this.comments) this.comments = [];
			if (!this.content) this.content = "";
			if (!this.done) this.done = false;
		},

		save: function() {
			if(!this.parentList) throw "Unkown parent list for this task";
			this.parentList.tasks[this.id] = this.clone();
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

	TaskModel.static({
		attributes:  ["id", "title", "comments", "content", "done"]
	})

	
	return TaskModel;

});
