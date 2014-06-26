define(["func"], function(func) {
	F.speed = 100;

	describe('TodoMVC', function() {
		it('should create and complete todos', function() {
			var newTodo = F('.add-new-list', 0);
			console.log(newTodo)
			newTodo.type('text [enter]');
			
			// F('.todo label:contains("FuncUnit")', 0).visible();
			// F('.todo label:contains("is")', 0).visible();
			// F('.todo label:contains("awesome")', 0).visible();

			// F('.toggle:not(:checked)', 0).click();
			// F('.toggle:not(:checked)', 0).click();
			// F('.toggle:not(:checked)', 0).click();

			// F('#clear-completed', 0).click();
			// F('.todo.completed', 0).missing();
		});


	});
});