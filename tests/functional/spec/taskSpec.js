define(["func"], function(F) {
	F.speed = 2;

	describe('Task', function() {
		
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

		it('can create a new task', function() {
			F(".task-item .task-title:contains('Into The Wild')", 0).visible();
			F(".task-item .task-title:contains('Prestige')", 0).visible();
			F(".task-item .task-title:contains('Peaceful warrior')", 0).visible();
		});

		it('can check off a task', function() {
			var performTest = function() {
				F(this).siblings(".check-task").click(function() {

					F(this).closest(".task-item").hasClass(".task-done");
					F(".task-complete .task-item .task-title:contains('Into The Wild')", 0).visible();
					F(".task-remaining .task-item .task-title:contains('Into The Wild')", 0).invisible();
				});
			};

			F(".task-item .task-title:contains('Into The Wild')", 0).visible(performTest);
		});

		it("can delete a task", function() {
			var performTest = function() {
				F(this).siblings(".delete-task").click(function() {
					F(".task-complete .task-item .task-title:contains('Into The Wild')", 0).invisible();
				});
			};

			F(".task-item .task-title:contains('Into The Wild')", 0).visible(performTest);
		});

		it("should apply active class to selected task", function() {
			var performTest = function() {
				F(".task-item .task-title:contains('Prestige')", 0).closest(".task-item").wait(function() {
					return F(this).hasClass("task-item-selected");
				});

			};
			F(".task-item .task-title:contains('Prestige')", 0).visible().click(performTest);
		});
	});
});