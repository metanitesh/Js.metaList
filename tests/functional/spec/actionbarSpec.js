define(["func"], function(F) {
	F.speed = 2;

	describe('actionbar', function() {

		beforeEach(function() {
			var src = document.getElementById('metaListFrame').src;
			document.getElementById('metaListFrame').src = src;

			var addList = F('.add-new-list', 0);
			addList.type('movies [enter]');
		});

		it('can save data locally', function() {
			F(".list .title:contains('movies')", 0).visible(function() {
				F(".save", 0).click(function(e) {
					expect(localStorage[sessionStorage.testDb].match("movie")).toBeTruthy();
				});
			});

		});

	});


});