define(["jquery"], function() {
	var Controller = {};

	Controller.create = function(parent){
		var ControllerClass = function() {
			this.init.apply(this,arguments)
		};

		if(parent){
			var F = function(){};
			F.prototype = parent.prototype;
			ControllerClass.prototype = new F();
		};

		ControllerClass.fn = ControllerClass.prototype;
		ControllerClass.fn.parent = ControllerClass;

		ControllerClass.extend = function(obj) {
			var extended = obj.extended;
			$.extend(ControllerClass, obj);
			if(extended) extend();
		};

		ControllerClass.include = function(obj) {
			var included = obj.inluded;
			$.extend(ControllerClass.fn, obj);
			if(included) included();
		};

		
		ControllerClass.include({
		proxy: function(func) {
			return $.proxy(func, this);
		},


		$: function(selector) {
			return $(selector, this.view);
		},

		eventSplitter: /^(\w+)\s*(.*)$/,

		_isEnterKey: function(e) {
			var code = (e.keyCode ? e.keyCode : e.which);
			return (code === 13);
		},

		refreshElement: function() {
			for (var element in this.elements) {
				if (this.elements.hasOwnProperty(element)) {
					this.view[element] = this.$(this.elements[element]);

				}
			}
		},

		delegateEvent: function() {
			for (var prop in this.events) {

				var methodName = this.events[prop];
				var method = this.proxy(this[methodName]);

				var userEvent = prop.split(" ")[0];
				var selector = prop.split(" ")[1];

				var element;

				if (selector) {
					element = this.elements[selector];
					this.view.on(userEvent, element, method);
				} else {
					this.view.on(userEvent, method);
				}

			}
		}
	})
		return ControllerClass;
	}

	

	return Controller;
});