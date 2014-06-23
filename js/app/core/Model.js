define(["util"], function(util) {

	Model = util.defClass({
		
		constructor : function(){
			console.log("model constructor");
		},

		genrateId: function() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			}).toUpperCase();
		},

		load: function(attr) {
			$.extend(this, attr);
		},

		clone: function() {
			return $.extend({}, this);
		}

	});


	return Model;
});