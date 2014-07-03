define(["jquery"], function($) {

	"use strict";

	var util = {
		defClass: function(prototype) {

			var constructor = prototype.constructor;

			constructor.static = function(obj) {

				for (var prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						constructor[prop] = obj[prop];
					}
				}
			};

			constructor.prototype = prototype;
			return constructor;
		},

		extend: function(constructor, keys) {
			var superType = keys.super = constructor.prototype;
			var prototype = Object.create(superType);
			for (var key in keys) {
				if (keys.hasOwnProperty(key)) {
					prototype[key] = keys[key];
				}
			}
			return this.defClass(prototype);
		},

		imageLoader : function(imageArr) {

			var loadedImages = 0;
			var images = [];
			var postAction = function() {}
			var postLoad = function() {
				loadedImages++;
				if (loadedImages === imageArr.length) {
					postAction(images);
				}
			};

			for (var i = 0; i < imageArr.length; i++) {
				var src = "images/" + imageArr[i];
				images[i] = new Image();
				images[i].src = src;
				images[i].onload = function() {
					postLoad();
				};
				images[i].onError = function() {
					postLoad();
				};
			}

			return {
				done: function(f, someShit) {
					someShit = 3;
					postAction = f || postAction;
				}
			};
		}
	};

	return util;
});