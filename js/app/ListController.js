define(["ListModel", "Controller", "underscore", "jquery"], function(ListModel, Controller, _, $) {

	var ListController = Controller.create();



	ListController.include({


		init: function(el, template) {
			this.view = $(el);
			if (template) this.template = $(template).html();

			this.refreshElement();
			this.delegateEvent();
			this.delegateCustomEvent();
		},


		events: {
			"keypress addNewLlist": "addNewListItem",
			"click deleteList": "deleteListItem",
			"click editList": "setUpdateView",
			"keypress editInput": "updateListItem",
			"click title": "showRelatedtask",
		},

		customEvents: {
			"listItemCreated": "renderModel",
			"listItemUpdate": "updateModel",
			"ListItemDestroyed": "removeModel"
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



		_listUpdateState: function(target) {

			target.closest('.list').find(".input-wrapper").removeClass('hidden');
			target.closest('.list').find(".title").addClass('hidden');
		},

		_listDisplayState: function(target, model) {
			target.find(".input-wrapper").addClass('hidden');
			target.closest('.list').find(".title").html(model.title).removeClass('hidden');
		},

		showRelatedtask: function(e) {
			var id = $(e.target).closest('.list').attr("data-id");
			var model = ListModel.findById(id);
			$(document).trigger("showTasks", model);
		},

		addNewListItem: function(e) {
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

		setUpdateView: function(e) {
			var target = this.$(e.target);
			this._listUpdateState(target);

		},

		updateListItem: function(e) {

			if (this._isEnterKey(e)) {

				var newTitle = $.trim($(e.target).val());
				var id = $(e.target).closest('.list').attr("data-id");
				var model = ListModel.findById(id);


				if (newTitle) {
					model.title = newTitle;
					model.save();
					this.view.trigger("listItemUpdate", model);

				}

			}
		},


		deleteListItem: function(e) {
			var id = this.$(e.target).closest('.list').attr("data-id");
			var model = ListModel.findById(id)
			model.destroy();
			this.view.trigger("ListItemDestroyed", id);
		},

		renderModel: function(e, model) {
			var html = _.template(this.template, model);
			this.view.listContainer.append(html);
		},

		removeModel: function(e, id) {
			var element = this.view.find("[data-id=" + id + "]");
			element.remove();
		},

		updateModel: function(e, model) {
			var target = this.view.find("[data-id=" + model.id + "]");
			this._listDisplayState(target, model)

		},

		renderALL: function() {
			this.view.listContainer.empty();
			for (id in ListModel.records) {
				this.renderModel(null, ListModel.records[i]);
			};


		}

	});

	return ListController
})