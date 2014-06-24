define(["ListModel", "Controller", "util", "underscore", "jquery"], function(ListModel, Controller, util, _, $) {

	var ListController = util.extend(Controller, {

		constructor: function(el, template) {
			this.super.constructor.apply(this, arguments);
		},

		events: {
			"keypress addNewLlist": "addList",
			"click deleteList": "deleteList",
			"keypress editInput": "updateList",
			"click editInput": "stopPropagation",
			"dblclick list": "setUpdateView",
			"click list": "updateHash",
		},

		customEvents: {
			"listItemCreated": "render",
			"listItemUpdate": "update",
			"ListItemDestroyed": "remove"
		},

		elements: {
			listContainer: ".list-container",
			addNewLlist: ".add-new-list",
			editList: ".edit-list",
			editInputWrapper: ".input-wrapper",
			editInput: ".edit-list-input",
			deleteList: ".delete-list",
			title: ".title",
			list: ".list"

		},


		/***********************************************

				Helper methods  
		***********************************************/

		_getHtmlElement: function(id) {
			return this.view.find("[data-id=" + id + "]");
		},

		_getModel: function(e) {
			var id = this.$(e.target).closest('.list').attr("data-id");
			var model = ListModel.findById(id);
			return model;
		},

		/***********************************************

				States  
		***********************************************/

		listUpdateState: function(element) {
			element.closest('.list').find(".input-wrapper").removeClass('hidden');
			element.closest('.list').find(".title").addClass('hidden');
		},

		listDisplayState: function(element, model) {
			element.find(".input-wrapper").addClass('hidden');
			element.closest('.list').find(".title").html(model.title).removeClass('hidden');
		},

		listActiveState: function(e) {
			this.view.find(".list").removeClass("list-active");
			this.view.find(".icon-list").removeClass("icon-list-active");
			this.view.find(".input-wrapper").addClass("hidden");
			this.view.find(".title").removeClass("hidden");

			var element = this.$(e.target).closest(".list");
			element.addClass('list-active');
			element.find(".icon-list").addClass("icon-list-active");
		
		},



		/***********************************************

				Model manuplation methods  
		***********************************************/

		addList: function(e) {
			if (this._isEnterKey(e)) {
				var target = $(e.target);
				var title = $.trim(target.val());
				if (title) {
					var listItem = new ListModel({
						title: title
					});

					listItem.save();

					target.val("");
					this.view.trigger("listItemCreated", listItem);
				}

			}

		},

		updateList: function(e) {
			if (this._isEnterKey(e)) {
				var newTitle = $.trim($(e.target).val());
				var model = this._getModel(e);

				if (newTitle) {
					model.title = newTitle;
					model.save();
					this.view.trigger("listItemUpdate", model);

				}
			}
		},

		deleteList: function(e) {
			e.stopPropagation();

			var model = this._getModel(e);
			model.destroy();
			this.view.trigger("ListItemDestroyed", model);
		},


		updateHash: function(e) {
			this.listActiveState(e)
			var id = $(e.target).closest('.list').attr("data-id");
			location.hash = "!/"+id;
		},


		/***********************************************

				DOM manuplation methods 
		***********************************************/


		render: function(e, model) {
			var html = _.template(this.template, model);
			this.view.listContainer.append(html);
		},

		remove: function(e, model) {
			this._getHtmlElement(model.id).remove();
		},

		update: function(e, model) {

			var element = this._getHtmlElement(model.id);
			this.listDisplayState(element, model);


		},

		setUpdateView: function(e) {
			var element = this.$(e.target);
			this.listUpdateState(element);

		},

		stopPropagation: function(e){
			e.stopPropagation();
		},
		
		renderALL: function() {
			this.view.listContainer.empty();
			for (var id in ListModel.records) {
				this.render(null, ListModel.records[id]);
			}


		}

	});

	return ListController;
});