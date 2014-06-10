var List = function() {
	this.init.apply(this, arguments)

};

List.records = [];

List.populate = function(listCollaction){
	listCollaction.forEach(function(item){
		var model = new List(item);
		model.save();
	});
};

List.findById = function(id){
	var records = this.records;
	for(var i=0, max=records.length; i<max; i++ ){
		if(records[i].id === id){
			return records[i];
		}
	}
};

List.prototype = {
	
	init: function() {
		this.constuctor = List
		var recordAtrributes = arguments[0];
		if(!recordAtrributes) throw ("at least required title attribute");
		if(!this.id) this.id = this.genrateId();	
		this.add(recordAtrributes);
	},

	add: function(recordAtrributes) {
		$.extend(true, this, recordAtrributes);
		return this;
	},

	genrateId: function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		}).toUpperCase();
	},

	save: function(){
		var records = this.constuctor.records;
		for(var i=0, max=records.length; i<max; i++){
			if( this.id === records[i].id){
				records.pop(records[i]);
				records.push(this);
				return records[i];
			}
		}

		records.push(this);
		return this;
	},

	delete: function(){
		var records = this.constuctor.records;
		for(var i=0, max=records.length; i<max; i++){
			if( this.id === records[i].id){
				records.pop(records[i]);
				return records[i];
			}
		}
	},




}