	describe("list model", function() {
	var list;
	beforeEach(function(){
		List.records = [];
		list = new List({
			title : "new"
		});	
	});


	it("should extend object with user's custom attribute", function(){

		list.add({tasks : "drink 2lt water"});

		expect(list.tasks).toEqual("drink 2lt water");
	});

	it("should genrate 36 digit random Ids", function(){
		

		var id = list.genrateId();	
		
		expect(id.length).toEqual(36);
	});

	it("should add the object in records collection", function(){

		list.save();

		expect(List.records.length).toEqual(1);
		expect(List.records[0].title).toEqual("new");

	});

	it("should remove object from records collection", function(){

		list.save();

		var list2 = new List({title: "today"})
		list2.save();


		list2.delete()
		expect(List.records.length).toEqual(1);

	})

	it("should update record if record exist in records collection", function(){

		list.save();
		var list2 = new List({title: "today"})
		list2.save();

		expect(List.records.length).toEqual(2);

		list2.title = "year";
		expect(List.records.length).toEqual(2);
		expect(List.records[1].title).toEqual("year");

	})

});