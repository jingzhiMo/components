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
		watch: {
			compileSass: {
				files: ['<%= meta.path.src %>sass/*.scss'],
				tasks: ['sass']
			}
		}
	});
	grunt.registerTask('live', ['watch']);
	grunt.registerTask('comp', ['sass']);
};