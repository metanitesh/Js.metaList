define(["util", "Controller", "jquery"], function(util, Controller, $) {
	
	"use strict";

	var ResponsiveController = util.extend(Controller, {
		
		constructor: function() {
			this.super.constructor.apply(this, arguments);
			this._hideAll();
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

		/***********************************************

				DOM methods  
		***********************************************/

		_hideAll: function(){
			this.view.sidebar.addClass("hide-mobile");
			this.view.mainContent.addClass("hide-mobile");
			this.view.detail.addClass("hide-mobile");
			this.view.menuItem.removeClass("mobile-menu-active");
		},

		displayList: function(){
			this._hideAll();
			this.view.sidebar.removeClass("hide-mobile");
			this.view.menuList.addClass("mobile-menu-active");
		},

		displayTask: function(){
			this._hideAll();
			this.view.mainContent.removeClass("hide-mobile");
			this.view.menuTask.addClass("mobile-menu-active");
		},

		displayDetail:function(){
			this._hideAll();
			this.view.menuDetail.addClass("mobile-menu-active");
			this.view.detail.removeClass("hide-mobile");
		}

	});

	return ResponsiveController;
});