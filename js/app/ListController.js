define(["ListModel", "Model", "underscore", "jquery"], function(ListModel, Model, _, $) {

	var ListController = Model.create();



	ListController.include({


		init: function(el, template) {
			this.view = $(el);
			if (template) this.template = $(template).html();

			this.refreshElement();
			this.delegateEvent();
		},

		proxy: function(func) {
			return $.proxy(func, this);
		},


		$: function(selector) {
			return $(selector, this.view);
		},

		eventSplitter: /^(\w+)\s*(.*)$/,

		events: {
			"keypress addNewLlist": "addNewListItem",
			"click deleteList": "deleteListHandler",
			"click editList": "handleEditListClick",
			"keypress editInput": "handleEditListSubmit",
			
			"listItemCreated": "renderModel",
			"destroyList": "renderALL"
		},

		elements: {
			listContainer: ".list-container",
			addNewLlist: ".add-new-list",
			editList: ".edit-list",
			editInputWrapper: ".input-wrapper",
			editInput: ".edit-list-input",
			deleteList: ".delete-list",
			title: ".title"

		},

		_isEnterKey: function(e){
			var code = (e.keyCode ? e.keyCode : e.which);
			return (code === 13);
		},

		addNewListItem: function(e) {
			if (this._isEnterKey(e)) {
				var target = $(e.target);
				var title = $.trim(target.val());
				if (title) {	
					var listItem = new ListModel({title: title});
					listItem.save();

					target.val("");
					this.view.trigger("listItemCreated", listItem);
				}

			}

		},

		
		renderModel: function(e, model){
			var html = _.template(this.template, model);
			this.view.listContainer.append(html);
		},


		renderALL: function(e, data) {
			this.view.listContainer.empty();
			for (id in ListModel.records) {
				var template = this.template.clone().html();
				var item = ListModel.records[id];
				var html = _.template(template, item);
				this.view.listContainer.append(html);

			}


		},


		handleEditListSubmit: function(e){
			if (e.keyCode === 13) {
				var newTitle = $.trim($(e.target).val());
				var id = $(e.target).closest('.list').attr("data-id");
				var model = ListModel.findById(id);
				if(newTitle){
					model.title = newTitle;
					model.save();
					$(this.view).trigger("addList");

				}	

			}
		},

		handleEditListClick: function(e){
			console.log("in");
			var id = $(e.target).closest('.list').attr("data-id");
			var model = ListModel.findById(id);
			
			console.log(model)
			$(e.target).closest('.list').find(".input-wrapper").removeClass('hidden');
			$(e.target).closest('.list').find(".title").addClass('hidden');
			// this.view.editInputWrapper);
			this.view.title.addClass('hidden');
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
		},



		deleteListHandler: function(e) {
			var id = $(e.target).closest('.list').attr("data-id");
			var model = ListModel.findById(id)
			model.destroy();
			$(this.view).trigger("destroyList");


		},

		
		

		


	});

	return ListController
})