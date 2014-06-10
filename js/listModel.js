var List = function() {
	this.init.apply(this, arguments)

};

List.records = [];


List.prototype = {
	
	init: function() {
		var recordAtrributes = arguments[0];
		if(!recordAtrributes) throw ("no attribute for record");
		if(!this.id) this.id = this.genrateId();	
		this.add(recordAtrributes);
	},

	add: function(recordAtrributes) {
		$.extend(true, this, recordAtrributes);

	},

	genrateId: function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		}).toUpperCase();
	}

}