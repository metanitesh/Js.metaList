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
			careerList.save();

			/** then **/
			expect(ListModel.records["123123-12"].title).toEqual("careers");

		});


		it("should return clone of the object", function() {

			/** when **/
			var clone = travelList.clone();

			/** then **/
			expect(clone.title).toEqual(travelList.title);


		});

		it("should destroy object from records collection", function() {

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
			careerList.save();

			/** when **/
			var record = ListModel.findById("123123-12");

			/** then **/
			expect(record).toEqual(careerList);
		})

		it("should populate object from objects array", function() {
			/** given **/
			var listCollcection = [{
				title: "bucketList",
				id: 11111,
				tasks: {
					1001201: {
						title: "play soccer for world league",
						id: 1001201,
						done: false,
						comments: ["fifa 2014 is about to start", "need to go buy a Brazil T-shirt"]
					},
					2023402304: {
						title: "start a school",
						id: 2023402304,
						done: true,
						comments: ["start with being a mentor"]
					}
				}
			}, {
				title: "to-do",
				id: 2222,
				tasks: {
					1234: {
						title: "create a todo App",
						id: 1234,
						done: false,
						comments: []
					},
					22434: {
						title: "watch GOT",
						id: 22434,
						done: false,
						comments: ["whitewalkers seems to be in no hurry"]
					}
				}
			}];

			/** when **/
			ListModel.populate(listCollcection);
			console.log(ListModel.records);

			/** then **/
			expect(ListModel.records[11111].title).toEqual("bucketList");
			expect(ListModel.records[2222].title).toEqual("to-do");
			expect(ListModel.records[11111].tasks[1001201].title).toEqual("play soccer for world league");
			expect(ListModel.records[2222].tasks[22434].title).toEqual("watch GOT");
		});

		it("should add Task to list's tasks object", function() {

			/** when **/
			travelList.addTask({
				id: 123423,
				title: "bali"
			});

			/** then **/
			expect(travelList.tasks[123423].title).toEqual("bali");
		});

		it("should find task from list's tasks object", function() {

			/** when **/
			travelList.addTask({
				id: 123423,
				title: "bali"
			});
			var task = travelList.findTaskById(123423);

			/** then **/
			expect(task.title).toEqual("bali");

		});

	});

});