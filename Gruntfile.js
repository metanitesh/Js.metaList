module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({

		jshint: {
			all: ['js/app/**/*.js'],
			options: {
				bitwise: false,
				curly: true,
				eqeqeq: true,
				forin: true,
				immed: true,
				newcap: true,
				noarg: true,
				noempty: true,
				nonew: true,
				plusplus: false,
				quotmark: true,
				regexp: true,
				trailing: true,
				maxparams: false,
				maxdepth: false,
				maxstatements: 50
			}
		},

		jasmine: {
			src: ['ListModel', 'TaskModel'],
			options: {
				specs: 'tests/unit/spec/*.js',
				template: require('grunt-template-jasmine-requirejs'),
				templateOptions: {
					requireConfig: {
						baseUrl: './',
						paths: {
							jquery: 'js/lib/jquery-1.11.1',
							underscore: 'js/lib/underscore',

							util: "js/app/core/util",
							Model: 'js/app/core/model',
							Controller: 'js/app/core/controller',

							ListModel: 'js/app/list/listmodel',
							TaskModel: 'js/app/task/taskmodel',
							bootstrapData: "js/app/bootstrapdata",

							ListController: 'js/app/list/listcontroller',
							TaskController: 'js/app/task/taskcontroller',
							NoteController: 'js/app/note/notecontroller',
							CommentController: 'js/app/comment/commentcontroller',
							actionbarController: 'js/app/actionbar/actionbarcontroller',
						}



					},

				},
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jasmine', 'jshint']);

};