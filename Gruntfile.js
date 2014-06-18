module.exports = function(grunt) {
	// grunt.initConfig({
	// 	connect: {
	// 		test: {
	// 			port: 8000
	// 		}
	// 	},
	// 	jasmine: {
	// 		testme: {
	// 			src: 'js/**/*.js',
	// 			options: {
	// 				specs: 'test/**/*.js',
	// 				// helpers: 'spec/*Helper.js',
	// 				host: 'http://127.0.0.1:8000/',
	// 				// template: require('grunt-template-jasmine-requirejs'),
	// 				templateOptions: {
	// 					requireConfigFile: 'tests/spec_require_config.js'
	// 				}
	// 			}
	// 		}
	// 	}
	// });
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['test/report/*'],

	// 	jshint: {
	// 		all: ['client/default/bizproduct/js/**/*.js'],
	// 		options: {
	// 			bitwise: true,
	// 			curly: true,
	// 			eqeqeq: true,
	// 			forin: true,
	// 			immed: true,
	// 			newcap: true,
	// 			noarg: true,
	// 			noempty: true,
	// 			nonew: true,
	// 			plusplus: true,
	// 			quotmark: true,
	// 			regexp: true,
	// 			trailing: true,
	// 			maxparams: 3,
	// 			maxdepth: 2,
	// 			maxstatements: 50
	// 		}
	// 	},
	// 	concat: {

	// 	},
	// 	uglify: {

	// 	},
	// 	plato: {
	// 		options: {
	// 			title: 'BizProduct',
	// 			jshint: grunt.file
	// 				.readJSON('node_modules/grunt-plato/.jshintrc')
	// 		},
	// 		metrics: {
	// 			files: {
	// 				'client_test/report/metrics': ['client/default/bizproduct/**/*.js']
	// 			}
	// 		}
	// 	},
	// 	jasmine: {
	// 		coverage: {
	// 			src: ['client/default/bizproduct/js/**/*.js'],
	// 			options: {
	// 				specs: ['client_test/spec/*.js'],
	// 				junit: {
	// 					path: 'client_test/report/test'
	// 				},
	// 				vendor: ['client/default/lib/*.js'],
	// 				template: require('grunt-template-jasmine-istanbul'),
	// 				templateOptions: {
	// 					coverage: 'client_test/report/coverage/coverage.json',
	// 					report: 'client_test/report/coverage',
	// 					thresholds: {
	// 						lines: 80,
	// 						statements: 80,
	// 						branches: 80,
	// 						functions: 80
	// 					}
	// 				}
	// 			}
	// 		}
	// 	},

	// 	// Configure a mochaTest task
	// 	mochaTest: {
	// 		test: {
	// 			options: {
	// 				reporter: 'spec',
	// 				require: 'cloud/coverage/blanket'
	// 			},
	// 			src: ['cloud/spec/**/*.js']
	// 		},
	// 		coverage: {
	// 			options: {
	// 				reporter: 'html-cov',
	// 				// use the quiet flag to suppress the mocha console output
	// 				quiet: true,
	// 				// specify a destination file to capture the mocha
	// 				// output (the quiet option does not suppress this)
	// 				captureFile: 'cloud/spec/report/coverage/coverage.html'
	// 			},
	// 			src: ['cloud/spec/**/*.js']
	// 		}
	// 	}

	});

	// grunt.loadNpmTasks('grunt-template-jasmine-requirejs');
	grunt.loadNpmTasks('grunt-contrib-clean');
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-jasmine');
	// grunt.loadNpmTasks('grunt-plato');
	// grunt.loadNpmTasks('grunt-mocha-test');

	// Default task(s).
	grunt.registerTask('default', ['clean']);
	// grunt.registerTask('jenkins', ['clean', 'jshint', 'jasmine', 'plato']);
	// grunt.registerTask('metrics', ['plato']);
	// grunt.registerTask('cloudTest', 'mochaTest');


};