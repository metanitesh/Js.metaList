define(["ListController", "ListModel",  "jquery"], function(ListController, ListModel, $){
	// var life  = new	ListModel({title: "bucketlist"});
	// life.addTask({title: "skydive", content: "yo baby", comments:["did it"]});
	// life.addTask({title: "party", content: "on my way", comments:["have to do it"]});
	// life.save();
	// console.log(ListModel.records);
	$(function(){
		var listView = new ListController(".list-view", "#list-item");
		
		// $(".list-container").append(listView.addList({title: "some"}))
		// $(".list-container").append(listView.addList({title: "more"}))

		console.log(ListModel.records);

	})
});