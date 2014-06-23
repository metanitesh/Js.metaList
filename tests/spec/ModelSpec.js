define(["Model"], function(Model) {

	describe("Model", function() {
		var model;
		beforeEach(function() {
			Model.static({
				attributes: ["id", "title"]
			});

			model = new Model();

		});

		it("should be a class", function() {

			/** then **/
			expect(typeof Model).toEqual("function");
		});

		it("can create staic property", function() {

			/** then **/
			expect(Model.attributes).toEqual(["id", "title"]);
		});

		it("can genrate 36 digit random IDs", function() {

			/** then **/
			expect(model.genrateId().length).toEqual(36);
		});

		it("can load new attributes", function() {

			/** when **/
			model.load({ title: "new model" });

			/** then **/
			expect(model.title).toEqual("new model");
		});

		it("can clone itself", function(){

			/** when **/
			var clone = model.clone()
			
			/** then **/
			expect(clone).toEqual(model);
			expect(clone === model).toBeFalsy();
		});

		it("can create attributes object", function(){

			/** given **/
			var model = new Model();
			var object = {
				id: 1,
				title: "Todo"
			};
			model.load(object);

			/** when **/
			var actualObj = model.getAttributes()
			
			/** then **/
			expect(actualObj).toEqual(object);
		})
	});

});