define(["TaskModel"], function(TaskModel) {

	describe("Task-Model spec", function() {
		var task;
		beforeEach(function() {
			task = new TaskModel({
				title: "buy milk"
			});
		});


		it("should add content to task", function() {

			/** when **/
			task.addContent("buy soya milk if available");

			/** then **/
			expect(task.content).toEqual("buy soya milk if available");
		});


		it("should add comment to task", function() {

			/** when **/
			task.addComment("enough with black coffee");

			/** then **/
			expect(task.comments[0]).toEqual("enough with black coffee");
		});

		it("should return attributes of the object", function() {

			var todoTask = new TaskModel({
				id: 1,
				title: "learn to write better test",
				content: "content",
				done: true
			})

			var actualObj = todoTask.getAttributes();
			var expectedObj = {
				id: 1,
				title: "learn to write better test",
				content: "content",
				done: true,
				comments:[]
			}
			expect(actualObj).toEqual(expectedObj)

		})



	});

});