define(["ListController", "TaskController", "NoteController", "CommentController", "ListModel", "TaskModel", "jquery"], function(ListController, TaskController, NoteController, CommentController, ListModel, TaskModel, $){

	$(function(){

		listView = new ListController("#list-view", "#list-item");
		var taskView = new TaskController("#task-view", "#task-item");
		var detailContentController = new NoteController("#note-view");
		var commentController = new CommentController("#comment-view", "#comment-item");
		// $(".list-container").append(listView.addList({title: "some"}))
		// $(".list-container").append(listView.addList({title: "more"}))
		// window.listView = listView;
		// window.taskView = taskView;
	});
});