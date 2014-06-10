describe("list model", function() {
	var list;
	beforeEach(function(){
		list = new List({
			title : "new"
		});	
	});


	it("should extend object with user custom attribute", function(){

		list.add({tasks : "drink 2lt water"});

		expect(list.tasks).toEqual("drink 2lt water");
	});

	it("should genrate 36 digit random Ids", function(){
		

		var id = list.genrateId();	
		
		expect(id.length).toEqual(36);
	});

});