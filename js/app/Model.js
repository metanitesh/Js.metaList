define(["jquery"], function() {
	var Model = function() {
		var ModelClass = function() {
			this.init.apply(this,arguments)
		};

		ModelClass.fn = ModelClass.prototype;
		ModelClass.fn.parent = ModelClass;
		ModelClass.name = "ModelYo"

		ModelClass.extend = function(obj) {
			$.extend(ModelClass, obj);
		};

		ModelClass.include = function(obj) {
			$.extend(ModelClass.fn, obj);
		};

		return ModelClass;
	};

	return Model;
});