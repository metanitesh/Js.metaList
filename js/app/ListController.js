define(["ListModel", "Model", "underscore", "jquery"], function(ListModel, Model, _, $) {

	var ListController = Model.create();



	ListController.include({


		init: function(el, template) {
			this.view = $(el);
			this.view.listContainer = $(".list-container", this.view);
			this.view.addNewLlist = $(".list-container", this.view);
			this.view.editList = $(".edit-list", this.view);
			// this.view.deleteList = $(".delete-list", this.view);
			
			console.log(this.view.editList)

			this.template = $(template);
			this.document = $(document);

			this.view.on("keypress", this.view.addNewLlist, $.proxy(this.handleSubmit, this));
			this.view.on("keypress", this.view.addNewLlist, $.proxy(this.handleSubmit, this));
			
			this.view.on("click", this.view.editList, $.proxy(this.editList, this));
			// this.view.on("click", this.view.deleteList, $.proxy(this.deleteList, this));
			
			this.document.on("addList", $.proxy(this.renderALL, this));
		},

		events: {

		},

		elements: {

		},

		editList: function(e){
			var id = $(e.target).closest('.list').attr("data-id");
			var model = ListModel.findById(id)
			console.log(model);

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