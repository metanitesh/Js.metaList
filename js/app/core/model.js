define(["util"], function(util) {
	
	"use strict";

	var Model = util.defClass({

		constructor: function() {

		},

		genrateId: function() {
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0,
					v = c === "x" ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			}).toUpperCase();
		},

		load: function(attr) {
			$.extend(this, attr);
		},

		clone: function() {
			return $.extend({}, this);
		},

		getAttributes: function(){
			var attributes = this.constructor.attributes;
			var result = {};

			for(var i=0, max = attributes.length; i<max; i++){
				result[attributes[i]] = this[attributes[i]];
			}

			return result;
		}

	});


	return Model;
});
