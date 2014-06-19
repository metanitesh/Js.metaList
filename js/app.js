define(["ListController", "TaskController", "NoteController", "CommentController", "jquery"], function(ListController, TaskController, NoteController, CommentController, $) {

	$(function() {
		var listController = new ListController("#list-view", "#list-item");
		var taskController = new TaskController("#task-view", "#task-item");
		var detailContentController = new NoteController("#note-view");
		var commentController = new CommentController("#comment-view", "#comment-item");
	});
});