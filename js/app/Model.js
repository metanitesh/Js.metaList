define(["jquery"], function() {
	var Model = function() {
		
	};

	Model.create = function(parent){
		var ModelClass = function() {
			this.init.apply(this,arguments)
		};

		if(parent){
			var F = function(){};
			F.prototype = parent.prototype;
			ModelClass.prototype = new F();
		};

		ModelClass.fn = ModelClass.prototype;
		ModelClass.fn.parent = ModelClass;

		ModelClass.extend = function(obj) {
			$.extend(ModelClass, obj);
		};

		ModelClass.include = function(obj) {
			$.extend(ModelClass.fn, obj);
		};

		return ModelClass;
	}
	return Model;
});