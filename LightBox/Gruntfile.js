module.exports = function(grunt) {

	//引入全部tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({


		meta: {
			path: {
				src: './src/',
				dist: './dist/'
			}
		},
		sass: {
			dist: {
				options: {
					style: 'expanded',
					sourcemap: 'auto'
				},
				files:[{
					expand: true,
					cwd: '<%= meta.path.src %>sass/',
					src: '*.scss',
					dest: '<%= meta.path.src %>css',
					ext: '.css'
				}]
			}
		},
		jshint: {
			hint: {
				options: {
					"curly": true,
					"eqeqeq": true,
					"newcap": true,
					"noarg": true,
					"sub": true,
					"undef": true,
					"boss": true,
					"globals": {
						"$": true,
						"jQuery": true,
						"document": true,
						"module": true,
						"window": true,
						"alert": true,
						"console": true,
						"Image": true
					}
				},
				files: {
					src: ['<%= meta.path.src%>js/lightBox.js']
				}
			}
		},
		uglify: {
			jsmin: {
				options: {

				},
				files: {
			        'dist/js/lightBox.min.js': ['src/js/lightBox.js']
			    }
			}
		},
		watch: {
			compileSass: {
				files: ['<%= meta.path.src %>sass/*.scss'],
				tasks: ['sass']
			},
			jsHint: {
				files: ['<%= meta.path.src%>js/*.js'],
				tasks: ['jshint']
			}
		}
	});
	grunt.registerTask('live', ['watch']);
	grunt.registerTask('compileScss', ['sass']);
	grunt.registerTask('hint', ['jshint']);
	grunt.registerTask('compressJs', ['uglify']);
};