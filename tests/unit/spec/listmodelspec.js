define(["ListModel"], function(ListModel) {
	
	/**test db setup**/
	localStorage.removeItem("metaListTest");
    ListModel.localDb = "metaListTest";
	
	describe("List Model", function() {

		describe("instance methods", function() {
			var travelList;
			beforeEach(function() {
				ListModel.records = {};
				travelList = new ListModel({
					title: "locations"
				});
			});

			it("should be subClass of Model", function() {

				/** then **/
				expect(typeof travelList.super.constructor).toEqual("function");
				expect(typeof travelList.load).toEqual("function");
			});

			it("can save list in record collection", function() {

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


			it("can destroy list from record collection", function() {

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

			it("can add Task to the list and save in record collection", function() {

				/** when **/
				travelList.save();

				/** when **/

				travelList.addTask({
					id: 123423,
					title: "bali"
				});


				/** then **/
				expect(travelList.tasks[123423].title).toEqual("bali");
				expect(ListModel.records[travelList.id].tasks[123423].title).toEqual("bali");
			});

			it("can find task from list", function() {

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

		describe("static methods", function() {
			var travelList;
			beforeEach(function() {
				ListModel.records = {};
				travelList = new ListModel({
					title: "locations"
				});
			});

			it("can find list by id from record collection", function() {
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
			});



			it("can save record collection in localStorage", function() {

				/** given **/
				var travelList = new ListModel({
					id: 1,
					title: "travelList"
				});

				travelList.addTask({
					id: 11,
					title: "peru"
				});


				var careerList = new ListModel({
					id: 2,
					title: "careerList"

				});

				travelList.save();
				careerList.save();

				var expectedObj = {
					1: {
						id: 1,
						title: "travelList",
						tasks: {
							11: {
								id: 11,
								title: "peru",
								comments: [],
								content: "",
								done: false
							}
						}
					},

					2: {
						id: 2,
						title: "careerList"
					}


				};

				/** when **/
				ListModel.saveLocal();

				/** then **/

				expect(localStorage[ListModel.localDb]).toEqual(JSON.stringify(expectedObj));

			});

			it("can create record collection from localStorage", function() {
				var travelList = new ListModel({
					id: 1,
					title: "travelList"
				});

				travelList.addTask({
					id: 11,
					title: "peru"
				});


				var careerList = new ListModel({
					id: 2,
					title: "careerList"

				});

				travelList.save();
				careerList.save();

				ListModel.saveLocal();
				ListModel.loadLocal();

				expect(ListModel.records[1].title).toEqual("travelList");
				expect(ListModel.records[2].title).toEqual("careerList");
				expect(ListModel.records[1].tasks[11].title).toEqual("peru");

			});

			it("can populate list objects from fetched collection", function() {

				/** given **/
				var listCollcection = {
					11111: {
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
					},
					2222: {
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
					}
				};

				/** when **/
				ListModel.populate(listCollcection);

				/** then **/
				expect(ListModel.records[11111].title).toEqual("bucketList");
				expect(ListModel.records[2222].title).toEqual("to-do");
				expect(ListModel.records[11111].tasks[1001201].title).toEqual("play soccer for world league");
				expect(ListModel.records[2222].tasks[22434].title).toEqual("watch GOT");
			});


		});

	});



});
