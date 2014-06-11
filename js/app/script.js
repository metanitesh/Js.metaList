var List = function(){
	this.init.apply(this, arguments);
};

List.items = [];
List.findById = function(id){
	console.log(id)
	for(var i=0; i<List.items.length; i++){
		console.log(List.items[i].id)
		if(List.items[i].id === id){
			return List.items[i];
		}
	}
};

List.prototype = {

	generateId: function(){
		return parseInt((Math.random()*1000000000).toFixed(0));
	},
	
	update: function(id, title){
		var obj = List.findById(id);
		obj.title = title;

	},
	create: function(title){
		var obj = {};
		obj.id = this.generateId();
		obj.title = title;
		List.items.push(obj);
		return this;
	},
	delete: function(id){
		var obj = List.findById(id);
		List.items.pop(obj);

	},
	init: function(){
		var title = arguments[0];
		if(!title) throw ("needs title to create a new list item");		
		this.create(title);
	}
};

var list = new List("BAL");
var list = new List("life");
// console.log(list);

var ListController = function(view, collection, template){
	this.view = $("."+view);
	this.collection = collection;
	this.template = $("#"+template).html();
	console.log(this.collection.items)
	this.init();

	
}

ListController.prototype = {
	init : function(){
		this.addAll();
		$(".add-new-list").keypress($.proxy(this.addNewModel,this));
		$(".icon-delete").click(this.remove);
	},

	addAll: function(){
		for(var i=0; i<this.collection.items.length; i++){
			this.addOne(this.collection.items[i])	
		}
	},

	addOne: function(obj){
		var html = _.template(this.template, obj)
		this.view.append( html)
	},

	addNewModel: function(e){
		var code = (e.keyCode ? e.keyCode : e.which);
 		if(code == 13) { //Enter keycode
 			var title = $(e.target).val();
   			var li = new this.collection(title);
   			this.view.empty();
   			this.addAll()
 		}
	},

	remove: function(e){
		console.log("hello");
		console.log($(e.target).data("id"));
		// item  = this.collection	
	}
};


var listController = new ListController("list-container", List, "list-item");


