define(["ListModel", "util", "jquery"], function(ListModel, util, $) {

	"use strict";

	var Controller = util.defClass({

		constructor: function(el, template) {

			this.view = $(el);
			if (template) this.template = $(template).html();
			this.refreshElement();
			this.delegateEvent();
			this.delegateCustomEvent();

			$(window).on("hashchange", this.proxy(this.routeSetup));

		},

		proxy: function(func) {
			return $.proxy(func, this);
		},


		$: function(selector) {
			return $(selector, this.view);
		},

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

				if (this.events.hasOwnProperty(prop)) {
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
		},

		delegateCustomEvent: function() {
			for (var customEvent in this.customEvents) {

				if (this.customEvents.hasOwnProperty(customEvent)) {
					var methodName = this.customEvents[customEvent];
					var method = this.proxy(this[methodName]);
					$(document).on(customEvent, method);
				}


			}
		},

		setUrl: function(list, task) {

			var Url = "";
			
			if(list) Url = Url + "/" + list.id;
			if(task) Url =  Url + "/" + task.id;
			
			location.hash = Url;
		},

		getUrlObject: function() {

			var result = {};
			var ids = location.hash.slice(2).split("/");

			var listId = ids[0];
			var taskId = ids[1];


			if (listId) {
				var list = ListModel.findById(listId);
				result.list = list;
			}

			if (taskId) {
				var task = list.findTaskById(taskId);
				result.task = list.findTaskById(taskId);
			}

			return result;

		}
	});

	return Controller;
});
