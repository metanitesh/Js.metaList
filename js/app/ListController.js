define(["ListModel", "Model", "underscore", "jquery"], function(ListModel, Model, _, $) {

	var ListController = Model.create();



	ListController.include({


		init: function(el, template) {
			this.view = $(el);
			if(template)  this.template = $(template);
			this.view.document = $(document);
			
			this.refreshElement();
			this.delegateEvent();

			// this.view.on("keypress", this.view.addNewLlist, $.proxy(this.handleSubmit, this));
			
			// this.view.on("click", this.view.editList, $.proxy(this.editList, this));
			// this.view.on("click", this.view.deleteList, $.proxy(this.deleteList, this));
			
			// this.document.on("addList", $.proxy(this.renderALL, this));
			// this.document.on("destroyList", $.proxy(this.renderALL, this));
			// this.document.on("destroyList", $.proxy(this.renderALL, this));
		},	

		proxy: function(func){
			return $.proxy(func, this.view);
		},
		

		$: function(selector){
			return $(selector, this);
		},

		eventSplitter: /^(\w+)\s*(.*)$/,
		
		events: {
			"keypress addNewLlist": "handleSubmit",
			// "click deleteList": "deleteList",
			// "click editList": "editList",
			"addList document": "renderALL" 
		},

		elements: {
			listContainer: ".list-container",
			addNewLlist: ".add-new-list",
			editList: ".edit-list",
			deleteList: ".delete-list"
		},



		refreshElement: function(){
			for(var element in this.elements){
				if(this.elements.hasOwnProperty(element)){
					this.view[element] = $(this.elements[element]);

				}
			}
		},

		delegateEvent: function(){
			for (var prop in this.events){

				var handler = this.events[prop];
				var userEvent = prop.split(" ")[0];
				var selector = prop.split(" ")[1] || this.view;
				var element =  this.view[selector];
				// console.log(element, userEvent, this[handler);	
				this.view.document.on( userEvent, this.view[selector], $.proxy(this[handler], this));
			}
		},



		deleteList: function(e){
			var id = $(e.target).closest('.list').attr("data-id");
			var model = ListModel.findById(id)
			model.destroy();
			$(document).trigger("destroyList");


		},

		renderALL: function(){
			console.log(this.template)
			this.view.listContainer.empty();
			for(id in ListModel.records){
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
					$(document).trigger("addList");
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