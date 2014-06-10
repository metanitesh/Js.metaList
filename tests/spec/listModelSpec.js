describe("list model", function() {
	it("should be able to add a new record to list collection", function() {
		var list = new List();
		var record = {
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
		};

		list.add(record);

		expect(List.records[0]).toEqual(record)

	});
});