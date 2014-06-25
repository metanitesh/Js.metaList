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

			this.view.addComment.attr("disabled", "disabled");
			this.view.addComment.addClass("disabled");

			var urlObjects = this.super.getUrlObject();
			
			if(urlObjects.list){
				this.list = urlObjects.list;	
			}	
			
			if(urlObjects.task){
				this.taskId = urlObjects.task.id;
				this.renderAll();
			}

			if(urlObjects.list && urlObjects.task){
				this.view.addComment.removeAttr("disabled")
				this.view.addComment.removeClass("disabled")
			}
		},

		addComment: function(e){
			if(this._isEnterKey(e)){
				var target = this.$(e.target);
				var val = $.trim(target.val());
				if(val){

					var task = this.list.findTaskById(this.taskId)
					task.comments.push(val);
					task.save();
					target.val("");

					this.renderAll();
				}
			}
			
		},

		renderAll: function(){

				this.view.comments.empty();
				var task = this.list.findTaskById(this.taskId);
				for (var i = 0; i < task.comments.length; i++) {
					var html = this.renderComment(task.comments[i]);
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