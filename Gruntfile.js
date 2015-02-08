module.exports = function (grunt) {

    grunt.initConfig({

        shell: {
            launchExpress: {
                options: {
                    stdout: true
                },
                command: 'node server.js'
            }
        },

		connect: {
			server: {
				options: {
					port: 8080,
					base: './',
					keepalive: true,
					//debug: true,
					//livereload: true,
					hostname: "*" // Now you can access from 127.0.0.1 and localhost, and 192.168.137.128 (you CentOS IP)
				}
			}
		},
		jshint : {
            ggg: {
                options: {
                    ignores: ["tests", "node_modules", "js/libs/**", "js/**/*min.js"],
                    jshintrc: ".jshintrc"
                },
                src: ["js/**/*.js"]
            }
        },
		
		eslint: { // grunt-eslint => @author https://www.npmjs.org/~sindresorhus => https://www.npmjs.org/package/grunt-eslint @ 0.4.0
			GE: ['js/**/*.js', "!node_modules", "!js/libs/**", "!js/**/*min.js"],
			options: {
				config: 'eslint.json'
				//rulesdir: 'conf/rules'
			}
		},
		
		eslint_: { // eslint-grunt => @author https://www.npmjs.org/~iancmyers => https://www.npmjs.org/package/eslint-grunt @ 0.4.1
			EG: ['js/**/*.js', "!node_modules", "!js/libs/**", "!js/**/*min.js"],
			options: {
				config: "eslint.json"
				//rulesDir: "conf/rules"
			}
		},

		jasmine: {
	        coverage: {
	            src: [
	            	//'!js/libs/**/*.js',
	            	'js/Models.js',
	            	'js/Collections.js',
	            	'js/Views.js',
	            	'js/mainRouterYL.js',
	            ],
	            options: {
	            	keepRunner: true,
		        	vendor: ['js/libs/jquery.min.js',
		        			 'js/libs/bootstrap/js/bootstrap.js',
		        			 'js/libs/underscore.min.js',
		        			 'js/libs/backbone.js',
		        			 'js/libs/backbone.wreqr.js',
		        			 'js/libs/TemplateLoader.js'
		        	],
	                specs: ['js/tests/**/*Spec.js'],
	                template: require('grunt-template-jasmine-istanbul'),
	                templateOptions: {
	                    coverage: 'coverage/coverage.json',
	                    report: 'coverage'
	                }
	            }
	        }
    	}
		
    });


	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('eslint-grunt');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask("default", ["connect"]);
	
}