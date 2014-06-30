define(["TaskModel", "ListModel", "Controller", "util", "underscore", "jquery"], function(TaskModel, ListModel, Controller, util, _, $) {

	"use strict";
	
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

		/*********************

			Route handling
		**********************/

		routeSetup: function() {

			this.view.comments.empty();
			this.addCommentDisabledState();

			var urlObjects = this.super.getUrlObject();

			if (urlObjects.list) {
				this.list = urlObjects.list;
			}

			if (urlObjects.task) {
				this.addCommentActiveState();
				this.taskId = urlObjects.task.id;
				this.renderAll();
			}

		},

		/*************************

			States
		*************************/

		addCommentDisabledState: function() {
			this.view.addComment.attr("disabled", "disabled");
			this.view.addComment.addClass("disabled");
		},

		addCommentActiveState: function() {
			this.view.addComment.removeAttr("disabled");
			this.view.addComment.removeClass("disabled");
		},

		/****************************

			Model manuplation methods
		******************************/

		addComment: function(e) {

			if (this._isEnterKey(e)) {
				var element = this.$(e.target);
				var newComment = $.trim(element.val());

				if (newComment) {

					var task = this.list.findTaskById(this.taskId);
					task.comments.push(newComment);
					task.save();

					element.val("");
					this.renderAll();
				}
			}

		},

		/***************************

			DOM manuplation methods
		*****************************/

		renderAll: function() {

			this.view.comments.empty();
			var task = this.list.findTaskById(this.taskId);

			for (var i = 0; i < task.comments.length; i++) {
				var html = this.renderComment(task.comments[i]);
				this.view.comments.append(html);
			}

		},

		renderComment: function(comment) {
			var html = _.template(this.template, {
				comment: comment
			});
			return html;
		}
	});



	return CommentController;
});
