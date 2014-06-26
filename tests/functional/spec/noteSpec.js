define(["func"], function(func) {
	F.speed = 100;

	describe('Note', function() {
		var addTask;
		var addList;

		beforeEach(function() {
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
				F(".note", 0).hasClass("disabled");
				F(".note", 0).attr("disabled", "disabled");
			};
			F(".list .title:contains('Books')", 0).click(performTest);
		});

		it("should display content for the task", function() {
			var performTest = function() {

				F(".list .title:contains('Books')", 0).click();
				F(".task-item .task-title:contains('Turning Pro')", 0).click();
				F(".note", 0).val(/They didn't know Dave. He was top hand and a good guy. he would never pull the pin. he was a pro./);

			};
			F(".task-item .task-title:contains('Into The Wild')", 0).visible().click(performTest);
		});


		it("can add content to selected task", function() {
			var performTest = function() {
				F(".note", 0).type("That's what was great about him. He tried. Not many do. [enter]");

			};
			F(".task-item .task-title:contains('Into The Wild')", 0).visible().click(performTest);
		});





	});
});