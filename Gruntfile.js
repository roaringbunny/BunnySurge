module.exports = function (grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				options: {
					banner: "/**\n * DO NOT EDIT THIS FILE \n * Edit source JS files, then use 'grunt concat' to Concat Them.\n */\n",
					separator: "\n"
				},
				files: {
					'public_html/app.js': [
						'src/app.js',
						'src/js/**/*.js'
					]
				}
			}
		},
		copy: {
			dist: {
				files: [
					{
						expand: false,
						src: 'node_modules/angular/*.min.js',
						dest: 'public_html/lib/angular.min.js',
						filter: 'isFile'
					}
				]
			}
		},
		watch: {
			options: {
				atBegin: true
			},
			js: {
				files: [
					'src/app.js',
					'src/js/**/*.js'
				],
				tasks: ['concat']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['concat','copy']);
};
	