define(["ListModel"], function(ListModel) {

	describe("task-list model", function() {
		var travelList;
		beforeEach(function() {

			ListModel.records = {};
			travelList = new ListModel({
				title: "locations"
			});
		});


		it("should extend object with user's custom attribute", function() {

			/** when **/
			travelList.load({
				tasks: "get accommodation"
			});

			/** then **/
			expect(travelList.tasks).toEqual("get accommodation");
		});

		it("should genrate 36 digit random Ids", function() {

			/** when **/
			var id = travelList.genrateId();

			/** then **/
			expect(id.length).toEqual(36);
		});

		it("should create object in records collection", function() {
			
			/** given **/
			var careerList = new ListModel({
				id: "123123-12",
				title: "careers"
			});

			/** when **/
			careerList.create();
			
			/** then **/
			expect(ListModel.records["123123-12"].title).toEqual("careers");

		});

		it("should update object in records collection", function() {

			/** given **/
			var careerList = new ListModel({
				id: "123123-12",
				title: "careers"
			});
			careerList.create();

			/** when **/
			careerList.tasks = ["chef", "craftsman"];
			careerList.update()

			/** then **/
			expect(ListModel.records["123123-12"].tasks).toEqual(["chef", "craftsman"]);

		});

		it("should create if object is new or update if object is old", function(){
			/** given **/
			var careerList = new ListModel({
				id: "123123-12",
				title: "careers"
			});
			
			/** when **/
			careerList.save();	
			careerList.tasks = ["chef", "craftsman"];
			careerList.save()

			/** then **/
			expect(ListModel.records["123123-12"].title).toEqual("careers");
			expect(ListModel.records["123123-12"].tasks).toEqual(["chef", "craftsman"]);
		})

		it("should return clone of the object", function(){
			
			/** when **/
			var clone = travelList.clone();
			
			/** then **/
			expect(clone.title).toEqual(travelList.title);


		});

		it("should destroy object from records collection", function(){
			
			/** given **/
			var careerList = new ListModel({
				id: "123123-12",
				title: "careers"
			});

			/** when **/
			careerList.save();
			
			/** then **/
			expect(ListModel.records["123123-12"].title).toEqual("careers");

			/** when **/
			careerList.destroy();

			/** then **/
			expect(ListModel.records["123123-12"]).not.toBeDefined();

		});

		it("should find a object by id", function() {
			/** given **/
			var careerList = new ListModel({
				id: "123123-12",
				title: "chef"
			});
			careerList.create();

			/** when **/
			var record = ListModel.findById("123123-12");
			
			/** then **/
			expect(record).toEqual(careerList);
		})

		it("should populate object from objects array", function(){
			/** given **/
			var listCollcection = [{
				title: "bucketList",
				id: 1,
				tasks: [{
					title: "play soccer for world league",
					id: 1,
					done: false,
					comments: ["fifa 2014 is about to start", "need to go buy a Brazil T-shirt"]
				}, {
					title: "start a school",
					id: 2,
					done: true,
					comments: ["start with being a mentor"]
				}]
			}, {
				title: "to-do",
				id: 2,
				tasks: [{
					title: "create a todo App",
					id: 1,
					done: false,
					comments: []
				}, {
					title: "watch GOT",
					id: 2,
					done: false,
					comments: ["whitewalkers seems to be in no hurry"]
				}]
			}];

			/** when **/
			ListModel.populate(listCollcection);

			/** then **/
			expect(ListModel.records[1].title).toEqual("bucketList");
			expect(ListModel.records[2].title).toEqual("to-do");
		});

	});

});