define([ "ListController", "TaskController", "NoteController", "CommentController", "ActionbarController", "ResponsiveController", "bootstrapData", "jquery"], function( ListController, TaskController, NoteController, CommentController, ActionbarController, ResponsiveController, Bootstrap, $) {

		var listController = new ListController("#list-view", "#list-item");
		var taskController = new TaskController("#task-view", "#task-item");
		var noteController = new NoteController("#note-view");
		var commentController = new CommentController("#comment-view", "#comment-item");
		var actionbar = new  ActionbarController("#actionbar");
		
		var responsiveController = new ResponsiveController("body");
		
		$(window).trigger("hashchange");
});