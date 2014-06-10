describe("Task Model", function(){
	var task;
	beforeEach(function(){
	 	task = new Task({name : "get coffee"})

	})	
	
	it("should genrate 36 digit random Id", function(){
		
		var id = task.genrateId();
		
		expect(id.length).toEqual(36);
	});

	it("should add attributes to task", function(){
		expect(task.name).toEqual("get coffee");
	})

	xit("should register task to it's list", function(){
		task.save()
		expect(this.parne)
	})

	it("should delete it self from list", function(){
		var list = new List({title: "fav"});
		list.addTask()
	})
});

// var list = new List({title: "fav"})
// var task = new Task({title: "some"})
// list.save()
// list.addTask(task)