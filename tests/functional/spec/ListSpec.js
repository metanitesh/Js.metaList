define(["ListModel", "ListController", "func"], function(ListModel, ListController, func) {
	F.speed = 100;

	describe('List', function() {

		beforeEach(function() {
			var src = document.getElementById('metaListFrame').src
			document.getElementById('metaListFrame').src = src;

			var addList = F('.add-new-list', 0);
			addList.type('movies [enter]');
		})

		it('can create a new List', function() {

			/****** then *****/
			F(".list .title:contains('movies')", 0).visible();

		});



		it("can edit a list item", function() {

			var performTest = function() {
				F(this).closest(".list").dblclick()
				F(this).closest(".list").find(".input-wrapper").visible(function() {
					F(this).find(".edit-list-input").type("Bucket-List [enter]");
					F(this).invisible();
					F(this).closest(".list").find(".title").visible();
				});
			}

			F(".list .title:contains('movies')", 0).visible(performTest);

		});

		it("can delete a list item", function() {

			var performTest = function() {
				F(this).closest(".list").find(".delete-list").click()
				F(this).closest(".list").invisible();
			}

			F(".list .title:contains('movies')", 0).visible(performTest);

		});

		it("should apply active class to selected list", function() {
			var performTest = function() {
				F(this).closest(".list").wait(function() {
					return F(this).hasClass("list-active");
				});
			};

			F(".list .title:contains('Books')", 0).click(performTest);
		});

		it("should show tasks for selected list", function() {
			var performTest = function() {
				F(".task-item .task-title:contains('The Art Spirit')", 0).visible();
				F(".task-item", 0).size(5);
			};

			F(".list .title:contains('Books')", 0).click(performTest);
		});
	});
});