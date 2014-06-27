module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		jasmine: {
			src: ['js/app/list/*.js', 'js/app/task/*.js'],
			options: {
				specs: 'tests/unit/spec/*.js',
				template: require('grunt-template-jasmine-requirejs'),
				templateOptions: {
					requireConfig: {
						baseUrl: './',
						paths: {
							jquery: 'js/lib/jquery-1.11.1',
							underscore: 'js/lib/underscore',

							util: 'js/app/core/Util',
							Model: 'js/app/core/Model',
							Controller: 'js/app/core/Controller',
							bootstrapData: "js/app/bootstrapData",

							ListModel: 'js/app/list/ListModel',
							TaskModel: 'js/app/task/TaskModel',

							ListController: 'js/app/list/ListController',
							TaskController: 'js/app/task/taskController',
							NoteController: 'js/app/note/NoteController',
							CommentController: 'js/app/comment/CommentController',
        					actionbarController: 'js/app/actionbar/actionbarController'
							
						}
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	// grunt.loadNpmTasks('grunt-contrib-jshint');

	// grunt.registerTask('test', ['jshint', 'jasmine']);

	grunt.registerTask('default', ['jasmine']);

};