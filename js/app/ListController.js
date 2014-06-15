define(["ListModel", "Model", "underscore", "jquery"], function(ListModel, Model, _, $) {

	var ListController = Model.create();



	ListController.include({


		init: function(el, template) {
			this.view = $(el);
			if (template) this.template = $(template);

			this.refreshElement();
			this.delegateEvent();
		},

		proxy: function(func) {

			return $.proxy(func, this);
		},


		$: function(selector) {
			return $(selector, this);
		},

		eventSplitter: /^(\w+)\s*(.*)$/,

		events: {
			"keypress addNewLlist": "handleSubmit",
			"click deleteList": "deleteListHandler",
			"click editList": "handleEditList",
			"addList": "renderALL",
			"destroyList": "renderALL" 
		},

		elements: {
			listContainer: ".list-container",
			addNewLlist: ".add-new-list",
			editList: ".edit-list",
			deleteList: ".delete-list"

		},



		refreshElement: function() {
			for (var element in this.elements) {
				if (this.elements.hasOwnProperty(element)) {
					this.view[element] = $(this.elements[element]);

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
					console.log("in", selector)
					element = this.elements[selector];

					this.view.on(userEvent, element, method);
				} else {
					// console.log("else", selector)
					this.view.on(userEvent, method)
				}

			}
		},



		deleteListHandler: function(e) {
			console.log("dele")
			var id = $(e.target).closest('.list').attr("data-id");
			var model = ListModel.findById(id)
			model.destroy();
			$(this.view).trigger("destroyList");


		},

		renderALL: function() {
			this.view.listContainer.empty();
			for (id in ListModel.records) {
				var template = this.template.clone().html();
				var item = ListModel.records[id];
				var html = _.template(template, item);
				this.view.listContainer.append(html);

			}


		},

		handleSubmit: function(e) {
			if (e.keyCode === 13) {
				var newTitle = $.trim($(e.target).val());

				if (newTitle) {
					this.add({
						title: newTitle
					});

					$(e.target).val("");
					$(this.view).trigger("addList");
				}

			}

		},

		add: function(obj) {

			this.model = new ListModel(obj);
			this.model.save();

		}


	});

	return ListController
})