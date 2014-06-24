define(["TaskModel", "ListModel", "Controller", "util", "underscore", "jquery"], function(TaskModel, ListModel, Controller, util, _, $) {

	var CommentController = util.extend(Controller, {


		constructor: function(el, template) {
			this.super.constructor.apply(this, arguments);
		},



		events: {

			"keypress addComment": "addComment"
		},

		elements: {
			addComment: ".add-comment",
			comments: ".comments"

		},

		routeSetup: function(){
			this.view.comments.empty();
			var ids = location.hash.slice(2).split("/");
			if (ids.length === 2) {
			
				var list = ListModel.findById(ids[0]);
				var task = list.findTaskById(ids[1]);

				this.task = task;
				this.renderAll();
			}
		},

		addComment: function(e){
			if(this._isEnterKey(e)){
				var target = this.$(e.target);
				var val = $.trim(target.val());
				if(val){

					this.task.comments.push(val);
					this.task.save();
					target.val("");

					this.renderAll();
				}
			}
			
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
});