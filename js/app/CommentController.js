define(["TaskModel", "ListModel", "Controller", "underscore", "jquery"], function(TaskModel, ListModel, Controller, _, $) {

	var CommentController = Controller.create();



	CommentController.include({


		init: function(el, template) {
			this.view = $(el);
			if (template) this.template = $(template).html();
			this.refreshElement();
			this.delegateEvent();
			this.delegateCustomEvent();
		},



		events: {

			"keypress addComment": "addComment"
		},

		customEvents: {
			"showDetails": "commentSetup"
		},

		elements: {
			addComment: ".add-comment",
			comments: ".comments"

		},

		addComment: function(e){
			if(this._isEnterKey(e)){
				var target = this.$(e.target)
				var val = $.trim(target.val());
				if(val){

					this.task.comments.push(val);
					this.task.save();
					target.val("");

					this.renderAll();
				}
			}
			
		},

		commentSetup: function(e, task) {
			this.task = task;
			this.renderAll();

		},

		renderAll: function(){
				this.view.comments.empty();
				for (var i = 0; i < this.task.comments.length; i++) {
					var html = this.renderComment(this.task.comments[i]);
					this.view.comments.append(html);
				}
			
		},

		renderComment: function(comment) {

			var html = _.template(this.template, {comment: comment});
			return html;
		}
	});

	return CommentController;
})