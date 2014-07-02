define(["util"], function(util) {

	describe("Util", function() {

		describe("define new Class", function() {
			var Class;
			beforeEach(function() {
				Class = util.defClass({
					constructor: function() {
						return "constructor called";
					},
					method: function() {
						return "instance method";
					}
				});
			});

			it("can create a class from prototype object", function() {

				/** when **/
				var dummy = new Class();

				/** then **/
				expect(typeof Class).toEqual("function");
				expect(dummy.method()).toEqual("instance method");
				expect(dummy.constructor).toEqual(Class);

			});


			it("can create create static properties on Class", function() {

				/** when **/
				Class.static({
					records: {},

					attributes: [1]
				});

				/** then **/
				expect(Class.records).toEqual({});
				expect(Class.attributes).toEqual([1]);
			});



		});

		describe("inheritance", function() {
			var TestModel;
			var TestListModel;
			beforeEach(function() {
				TestModel = util.defClass({
					constructor: function() {
						return "Model";
					},
					load: function() {
						return "load";
					}
				});

				TestListModel = util.extend(TestModel, {
					constructor: function() {
						return "ListModel";
					},

					save: function() {
						return "save";
					}

				});
			});

			it("can create a sub class", function() {

				/** when **/
				var list = new TestListModel();

				/** then **/
				expect(typeof TestListModel).toEqual("function");
				expect(list.save()).toEqual("save");
				expect(list.load()).toEqual("load");
			});

			it("should set super as parent class reference", function() {

				/** when **/
				var list = new TestListModel();

				/** then **/
				expect(list.super.constructor()).toEqual("Model");
			});
		});
	});

});
