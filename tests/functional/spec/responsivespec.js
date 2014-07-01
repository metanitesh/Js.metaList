// define(["func", "jquery"], function(F, $) {
// 	F.speed = 2;

// 	describe('responsive spec', function() {

// 		beforeEach(function() {
// 			var src = document.getElementById('metaListFrame').src;
// 			document.getElementById('metaListFrame').src = src;
// 			$("#metaListFrame").addClass("mobileFrame");
// 		});


// 		it('should setup mobile version of app', function() {
// 			F("#sidebar", 0).invisible();
// 			F("#main-content", 0).visible();
// 			F("#detail", 0).invisible();
// 			F("#mobile", 0).visible();
// 		});

// 		it('should show list item when clicked on list button', function() {
// 			F(".menu-list", 0).visible().click();
// 			F("#sidebar", 0).visible();
// 			F("#main-content", 0).invisible();
// 			F("#detail", 0).invisible();
// 		});

// 		it('should show task item when clicked on task button', function() {
// 			F(".menu-task", 0).visible().click();
// 			F("#sidebar", 0).invisible();
// 			F("#main-content", 0).visible();
// 			F("#detail", 0).invisible();
// 		});

// 		it('should show detail items when clicked on detail button', function() {
// 			F(".menu-detail", 0).visible().click();
// 			F("#sidebar", 0).invisible();
// 			F("#main-content", 0).invisible();
// 			F("#detail", 0).visible();
// 		});

// 		it('should reset standard version', function() {
// 			$("#metaListFrame").removeClass("mobileFrame");
// 			F("#sidebar", 0).visible();
// 			F("#main-content", 0).visible();
// 			F("#detail", 0).visible();
// 			F("#mobile", 0).invisible();
// 		});

// 	});


// });