define(["jquery"], function() {
	var Model = function() {
		var klass = function() {

		};

		klass.fn = klass.prototype;
		klass.fn.parent = klass;


		klass.extend = function(obj) {
			$.extend(klass, obj);
		};

		klass.include = function(obj) {
			$.extend(klass.fn, obj);
		};

		return klass;
	};

	return Model;
});