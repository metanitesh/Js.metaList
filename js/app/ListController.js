define(["ListModel", "Model", "underscore", "jquery"], function(ListModel, Model, _, $) {

	var ListController = Model.create();



	ListController.include({


		init: function(el, template) {
			this.view = $(el);
			if(this.template)  $(template);
			
			
			this.refreshElement();
			this.delegateEvent();

			// this.view.on("keypress", this.view.addNewLlist, $.proxy(this.handleSubmit, this));
			
			// this.view.on("click", this.view.editList, $.proxy(this.editList, this));
			// this.view.on("click", this.view.deleteList, $.proxy(this.deleteList, this));
			
			// this.document.on("addList", $.proxy(this.renderALL, this));
			// this.document.on("destroyList", $.proxy(this.renderALL, this));
			// this.document.on("destroyList", $.proxy(this.renderALL, this));
		},	

		

		events: {
			"keypress addNewLlist": "handleSubmit",
			"click deleteList": "deleteList",
			"click editList": "editList",
			"addList document": "renderALL" 
		},

		elements: {
			listContainer: ".list-container",
			addNewLlist: "add-new-list",
			editList: ".edit-list",
			deleteList: ".delete-list"
		},



		refreshElement: function(){
			for(var element in this.elements){
				if(this.elements.hasOwnProperty(element)){
					console.log(element);
					this.view[element] = this.elements[element];

				}
			}
		},

		delegateEvent: function(){
			
		},

		

		deleteList: function(e){
			var id = $(e.target).closest('.list').attr("data-id");
			var model = ListModel.findById(id)
			model.destroy();
			$(document).trigger("destroyList");


		},

		renderALL: function(){
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