define(["ListModel", "Controller", "util", "underscore", "jquery"], function(ListModel, Controller, util, _, $) {
	
	"use strict";

	var ListController = util.extend(Controller, {

		constructor: function(el, template) {
			this.super.constructor.apply(this, arguments);
			this.renderALL();
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

				Route handling  
		***********************************************/
		updateHash: function(e) {
			$(document).trigger("listItemSelected");
			var list = this._getModel(e);
			this.setUrl(list);
		},

		routeSetup: function(){
			var urlObject = this.super.getUrlObject();
			if(urlObject.list){
				this.listActiveState(urlObject.list.id);
			}
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

		listActiveState: function(id) {
			this.view.find(".list").removeClass("list-active");
			this.view.find(".icon-list").removeClass("icon-list-active");
			this.view.find(".icon-delete").removeClass("icon-delete-active");
			this.view.find(".input-wrapper").addClass("hidden");
			this.view.find(".title").removeClass("hidden");
			
			var element = this.$("[data-id="+id+"]").closest(".list");
			element.addClass('list-active');
			element.find(".icon-list").addClass("icon-list-active");
			element.find(".icon-delete").addClass("icon-delete-active")
		
		},



		/***********************************************

				Model manuplation methods  
		***********************************************/

		addList: function(e) {
			if (this._isEnterKey(e)) {
				var element = $(e.target);
				var title = $.trim(element.val());
				if (title) {
					var listItem = new ListModel({
						title: title
					});
					listItem.save();


					element.val("");
					this.view.trigger("listItemCreated", listItem);
					this.setUrl(listItem);
				}

			}

		},

		updateList: function(e) {
			if (this._isEnterKey(e)) {
				var newTitle = $.trim($(e.target).val());
				
				if (newTitle) {
					var model = this._getModel(e);
					model.title = newTitle;
					model.save();
					this.view.trigger("listItemUpdate", model);

				}
			}
		},

		deleteList: function(e) {
			
			var model = this._getModel(e);
			model.destroy();
			
			this.view.trigger("ListItemDestroyed", model);
			this.setUrl("");
			e.stopPropagation();
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
