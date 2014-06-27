define([ "ListController", "TaskController", "NoteController", "CommentController", "actionbarController", "bootstrapData", "jquery"], function( ListController, TaskController, NoteController, CommentController, ActionbarController, Bootstrap, $) {

		var listController = new ListController("#list-view", "#list-item");
		var taskController = new TaskController("#task-view", "#task-item");
		var noteController = new NoteController("#note-view");
		var commentController = new CommentController("#comment-view", "#comment-item");
		var actionbar = new  ActionbarController("#actionbar");
		
		$(window).trigger("hashchange");
});