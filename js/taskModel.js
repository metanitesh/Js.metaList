var Task = function(){
	this.init.apply(this, arguments);
}

Task.prototype = {
	init: function(obj){
		// this.parent = listId;
		this.add(obj);		
		if(!this.id) this.id = this.genrateId();
	},

	genrateId: function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		}).toUpperCase();
	},

	add: function(attr){
		$.extend(true, this, attr);
	},

	save: function(){
		this.parent.tasks.push(this)
	},

	delete: function(){
		this.parent.tasks.pop(this);
	}

}