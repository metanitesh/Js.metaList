define(["func"], function(F) {
	F.speed = 2;

	describe('Comment', function() {
		
		beforeEach(function() {
			var addTask;
			var addList;

			var src = document.getElementById('metaListFrame').src;
			document.getElementById('metaListFrame').src = src;


			addList = F('.add-new-list', 0);
			addList.type('movies [enter]');

			addTask = F('.add-task', 0);
			addTask.type("Into The Wild [enter]");
			addTask.type("Prestige [enter]");
			addTask.type("Peaceful warrior [enter]");


		});

		it("should be disabled if no task selected", function() {
			var performTest = function() {
				F(".add-comment", 0).hasClass("disabled");
				F(".add-comment", 0).attr("disabled", "disabled");
			};
			F(".list .title:contains('Books')", 0).click(performTest);
		});

		it("should display comment for the task", function(){
			var performTest = function() {
				F(".task-item .task-title:contains('The Alchemist')", 0).click();

				F(".comment:contains('how to make a great book even better - make a graphic novel')",0).visible();
			};

			F(".list .title:contains('Books')", 0).click(performTest);

		});

		it("can add comment to the selected task", function() {
			var performTest = function() {
				F(".add-comment", 0).type("rather than love, than money, than faith, than fame, than fairness... give me truth. [enter]");
				F(".add-comment", 0).type("Jon Krakauer [enter]");

				F(".comment:contains('rather than love, than money, than faith, than fame, than fairness... give me truth.')",0).visible();
				F(".comment:contains('Jon Krakauer')",0).visible();
			};
			F(".task-item .task-title:contains('Into The Wild')", 0).visible().click(performTest);
		});
				
	});
});
