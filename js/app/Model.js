define(["jquery"], function() {
	var Model = {};

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
			var extended = obj.extended;
			$.extend(ModelClass, obj);
			if(extended) extend();
		};

		ModelClass.include = function(obj) {
			var included = obj.inluded;
			$.extend(ModelClass.fn, obj);
			if(included) included();
		};

		return ModelClass;
	}



	return Model;
});