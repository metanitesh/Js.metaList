define(["ListController", "TaskController", "NoteController", "CommentController", "ActionbarController", "ResponsiveController", "util", "bootstrapData", "jquery"], function(ListController, TaskController, NoteController, CommentController, ActionbarController, ResponsiveController, util, Bootstrap, $) {

	"use strict";

	$(function() {
		var preloadImages = ["icon-sprite.png", "detail.png", "list-active.jpg", "logo_bg.png", "task.png", "sidebar.png", "tweed.png"];
		util.imageLoader(preloadImages).done(function() {
			var listController = new ListController("#list-view", "#list-item");
			var taskController = new TaskController("#task-view", "#task-item");
			var noteController = new NoteController("#note-view");
			var commentController = new CommentController("#comment-view", "#comment-item");
			var actionbar = new ActionbarController("#actionbar");

			var responsiveController = new ResponsiveController("body");
			$(window).trigger("hashchange");
		});
	});



});