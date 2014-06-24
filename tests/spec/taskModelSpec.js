define(["TaskModel", "ListModel"], function(TaskModel, ListModel) {

	describe("Task-Model spec", function() {
		var task;
		var list;
		beforeEach(function() {
			
			list  = new ListModel({
				title: "todo"
			});

			list.save();
			
			task = new TaskModel({
				title: "buy milk",
				parentList: list
			});


		});

		it("should be subclass of Model", function(){
			
			/** then **/
			expect(typeof task.super.constructor).toEqual("function");
			expect(typeof task.load).toEqual("function");
		});

		it("can add content to task", function() {


			/** when **/
			task.addContent("buy soya milk if available");

			/** then **/
			expect(task.content).toEqual("buy soya milk if available");
		});


		it("can add comment to task", function() {

			/** when **/
			task.addComment("enough with black coffee");

			/** then **/
			expect(task.comments[0]).toEqual("enough with black coffee");
		});

		it("can save task to record collections", function(){

			/** when **/
			task.save();
			
			/** then **/
			expect(list.tasks[task.id].title).toEqual("buy milk");
			expect(ListModel.records[list.id].tasks[task.id].title).toEqual("buy milk");

		});

		it("can destroy task from record collections", function(){
			/** when **/
			task.save();
			
			/** then **/
			expect(list.tasks[task.id].title).toEqual("buy milk");
			expect(ListModel.records[list.id].tasks[task.id].title).toEqual("buy milk");

			/** when **/
			task.destroy();

			/** then **/
			expect(list.tasks[task.id]).toBeFalsy();
			expect(ListModel.records[list.id].tasks).toEqual({});
		});


	});

});