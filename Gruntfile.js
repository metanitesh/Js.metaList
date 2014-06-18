module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		jasmine: {
			src: 'src/app/*.js',
			options: {
				specs: 'tests/spec/*.js',
				template: require('grunt-template-jasmine-requirejs'),
				templateOptions: {
					requireConfig: {
						baseUrl: '',
						paths: {
							jquery: 'js/lib/jquery-1.11.1',
							underscore: 'js/lib/underscore',

							Model: 'js/app/Model',
							Controller: 'js/app/Controller',

							ListModel: 'js/app/listmodel',
							TaskModel: 'js/app/taskmodel',

							ListController: 'js/app/listcontroller',
							TaskController: 'js/app/taskController',
							NoteController: 'js/app/NoteController',
							CommentController: 'js/app/CommentController'
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