	describe("task-list model", function() {
		var list;
		beforeEach(function() {
			List.records = [];
			list = new List({
				title: "new"
			});
		});


		it("should extend object with user's custom attribute", function() {

			list.add({
				tasks: "drink 2lt water"
			});

			expect(list.tasks).toEqual("drink 2lt water");
		});

		it("should genrate 36 digit random Ids", function() {


			var id = list.genrateId();

			expect(id.length).toEqual(36);
		});

		it("should add the object in records collection", function() {

			list.save();

			expect(List.records.length).toEqual(1);
			expect(List.records[0].title).toEqual("new");

		});

		it("should remove object from records collection", function() {

			list.save();

			var list2 = new List({
				title: "today"
			});
			list2.save();


			list2.delete();
			expect(List.records.length).toEqual(1);

		});

		it("should update record if record exist in records collection", function() {

			list.save();
			var list2 = new List({
				title: "today"
			});
			list2.save();

			expect(List.records.length).toEqual(2);

			list2.title = "year";
			expect(List.records.length).toEqual(2);
			expect(List.records[1].title).toEqual("year");

		});

		it("should find a record by id", function() {
			list2 = new List({
				title: "places I love"
			});
			list2.id = 121;
			list2.save();

			var rec = List.findById(121);
			expect(rec).toEqual(list2)
		})

		it("should populate records from the list collection", function() {
			List.records = [];
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

			List.populate(listCollcection);
			expect(List.records.length).toEqual(2);
		});

		it("should add a new task to list's task array", function() {

			list.addTask({
				title: "take a break"
			});
			list.addTask({
				title: "bring some coffee"
			});
			expect(list.tasks.length).toEqual(2);
			expect(list.tasks[0].title).toEqual("take a break");

		});



	});