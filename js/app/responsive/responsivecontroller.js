define(["util", "Controller", "jquery"], function(util, Controller, $) {

	var ResponsiveController = util.extend(Controller, {
		constructor: function() {
			this.super.constructor.apply(this, arguments);
			this._hideAll();
			this.view.mainContent.removeClass("hide-mobile")
			this.view.mainContent.removeClass("hide-mobile")
			this.displayTask();
		},
		
		events: {
			"click menuList": "displayList",
			"click menuTask": "displayTask",
			"click menuDetail": "displayDetail",

		},
		customEvents: {
			"listItemSelected": "displayTask",
			"taskItemSelected": "displayDetail"

		},

		elements: {
			"sidebar": "#sidebar",
			"mainContent": "#main-content",
			"detail": "#detail",
			"menuItem": ".mobile_menu-item",
			"menuList": ".menu-list",
			"menuTask": ".menu-task",
			"menuDetail": ".menu-detail",
		},

		showTaks: function(){
			this.view.menuItem.removeClass("mobile-menu-active");
			this._hideAll();
			this.view.mainContent.removeClass("hide-mobile");
		},

		showDetail: function(){
			this.view.menuItem.removeClass("mobile-menu-active");

			this._hideAll();
			this.view.detail.removeClass("hide-mobile");
		},

		_hideAll: function(){
			this.view.sidebar.addClass("hide-mobile");
			this.view.mainContent.addClass("hide-mobile");
			this.view.detail.addClass("hide-mobile");
		},



		displayList: function(e){
			this.view.menuItem.removeClass("mobile-menu-active");
			this.view.menuList.addClass("mobile-menu-active");
			this._hideAll();
			this.view.sidebar.removeClass("hide-mobile");
		},

		displayTask: function(e){
			this.view.menuItem.removeClass("mobile-menu-active");
			this.view.menuTask.addClass("mobile-menu-active");
			this._hideAll();
			this.view.mainContent.removeClass("hide-mobile");
		},

		displayDetail:function(e){
			this.view.menuItem.removeClass("mobile-menu-active");
			this.view.menuDetail.addClass("mobile-menu-active");
	
			this._hideAll();
			this.view.detail.removeClass("hide-mobile");	
		}

	});
	return ResponsiveController;
});